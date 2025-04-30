import express, { Request, Response } from 'express';
import router from './app/router';
const app = express()

app.use(express.json())
app.get('/', (req:Request, res:Response)=>{
    res.send({message:"assignment-09 start!"})
})

app.use('/api/v1', router)
export default app