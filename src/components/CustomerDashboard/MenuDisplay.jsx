import React from "react";
import { useNavigate } from "react-router-dom";

const MenuDisplay = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Pizza", image: "/images/pizza.jfif" },
    { name: "Burger", image: "/images/burger.jfif" },
    { name: "Sandwich", image: "/images/sandwich.jfif" },
    { name: "Tacos", image: "/images/tacos.jfif" },
    { name: "Sushi", image: "/images/sushi.jfif" },
  ];

  const handleSearchItem = (itemName) => {
    // Navigate to the SearchItem page with the selected item as the search query
    navigate("/customer-management/search-results", { state: { searchQuery: itemName } });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Explore Menus</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            onClick={() => handleSearchItem(item.name)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="text-center p-2 bg-gray-100">
              <p className="font-bold">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuDisplay;