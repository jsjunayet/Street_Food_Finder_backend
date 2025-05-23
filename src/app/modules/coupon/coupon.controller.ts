import { Request, Response } from "express";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { couponService } from "./coupon.service";

const couponCreateData = catchAsync(async (req: Request, res: Response) => {
  const result = await couponService.couponCreateData(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "coupon Created successfully",
    data: result,
  });
});
const couponGetData = catchAsync(async (req: Request, res: Response) => {
  const result = await couponService.couponGetData();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All coupon retrieve successfully",
    data: result,
  });
});
const couponUpdateGetData = catchAsync(async (req: Request, res: Response) => {
  const couponId = req.params.id;
  const result = await couponService.couponUpdateGetData(couponId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "coupon Update successfully",
    data: result,
  });
});
const couponDeletedGetData = catchAsync(async (req: Request, res: Response) => {
  const couponId = req.params.id;
  const result = await couponService.couponDeletedGetData(couponId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "coupon deleted successfully",
    data: result,
  });
});
export const couponController = {
  couponCreateData,
  couponGetData,
  couponDeletedGetData,
  couponUpdateGetData,
};
