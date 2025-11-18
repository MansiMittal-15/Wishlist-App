import { useEffect } from "react";
import { api } from "../utils/api";
import { useDispatch } from "react-redux";
import { setWishlists } from "../redux/wishlistSlice";

const getWishlists = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const res = await api.get("/wishlist/get/user", {
          headers: {
            Authorization: "Bearer " + token,
          }
        });
        if (res.data.success) {
          dispatch(setWishlists(res.data.wishLists));
        }
      } catch (error) {
      }
    };
    fetchWishlists();
  }, []);
};

export default getWishlists;
