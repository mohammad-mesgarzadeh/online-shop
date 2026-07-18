import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AccountLayout from "../layouts/AccountLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderConfirmation = lazy(() => import("../pages/OrderConfirmation"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Categories = lazy(() => import("../pages/Categories"));
const CategoryProducts = lazy(() => import("../pages/CategoryProducts"));
const Offers = lazy(() => import("../pages/Offers"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const AccountProfile = lazy(() => import("../pages/account/AccountProfile"));
const AccountEditProfile = lazy(() => import("../pages/account/AccountEditProfile"));
const AccountOrders = lazy(() => import("../pages/account/AccountOrders"));
const AccountOrderDetail = lazy(() => import("../pages/account/AccountOrderDetail"));
const AccountWishlist = lazy(() => import("../pages/account/AccountWishlist"));
const AccountSettings = lazy(() => import("../pages/account/AccountSettings"));

function PageLoader() {
  return (
    <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "40vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">در حال بارگذاری...</span>
      </div>
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <SuspenseWrapper>
              <Home />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/products"
          element={
            <SuspenseWrapper>
              <Products />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/products/:id"
          element={
            <SuspenseWrapper>
              <ProductDetail />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/categories"
          element={
            <SuspenseWrapper>
              <Categories />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/categories/:slug"
          element={
            <SuspenseWrapper>
              <CategoryProducts />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/offers"
          element={
            <SuspenseWrapper>
              <Offers />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/blog"
          element={
            <SuspenseWrapper>
              <Blog />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <SuspenseWrapper>
              <BlogDetail />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <SuspenseWrapper>
              <Cart />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <SuspenseWrapper>
                <Checkout />
              </SuspenseWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation/:id"
          element={
            <ProtectedRoute>
              <SuspenseWrapper>
                <OrderConfirmation />
              </SuspenseWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <SuspenseWrapper>
                <AccountProfile />
              </SuspenseWrapper>
            }
          />
          <Route
            path="profile"
            element={
              <SuspenseWrapper>
                <AccountProfile />
              </SuspenseWrapper>
            }
          />
          <Route
            path="edit-profile"
            element={
              <SuspenseWrapper>
                <AccountEditProfile />
              </SuspenseWrapper>
            }
          />
          <Route
            path="orders"
            element={
              <SuspenseWrapper>
                <AccountOrders />
              </SuspenseWrapper>
            }
          />
          <Route
            path="orders/:id"
            element={
              <SuspenseWrapper>
                <AccountOrderDetail />
              </SuspenseWrapper>
            }
          />
          <Route
            path="wishlist"
            element={
              <SuspenseWrapper>
                <AccountWishlist />
              </SuspenseWrapper>
            }
          />
          <Route
            path="settings"
            element={
              <SuspenseWrapper>
                <AccountSettings />
              </SuspenseWrapper>
            }
          />
        </Route>
      </Route>

      <Route
        path="/login"
        element={
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/register"
        element={
          <SuspenseWrapper>
            <Register />
          </SuspenseWrapper>
        }
      />

      <Route
        path="*"
        element={
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
}
