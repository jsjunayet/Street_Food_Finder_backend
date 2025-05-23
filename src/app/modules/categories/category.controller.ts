import { Request, Response } from "express";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { categoryService } from "./category.service";

const categoryCreateData = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.categoryCreateData(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "category Created successfully",
    data: result,
  });
});
const categoryGetData = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.categoryGetData();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All category retrieve successfully",
    data: result,
  });
});
const categorySingleGetData = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const result = await categoryService.categorySingleGetData(categoryId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single category retrieve successfully",
      data: result,
    });
  }
);
const categoryUpdateGetData = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const result = await categoryService.categoryUpdateGetData(
      req.body.data,
      categoryId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "category Update successfully",
      data: result,
    });
  }
);
const categoryDeletedGetData = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const result = await categoryService.categoryDeletedGetData(categoryId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "category deleted successfully",
      data: result,
    });
  }
);
export const categoryController = {
  categoryCreateData,
  categoryGetData,
  categorySingleGetData,
  categoryDeletedGetData,
  categoryUpdateGetData,
};
