import React from "react";
import { motion } from "framer-motion";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    console.log("Success:", values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="flex flex-col space-y-1"
          >
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              required
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="flex flex-col space-y-1"
          >
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </motion.div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <input
                type="checkbox"
                name="remember"
                className="rounded border-gray-300 focus:ring-blue-500"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
