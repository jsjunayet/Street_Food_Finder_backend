import { Post } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

const postCreateData = async (payload:Post, userId:string) =>{
    const { title, description, price, location, image, categoryId } = payload;
    const result = await prisma.post.create({
        data: {
          title,
          description,
          price,
          location,
          image,
          category: { connect: { id: categoryId } },
          user: { connect: { id: userId } },
        },
      });
      
      return result

}
const postGetData = async () =>{
  const result = await prisma.post.findMany();
    return result
}
const postSingleGetData = async (postId:string) =>{
  const result = await prisma.post.findUniqueOrThrow({
      where:{
          id:postId
      }
  })
    return result
}
const postPremiumGetData = async (postId:string) =>{
  const result = await prisma.post.update({
      where:{
          id: postId
      },
      data: {
        isPremium:true
      }
    });
    return result
}
const postApprovedGetData = async (postId:string) =>{
  const result = await prisma.post.update({
      where:{
          id: postId
      },
      data: {
        approved:true
      }
    });
    return result
}
const postDeletedGetData = async (postId:string) =>{
  const result = await prisma.post.delete({
      where:{
          id:postId
      }
    });
    return result
}
export const postService = {
  postCreateData,
  postGetData,
  postSingleGetData,
  postDeletedGetData,
  postApprovedGetData,
  postPremiumGetData
}