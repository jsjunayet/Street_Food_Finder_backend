import { Request, Response } from "express"
import { catchAsync } from "../../share/catchAsync"
import { sendResponse } from "../../share/sendResponse"
import { JwtPayload } from "jsonwebtoken"
import { postService } from "./post.service"

const postCreateData = catchAsync(async(req:Request, res:Response)=>{
    const userId = req.user as JwtPayload
    const result = await postService.postCreateData(req.body, userId.id)
   sendResponse(res,{
    statusCode: 201,
    success: true,
    message: 'Post Created successfully',
    data: result
   })
})
const postGetData = catchAsync(async(req:Request, res:Response)=>{
    const result = await postService.postGetData()
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'All post retrieve successfully',
    data: result
   })
})
const postSingleGetData = catchAsync(async(req:Request, res:Response)=>{
    const postId = req.params.id
    const result = await postService.postSingleGetData(postId)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'Single post retrieve successfully',
    data: result
   })
})
const postPremiumGetData = catchAsync(async(req:Request, res:Response)=>{
    const postId = req.params.id
    const result = await postService.postPremiumGetData(postId)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'post Premium successfully',
    data: result
   })
})
const postApprovedGetData = catchAsync(async(req:Request, res:Response)=>{
    const postId = req.params.id
    const result = await postService.postApprovedGetData(postId)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'post Approved successfully',
    data: result
   })
})
const postDeletedGetData = catchAsync(async(req:Request, res:Response)=>{
    const postId = req.params.id
    const result = await postService.postDeletedGetData(postId)
   sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'post deleted successfully',
    data: result
   })
})
export const postController={
    postCreateData,
    postGetData,
    postSingleGetData,
    postDeletedGetData,
    postPremiumGetData,
    postApprovedGetData
}