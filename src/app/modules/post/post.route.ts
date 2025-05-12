import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { postController } from "./post.controller";

const router = Router();
router.post(
  "/create",
  authorizeRole(["ADMIN", "USER"]),
  postController.postCreateData
);
router.get(
  "/all-retreive-admin",
  authorizeRole(["ADMIN"]),
  postController.postGetData
);
router.get(
  "/all-retreive-user",
  authorizeRole(["ADMIN", "USER"]),
  postController.postGetUserData
);
router.get(
  "/admin/analytics",
  authorizeRole(["ADMIN"]),
  postController.analyticsData
);
router.get("/gest", postController.postGetUserGestUser);
router.get(
  "/single-retreive/:id",
  authorizeRole(["ADMIN", "USER"]),
  postController.postSingleGetData
);
router.patch(
  "/approve/:id",
  authorizeRole(["ADMIN"]),
  postController.postApprovedGetData
);
router.patch(
  "/premium/:id",
  authorizeRole(["ADMIN"]),
  postController.postPremiumGetData
);
router.delete(
  "/deleted/:id",
  authorizeRole(["ADMIN"]),
  postController.postDeletedGetData
);
export const postRoutes = router;
