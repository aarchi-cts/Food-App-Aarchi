import React from "react";
import { useNavigate } from "react-router-dom";

const SelectLocation = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select Location</h2>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/customer-management/profile1")}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit Location
        </button>
        <button
          onClick={() => navigate("/customer-management/profile1")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Location
        </button>
        <button
          onClick={() => navigate("/customer-management/order-summary")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go with Same Location
        </button>
      </div>
    </div>
  );
};

export default SelectLocation;