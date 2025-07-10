// Global
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// Utility
import LoadingSpinner from "./components/Spinner";
import PageNotFound from "./components/PageNotFound";

// Auth
import PrivateRoute from "./context/AuthRequired";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";

// Landing Page
import LandingPageServices from "./screens/Home/Services";
import LandingPage from "./screens/Home/LandingPage";
import Contact from "./screens/Home/Contact";
import ProfessionalsListing from "./screens/Home/ProfessionalsListing";
import ServiceDetails from "./screens/Home/ServiceDetails";

// Layouts
import LandingPageLayout from "./layouts/LandingPageLayout";
import ServiceProviderLayout from "./layouts/ServiceProviderLayout";
import LoginLayout from "./layouts/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout";

// Service Provider
import Services from "./screens/ServiceProvider/Services";
import UpdateServiceProviderProfile from "./screens/ServiceProvider/UpdateServiceProviderProfile";
import ServiceProviderProfile from "./screens/ServiceProvider/ServiceProviderProfile";
import ChatRoom from "./screens/ServiceProvider/ChatRoom";
import ServiceForm from "./screens/ServiceProvider/CreatServices";

// Customer
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerProfile from "./screens/Customer/CustomerProfile";
import UpdateCustomerProfile from "./screens/Customer/UpdateCustomerProfile";
import ServiceProviderAnalytics from "./screens/ServiceProvider/ServiceProviderAnalytics";
import CustomerAnalytics from "./screens/Customer/CustomerAnalytics";
import AdminAnalytics from "./screens/Admin/AdminAnalytics";
import AdminLayout from "./layouts/AdminLayout";

export const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<RegisterLayout />}>
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<LandingPageLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<LandingPageServices />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/professionals" element={<ProfessionalsListing />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route element={<PrivateRoute />}>
          {/* Service Provider */}
          <Route path="/provider" element={<ServiceProviderLayout />}>
            <Route index element={<ServiceProviderAnalytics />} />
            <Route path="services" element={<Services />} />
            <Route path="services/new" element={<ServiceForm />} />
            <Route path="services/:id/edit" element={<ServiceForm />} />
            <Route path="room" element={<ChatRoom />} />
            <Route path="profile" element={<ServiceProviderProfile />} />
            <Route
              path="profile/edit"
              element={<UpdateServiceProviderProfile />}
            />
          </Route>

          {/* Customer */}
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerAnalytics />} />
            <Route path="room" element={<ChatRoom />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="profile/edit" element={<UpdateCustomerProfile />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminAnalytics />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
