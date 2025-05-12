import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { ratingController } from "./rating.controller";

const router = Router();
router.post(
  "/create",
  authorizeRole(["ADMIN", "USER"]),
  ratingController.ratingCreate
);
export const ratingRoute = router;
