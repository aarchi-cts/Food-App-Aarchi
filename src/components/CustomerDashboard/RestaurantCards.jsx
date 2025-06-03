// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const RestaurantCards = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch all restaurants when the component mounts
//     const fetchRestaurants = async () => {
//       try {
//         const response = await fetch("https://localhost:7274/api/Restaurant", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setRestaurants(data); // Update the restaurants state
//         } else {
//           setError("Failed to fetch restaurants.");
//         }
//       } catch (error) {
//         console.error("Error fetching restaurants:", error);
//         setError("An error occurred while fetching restaurants.");
//       }
//     };

//     fetchRestaurants();
//   }, []); // Empty dependency array ensures this runs only once

//   const handleRestaurantClick = (restaurantID) => {
//     // Navigate to the RestaurantMenu page with the restaurant ID
//     navigate(`/customer-management/restaurant-menu/${restaurantID}`);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {restaurants.length > 0 ? (
//           restaurants.map((restaurant) => (
//             <div
//               key={restaurant.restaurantID}
//               className="cursor-pointer border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
//               onClick={() => handleRestaurantClick(restaurant.restaurantID)}
//             >
//               <h3 className="text-xl font-bold">{restaurant.restaurantName}</h3>
//               <img
//                 // src={restaurant.imageUrl || "/images/default-restaurant.jpg"}
//                 src="/images/default-restaurant.jpg"
//                 alt={restaurant.restaurantName}
//                 className="w-full h-32 object-cover rounded-lg mb-2"/>
//               <p className="text-gray-500">{restaurant.address}</p>
//             </div>
//           ))
//         ) : (
//           !error && <p>Loading restaurants...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantCards;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCards = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all restaurants when the component mounts
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("https://localhost:7274/api/Restaurant", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRestaurants(data); // Update the restaurants state
        } else {
          setError("Failed to fetch restaurants.");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("An error occurred while fetching restaurants.");
      }
    };

    fetchRestaurants();
  }, []); // Empty dependency array ensures this runs only once

  const handleRestaurantClick = (restaurant) => {
    if (!restaurant.availability) {
      // Show a toast notification if the restaurant is closed
      toast.error("This restaurant is currently closed.");
      return;
    }
    // Navigate to the RestaurantMenu page with the restaurant ID
    navigate(`/customer-management/restaurant-menu/${restaurant.restaurantID}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div
              key={restaurant.restaurantID}
              className={`border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow ${
                !restaurant.availability ? "opacity-50 pointer-events-none" : "cursor-pointer"
              }`}
              onClick={() => handleRestaurantClick(restaurant)}
            >
              <h3 className="text-xl font-bold">{restaurant.restaurantName}</h3>
              <img
                src={restaurant.imageUrl || "/images/default-restaurant.jpg"}
                alt={restaurant.restaurantName}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <p className="text-gray-500">{restaurant.address}</p>
              {!restaurant.availability && (
                <p className="text-red-500 font-bold">Closed</p>
              )}
              {restaurant.availability && (
                <p className="text-green-500 font-bold">Open</p>
              )}
            </div>
          ))
        ) : (
          !error && <p>Loading restaurants...</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantCards;