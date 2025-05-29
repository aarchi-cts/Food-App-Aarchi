import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const Orders = () => {
  const { user, token } = useContext(StoreContext); // Access user and token from context
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchOrders = async () => {
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
          if (data.orders && Array.isArray(data.orders)) {
            setOrders(data.orders); // Set orders from response
            toast.success("Orders fetched successfully!");
          } else {
            toast.error("No orders found for this restaurant.");
          }
        } else {
          toast.error("Failed to fetch orders.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching orders.");
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (user?.email) {
      fetchOrders();
    }
  }, [user, token]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.orderID} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
              <p><strong>Order ID:</strong> {order.orderID}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Delivery Status:</strong> {order.delivery?.status || "N/A"}</p>
              <p><strong>Items:</strong></p>
              <ul className="pl-4">
                {order.orderMenuItems.map((item) => (
                  <li key={item.itemID}>
                    {item.menuItem.name} - ₹{item.menuItem.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default Orders;