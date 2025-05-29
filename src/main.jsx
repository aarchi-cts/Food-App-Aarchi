import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import User from './components/User/User.jsx';
import Github, { githubInfoLoader } from './components/Github/Github.jsx';
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
// import MenuItem from './components/menuitem/Menuitem.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/login/login.jsx';
import RestaurantManagement from './components/RestaurantManagement/RestaurantManagement.jsx';
import Profile from './components/Dashboard/Profile.jsx';
import Orders from './components/Dashboard/Orders.jsx';
import AddMenuItem from './components/Dashboard/AddMenuItem.jsx';
import MenuItems from './components/Dashboard/MenuItems.jsx';
import UpdateOrderStatus from './components/Dashboard/UpdateOrderStatus.jsx';
import ProtectedRoute from './components/Shared/ProtectedRoute.jsx';
import { StoreContextProvider } from './components/context/StoreContext.jsx'; // Import StoreContextProvider

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="About" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="user/:userid" element={<User />} />
      {/* <Route path="/menu" element={<MenuItem />} /> */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/restaurant-management"
        element={
          <ProtectedRoute>
            <RestaurantManagement />
          </ProtectedRoute>
        }
      >
        {/* Child routes for Restaurant Management */}
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="add-menu-item" element={<AddMenuItem />} />
        <Route path="update-order-status" element={<UpdateOrderStatus />} />
        <Route path="menu-items" element={<MenuItems />} />
      </Route>
      <Route loader={githubInfoLoader} path="github" element={<Github />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreContextProvider> {/* Wrap the RouterProvider with StoreContextProvider */}
      <RouterProvider router={router} />
      <ToastContainer />
    </StoreContextProvider>
  </React.StrictMode>,
);