import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();
router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview) // add
  .put(ReviewsCtrl.apiUpdateReview) // update
  .delete(ReviewsCtrl.apiDeleteReview); // delete

export default router;
