import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, logout, user } = useContext(StoreContext); // Access login, logout, and user from context
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const onLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const role = await login(data.email, data.password); // Call login from StoreContext
  //     if (role) {
  //       if (role === "restaurant") {
  //         navigate("/restaurant-management"); // Navigate to restaurant dashboard
  //       } else if (role === "customer") {
  //         navigate("/"); // Navigate to home for customers
  //       } else {
  //         toast.error("Access restricted. Invalid role.");
  //       }
  //     } else {
  //       toast.error("Invalid email or password. Please try again.");
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred during login. Please try again.");
  //   }
  // };



  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const role = await login(data.email, data.password); // Call login from StoreContext
      if (role) {
        // setUserRole(role); //for the navbar change
        switch (role) {
          case "admin":
            navigate("/"); // Navigate to admin dashboard
            break;
          case "restaurant":
            navigate("/restaurant-management"); // Navigate to restaurant dashboard
            break;
          case "customer":
            navigate("/customer-management"); // Navigate to home for c ustomers
            break;
          case "agent":
            navigate("/"); // Navigate to agent dashboard
            break;
          default:
            toast.error("Access restricted. Invalid role.");
        }
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    }
  };



  const onLogout = () => {
    logout(); // Call logout from StoreContext
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {user ? ( // If user is logged in, show logout button and user details
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h2>
            <button
              onClick={onLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={onLogin}>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Your Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
