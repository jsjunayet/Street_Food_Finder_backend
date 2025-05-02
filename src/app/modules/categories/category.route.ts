import { Router } from "express"
import { authorizeRole } from "../../middleware/authorizeRole"
import { categoryController } from "./category.controller"



const router = Router()
router.post('/create', authorizeRole(['ADMIN','USER']), categoryController.categoryCreateData)
router.get('/all-retreive', authorizeRole(['ADMIN','USER']), categoryController.categoryGetData)
router.get('/single-retreive/:id', authorizeRole(['ADMIN','USER']), categoryController.categorySingleGetData)
router.patch('/update/:id', authorizeRole(['ADMIN','USER']), categoryController.categoryUpdateGetData)
router.delete('/deleted/:id', authorizeRole(['ADMIN','USER']), categoryController.categoryDeletedGetData)
export const categoryRoutes = router