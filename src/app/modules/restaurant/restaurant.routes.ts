import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { restaurantController } from "./restaurant.controller";

const router = Router();

// Restaurant routes
router.post(
  "/create",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.createRestaurant
);
router.get("/all", restaurantController.getAllRestaurants);
router.get(
  "/single",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.getRestaurantById
);
router.get("/single/:id", restaurantController.getRestaurantByIdParams);

router.patch(
  "/update/:id",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.updateRestaurant
);
router.delete(
  "/delete/:id",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.deleteRestaurant
);

// MenuItem routes
router.post(
  "/menu/:restaurantId/create",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.createMenuItem
);
router.patch(
  "/menu/:id/update",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.updateMenuItem
);
router.delete(
  "/menu/:id/delete",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.deleteMenuItem
);

export const restaurantRoutes = router;
