import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../component/Home";
import Login from "../component/Login";
import RegistrationPage from "../component/Registration";
import Product from "../component/Product";
import SellerListing from "../component/UserListing";
import BuyerListing from "../component/BuyerListing";
import { failureToast } from "../utils/toast";
import NotFoundPage from "../component/NotFound";
import CreateProduct from "../component/CreateProduct";
import AddToCartPage from "../component/AddToCart";
import CreateSeller from "../component/CreateSeller";
import ProductView from "../component/ProductView";
import AdminRegistrationPage from "../component/AdminRegistration";

// Helper function to get user data from localStorage
const getUserData = () => {
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData?.role;

  return {
    role,
    token,
  };
};

// ProtectedRoute for authenticated and role-based access
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, rolesRequired = [] }) => {
  const { role, token } = getUserData();
  console.log(role, "==========rdatale=============", token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (rolesRequired.length > 0 && !rolesRequired.includes(role)) {
    failureToast("Access denied: Unauthorized role");
    return <Navigate to="/" />;
  }

  return children;
};

// RedirectRoute for unauthenticated pages
// eslint-disable-next-line react/prop-types
const RedirectRoute = ({ children }) => {
  const { token } = getUserData();

  if (token) {
    // Redirect to Home or any default page for logged-in users
    return <Navigate to="/" />;
  }

  return children;
};

// Router Component
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <RedirectRoute>
              <Login />
            </RedirectRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <RedirectRoute>
              <RegistrationPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/admin/registration"
          element={
            <RedirectRoute>
              <AdminRegistrationPage />
            </RedirectRoute>
          }
        />

        {/* Authenticated Routes */}
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<ProductView />} />
        <Route
          path="/addToCart/:productId"
          element={
            <ProtectedRoute>
              <AddToCartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/:productId"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sellerListing"
          element={
            <ProtectedRoute rolesRequired={["admin"]}>
              <SellerListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyerListing"
          element={
            <ProtectedRoute rolesRequired={["admin"]}>
              <BuyerListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createProduct"
          element={
            <ProtectedRoute rolesRequired={["admin", "seller"]}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createSeller"
          element={
            <ProtectedRoute rolesRequired={["admin"]}>
              <CreateSeller />
            </ProtectedRoute>
          }
        />

        {/* Catch-all Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;