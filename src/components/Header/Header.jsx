import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

export default function Header() {
  const { user, logout} = useContext(StoreContext); // Access user and logout from context
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate("/login"); // Redirect to login page after logout
  };
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search query.");
      return;
    }
    // Navigate to the search results page and pass the search query as state
    navigate("/customer-management/search-results", { state: { searchQuery } });
    setSearchQuery(""); // Clear the search query after navigating
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://brand.foodhub.com/images/png/logo_vertical_new.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          {/* Right Section: Login/Logout and Username */}
          <div className="flex items-center lg:order-2">
            {user ? (
              <>
                <span className="text-gray-800 font-medium mr-4">
                  Welcome, {user.email.split("@")[0]}!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Navigation Links */}
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {/* Restaurant-Specific Links */}
              {user?.role === "restaurant" ? (
                <>
                  <li>
                    <NavLink
                      to="/restaurant-management/profile"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/restaurant-management/orders"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/restaurant-management/add-menu-item"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Add Menu Item
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/restaurant-management/menu-items"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Menu Items
                    </NavLink>
                  </li>
                </>
              ) : null}

              {/* Customer-Specific Links */}
              {user?.role === "customer" ? (
                <>
                  <li>
                    <NavLink
                      to="/customer-management"
                      end
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/customer-management/profile1"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/customer-management/order-history"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/customer-management/cart"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      Cart
                    </NavLink>
                  </li>
                </>
              ) : null}

              {/* Common Links */}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>

              {user?.role === "customer" ? (
                <>
                  <li>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Search for menu items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                      />
                      <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                      >
                        Search
                      </button>
                    </div>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}