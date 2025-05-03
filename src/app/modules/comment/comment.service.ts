// services/comment.service.ts

import { prisma } from "../../share/prismaClient";

const commentCreate = async (payload, userId) => {
  const { postId, commentText } = payload;
  const result = await prisma.comments.create({
    data: {
      userId,
      postId,
      commentText,
    },
  });
  return result;
};

export const commentService = {
  commentCreate,
};
