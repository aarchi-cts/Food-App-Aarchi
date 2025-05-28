import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

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
        toast.success("Menu item added successfully!");
        setMenuItem({ name: "", description: "", price: "" }); // Reset form
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add menu item.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-4">
      <h2 className="text-2xl mb-4">Add Menu Item</h2>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          name="name"
          onChange={onChangeHandler}
          value={menuItem.name}
          className="w-full border p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <input
          name="description"
          onChange={onChangeHandler}
          value={menuItem.description}
          className="w-full border p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Price</label>
        <input
          name="price"
          type="number"
          onChange={onChangeHandler}
          value={menuItem.price}
          className="w-full border p-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Item
      </button>
    </form>
  );
};

export default AddMenuItem;