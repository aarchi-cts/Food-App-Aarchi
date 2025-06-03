// import React from "react";

// const Cart = ({ cart = {}, removeFromCart }) => {
//   const cartItems = Object.values(cart); // Convert cart object to an array

//   return (
//     <div className="mt-4">
//       <h2 className="text-xl font-bold mb-2">Cart</h2>
//       {cartItems.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {cartItems.map((item) => (
//             <div
//               key={`${item.restaurantID}-${item.itemID}`}
//               className="border rounded p-4 shadow-md flex flex-col justify-between"
//             >
//               <div>
//                 <h3 className="font-bold text-lg">{item.name}</h3>
//                 <p className="text-gray-500">Price: ₹{item.price}</p>
//                 <p className="text-gray-500">
//                   Restaurant: {item.restaurant?.restaurantName || "Unknown"}
//                 </p>
//                 <p className="text-gray-500">Quantity: {item.count}</p>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.restaurantID, item.itemID)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 mt-2"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart = {}, removeFromCart }) => {
  const cartItems = Object.values(cart); // Convert cart object to an array
  const navigate = useNavigate();

  // Calculate the total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={`${item.restaurantID}-${item.itemID}`}
                className="border rounded p-4 shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-500">Price: ₹{item.price}</p>
                  <p className="text-gray-500">
                    Restaurant: {item.restaurant?.restaurantName || "Unknown"}
                  </p>
                  <p className="text-gray-500">Quantity: {item.count}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.restaurantID, item.itemID)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Total Amount: ₹{totalAmount}</h3>
            <button
              onClick={() => navigate("/customer-management/select-location")}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            >
              Select Location
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;