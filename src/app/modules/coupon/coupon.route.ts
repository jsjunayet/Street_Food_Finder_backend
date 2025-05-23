import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { couponController } from "./coupon.controller";

const router = Router();
router.post(
  "/create",
  authorizeRole(["ADMIN", "USER"]),
  couponController.couponCreateData
);
router.get(
  "/all-retreive",
  authorizeRole(["ADMIN", "USER"]),
  couponController.couponGetData
);
router.patch(
  "/update/:id",
  authorizeRole(["ADMIN", "USER"]),
  couponController.couponUpdateGetData
);
router.delete(
  "/deleted/:id",
  authorizeRole(["ADMIN", "USER"]),
  couponController.couponDeletedGetData
);
export const couponRoutes = router;
