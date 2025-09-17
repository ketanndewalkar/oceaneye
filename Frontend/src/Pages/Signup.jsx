import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import { ClipLoader } from "react-spinners";
// An icon component for the arrow in the "Sign in" link
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline ml-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

// Reusable input field component
const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-gray-700 text-sm font-semibold mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent text-gray-700 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300 py-2"
      autoComplete="off"
    />
  </div>
);

// Main component
export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "7657567",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const { login, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        formData
      );
      if (res.status === 201) {
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
    <div className="h-fit md:h-screen w-screen bg-gray-100 font-sans flex items-center justify-center">
      <div className="h-full w-screen">
        <div className="h-full w-screen bg-white shadow-2xl rounded-none overflow-hidden md:flex">
          {/* Left Side: Image */}
          <div className="hidden md:block md:w-2/3 relative">
            <img
              src="/assets/loginpageimage.jpg"
              alt="A person working on a tablet"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 opacity-70"></div>
          </div>

          {/* Right Side: Sign Up Form */}
          <div className="w-full md:w-1/3 md:rounded-l-3xl p-8 sm:p-12 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8 text-left">
              Sign Up
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center h-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4">
                <FormInput
                  id="firstName"
                  label="First Name"
                  placeholder="First Name..."
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <FormInput
                  id="lastName"
                  label="Last Name"
                  placeholder="Last Name..."
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <FormInput
                id="email"
                type="email"
                label="Email"
                placeholder="Email address..."
                value={formData.email}
                onChange={handleChange}
              />
              <FormInput
                id="username"
                label="Username"
                placeholder="Username..."
                value={formData.username}
                onChange={handleChange}
              />
              <FormInput
                id="phoneNo"
                type="tel"
                label="Phone Number"
                placeholder="Phone Number..."
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <FormInput
                id="password"
                type="password"
                label="Password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />

              {/* Submit & Sign In */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <button
                  type={loading?"":"submit"}
                  className="flex-grow sm:flex-grow-0 px-10 py-3 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out flex justify-center items-center"
                >
                  {loading? (
                    <><ClipLoader
                      color="white"
                      size={20}
                    /></>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <Link
                  to="/login"
                  className="font-semibold text-gray-600 hover:text-blue-700 transition-colors duration-300"
                >
                  Sign in <ArrowRightIcon />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
