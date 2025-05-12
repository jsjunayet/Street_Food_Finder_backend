import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { voteController } from "./votes.controller";

const router = Router();
router.post(
  "/create",
  authorizeRole(["ADMIN", "USER"]),
  voteController.voteCreate
);
export const voteRoute = router;
