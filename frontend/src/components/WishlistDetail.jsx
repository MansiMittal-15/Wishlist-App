import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  addProduct,
  api,
  editProduct,
  removeProduct,
  inviteToWishlist,
  removeFromWishlist,
} from "../utils/api";
import { setSingleWishlist } from "../redux/wishlistSlice";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUserPlus,
  FaTimes,
  FaDumpster,
} from "react-icons/fa";

const AddProductModal = ({ onClose, onSubmit, product, setProduct }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in transform transition-all"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 transition-colors"
      >
        ×
      </button>
      <h3 className="text-xl font-bold text-purple-700 mb-6 text-center">
        Add Product
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product name"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
          min="0"
          step="0.01"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setProduct({ ...product, image: file });
            }
          }}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold mt-2"
        >
          Add Product
        </button>
      </form>
    </div>
  </div>
);

const EditProductModal = ({ onClose, onSubmit, product, setProduct }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in transform transition-all"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 transition-colors"
      >
        ×
      </button>
      <h3 className="text-xl font-bold text-purple-700 mb-6 text-center">
        Edit Product
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product name"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
          min="0"
          step="0.01"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setProduct({ ...product, image: file });
            }
          }}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-2"
        >
          Update Product
        </button>
      </form>
    </div>
  </div>
);

