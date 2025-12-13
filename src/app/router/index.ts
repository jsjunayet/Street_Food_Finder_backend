import { Router } from "express";
import { categoryRoutes } from "../modules/categories/category.route";
import { commentRoute } from "../modules/comment/comment.route";
import { couponRoutes } from "../modules/coupon/coupon.route";
import { postRoutes } from "../modules/post/post.route";
import { ratingRoute } from "../modules/rating/rating.route";
import { restaurantRoutes } from "../modules/restaurant/restaurant.routes";
import { userRoutes } from "../modules/user/user.route";
import { voteRoute } from "../modules/votes/votes.route";

const router = Router();
const AllRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/post",
    route: postRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/vote",
    route: voteRoute,
  },
  {
    path: "/rating",
    route: ratingRoute,
  },
  {
    path: "/comment",
    route: commentRoute,
  },
  {
    path: "/coupon",
    route: couponRoutes,
  },
  {
    path: "/restaurant",
    route: restaurantRoutes,
  },
];

AllRoutes.forEach((item) => router.use(item.path, item.route));
export default router;
