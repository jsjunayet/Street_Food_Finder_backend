import { Router } from "express";
import { userController } from "./user.controller";
import { authorizeRole } from "../../middleware/authorizeRole";

const router = Router()
router.post('/register', userController.RegisterUser)
router.post('/login', userController.loginUser)
router.post('/premium', authorizeRole(['ADMIN','USER']), userController.PremiumUser)
router.get('/verify', authorizeRole(['ADMIN','USER']), userController.verifyPremiumPayment)
router.get('/all-retreive',authorizeRole(['ADMIN']), userController.getAllUser)
router.get('/single-retreive/:id',authorizeRole(['ADMIN']), userController.getSingleUser)
router.patch('/role/:id',authorizeRole(['ADMIN']), userController.roleUpdate)
router.delete('/deleted/:id',authorizeRole(['ADMIN']), userController.deletedUser)


export const userRoutes = router

