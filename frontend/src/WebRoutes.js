import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Footer from "./components/Footer/Footer";
import HomePage from "./HomePage";
import AddCategory from "./restaurant/AddCategory";
import AddProduct from "./restaurant/AddProduct";
import AdminDashboard from "./restaurant/AdminDashboard";
import ManageCategory from "./restaurant/ManageCategory";
import ManageProducts from "./restaurant/ManageProducts";
import ManageProfile from "./restaurant/ManageProfile";
import ManageRestaurants from "./restaurant/ManageRestaurants";
import UpdateCategory from "./restaurant/UpdateCategory";
import UpdateProduct from "./restaurant/UpdateProduct";
import AddRestaurantProduct from "./superadmin/AddRestaurantProduct";
import AllOrders from "./superadmin/AllOrders";
import ManageRestaurantProduct from "./superadmin/ManageRestaurantProduct";
import ManageRestaurantProfile from "./superadmin/ManageRestaurantProfile";
import SuperAdminDashboard from "./superadmin/SuperAdminDashboard";
import UpdateRestaurantProduct from "./superadmin/UpdateRestaurantProduct";

const WebRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/superadmin/allorders/" element={<AllOrders />} />
        <Route path="/admin/create/category" element={<AddCategory />} />
        <Route path="/admin/categories" element={<ManageCategory />} />
        <Route path="/admin/create/product" element={<AddProduct />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route
          path="/admin/product/update/:productId"
          element={<UpdateProduct />}
        />
        <Route
          path="/admin/category/update/:categoryId"
          element={<UpdateCategory />}
        />
        <Route path="/profile" element={<ManageProfile />} />
        <Route path="/admin/restaurants" element={<ManageRestaurants />} />
        <Route
          path="/superadmin/products/:userId"
          element={<ManageRestaurantProduct />}
        />
        <Route
          path="/superadmin/profile/:userId"
          element={<ManageRestaurantProfile />}
        />
        <Route
          path="/superadmin/create/product/:userId"
          element={<AddRestaurantProduct />}
        />
        <Route
          path="/superadmin/product/update/:productId"
          element={<UpdateRestaurantProduct />}
        />
        <Route path="/menu/:userId" element={<App />} />
        <Route path="/menu/:userId/category/:categoryId" element={<App />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default WebRoutes;
