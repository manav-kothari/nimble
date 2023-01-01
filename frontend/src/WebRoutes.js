import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import AddProduct from "./restaurant/AddProduct";
import AdminDashboard from "./restaurant/AdminDashboard";
import ManageProducts from "./restaurant/ManageProducts";
import ManageProfile from "./restaurant/ManageProfile";
import ManageRestaurants from "./restaurant/ManageRestaurants";
import Orders from "./restaurant/Orders";
import UpdateProduct from "./restaurant/UpdateProduct";

const WebRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders/:userId" element={<Orders />} />
        <Route path="/admin/create/product" element={<AddProduct />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route
          path="/admin/product/update/:productId"
          element={<UpdateProduct />}
        />
        <Route path="/profile" element={<ManageProfile />} />
        <Route path="/admin/restaurants" element={<ManageRestaurants />} />
        <Route path="/menu/:userId" element={<App />} />
      </Routes>
    </Router>
  );
};

export default WebRoutes;
