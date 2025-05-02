import { Category, Post } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

const categoryCreateData = async (payload:Category) =>{
    const result = await prisma.category.create({
        data: payload,
      });
      return result
}
const categoryGetData = async () =>{
    const result = await prisma.category.findMany();
      return result
}
const categorySingleGetData = async (categoryId:string) =>{
    const result = await prisma.category.findUniqueOrThrow({
        where:{
            id:categoryId
        }
    })
      return result
}
const categoryUpdateGetData = async (payload:Partial<Category>, categoryId:string) =>{
    const result = await prisma.category.update({
        where:{
            id: categoryId
        },
        data: payload
      });
      return result
}
const categoryDeletedGetData = async (categoryId:string) =>{
    const result = await prisma.category.delete({
        where:{
            id:categoryId
        }
      });
      return result
}
export const categoryService = {
    categoryCreateData,
    categoryGetData,
    categorySingleGetData,
    categoryDeletedGetData,
    categoryUpdateGetData
}