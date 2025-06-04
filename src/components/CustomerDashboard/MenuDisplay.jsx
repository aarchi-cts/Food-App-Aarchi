import React from "react";
import { useNavigate } from "react-router-dom";

const MenuDisplay = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Pizza", image: "https://tse2.mm.bing.net/th/id/OIP.giyl2YTqBjzb8ckIWeEdbAHaHa?r=0&rs=1&pid=ImgDetMain" },
    { name: "Burger", image: "https://d2i4dsjnpaubom.cloudfront.net/restaurant_products/images/000/000/147/large/Bacon_Deluxe_za_web.png?1559029069" },
    { name: "Sandwich", image: "https://tse1.mm.bing.net/th/id/OIP.TKCLXxPZiIfMfDBRyEmFUAHaGe?r=0&rs=1&pid=ImgDetMain" },
    { name: "Tacos", image: "https://tse2.mm.bing.net/th/id/OIP.VCtX2AWQIFJoM5FMpMvIdwHaF_?r=0&rs=1&pid=ImgDetMain" },
    { name: "Sushi", image: "https://tse1.mm.bing.net/th/id/OIP.DqKyVWnLkRQkxiffQ300tgHaHa?r=0&rs=1&pid=ImgDetMain" },
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