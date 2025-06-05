// import React, { useContext } from "react";
// import { StoreContext } from "../context/StoreContext";

// const OrderSummary = () => {
//   const { cart, clearCart } = useContext(StoreContext); // Access clearCart from StoreContext
//   const cartItems = Object.values(cart); // Convert cart object to an array

//   // Calculate the total amount
//   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

//   const handlePlaceOrder = () => {
//     toast.success("Order placed successfully!");
//     clearCart(); // Clear the cart after placing the order
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {cartItems.map((item) => (
//           <div
//             key={`${item.restaurantID}-${item.itemID}`}
//             className="border rounded p-4 shadow-md"
//           >
//             <h3 className="font-bold text-lg">{item.name}</h3>
//             <p className="text-gray-500">Price: ₹{item.price}</p>
//             <p className="text-gray-500">Quantity: {item.count}</p>
//             <p className="text-gray-500">
//               Subtotal: ₹{item.price * item.count}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="mt-4">
//         <h3 className="text-lg font-bold">Total Amount: ₹{totalAmount}</h3>
//         <button
//           onClick={handlePlaceOrder}
//           className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;

import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const { cart, clearCart } = useContext(StoreContext); // Access cart and clearCart from StoreContext
  const cartItems = Object.values(cart); // Convert cart object to an array

  // Calculate the total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  const handlePlaceOrder = () => {
    // Replace with actual order placement logic if needed
    toast.success("Order placed successfully!");
    clearCart(); // Clear the cart after placing the order
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.map((item) => (
          <div
            key={`${item.restaurantID}-${item.itemID}`}
            className="border rounded p-4 shadow-md"
          >
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-gray-500">Price: ₹{item.price}</p>
            <p className="text-gray-500">Quantity: {item.count}</p>
            <p className="text-gray-500">
              Subtotal: ₹{item.price * item.count}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Total Amount: ₹{totalAmount}</h3>
        <button
          onClick={handlePlaceOrder}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;