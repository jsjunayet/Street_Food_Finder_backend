import { User } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt';
const prisma = new PrismaClient()
const loginUser = async (payload:User) => {
    console.log(payload);
    const passwordHash = await bcrypt.hash(payload.password, 10);
    const result = await prisma.user.create({
      data: {
        email: payload.email,
        password: passwordHash,
        role: payload.role,
      },
    });
  
    return result;
  };
const getUser = async()=>{
    return {message:"hello world"}
  }
  export const userService ={
      getUser,
      loginUser
  }