import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user,logout,roleBasedRoutes} = useContext(AuthContext);
  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownRef = useRef(null);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <UserIcon className="w-5 h-5 text-gray-700" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-fit bg-white rounded-md shadow-lg py-1 z-10">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="font-semibold text-sm text-gray-900">{user.firstName}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
          
          {/* Role Display */}
          {user.role!=="citizen"?<div className="px-4 py-2 hover:bg-gray-50 cursor-default">
            <Link Link to={roleBasedRoutes[user.role]} className="flex items-center">
              <ShieldIcon className="w-4 h-4 mr-2 text-[#0df]" />
              <span className="text-sm font-medium text-nowrap">{`${user.role.charAt(0).toUpperCase()}${user.role.slice(1)} Dashboard`}</span>
            </Link>
          </div>:<div className="px-4 py-2 hover:bg-gray-50 cursor-default">
            <div className="flex items-center">
              <ShieldIcon className="w-4 h-4 mr-2 text-[#0df]" />
              <span className="text-sm font-medium">{`${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}`}</span>
            </div>
          </div>}
          
          {/* Additional Info Items */}
          {/* {user.additionalInfo?.map((info, index) => (
            <div 
              key={index}
              className="px-4 py-2 hover:bg-gray-50 cursor-default text-sm text-gray-700"
            >
              {info.label}: {info.value}
            </div>
          ))} */}
          
          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 text-red-600 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 flex items-center justify-start"
          >
            <LogoutIcon className="w-4 h-4 mr-2 inline-block" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
// Icons (using Heroicons as example)
const UserIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default ProfileDropdown;