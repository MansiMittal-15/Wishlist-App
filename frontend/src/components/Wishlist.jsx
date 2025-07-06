import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, createWishlist } from "../utils/api";
import getWishlists from "../hooks/getWishlists";
import { useDispatch, useSelector } from "react-redux";
import { setWishlists } from "../redux/wishlistSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialWishlists = [
  { _id: 1, title: "Birthday Gifts" },
  { _id: 2, title: "Home Decor" },
];

const Wishlist = () => {
  const [newWishlistName, setNewWishlistName] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [editingId, setEditingId] = useState('');

  const { wishlists } = useSelector((store) => store.wishlist);

  getWishlists();

  const handleCreateWishlist = async (e) => {
    e.preventDefault();
    if (!newWishlistName.trim()) return;

    const res = await createWishlist(newWishlistName);
    if (res?.data?.success) {
      dispatch(setWishlists([res.data.wishlist, ...wishlists]));
      setNewWishlistName("");
      setToast({ success: true, message: "Wishlist created!" });
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/wishlist/remove/${id}`);
      if (res.data.success) {
        setToast({ success: true, message: res.data.message });
        const updatedWishlists = wishlists.filter((item) => item._id !== id);
        dispatch(setWishlists(updatedWishlists));
      }
    } catch (error) {
      console.log(error);
      setToast({
        success: false,
        message: error.response.data.message || "Network error",
      });
    }
  };

  const handleEdit = async (id) => {
    try {
    } catch (error) {}
  };

  const EditForm = () => {
    return (
      <div onClick={() => setShowEditForm(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <form onClick={(e) => e.stopPropagation()} className="w-5xl justify-center items-center gap-2 flex bg-white p-10 rounded-lg">
          <input
            type="text"
            placeholder="New wishlist name"
            className="flex-1 px-3 py-2 w-[80%] border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
          >
            Update
          </button>
        </form>
      </div>
    );
  };

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
    <section className="max-w-2xl min-h-[80vh] mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">
        Your Wishlists
      </h2>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleCreateWishlist} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="New wishlist name"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
          >
            Create
          </button>
        </form>
        <ul>
          {wishlists.map((w) => (
            <li key={w._id}>
              <button
                onClick={() => navigate(`/wishlist/${w.id}`)}
                className="flex items-center justify-between w-full text-left px-4 py-3 rounded-lg mb-2 font-medium transition bg-purple-50 hover:bg-purple-100 text-purple-700 shadow"
              >
                <div className="w-full text-left mb-2 font-medium text-purple-700 ">
                  {w.title}
                </div>
                <div
                  className="flex gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaEdit
                    onClick={() => {
                      setShowEditForm(true);
                      setEditingId(w._id);
                    }}
                    className="cursor-pointer"
                  />
                  <FaTrash
                    onClick={() => handleDelete(w._id)}
                    className="cursor-pointer"
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {toast && <Toast toastData={toast} onClose={() => setToast(null)} />}
      {showEditForm && <EditForm />}
    </section>
  );
};

export default Wishlist;
