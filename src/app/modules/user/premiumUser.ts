
import shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import dotenv from 'dotenv';
dotenv.config()
const Shurjopay = new shurjopay()
Shurjopay.config(
    process.env.SP_ENDPOINT!,
    process.env.SP_USERNAME!,
    process.env.SP_PASSWORD!,
    process.env.SP_PREFIX!,
    process.env.SP_RETURN_URL!,
)

export const makePaymentAsync = (payload:any):Promise<PaymentResponse>=>{
    return new Promise((resolve, reject)=>{
        Shurjopay.makePayment(
            payload,
            (response)=>resolve(response),
            (error)=>reject(error)
        )
    })
}
export const verifyPaymentAsync = (user_id:any):Promise<VerificationResponse []>=>{
    return new Promise((resolve, reject)=>{
        Shurjopay.verifyPayment(
              user_id,
            (response)=>resolve(response),
            (error)=>reject(error)
        )
    })
}