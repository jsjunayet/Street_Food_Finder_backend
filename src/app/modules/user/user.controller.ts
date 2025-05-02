import { Application, NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";


const getAllUser = catchAsync(async(req:Request, res:Response)=>{
    const result = await userService.getAllUser()
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'All user retreive successfully',
    data: result
   })
})
const getSingleUser = catchAsync(async(req:Request, res:Response)=>{
    const userId = req.params.id
    const result = await userService.getSingleUser(userId)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'single user retreive successfully',
    data: result
   })
})
const roleUpdate = catchAsync(async(req:Request, res:Response)=>{
    const userId = req.params.id
    const result = await userService.roleUpdate(userId)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'user updated successfully',
    data: result
   })
})
const deletedUser = catchAsync(async(req:Request, res:Response)=>{
    const userId = req.params.id
    const result = await userService.deletedUser(userId)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'user deleted successfully',
    data: result
   })
})
const RegisterUser = catchAsync(async(req:Request, res:Response)=>{
    const result = await userService.RegisterUser(req.body)
   sendResponse(res,{
    statusCode: 201,
    success: true,
    message: 'All user Created successfully',
    data: result
   })
})
const loginUser = catchAsync(async(req:Request, res:Response)=>{
    const result = await userService.loginUser(req.body)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'All user Created successfully',
    data: result
   })
})
const PremiumUser = catchAsync(async(req:Request, res:Response)=>{
    const user = req?.user as JwtPayload
    const result = await userService.premiumUser(req.ip, user)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'Premium user Created successfully',
    data: result
   })
})
const verifyPremiumPayment = catchAsync(async(req:Request, res:Response)=>{
    const userId = req?.query.order_id as string
    const result = await userService.verifyPremiumPayment(userId)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'payment Verify successfully',
    data: result
   })
})


export const userController ={
    getAllUser,
    RegisterUser,
    loginUser,
    PremiumUser,
    verifyPremiumPayment,
    getSingleUser,
    roleUpdate,
    deletedUser

}