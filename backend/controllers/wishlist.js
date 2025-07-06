import mongoose from "mongoose";
import { User } from "../models/user.js";
import { Wishlist } from "../models/wishlist.js";

export const getUserWishlists = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access!",
      });
    }

    const user = await User.findById(userId);
    const wishLists = await Wishlist.find({
      $or: [{ createdBy: userId }, { sharedWith: user.email }],
    });

    if (!wishLists || wishLists.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No wishlists found!",
      });
    }
    return res.status(200).json({
      success: true,
      wishLists,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "wishlist id is not valid!",
      });
    }

    const wishlist = await Wishlist.findById(id).populate("createdBy");
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found!",
      });
    }

    return res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createWishlist = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.id;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required!",
      });
    }

    const wishlist = await Wishlist.create({
      title,
      createdBy: userId,
      sharedWith: [],
      products: [],
    });

    return res.status(201).json({
      success: true,
      message: "Wishlist created successfully!",
      wishlist,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editWishlist = async (req, res) => {
  try {
    const {title} = req.body;
    const {id} = req.params;

    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Wishlist id is not valid!',
      });
    }

    const updatedWishlist = await Wishlist.findByIdAndUpdate(id, {title}, {new: true});
    if(!updatedWishlist) {
      res.status(404).json({
        success: false,
        message: 'no wishlist found!',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Wishlist updated successfully!',
      updatedWishlist
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeWishlist = async (req, res) => {
  try {
    const {id} = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Wishlist id is not valid!',
      });
    }

    await Wishlist.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: 'Wishlist deleted successfully!',
    });
  } catch (error) {
    console.log(error);
  }
};

export const inviteToWishlist = async (req, res) => {
  try {
    const {email} = req.body;
    const {id} = req.params;
    if(!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required!',
      });
    }

    const user = await User.find({email});
    if(!user) {
      return res.status(404).json({
        success: false,
        message: 'no user exits with providedd email id!',
      });
    }

    const wishlist = await Wishlist.findById(id);
    if(!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'No wishlist found!',
      });
    }

    if(!wishlist.sharedWith.includes(email)) {
      wishlist.sharedWith.push(email);
    }

    await wishlist.save();
    return res.status(200).json({
      success: true,
      message: 'User invited successfully!',
    });
  } catch (error) {
    console.log(error);
  }
};
