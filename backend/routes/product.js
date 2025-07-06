import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  addProduct,
  editProduct,
  getProducts,
  removeProduct,
} from "../controllers/product.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, upload.single('image'), addProduct);
router.route("/update/:id").put(isAuthenticated, upload.single('image'), editProduct);
router.route("/remove/:id").delete(isAuthenticated, removeProduct);
router.route("/get").get(isAuthenticated, getProducts);

export default router;
