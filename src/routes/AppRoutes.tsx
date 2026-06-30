import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Categories from "../pages/Categories";
import CategoryProducts from "../pages/CategoryProducts";
import Offers from "../pages/Offers";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<CategoryProducts />} />

        <Route path="/offers" element={<Offers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
