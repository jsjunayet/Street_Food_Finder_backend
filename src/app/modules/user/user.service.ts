import { PrismaClient, User } from "@prisma/client"
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { makePaymentAsync, verifyPaymentAsync } from "./premiumUser";
const prisma = new PrismaClient()
const RegisterUser = async (payload:User) => {
    const passwordHash = await bcrypt.hash(payload.password, 10);
    const result = await prisma.user.create({
      data: {
        email: payload.email,
        password: passwordHash,
        role: payload.role,
      },
    });
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  };
  const loginUser = async (payload: Partial<User>) => {
    const { email, password } = payload;
  
    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log(existingUser);
  
    if (!existingUser) {
      throw new Error("User not found");
    }
  
    // 2. Check password
    const isPasswordValid = await bcrypt.compare(password as string, existingUser.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const accessToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        isPremium: existingUser.isPremium
      },
     '112sfjdlsasfff',
      {
        expiresIn: "7d", 
      }
    );
    return {accessToken};
  };
  
  const premiumUser = async (client_ip: string | undefined, user: JwtPayload) => {
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
  
    if (existingUser?.isPremium) {
      throw new Error("User is already a Premium member");
    }
  
    const shurjopayPayload = {
      amount: "1000",
      order_id: user.id, // used as reference in verify
      currency: "BDT",
      customer_name: "Premium User",
      customer_address: "Unknown",
      customer_email: user.email,
      customer_phone: "01640000000", // optional
      customer_city: "Dhaka",
      client_ip,
    };
  
    const payment = await makePaymentAsync(shurjopayPayload);
  
    if (!payment?.checkout_url) {
      throw new Error("Payment initiation failed");
    }
  
    return {
      success: true,
      checkoutUrl: payment.checkout_url,
    };
  };

  export const verifyPremiumPayment = async (user_id: string) => {
    const verified = await verifyPaymentAsync(user_id);
  console.log(verified);
    if (!verified.length) {
      throw new Error("Payment verification failed");
    }
  
    const info = verified[0];
  
    // Handle Success, Failed, or Cancelled
    if (info.bank_status === "Success") {
   const result = await prisma.$transaction(async(tx)=>{
    const subscription = await tx.subscription.create({
      data: {
        userId: info.customer_order_id,
        paymentStatus: true,
        paymentMethod: info.method || "ShurjoPay",
        subscriptedAt: new Date(info.date_time),
      },
    });

    await tx.user.update({
      where: { id: info.customer_order_id },
      data: {
        isPremium: true,
        subscription: {
          connect: { id: subscription.id },
        },
      },
    });
   })
      return {
        success: true,
        status: "Success",
        message: "User is now a Premium member",
      };
    } else if (info.bank_status === "Failed") {
      return {
        success: false,
        status: "Failed",
        message: "Payment failed. Please try again.",
      };
    } else if (info.bank_status === "Cancel") {
      return {
        success: false,
        status: "Cancelled",
        message: "Payment was cancelled.",
      };
    }
  
    return {
      success: false,
      status: info.bank_status,
      message: "Unknown payment status.",
    };
  };
  const getAllUser = async()=>{
    const result = await prisma.user.findMany({
      include:{
        subscription:true
      }
    })
    return result
  }
  const getSingleUser = async(userId:string)=>{
    const result = await prisma.user.findUniqueOrThrow({
   where:{
    id:userId
   },include:{
    subscription:true
   }
    })
    return result
  }
  const roleUpdate = async( userId:string)=>{
    const exitUser = await prisma.user.findFirstOrThrow({
      where:{
        id:userId
      }
    })

    const RoleUpate = exitUser.role=="USER"?"ADMIN":"USER"
    const result = await prisma.user.update({
   where:{
    id:userId
   },
   data:{
    role:RoleUpate
   }
    })
    return result
  }
  const deletedUser = async(userId:string)=>{
    const result = await prisma.user.delete({
   where:{
    id:userId
   }
    })
    return result
  }
  
  
  export const userService ={
    premiumUser,
      RegisterUser,
      loginUser,
      verifyPremiumPayment,
      getAllUser,
      getSingleUser,
     roleUpdate,
     deletedUser
  }