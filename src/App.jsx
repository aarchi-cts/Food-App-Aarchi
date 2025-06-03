import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import CustomerManagement from "./components/CustomerManagement/CustomerManagement";
import DefaultNavbar from "./components/DefaultNavbar";
import CustomerNavbar from "./components/CustomerDashboard/CustomerNavbar";
import Login from "./components/login/login";

function App() {
  const [userRole, setUserRole] = useState(null); // Track user role (e.g., "customer", "admin", etc.)

  return (
    <Router>
      {/* Conditionally render the navbar based on user role */}
      {userRole === "customer" ? <CustomerNavbar /> : <DefaultNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/customer/*" element={<CustomerManagement />} />
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
