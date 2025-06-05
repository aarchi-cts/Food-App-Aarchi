import React, { useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import CustomerNavbar from "../CustomerDashboard/CustomerNavbar";
import RestaurantCards from "../CustomerDashboard/RestaurantCards";
import MenuDisplay from "../CustomerDashboard/MenuDisplay";
import RestaurantMenu from "../CustomerDashboard/RestaurantMenu";
import { StoreContext } from "../context/StoreContext";

const CustomerManagement = () => {
  // const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const { cart } = useContext(StoreContext); // Access cart from context
  const hasItemsInCart = Object.keys(cart).length > 0; // Check if there are items in the cart
  const handleGoToCart = () => {
    navigate("/customer-management/cart"); // Navigate to the cart page
  };

  return (
    <div>

      <div className="p-4">
        {/* <h1 className="text-3xl font-bold">Customer Management Dashboard</h1> */}

        {/* Conditionally Render Search Bar and Restaurant Cards */}
        {location.pathname === "/customer-management" && (
          <>
            {/* Menu Display */}
            <MenuDisplay />
            {/* Restaurant Cards */}
            <RestaurantCards />
            {/* Go to Cart */}
            {hasItemsInCart && (
              <button
                onClick={handleGoToCart}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
              >
                Go to Cart
              </button>
            )}
          </>
        )}

        {/* Conditionally Render Search Results */}
        {location.pathname === "/customer-management/restaurant-menu" && (
          <div>
            <RestaurantMenu />
          </div>
        )}
        {/* Render child routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerManagement;