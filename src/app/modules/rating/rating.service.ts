// services/rating.service.ts

import { Ratings } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

const ratingCreate = async (payload: Ratings, userId: string) => {
  const { postId, rating } = payload;
  const existingRating = await prisma.ratings.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existingRating) {
    await prisma.ratings.update({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      data: {
        rating,
      },
    });
    return { message: "Rating updated" };
  }

  await prisma.ratings.create({
    data: {
      userId,
      postId,
      rating,
    },
  });
  return { message: "Rating added" };
};

export const ratingService = {
  ratingCreate,
};
