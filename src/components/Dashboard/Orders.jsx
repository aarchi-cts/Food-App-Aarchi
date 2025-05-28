import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const Orders = () => {
  const { user } = useContext(StoreContext);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Orders</h2>
      {user?.orders?.length > 0 ? (
        <ul>
          {user.orders.map((order) => (
            <li key={order.orderID} className="border p-2 mb-2">
              <p>Order ID: {order.orderID}</p>
              <p>Status: {order.status}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
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