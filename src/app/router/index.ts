import { Router } from "express";
import { categoryRoutes } from "../modules/categories/category.route";
import { commentRoute } from "../modules/comment/comment.route";
import { postRoutes } from "../modules/post/post.route";
import { ratingRoute } from "../modules/rating/rating.route";
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
];

AllRoutes.forEach((item) => router.use(item.path, item.route));
export default router;
