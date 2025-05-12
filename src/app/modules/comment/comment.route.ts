import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { commentController } from "./comment.controller";

const router = Router();
router.post(
  "/create",
  authorizeRole(["ADMIN", "USER"]),
  commentController.commentCreate
);
router.get(
  "/getall",
  authorizeRole(["ADMIN", "USER"]),
  commentController.commentGet
);
router.patch("/:id", authorizeRole(["ADMIN"]), commentController.commentUpdate);
router.delete(
  "/:id",
  authorizeRole(["ADMIN"]),
  commentController.commentdeleted
);
export const commentRoute = router;
