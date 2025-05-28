import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNav from "../Dashboard/DashboardNav";

const RestaurantManagement = () => {
  return (
    <div>
      <DashboardNav />
      <div className="p-4">
        <h1 className="text-3xl font-bold">Restaurant Management Dashboard</h1>
       
        <Outlet /> {/* Render child routes here */}
      </div>
    </div>
  );
};

export default RestaurantManagement;