const InvitePersonModal = ({
  onClose,
  onSubmit,
  inviteEmail,
  setInviteEmail,
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in transform transition-all"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 transition-colors"
      >
        ×
      </button>
      <h3 className="text-xl font-bold text-purple-700 mb-6 text-center">
        Invite Person
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter email address"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold mt-2"
        >
          Send Invitation
        </button>
      </form>
    </div>
  </div>
);

const WishlistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showInvitePerson, setShowInvitePerson] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [product, setProduct] = useState({ name: "", price: "", image: null });
  const [inviteEmail, setInviteEmail] = useState("");
  const [toast, setToast] = useState(null);
  const token = localStorage.getItem("token");
  const [showRemove, setShowRemove] = useState(false);

  const wishlist = useSelector((state) => state.wishlist.singleWishlist);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get(`/wishlist/get/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.data.success) {
          dispatch(setSingleWishlist(response.data.wishlist));
        }
      } catch (error) {
        setToast({ success: false, message: "Failed to fetch wishlist" });
      }
    };

    if (id) {
      fetchWishlist();
    }
  }, [id, dispatch]);

  if (!wishlist) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center text-gray-400">
        Loading wishlist...
        <button
          className="underline text-purple-700 ml-2"
          onClick={() => navigate("/wishlist")}
        >
          Back to all wishlists
        </button>
      </div>
    );
  }

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price) return;

    try {
      const productData = {
        ...product,
        wishlistId: wishlist._id,
      };
      const res = await addProduct(productData);
      if (res?.data?.success) {
        // Update the wishlist with the new product
        const updatedWishlist = {
          ...wishlist,
          products: [...wishlist.products, res.data.newProduct],
        };
        dispatch(setSingleWishlist(updatedWishlist));
        setProduct({ name: "", price: "", image: null });
        setShowAddProduct(false);
        setToast({ success: true, message: "Product added successfully!" });
      }
    } catch (error) {
      setToast({ success: false, message: "Failed to add product" });
    }
  };

  // Edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct || !product.name || !product.price) return;

    try {
      const productData = {
        name: product.name,
        price: product.price,
        wishlistId: wishlist._id,
        image: product.image,
      };
      const res = await editProduct(editingProduct._id, productData);

      if (res?.data?.success) {
        // Update the product in the wishlist using the returned updated product data
        const updatedProducts = wishlist.products.map((p) =>
          p._id === editingProduct._id ? res.data.updatedProduct : p
        );
        const updatedWishlist = { ...wishlist, products: updatedProducts };
        dispatch(setSingleWishlist(updatedWishlist));
        setProduct({ name: "", price: "", image: null });
        setEditingProduct(null);
        setShowEditProduct(false);
        setToast({ success: true, message: "Product updated successfully!" });
      }
    } catch (error) {
      setToast({ success: false, message: "Failed to update product" });
    }
  };

  // Remove product
  const handleRemoveProduct = async (productId) => {
    try {
      const res = await removeProduct(productId, wishlist._id);
      if (res?.data?.success) {
        const updatedProducts = wishlist.products.filter(
          (p) => p._id !== productId
        );
        const updatedWishlist = { ...wishlist, products: updatedProducts };
        dispatch(setSingleWishlist(updatedWishlist));
        setToast({ success: true, message: "Product removed successfully!" });
      } else {
        setToast({
          success: false,
          message: res?.data?.message || "Failed to remove product",
        });
      }
    } catch (error) {
      setToast({
        success: false,
        message: error.response?.data?.message || "Failed to remove product",
      });
    }
  };

  // Invite person
  const handleInvitePerson = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    try {
      const res = await inviteToWishlist(wishlist._id, inviteEmail);
      if (res?.data?.success) {
        // Update the wishlist with the new invite
        const updatedWishlist = {
          ...wishlist,
          sharedWith: res.data.sharedWith,
        };
        dispatch(setSingleWishlist(updatedWishlist));
        setInviteEmail("");
        setShowInvitePerson(false);
        setToast({ success: true, message: "Invitation sent successfully!" });
      }
    } catch (error) {
      setToast({
        success: false,
        message: error.response?.data?.message || "Failed to send invitation",
      });
    }
  };

  const handleRemoveFromInvite = async (email)=>{
    try {
      const res = await removeFromWishlist(wishlist._id, email);
      if (res?.data?.success) {
        // Update the wishlist with the new invite
        const updatedWishlist = {
          ...wishlist,
          sharedWith: res.data.sharedWith,
        };
        dispatch(setSingleWishlist(updatedWishlist));
        setInviteEmail("");
        setShowInvitePerson(false);
        setToast({ success: true, message: "Invitation sent successfully!" });
      }
    } catch (error) {
      setToast({
        success: false,
        message: error.response?.data?.message || "Failed to send invitation",
      });
    }
  }

  // Handle edit click
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setProduct({ name: product.name, price: product.price, image: null });
    setShowEditProduct(true);
  };

  // Handle cancel add product
  const handleCancelAddProduct = () => {
    setShowAddProduct(false);
    setProduct({ name: "", price: "", image: null });
  };

  // Handle cancel edit product
  const handleCancelEditProduct = () => {
    setShowEditProduct(false);
    setEditingProduct(null);
    setProduct({ name: "", price: "", image: null });
  };

  // Handle cancel invite person
  const handleCancelInvitePerson = () => {
    setShowInvitePerson(false);
    setInviteEmail("");
  };

  // Helper function to get initials from email
  const getInitials = (email) => {
    if (!email) return "?";
    const [name] = email.split("@");
    return name
      .split(".")
      .map((n) => n[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2);
  };

  // Toast component
  const Toast = ({ toastData, onClose, duration = 2500 }) => {
    React.useEffect(() => {
      if (!toastData) return;
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }, [toastData, onClose, duration]);

    if (!toastData) return null;

    return (
      <div
        className={`fixed top-8 right-8 z-50 min-w-[280px] max-w-xs px-6 py-4 rounded-2xl shadow-2xl flex items-start gap-4 animate-fade-in backdrop-blur-md bg-white/80 border-l-4 ${
          toastData.success ? "border-green-400" : "border-red-400"
        }`}
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)" }}
      >
        <div className="mt-1">
          {toastData.success ? (
            <svg
              className="w-7 h-7 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <div
            className={`font-semibold mb-1 ${
              toastData.success ? "text-green-700" : "text-red-700"
            }`}
          >
            {toastData.success ? "Success" : "Error"}
          </div>
          <div className="text-gray-700 text-sm mb-2 break-words">
            {toastData.message}
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-xl font-bold text-gray-400 hover:text-gray-700 transition leading-none"
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate("/wishlist")}
        className="mb-6 text-purple-700 hover:underline flex items-center transition-colors"
      >
        ← Back to all wishlists
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-purple-700">
            {wishlist.title}
          </h2>
          <button
            onClick={() => setShowInvitePerson(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-semibold"
          >
            <FaUserPlus className="text-sm" />
            Invite People
          </button>
        </div>

        {/* Shared People Section */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Shared with:
          </h4>
          <div className="flex flex-wrap gap-3">
            {wishlist.sharedWith && wishlist.sharedWith.length > 0 ? (
              wishlist.sharedWith.map((email, index) => (
                <div
                  key={index}
                  onMouseEnter={() => {
                    setShowRemove(true);
                  }}
                  onMouseLeave={() => {
                    setShowRemove(false);
                  }}
                  className="flex items-center gap-2 relative px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  <div className="w-6 h-6 bg-purple-400 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {getInitials(email)}
                  </div>
                  <span>{email}</span>
                  {showRemove && (
                    <div onClick={()=>{
                      handleRemoveFromInvite(email)
                    }} className="bg-purple-300 cursor-pointer w-7 h-7 flex justify-center items-center rounded-full absolute right-2 ">
                      <FaTrash />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No one has been invited yet.
              </p>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-700">Products</h4>
            <button
              onClick={() => setShowAddProduct(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-semibold"
            >
              <FaPlus className="text-sm" />
              Add Product
            </button>
          </div>

          <div className="space-y-4">
            {wishlist.products && wishlist.products.length === 0 ? (
              <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg">
                <FaPlus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No products yet</p>
                <p className="text-sm">
                  Add your first product to get started!
                </p>
              </div>
            ) : (
              wishlist.products?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                    )}
                    <div>
                      <h5 className="font-semibold text-gray-800 text-lg">
                        {item.name}
                      </h5>
                      <p className="text-sm text-gray-500">
                        Added on:{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-purple-700 font-bold text-xl">
                      ${item.price}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-3 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleRemoveProduct(item._id)}
                        className="p-3 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Remove product"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddProduct && (
        <AddProductModal
          onClose={handleCancelAddProduct}
          onSubmit={handleAddProduct}
          product={product}
          setProduct={setProduct}
        />
      )}

      {showEditProduct && (
        <EditProductModal
          onClose={handleCancelEditProduct}
          onSubmit={handleEditProduct}
          product={product}
          setProduct={setProduct}
        />
      )}

      {showInvitePerson && (
        <InvitePersonModal
          onClose={handleCancelInvitePerson}
          onSubmit={handleInvitePerson}
          inviteEmail={inviteEmail}
          setInviteEmail={setInviteEmail}
        />
      )}

      {toast && <Toast toastData={toast} onClose={() => setToast(null)} />}
    </section>
  );
};

export default WishlistDetail;
