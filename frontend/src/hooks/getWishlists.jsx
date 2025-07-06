import { useEffect } from "react";
import { api } from "../utils/api";
import { useDispatch } from "react-redux";
import { setWishlists } from "../redux/wishlistSlice";
import {toast} from 'react-hot-toast';

const getWishlists = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const res = await api.get("/wishlist/get/user");
        if (res.data.success) {
          dispatch(setWishlists(res.data.wishLists));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Network error");
      }
    };
    fetchWishlists();
  }, []);
};

export default getWishlists;
