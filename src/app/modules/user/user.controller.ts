import { Application, NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const catchAsync=(fn:any)=>{
    return async(req:Request, res:Response, next:NextFunction)=>{
        try{
            fn(req,res,next)
        }catch(err){
            next(err)
        }
    }
}

const sendResponse = <T>(res: Response, json: {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
  }): void => {
    res.status(json.statusCode).json({
      success: json.success,
      message: json.message,
      data: json.data,
    });
 };

const getUser = catchAsync(async(req:Request, res:Response)=>{
    const result = await userService.getUser()
   sendResponse(res,{
    statusCode: 201,
    success: true,
    message: 'All user retreive successfully',
    data: result
   })
})
const loginUser = catchAsync(async(req:Request, res:Response)=>{
    const result = await userService.loginUser(req.body)
   sendResponse(res,{
    statusCode: 201,
    success: true,
    message: 'All user Created successfully',
    data: result
   })
})
export const userController ={
    getUser,
    loginUser
}