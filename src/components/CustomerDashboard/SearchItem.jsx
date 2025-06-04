import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";


const SearchItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, addToCart, removeFromCart } = useContext(StoreContext);
    const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || "");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setError(null);
        try {
            const response = await fetch(
                `https://localhost:7274/api/MenuItem/search?name=${searchQuery}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else if (response.status === 400) {
                setError("Menu item name cannot be empty.");
            } else if (response.status === 404) {
                setError("No menu items found with the specified name.");
            } else {
                setError("Failed to fetch search results.");
            }
        } catch (error) {
            console.error("Error during search:", error);
            setError("An error occurred while searching. Please try again.");
        }
    };

    useEffect(() => {
        if (searchQuery) {
            handleSearch();
        }
    }, [searchQuery]);

    const handleAddToCart = (item) => {
        if (item.restaurant && item.restaurant.availability === false) {
            toast.error("Cannot add item. The restaurant is closed.");
            return;
        }
        addToCart(item); // Add item to cart
        toast.success("Item added to cart!");
    };

    const handleRemoveFromCart = (item) => {
        if (item.restaurant && item.restaurant.availability === false) {
            toast.error("Cannot remove item. The restaurant is closed.");
            return;
        }
        removeFromCart(item.restaurantID, item.itemID); // Remove item from cart
        toast.info("Item removed from cart.");
      };

    const handleGoToCart = () => {
        navigate("/customer-management/cart"); // Navigate to the cart page
        setShowGoToCart(false); // Hide the "Go to Cart" button
        setTimeout(() => {
            setShowGoToCart(true); // Show the button again after 3 seconds
        }, 3000);
    };

    return (
        <div className="p-4">
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

            <button
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
            >
                Back
            </button>

            <h2 className="text-xl font-bold mb-2">Search Results</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((item) => (
                        <li key={item.itemID} className="border-b py-2">
                            <div className="flex justify-between items-center">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded mr-4"
                                />
                                <div>
                                    <h2 className="text-gray-500">Restaurant: {item.restaurant?.restaurantName || "Unknown"}</h2>
                                    <h3 className="font-bold">₹{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p className="text-gray-500">Price: {item.price}</p>
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
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p>No results found.</p>
            )}

            {/* Go to Cart Button */}
            <button
                onClick={handleGoToCart}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md"
            >
                Go to Cart
            </button>
        </div>
    );
};

export default SearchItem;