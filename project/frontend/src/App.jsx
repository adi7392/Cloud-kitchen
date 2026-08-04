import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const AdminLayout = lazy(() => import("./components/AdminLayout"));
const Cart = lazy(() => import("./pages/Cart"));
const Home = lazy(() => import("./pages/Home"));
const KitchenMenu = lazy(() => import("./pages/KitchenMenu"));
const Kitchens = lazy(() => import("./pages/Kitchens"));
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ManageKitchen = lazy(() => import("./pages/admin/ManageKitchen"));
const ManageMenu = lazy(() => import("./pages/admin/ManageMenu"));
const ManageOrders = lazy(() => import("./pages/admin/ManageOrders"));

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Toaster position="top-right" />
      {!isLandingPage && <Navbar />}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kitchens" element={<Kitchens />} />
          <Route path="/kitchens/:kitchenId" element={<KitchenMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="kitchen" element={<ManageKitchen />} />
            <Route path="menu" element={<ManageMenu />} />
            <Route path="orders" element={<ManageOrders />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;