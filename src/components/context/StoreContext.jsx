import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Load token from localStorage
  const [customerID, setCustomerID] = useState(null); // Store customer ID
  const [cart, setCart] = useState([]); // Store cart items
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

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

        if (data.role === "restaurant") {
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
            console.error(
              "Failed to fetch restaurant details:",
              restaurantResponse.statusText
            );
            return null;
          }
        } else if (data.role === "customer") {
          // Fetch customer details using the email
          const customerResponse = await fetch(
            `https://localhost:7274/api/Customer/${email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`, // Include the token
              },
            }
          );

          if (customerResponse.ok) {
            const customerData = await customerResponse.json();
            setUser({
              email,
              role: data.role,
              customerID: customerData.customerID, // Save customerID
            });
            setCustomerID(customerData.customerID); // Save customerID separately
            return data.role; // Return the user's role
          } else {
            console.error(
              "Failed to fetch customer details:",
              customerResponse.statusText
            );
            return null;
          }
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
    setCustomerID(null); // Clear customer ID
    setCart([]); // Clear cart
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  // const addToCart = (item) => {
  //   if (currentRestaurant && currentRestaurant !== item.restaurantID) {
  //     // Clear the cart if the restaurant is different
  //     if (
  //       !window.confirm(
  //         "Adding items from a different restaurant will clear your current cart. Do you want to continue?"
  //       )
  //     ) {
  //       return;
  //     }
  //     clearCart(); // Clear the cart
  //   }
  //   setCurrentRestaurant(item.restaurantID); // Set the current restaurant
  //   const uniqueKey = `${item.restaurantID}-${item.itemID}`;
  //   setCart((prevCart) => {
  //     const updatedCart = { ...prevCart };
  //     if (updatedCart[uniqueKey]) {
  //       updatedCart[uniqueKey].count += 1;
  //     } else {
  //       updatedCart[uniqueKey] = { ...item, count: 1 };
  //     }
  //     return updatedCart;
  //   });
  // };

  const addToCart = (item) => {
    if (currentRestaurant && currentRestaurant !== item.restaurantID) {
      // Clear the cart if the restaurant is different
      if (
        !window.confirm(
          "Adding items from a different restaurant will clear your current cart. Do you want to continue?"
        )
      ) {
        return; // User cancelled
      }
      clearCart(); // Clear the cart
    }
    setCurrentRestaurant(item.restaurantID); // Set the current restaurant
  
    const uniqueKey = `${item.restaurantID}-${item.itemID}`;
  
    setCart((prevCart) => {
      // Create a deep copy of the previous cart state
      const updatedCart = { ...prevCart };
  
      if (updatedCart[uniqueKey]) {
        // Increment the count immutably
        updatedCart[uniqueKey] = {
          ...updatedCart[uniqueKey],
          count: updatedCart[uniqueKey].count + 1,
        };
      } else {
        // Add a new item with count 1
        updatedCart[uniqueKey] = { ...item, count: 1 };
      }
  
      return updatedCart; // Return the updated cart
    });
  };






  // const removeFromCart = (restaurantID, itemID) => {
  //   const uniqueKey = `${restaurantID}-${itemID}`;
  //   setCart((prevCart) => {
  //     const updatedCart = { ...prevCart };
  //     if (updatedCart[uniqueKey]) {
  //       if (updatedCart[uniqueKey].count === 1) {
  //         delete updatedCart[uniqueKey];
  //       } else {
  //         updatedCart[uniqueKey].count -= 1;
  //       }
  //     }
  //     return updatedCart;
  //   });
  // };



  const removeFromCart = (restaurantID, itemID) => {
  const uniqueKey = `${restaurantID}-${itemID}`;
  setCart((prevCart) => {
    // Create a deep copy of the previous cart state
    const updatedCart = { ...prevCart };

    if (updatedCart[uniqueKey]) {
      if (updatedCart[uniqueKey].count === 1) {
        // Remove the item entirely if count is 1
        delete updatedCart[uniqueKey];
      } else {
        // Decrement the count immutably
        updatedCart[uniqueKey] = {
          ...updatedCart[uniqueKey],
          count: updatedCart[uniqueKey].count - 1,
        };
      }
    }

    return updatedCart; // Return the updated cart
  });
};

  const clearCart = () => {
    setCart({});
    setCurrentRestaurant(null);
  };
  // Load token from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <StoreContext.Provider
      value={{ user, token, customerID, cart, login, logout, addToCart, removeFromCart, clearCart,}}
    >
      {children}
    </StoreContext.Provider>
  );
};



