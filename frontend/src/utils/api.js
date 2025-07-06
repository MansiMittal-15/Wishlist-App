import axios from "axios";
import { toast } from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

export const login = async (userData) => {
  try {
    const res = await api.post("/user/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Network error");
  }
};

export const register = async (userData) => {
  try {
    const res = await api.post("/user/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message || "Network error");
  }
};

export const logout = async () => {
  try {
    const res = await api.get('/user/logout');
    return res;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message || "Network error");
  }
}

export const createWishlist = async (title) => {
  try {
    const res = await api.post('/wishlist/create', {title}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message || "Network error");
  }
}
