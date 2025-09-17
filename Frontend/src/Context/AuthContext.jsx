import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let [loading, setLoading] = useState(true);
  const [status, setstatus] = useState(200);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  

  useEffect(() => {
    if (user) {
      localStorage.setItem("user",JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Function to log in and set user/token
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading ,setLoading, login, logout ,setUser ,status , setstatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext