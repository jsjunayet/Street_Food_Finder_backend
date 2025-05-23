import { PrismaClient, User } from "@prisma/client";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";

import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userInfo } from "../../interface/ts/userInfo";
import { makePaymentAsync, verifyPaymentAsync } from "./premiumUser";
const prisma = new PrismaClient();
const RegisterUser = async (payload: User) => {
  const passwordHash = await bcrypt.hash(payload.password, 10);
  const result = await prisma.user.create({
    data: {
      email: payload.email,
      image: payload.image,
      name: payload.name,
      password: passwordHash,
      role: payload.role,
    },
  });
  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};
const loginUser = async (payload: Partial<User>) => {
  const { email, password } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    password as string,
    existingUser.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      image: existingUser.image,
      name: existingUser.name,
      isPremium: existingUser.isPremium,
    },
    (process.env.ACCESS_TOKEN_SECRET as string) || "access-secret",
    {
      expiresIn: "7d", // shorter expiry for access token
    }
  );

  const refreshToken = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      image: existingUser.image,
      name: existingUser.name,
      isPremium: existingUser.isPremium,
    },
    (process.env.REFRESH_TOKEN_SECRET as string) || "refresh-secret",
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const premiumUser = async (
  client_ip: string | undefined,
  user: JwtPayload,
  payload: userInfo
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { subscription: true },
  });

  if (existingUser?.isPremium) {
    throw new Error("User is already a Premium member");
  }

  // Step 1: Create or update subscription (if already exists)
  const subscription = await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {
      paymentStatus: false,
      paymentMethod: "ShurjoPay",
      subscriptedAt: new Date(),
      updatedAt: new Date(),
    },
    create: {
      userId: user.id,
      paymentStatus: false,
      paymentMethod: "ShurjoPay",
      subscriptedAt: new Date(),
    },
  });

  // Step 2: Prepare payment payload
  const shurjopayPayload = {
    amount: payload.amount,
    order_id: user.id,
    currency: "BDT",
    customer_name: payload.name,
    customer_address: payload.address,
    customer_email: payload.email,
    customer_phone: payload.phone,
    customer_city: payload.city,
    client_ip,
  };

  // Step 3: Make payment
  const payment = await makePaymentAsync(shurjopayPayload);

  if (!payment?.checkout_url) {
    throw new Error("Payment initiation failed");
  }

  return {
    success: true,
    checkoutUrl: payment.checkout_url,
  };
};

export const verifyPremiumPayment = async (user_id: string, userId: string) => {
  console.log(user_id, userId, "this is perfect");
  const verified = await verifyPaymentAsync(user_id);
  console.log(verified);
  if (!verified.length) {
    throw new Error("Payment verification failed");
  }

  const info = verified[0];

  // Handle Success, Failed, or Cancelled
  if (info.bank_status === "Success") {
    const result = await prisma.$transaction(async (tx) => {
      const subscription = await tx.subscription.update({
        where: {
          userId: userId,
        },
        data: {
          userId: userId,
          paymentStatus: true,
          paymentMethod: info.method || "ShurjoPay",
          subscriptedAt: new Date(info.date_time),
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          isPremium: true,
          subscription: {
            connect: { id: subscription.id },
          },
        },
      });
    });
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
const getAllUser = async () => {
  const result = await prisma.user.findMany({
    include: {
      subscription: true,
    },
  });
  return result;
};
const getSingleUser = async (userId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    include: {
      subscription: true,
    },
  });
  return result;
};
const getSingleUserToken = async (userId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    include: {
      subscription: true,
      posts: true,
      comments: true,
    },
  });
  return result;
};
const roleUpdate = async (userId: string, payload: Partial<User>) => {
  console.log(payload.role);
  const exitUser = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: payload.role,
    },
  });
  return result;
};
const deletedUser = async (userId: string) => {
  const result = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return result;
};
const subscription = async (userId: string) => {
  const result = await prisma.subscription.findUniqueOrThrow({
    where: {
      userId: userId,
    },
    include: {
      user: true,
    },
  });
  return result;
};
const refreshAccessToken = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    (process.env.REFRESH_TOKEN_SECRET as string) || "refresh-secret"
  ) as JwtPayload;

  const existingUser = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const newAccessToken = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      image: existingUser.image,
      name: existingUser.name,
      isPremium: existingUser.isPremium,
    },
    (process.env.ACCESS_TOKEN_SECRET as string) || "access-secret",
    {
      expiresIn: "15m",
    }
  );

  return { accessToken: newAccessToken };
};
const dashboardMetaData = async () => {
  const now = new Date();
  const monthlyStats = [];

  for (let i = 5; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(now, i));
    const monthEnd = endOfMonth(subMonths(now, i));
    const label = format(monthStart, "MMM");

    const [postsCount, usersCount] = await Promise.all([
      prisma.post.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
    ]);

    monthlyStats.push({ name: label, posts: postsCount, users: usersCount });
  }

  const [totalUsers, totalComments, totalPosts, premiumPosts] =
    await Promise.all([
      prisma.user.count(),
      prisma.comments.count(),
      prisma.post.count(),
      prisma.post.count({ where: { isPremium: true } }),
    ]);

  return {
    monthlyStats,
    summary: {
      users: totalUsers,
      comments: totalComments,
      posts: totalPosts,
      premiumPosts: premiumPosts,
    },
  };
};

export const userService = {
  premiumUser,
  RegisterUser,
  loginUser,
  verifyPremiumPayment,
  getAllUser,
  getSingleUser,
  roleUpdate,
  deletedUser,
  refreshAccessToken,
  subscription,
  getSingleUserToken,
  dashboardMetaData,
};
