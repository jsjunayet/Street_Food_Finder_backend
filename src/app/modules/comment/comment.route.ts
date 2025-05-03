import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { commentController } from "./comment.controller";

const router = Router();
router.post(
  "/create",
  authorizeRole(["ADMIN", "USER"]),
  commentController.commentCreate
);
export const commentRoute = router;
