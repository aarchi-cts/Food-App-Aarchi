import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const url = "https://localhost:7274"; // Backend URL
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${url}/api/Token/login`, { email, password });
      if (response.data.token) {
        const { token } = response.data;
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        const userRole = decodedToken.role;

        setToken(token);
        setRole(userRole);
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        toast.success("Login successful!");
        return userRole; // Return role for navigation
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error("Invalid credentials or server error.");
    }
  };

  const logout = () => {
    setToken("");
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (savedToken) setToken(savedToken);
    if (savedRole) setRole(savedRole);
  }, []);

  return (
    <StoreContext.Provider value={{ token, role, login, logout, url }}>
      {children}
    </StoreContext.Provider>
  );
};