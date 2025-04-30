import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";

const router = Router()
const AllRoutes = [
    {
        path:'/user',
        route:userRoutes
    }
]

AllRoutes.forEach((item)=>router.use(item.path, item.route))
export default router