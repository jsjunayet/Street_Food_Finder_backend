import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { commentService } from "./comment.service";
const commentCreate = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user as JwtPayload;
  const result = await commentService.commentCreate(req.body, userId.id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "comment Created successfully",
    data: result,
  });
});

export const commentController = {
  commentCreate,
};
