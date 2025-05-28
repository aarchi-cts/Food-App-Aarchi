import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const UpdateOrderStatus = () => {
  const { user } = useContext(StoreContext);

  const updateStatus = async (orderID, status) => {
    try {
      const response = await fetch(`https://localhost:7274/api/Orders/${orderID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        alert("Order status updated successfully!");
      } else {
        alert("Failed to update order status.");
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Update Order Status</h2>
      {user?.orders?.length > 0 ? (
        <ul>
          {user.orders.map((order) => (
            <li key={order.orderID} className="border p-2 mb-2">
              <p>Order ID: {order.orderID}</p>
              <p>Status: {order.status}</p>
              <button
                onClick={() => updateStatus(order.orderID, "Under Process")}
                className="bg-yellow-500 text-white px-2 py-1 mr-2"
              >
                Mark as Under Process
              </button>
              <button
                onClick={() => updateStatus(order.orderID, "Ready to Pickup")}
                className="bg-green-500 text-white px-2 py-1"
              >
                Mark as Ready to Pickup
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default UpdateOrderStatus;