import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { ClipLoader } from "react-spinners";

// Reusable Arrow Icon Component
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="inline-block ml-1"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
    />
  </svg>
);

// Reusable Form Input Component
const FormInput = ({ id, label, ...props }) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="block w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-blue-600 transition-colors"
      autoComplete="off"
    />
  </div>
);

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        formData
      );
      if (res.status === 200) {
        login(res.data.data);
        setLoading(false);
        toast(res.data.message);
        navigate("/");
      } else {
        setLoading(false);
        toast("status code:", res.status);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen font-sans md:flex">
      {/* Left Side: Image with Blue Gradient Overlay */}
      <div className="hidden md:block md:w-2/3 relative">
        <img
          src="/assets/loginpageimage.jpg"
          alt="A person working on a tablet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 opacity-70"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/3 bg-white flex flex-col justify-center p-8 sm:p-12 md:rounded-5xl">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8 text-left">
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <FormInput
              id="email"
              type="email"
              label="Email"
              placeholder="Email address..."
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormInput
              id="password"
              type="password"
              label="Password"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
            />

            <div className="flex items-center justify-between mb-6 text-sm">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-gray-900">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <button
                type="submit"
                className="flex-grow sm:flex-grow-0 px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                {loading ? (
                  <ClipLoader
                    color="white"
                    size={20}
                  />
                ) : (
                  "Login"
                )}
              </button>
              <Link
                to="/signup"
                className="font-semibold text-gray-600 hover:text-blue-700 transition-colors duration-300"
              >
                Sign Up <ArrowRightIcon />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
