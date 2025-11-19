import express from "express";
import {
  createWishlist,
  editWishlist,
  getSingleWishlist,
  getUserWishlists,
  inviteToWishlist,
  removeFromWishlist,
  removeWishlist,
} from "../controllers/wishlist.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/get/user").get(isAuthenticated, getUserWishlists);
router.route("/get/:id").get(isAuthenticated, getSingleWishlist);
router.route("/create").post(isAuthenticated, createWishlist);
router.route("/update/:id").put(isAuthenticated, editWishlist);
router.route("/remove/:id").delete(isAuthenticated, removeWishlist);
router.route("/invite/:id").post(isAuthenticated, inviteToWishlist);
router.route("/removeInvite/:id").post(isAuthenticated, removeFromWishlist);

export default router;
