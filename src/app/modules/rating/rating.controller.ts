import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { ratingService } from "./rating.service";

const ratingCreate = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user as JwtPayload;
  const result = await ratingService.ratingCreate(req.body, userId.id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "rating Created successfully",
    data: result,
  });
});

export const ratingController = {
  ratingCreate,
};
