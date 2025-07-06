import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../utils/api";
import { setUser } from "../redux/authSlice";
import {toast} from 'react-hot-toast';

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/wishlist", label: "Wishlist" },
];

const Header = () => {
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const res = await logout();
    if (res?.data?.success) {
      dispatch(setUser(null));
      navigate("/login");
      toast.success(res.data.message);
    }
  };
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mr-2">
            <svg
              className="w-7 h-7 text-purple-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.25V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25M3 8.25h18M3 8.25v9A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25v-9M7.5 12h.008v.008H7.5V12zm4.5 0h.008v.008H12V12zm4.5 0h.008v.008H16.5V12z"
              />
            </svg>
          </span>
          <span className="text-2xl font-extrabold text-purple-700 tracking-tight">
            WishlistApp
          </span>
        </div>
        <nav className="flex gap-2 md:gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg font-medium transition text-sm md:text-base ${
                location.pathname === link.to
                  ? "bg-purple-100 text-purple-700 shadow"
                  : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg cursor-pointer hover:ring-2 hover:ring-purple-300 transition"
            title="User Profile"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          {user ? (
            <>
              <div className="text-purple-700">{user.fullname}</div>
              <button
                onClick={logoutHandler}
                className="ml-2 cursor-pointer px-5 py-2 bg-purple-700 text-white rounded-full font-semibold shadow hover:bg-purple-800 transition hidden sm:inline-block"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-5 cursor-pointer py-2 bg-purple-700 text-white rounded-full font-semibold shadow hover:bg-purple-800 transition hidden sm:inline-block"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
