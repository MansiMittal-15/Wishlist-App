import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import {toast} from "react-hot-toast";

const Signup = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    const res = await register(userData);

    if (res?.data?.success) {
      toast.success(res.data.message);
      navigate("/login");
    }
  };

  return (
    <>
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
            Create your account
          </h2>
          <form className="w-full mt-4" onSubmit={signupHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={userData.fullname}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, fullname: e.target.value }))
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={userData.password}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-700 text-white rounded font-bold hover:bg-purple-800 transition mb-2"
            >
              Sign Up
            </button>
          </form>
          <div className="text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-700 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
