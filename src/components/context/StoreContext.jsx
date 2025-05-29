import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Load token from localStorage

  const login = async (email, password) => {
    try {
      // Fetch the token from the backend
      const response = await fetch("https://localhost:7274/api/Token/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token); // Save the token
        localStorage.setItem("token", data.token); // Persist token in localStorage

        // Fetch restaurant details using the email
        const restaurantResponse = await fetch(
          `https://localhost:7274/api/Restaurant/${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.token}`, // Include the token
            },
          }
        );

        if (restaurantResponse.ok) {
          const restaurantData = await restaurantResponse.json();
          setUser({
            email,
            role: data.role,
            restaurantID: restaurantData.restaurantID, // Save restaurantID
          });
          return data.role; // Return the user's role
        } else {
          console.error("Failed to fetch restaurant details:", restaurantResponse.statusText);
          return null;
        }
      } else {
        console.error("Login failed:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null); // Clear the token
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  // Load token from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <StoreContext.Provider value={{ user, token, login, logout }}>
      {children}
    </StoreContext.Provider>
  );
};