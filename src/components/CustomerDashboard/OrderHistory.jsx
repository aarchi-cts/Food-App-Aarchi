// import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../context/StoreContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const OrderHistory = () => {
//   const { user, token } = useContext(StoreContext); // Access user and token from context
//   const [orderHistory, setOrderHistory] = useState([]); // Store order history
//   const [loading, setLoading] = useState(true); // Loading state
//   const { cart } = useContext(StoreContext); // Access cart from context
//   const navigate = useNavigate(); // Use navigate for routing

//   const hasItemsInCart = Object.keys(cart).length > 0; // Check if there are items in the cart

//   const handleGoToCart = () => {
//     navigate("/customer-management/cart"); // Navigate to the cart page
//   };
//   // Fetch order history on component mount
//   useEffect(() => {
//     const fetchOrderHistory = async () => {
//       if (user?.email && user.role === "customer") {
//         try {
//           const response = await fetch(
//             `https://localhost:7274/api/Customer/${user.email}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           if (response.ok) {
//             const data = await response.json();
//             console.log("Fetched Order History:", data.orders); // Debugging
//             setOrderHistory(data.orders || []); // Set orders or empty array
//           } else {
//             toast.error("Failed to fetch order history.");
//           }
//         } catch (error) {
//           console.error("Error fetching order history:", error);
//           toast.error("An error occurred while fetching order history.");
//         } finally {
//           setLoading(false); // Stop loading
//         }
//       }
//     };

//     fetchOrderHistory();
//   }, [user, token]);

//   if (loading) {
//     return <p>Loading order history...</p>;
//   }

//   if (orderHistory.length === 0) {
//     return <p>No orders found.</p>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">Order History</h2>
//       {orderHistory.map((order) => (
//         <div
//           key={order.orderID}
//           className="bg-white p-6 rounded-lg shadow-md mb-4"
//         >
//           <h3 className="text-xl font-bold mb-2">
//             Order ID: {order.orderID} - Status: {order.status}
//           </h3>
//           <p className="mb-2">
//             <strong>Restaurant:</strong> {order.restaurant.restaurantName}
//           </p>
//           <p className="mb-2">
//             <strong>Contact:</strong> {order.restaurant.restaurantContact}
//           </p>
//           <p className="mb-2">
//             <strong>Address:</strong> {order.restaurant.address}
//           </p>
//           <p className="mb-2">
//             <strong>Total Amount:</strong> ₹{order.totalAmount}
//           </p>
//           <p className="mb-2">
//             <strong>Delivery Status:</strong> {order.delivery.status}
//           </p>
//           <p className="mb-2">
//             <strong>ETA:</strong>{" "}
//             {new Date(order.delivery.estimatedTimeOfArrival).toLocaleString()}
//           </p>
//           <h4 className="text-lg font-bold mt-4">Ordered Items:</h4>
//           <ul className="list-disc pl-6">
//             {order.restaurant.menuItems.map((menuItem) => (
//               <li key={menuItem.itemID} className="mb-2">
//                 <p>
//                   <strong>{menuItem.name}</strong> - ₹{menuItem.price}
//                 </p>
//                 <p className="text-gray-600">{menuItem.description}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//       {hasItemsInCart && (
//         <button
//           onClick={handleGoToCart}
//           className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
//         >
//           Go to Cart
//         </button>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import navigate

const OrderHistory = () => {
  const { user, token, cart } = useContext(StoreContext); // Access user, token, and cart from context
  const [orderHistory, setOrderHistory] = useState([]); // Store order history
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize navigate

  const hasItemsInCart = Object.keys(cart).length > 0; // Check if there are items in the cart

  const handleGoToCart = () => {
    navigate("/customer-management/cart"); // Navigate to the cart page
  };

  // Fetch order history on component mount
  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (user?.email && user.role === "customer") {
        try {
          const response = await fetch(
            `https://localhost:7274/api/Customer/${user.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Order History:", data.orders); // Debugging
            setOrderHistory(data.orders || []); // Set orders or empty array
          } else {
            toast.error("Failed to fetch order history.");
          }
        } catch (error) {
          console.error("Error fetching order history:", error);
          toast.error("An error occurred while fetching order history.");
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    fetchOrderHistory();
  }, [user, token]);

  if (loading) {
    return <p>Loading order history...</p>;
  }

  if (orderHistory.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Order History</h2>
      {orderHistory.map((order) => (
        <div
          key={order.orderID}
          className="bg-white p-6 rounded-lg shadow-md mb-4"
        >
          <h3 className="text-xl font-bold mb-2">
            Order ID: {order.orderID} - Status: {order.status}
          </h3>
          <p className="mb-2">
            <strong>Restaurant:</strong> {order.restaurant.restaurantName}
          </p>
          <p className="mb-2">
            <strong>Contact:</strong> {order.restaurant.restaurantContact}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {order.restaurant.address}
          </p>
          <p className="mb-2">
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>
          <p className="mb-2">
            <strong>Delivery Status:</strong> {order.delivery.status}
          </p>
          <p className="mb-2">
            <strong>ETA:</strong>{" "}
            {new Date(order.delivery.estimatedTimeOfArrival).toLocaleString()}
          </p>
          <h4 className="text-lg font-bold mt-4">Ordered Items:</h4>
          <ul className="list-disc pl-6">
            {order.restaurant.menuItems.map((menuItem) => (
              <li key={menuItem.itemID} className="mb-2">
                <p>
                  <strong>{menuItem.name}</strong> - ₹{menuItem.price}
                </p>
                <p className="text-gray-600">{menuItem.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
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

export default OrderHistory;