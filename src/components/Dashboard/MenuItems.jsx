import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const MenuItems = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [menuItems, setMenuItems] = useState([]); // State to store menu items
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `https://localhost:7274/api/Restaurant/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMenuItems(data.menuItems); // Set menu items from response
        } else {
          throw new Error("Failed to fetch menu items");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (user?.email) {
      fetchMenuItems();
    }
  }, [user, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {menuItems.map((item) => (
        <div
          key={item.itemID}
          className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200"
        >
          <img
            src={
              item.imageUrl ||
              "https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg"
            } // Placeholder image if no image URL is provided
            alt={item.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-orange-700 font-bold mt-2">RS. {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;