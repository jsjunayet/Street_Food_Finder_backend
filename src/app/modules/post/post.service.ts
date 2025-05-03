import { Post } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

const postCreateData = async (payload: Post, userId: string) => {
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

  return result;
};
const postGetData = async () => {
  const result = await prisma.post.findMany();
  return result;
};
const postGetUserData = async (user: any) => {
  const exitUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    include: {
      subscription: true,
    },
  });
  let Posts;
  if (exitUser.isPremium && exitUser.subscription?.paymentStatus) {
    Posts = await prisma.post.findMany({
      where: {
        approved: true,
      },
      include: {
        votes: true,
        comments: true,
        ratings: true,
      },
    });
  } else {
    Posts = await prisma.post.findMany({
      where: {
        approved: true,
        isPremium: false,
      },
      include: {
        votes: true,
        comments: true,
        ratings: true,
      },
    });
  }

  const result = Posts.map((post) => {
    const upVotes = post.votes.filter((v) => v.vote === "UP").length;
    const downVotes = post.votes.filter((v) => v.vote === "DOWN").length;

    return {
      ...post,
      upVotes,
      downVotes,
    };
  });

  return result;
};
const postSingleGetData = async (postId: string) => {
  const result = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });
  return result;
};
const postPremiumGetData = async (postId: string) => {
  const exitPost = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });
  const isPremium = exitPost.isPremium == false ? true : false;
  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      isPremium: isPremium,
    },
  });
  return result;
};
const postApprovedGetData = async (postId: string) => {
  const exitPost = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });
  const isApproved = exitPost.approved == false ? true : false;
  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      approved: isApproved,
    },
  });
  return result;
};
const postDeletedGetData = async (postId: string) => {
  const result = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return result;
};
export const postService = {
  postCreateData,
  postGetData,
  postSingleGetData,
  postDeletedGetData,
  postApprovedGetData,
  postPremiumGetData,
  postGetUserData,
};
