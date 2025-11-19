import axios from "axios";
import { toast } from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

const token = localStorage.getItem("token");

export const login = async (userData) => {
  try {
    const res = await api.post("/user/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
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
    toast.error(error.response.data.message || "Network error");
  }
};

export const createWishlist = async (title) => {
  try {
    const res = await api.post('/wishlist/create', {title}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    toast.error(error.response.data.message || "Network error");
  }
}

export const updateWishlist = async (id, title) => {
  try {
    const res = await api.put(`/wishlist/update/${id}`, {title}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    toast.error(error.response.data.message || "Network error");
  }
}

export const getProducts = async (wishlistId) => {
  try {
    const res = await api.post('/product/get', {wishlistId}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Network error");
  }
}

export const addProduct = async (productData) => {
  try {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('wishlistId', productData.wishlistId);
    if (productData.image) {
      formData.append('image', productData.image);
    }

    const res = await api.post('/product/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Network error");
  }
}

export const editProduct = async (productId, productData) => {
  try {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('wishlistId', productData.wishlistId);
    if (productData.image) {
      formData.append('image', productData.image);
    }

    const res = await api.put(`/product/update/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Network error");
  }
}

export const removeProduct = async (productId, wishlistId) => {
  try {
    const res = await api.delete(`/product/remove/${productId}`, {
      data: { wishlistId },
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Network error");
  }
}

export const inviteToWishlist = async (wishlistId, email) => {
  try {
    const res = await api.post(`/wishlist/invite/${wishlistId}`, { email }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Network error");
  }
};

export const removeFromWishlist = async (wishlistId, email) => {
  try {
    const res = await api.post(`/wishlist/removeInvite/${wishlistId}`, { email }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Network error");
  }
}
