// import React, { useContext, useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { StoreContext } from "../context/StoreContext";

// const SearchItem = () => {
//   const location = useLocation();
//   const { cart, addToCart, removeFromCart } = useContext(StoreContext);
//   const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || "");
//   const [searchResults, setSearchResults] = useState([]);
//   const [error, setError] = useState(null);

//   const handleSearch = async (query) => {
//     setError(null);
//     try {
//       const response = await fetch(
//         `https://localhost:7274/api/MenuItem/search?name=${query}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setSearchResults(data);
//       } else if (response.status === 400) {
//         setError("Menu item name cannot be empty.");
//       } else if (response.status === 404) {
//         setError("No menu items found with the specified name.");
//       } else {
//         setError("Failed to fetch search results.");
//       }
//     } catch (error) {
//       console.error("Error during search:", error);
//       setError("An error occurred while searching. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (location.state?.searchQuery) {
//       setSearchQuery(location.state.searchQuery);
//       handleSearch(location.state.searchQuery);
//     }
//   }, [location.state?.searchQuery]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Search Results</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {searchResults.length > 0 ? (
//         <ul>
//           {searchResults.map((item) => (
//             <li key={item.itemID} className="border-b py-2">
//               <div className="flex justify-between items-center">
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded mr-4"
//                 />
//                 <div>
//                   <h3 className="font-bold">{item.name}</h3>
//                   <p>{item.description}</p>
//                   <p className="text-gray-500">Price: ₹{item.price}</p>
//                 </div>
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => removeFromCart(item.restaurantID, item.itemID)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
//                   >
//                     -
//                   </button>
//                   <span className="mx-2">
//                     {cart[`${item.restaurantID}-${item.itemID}`]?.count || 0}
//                   </span>
//                   <button
//                     onClick={() => addToCart(item)}
//                     className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !error && <p>No results found.</p>
//       )}
//     </div>
//   );
// };

// export default SearchItem;

import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const SearchItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || "");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
//   const [showGoToCart, setShowGoToCart] = useState(false); // State for "Go to Cart" button visibility

  const hasItemsInCart = Object.keys(cart).length > 0;
  const handleSearch = async (query) => {
    setError(null);
    try {
      const response = await fetch(
        `https://localhost:7274/api/MenuItem/search?name=${query}`,
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
        setSearchQuery("");
      } else if (response.status === 400) {
        setError("Menu item name cannot be empty.");
      } else if (response.status === 404) {
        setSearchResults([]); // Clear results if no items found
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
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      handleSearch(location.state.searchQuery);
    }
  }, [location.state?.searchQuery]);

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
                  <h3 className="font-bold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="text-gray-500">Price: ₹{item.price}</p>
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

export default SearchItem;