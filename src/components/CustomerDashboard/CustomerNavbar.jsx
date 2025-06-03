import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logged out");
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img
                    src="https://brand.foodhub.com/images/png/logo_vertical_new.png" // Replace with your logo path
                    alt="Logo"
                    className="h-8 w-8 mr-2"
                />
                <h1 className="text-xl font-bold">Customer Management</h1>
            </div>
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="profile" className="hover:underline">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="order-history" className="hover:underline">
                        Order History
                    </Link>
                </li>
                <li>
                    <Link to="cart" className="hover:underline">
                        Cart
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default CustomerNavbar;