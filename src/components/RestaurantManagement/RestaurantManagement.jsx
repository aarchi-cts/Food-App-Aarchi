import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function RestaurantManagement() {
  const { token, url } = useContext(StoreContext); // Access token and backend URL from context
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    restaurantID: null, // Use restaurant ID for adding menu items
  });
  const [menuItems, setMenuItems] = useState([]); // State to store menu items
  const [message, setMessage] = useState("");
  const [restaurantID, setRestaurantID] = useState(null); // State to store the restaurant ID

  // Fetch the restaurant ID based on the logged-in user's email
  useEffect(() => {
    const fetchRestaurantID = async () => {
      try {
        const response = await fetch(`${url}/api/Restaurant`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        });

        if (response.ok) {
          const data = await response.json();
          const restaurant = data.find((r) => r.email === localStorage.getItem("email")); // Match email
          if (restaurant) {
            setRestaurantID(restaurant.id); // Set the restaurant ID
            setFormData((prevData) => ({ ...prevData, restaurantID: restaurant.id })); // Update formData
          } else {
            setMessage("Restaurant not found.");
          }
        } else {
          setMessage("Failed to fetch restaurant details.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching restaurant details.");
      }
    };

    fetchRestaurantID();
  }, [token, url]);

  // Fetch menu items for the logged-in restaurant
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${url}/api/MenuItem`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filter menu items by the logged-in restaurant's ID
          const filteredItems = data.filter((item) => item.restaurantID === restaurantID);
          setMenuItems(filteredItems);
        } else {
          setMessage("Failed to fetch menu items.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching menu items.");
      }
    };

    if (restaurantID) {
      fetchMenuItems();
    }
  }, [restaurantID, token, url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/MenuItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Menu item added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          restaurantID, // Retain the restaurant ID
        });
        // Refresh menu items after adding a new one
        const newItem = await response.json();
        setMenuItems((prevItems) => [...prevItems, newItem]);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add menu item.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Restaurant Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800"
        >
          Add Menu Item
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}

      <h3 className="text-xl font-bold mt-6">Menu Items</h3>
      <ul className="mt-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <p className="text-orange-700 font-bold">${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}