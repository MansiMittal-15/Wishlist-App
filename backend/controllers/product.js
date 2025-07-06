import mongoose from "mongoose";
import { Wishlist } from "../models/wishlist.js";
import {v2 as cloudinary} from 'cloudinary';


export const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const userId = req.id;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Some data field is missing!",
      });
    }

    let imageUrl = "";
    if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
    }

    const wishlist = await Wishlist.findOne({ createdBy: userId });
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found!",
      });
    }

    const newProduct = {
      name,
      price,
      addedBy: userId,
      imageUrl,
      createdAt: new Date(),
    };

    wishlist.products.push(newProduct);
    await wishlist.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully!",
      newProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (req, res) => {
  try {
    const { name, price, wishlistId } = req.body;
    if (!name || !price || !wishlistId) {
      return res.status(400).json({
        success: false,
        message: "Some data field is missing!",
      });
    }
    let imageUrl = "";
    if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
    }
    const { id } = req.params;
    const wishlist = await Wishlist.findById(wishlistId);

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "no wishlist found!",
      });
    }

    const product = wishlist.products.id(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "no product found!",
      });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.imageUrl = imageUrl || product.imageUrl;

    await wishlist.save();
    return res.status(200).json({
      success: true,
      message: "product updated successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { wishlistId } = req.body;

    if (!wishlistId) {
      return res.status(400).json({
        success: false,
        message: "Wishlist is required!",
      });
    }
    const isValid = mongoose.Types.ObjectId.isValid(wishlistId);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Wishlist id is not valid!",
      });
    }

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found!",
      });
    }

    wishlist.products = wishlist.products.filter((prod) => {
      prod._id.to_string() !== id;
    });

    await wishlist.save();
    return res.status(200).json({
      success: true,
      message: "Product removed successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const { wishlistId } = req.body;
    if (!wishlistId) {
      return res.status(400).json({
        success: false,
        message: "Wishlist id is required!",
      });
    }

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found!",
      });
    }

    if (wishlist.products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found!",
      });
    }
    return res.status(200).json({
      success: true,
      products: wishlist.products,
    });
  } catch (error) {
    console.log(error);
  }
};
