import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/api.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice.js";
import {toast} from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({email, password});
    if (res?.data?.success) {
      dispatch(setUser(res.data.user));
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-purple-500 mx-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-purple-700 mb-2">
          Sign in to WishlistApp
        </h2>
        <form className="w-full mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div>
                {/* <FaEye /> */}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white rounded font-bold hover:bg-purple-800 transition mb-2"
          >
            Sign In
          </button>
        </form>
        <div className="text-sm text-gray-500 mt-2">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-700 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
