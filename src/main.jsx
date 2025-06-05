import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import User from './components/User/User.jsx';
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
// import MenuItem from './components/menuitem/Menuitem.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/login/login.jsx';
import RestaurantManagement from './components/RestaurantManagement/RestaurantManagement.jsx';
import Profile from './components/Dashboard/Profile.jsx';
import Header from './components/Header/Header.jsx';
import CustomerProfile from './components/CustomerDashboard/CustomerProfile.jsx';
import Orders from './components/Dashboard/Orders.jsx';
import AddMenuItem from './components/Dashboard/AddMenuItem.jsx';
import MenuItems from './components/Dashboard/MenuItems.jsx';
import UpdateOrderStatus from './components/Dashboard/UpdateOrderStatus.jsx';
import ProtectedRoute from './components/Shared/ProtectedRoute.jsx';
import { StoreContext, StoreContextProvider } from './components/context/StoreContext.jsx'; // Import StoreContextProvider
import CustomerManagement from './components/CustomerManagement/CustomerManagement.jsx';
import SearchItem from './components/CustomerDashboard/SearchItem.jsx';
// import CustSearchItemDash from './components/CustomerDashboard/CustSearchItemDash.jsx';
import Cart from './components/CustomerDashboard/Cart.jsx';
import MenuDisplay from './components/CustomerDashboard/MenuDisplay.jsx';
import RestaurantMenu from './components/CustomerDashboard/RestaurantMenu.jsx';
import OrderHistory from './components/CustomerDashboard/OrderHistory.jsx';
import SelectLocation from './components/CustomerDashboard/SelectLocation.jsx';
import OrderSummary from './components/CustomerDashboard/OrderSummary.jsx';

// const CartWrapper = () => {
//   const { cart, removeFromCart } = useContext(StoreContext); // Access cart and removeFromCart from context
//   return <Cart cart={cart} removeFromCart={removeFromCart} />;
// };
 // Access cart and removeFromCart from context
// const OrderSummaryWrapper = () => {
//   const { cart } = useContext(StoreContext); // Access cart from context
//   const placeOrder = () => {
//     // Replace with actual order placement logic
//     toast.success("Order placed successfully!");
//   };
//   return <OrderSummary cart={cart} placeOrder={placeOrder} />;
// };

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
      <Route
        path='/customer-management'
        element={
          <ProtectedRoute>
            <CustomerManagement />
          </ProtectedRoute>
        }
      >
        <Route path="profile1" element={<CustomerProfile/>} />
        <Route path="search-results" element={<SearchItem />} />
        <Route path="menu" element={<MenuDisplay />} />
        <Route path="order-history" element={<OrderHistory/>} />
        <Route path="cart" element={<Cart/>}/>
        <Route path="restaurant-menu/:restaurantID" element={<RestaurantMenu />} />
        <Route path="select-location" element={<SelectLocation/>} />
        <Route path="order-summary" element={<OrderSummary/>} />
      </Route>
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