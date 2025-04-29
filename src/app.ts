import express, { Request, Response } from 'express';
const app = express()
app.get('/', async(req:Request, res:Response)=>{
    res.send({message:"assignment-09 start!"})
})
export default app