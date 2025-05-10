import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { userController } from "./user.controller";

const router = Router();
router.post("/register", userController.RegisterUser);
router.post("/login", userController.loginUser);
router.get(
  "/subscription",
  authorizeRole(["ADMIN", "USER"]),
  userController.subscription
);

router.post(
  "/refreshToken",
  authorizeRole(["ADMIN", "USER"]),
  userController.refreshAccessToken
);
router.post(
  "/premium",
  authorizeRole(["ADMIN", "USER"]),
  userController.PremiumUser
);
router.get(
  "/verify",
  authorizeRole(["ADMIN", "USER"]),
  userController.verifyPremiumPayment
);
router.get(
  "/all-retreive",
  authorizeRole(["ADMIN"]),
  userController.getAllUser
);
router.get(
  "/single-retreive/:id",
  authorizeRole(["ADMIN"]),
  userController.getSingleUser
);
router.get(
  "/single-retreive",
  authorizeRole(["ADMIN", "USER"]),
  userController.getSingleUserToken
);
router.patch("/role/:id", authorizeRole(["ADMIN"]), userController.roleUpdate);
router.delete(
  "/deleted/:id",
  authorizeRole(["ADMIN"]),
  userController.deletedUser
);

export const userRoutes = router;
