import React from "react";
import { NavLink } from "react-router-dom";

const CustDashboardNav = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
                <li>
                    <NavLink
                        to="profile"
                        className={({ isActive }) =>
                            isActive ? "underline text-orange-500" : "hover:underline"
                        }
                    >
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="search"
                        className={({ isActive }) =>
                            isActive ? "underline text-orange-500" : "hover:underline"
                        }
                    >
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-gray-700 text-white rounded-full pl-4 pr-10 py-2 focus:outline-none"
                                placeholder="Search..."
                            />
                            <button className="absolute right-0 top-0 mt-2 mr-4">
                                <svg
                                    className="h-4 w-4 fill-current text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M10 2a8 8 0 106.32 13.906l4.387 4.387a1 1 0 001.415-1.415l-4.387-4.387A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                                </svg>
                            </button>
                        </div>
                    </NavLink>
                </li>

            </ul>
        </nav>
    );
};

export default CustDashboardNav;