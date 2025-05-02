import { Router } from "express"
import { authorizeRole } from "../../middleware/authorizeRole"
import { postController } from "./post.controller"


const router = Router()
router.post('/create', authorizeRole(['ADMIN','USER']), postController.postCreateData)
router.get('/all-retreive', authorizeRole(['ADMIN','USER']), postController.postGetData)
router.get('/single-retreive/:id', authorizeRole(['ADMIN','USER']), postController.postSingleGetData)
router.patch('/approve/:id', authorizeRole(['ADMIN','USER']), postController.postApprovedGetData)
router.patch('/premium/:id', authorizeRole(['ADMIN','USER']), postController.postPremiumGetData)
router.delete('/deleted/:id', authorizeRole(['ADMIN','USER']), postController.postDeletedGetData)
export const postRoutes = router
