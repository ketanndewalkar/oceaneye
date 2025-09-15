import React, { useState } from 'react';
import { Link } from 'react-router';

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

// A reusable input field component to keep the main form clean
const FormInput = ({ id, label, type = 'text', placeholder }) => {
  const [value, setValue] = useState('');

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-gray-700 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300 py-2"
        autoComplete="off"
      />
    </div>
  );
};

// The main App component containing the entire page
export default function Signup() {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };
  
  return (
    <div className="h-fit md:h-screen w-screen bg-gray-100 font-sans flex items-center justify-center">
      <div className="h-full w-screen">
        
        <div className="h-full w-screen bg-white shadow-2xl rounded-none overflow-hidden md:flex">
          
          {/* Left Side: Image with Gradient Overlay */}
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
            
            <form onSubmit={handleSubmit} className="flex flex-col justify-center h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4">
                <FormInput id="firstName" label="First Name" placeholder="First Name..." />
                <FormInput id="lastName" label="Last Name" placeholder="Last Name..." />
              </div>
              <FormInput id="email" type="email" label="Email" placeholder="Email address..." />
              <FormInput id="username" label="Username" placeholder="Username..." />
              <FormInput id="phoneNumber" type="tel" label="Phone Number" placeholder="Phone Number..." />
              <FormInput id="password" type="password" label="Password" placeholder="********" />
              <FormInput id="repeatPassword" type="password" label="Repeat Password" placeholder="********" />
              
              {/* Terms of User Checkbox */}
              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Terms of User</a>
                </label>
              </div>

              {/* Submit Button and Sign In Link */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <button
                  type="submit"
                  className="flex-grow sm:flex-grow-0 px-10 py-3 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Sign Up
                </button>
                <Link to="/login" className="font-semibold text-gray-600 hover:text-blue-700 transition-colors duration-300">
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
