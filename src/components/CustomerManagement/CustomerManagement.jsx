import React, { useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CustomerNavbar from "../CustomerDashboard/CustomerNavbar";
import RestaurantCards from "../CustomerDashboard/RestaurantCards";
import Cart from "../CustomerDashboard/Cart"; // Import the Cart component
import SearchItem from "../CustomerDashboard/SearchItem";
import { StoreContext } from "../context/StoreContext";
import MenuDisplay from "../CustomerDashboard/MenuDisplay";
import RestaurantMenu from "../CustomerDashboard/RestaurantMenu";

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search query.");
      return;
    }
    // Navigate to the search results page and pass the search query as state
    navigate("/customer-management/search-results", { state: { searchQuery } });
  };
  

  return (
    <div>
      
      <div className="p-4">
        {/* <h1 className="text-3xl font-bold">Customer Management Dashboard</h1> */}

        {/* Conditionally Render Search Bar and Restaurant Cards */}
        {location.pathname === "/customer-management" && (
          <>
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search for menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded px-4 py-2 w-full"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Search
              </button>
            </div>
            {/* Menu Display */}
            <MenuDisplay/>
            {/* Restaurant Cards */}
            <RestaurantCards />
          </>
        )}

        {/* Conditionally Render Search Results */}
        {location.pathname === "/customer-management/restaurant-menu" && (
          <div>
            <RestaurantMenu/>
          </div>
        )}
        {/* Render child routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerManagement;