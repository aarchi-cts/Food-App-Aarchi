import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const RestaurantMenu = () => {
  const { restaurantID } = useParams(); // Get the restaurant ID from the route
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGoToCart, setShowGoToCart] = useState(false); // State for "Go to Cart" button visibility
  

  const { cart, addToCart, removeFromCart } = useContext(StoreContext); // Use StoreContext
  const navigate = useNavigate();
  const hasItemsInCart = Object.keys(cart).length > 0;

  useEffect(() => {
    // Fetch all menu items
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("https://localhost:7274/api/MenuItem", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filter menu items by restaurantID
          const filteredItems = data.filter(
            (item) => item.restaurantID === parseInt(restaurantID)
          );
          setMenuItems(filteredItems); // Update the menu items state
        } else {
          setError("Failed to fetch menu items.");
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError("An error occurred while fetching menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [restaurantID]);

  const handleAddToCart = (item) => {
    addToCart(item); // Add item to cart
    // toast.success("Item added to cart!"); // Show toast notification
    setShowGoToCart(true); // Enable "Go to Cart" button
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.restaurantID, item.itemID); // Remove item from cart
    // toast.info("Item removed from cart."); // Show toast notification
    setShowGoToCart(true); // Enable "Go to Cart" button
  };

  const handleGoToCart = () => {
    navigate("/customer-management/cart"); // Navigate to the cart page
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      {loading && <p>Loading menu items...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {menuItems.length > 0 ? (
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.itemID}
              className="border rounded-lg shadow-md p-4 bg-white flex justify-between items-center"
            >
              <div>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <h4 className="text-lg font-bold">{item.name}</h4>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-gray-700 font-bold">Price: ₹{item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  -
                </button>
                <span className="mx-2">
                  {cart[`${item.restaurantID}-${item.itemID}`]?.count || 0}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No menu items found for this restaurant.</p>
      )}

      {/* "Go to Cart" Button */}
      {hasItemsInCart && (
        <button
          onClick={handleGoToCart}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
        >
          Go to Cart
        </button>
      )}
    </div>
  );
};

export default RestaurantMenu;