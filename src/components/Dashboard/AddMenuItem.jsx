import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMenuItem = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [menuItem, setMenuItem] = useState({ name: "", description: "", price: "" });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7274/api/MenuItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify({ ...menuItem, restaurantID: user.restaurantID }), // Include restaurantID
      });

      if (response.ok) {
        toast.success("Menu item added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setMenuItem({ name: "", description: "", price: "" }); // Reset form
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add menu item.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("An error occurred.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 hover:shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Add Menu Item
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            name="name"
            onChange={onChangeHandler}
            value={menuItem.name}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter item name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <input
            name="description"
            onChange={onChangeHandler}
            value={menuItem.description}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter item description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            name="price"
            type="number"
            onChange={onChangeHandler}
            value={menuItem.price}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter item price"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddMenuItem;