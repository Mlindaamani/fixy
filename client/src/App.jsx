import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { FixyServices } from "./screens/Services";
import PrivateRoute from "./providers/AuthRequired";
import Login from "./screens/Auth/Login";
import Contact from "./screens/Contact";
import LandingPage from "./screens/LandingPage";
import ProfessionalsListing from "./screens/ProfessionalsListing";
import Register from "./screens/Auth/Register";
import LoadingSpinner from "./components/Spinner";
import PageNotFound from "./components/PageNotFound";

// Layouts
import LandingPageLayout from "./layouts/LandingPageLayout";
import ServiceProviderLayout from "./layouts/ServiceProviderLayout";
import LoginLayout from "./layouts/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout";

// Service Provider
import Analytics from "./screens/ServiceProvider/Analytics";
import Services from "./screens/ServiceProvider/Services";
import ServiceProRoom from "./screens/ServiceProvider/ServiceProRoom";
import UpdateServiceProviderProfile from "./screens/ServiceProvider/UpdateServiceProviderProfile";
import ServiceProviderProfile from "./screens/ServiceProvider/ServiceProviderProfile";

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
          <Route path="/services" element={<FixyServices />} />
          <Route path="/professionals" element={<ProfessionalsListing />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<ServiceProviderLayout />}>
            <Route index element={<Analytics />} />
            <Route path="services" element={<Services />} />
            <Route path="room" element={<ServiceProRoom />} />
            <Route path="profile" element={<ServiceProviderProfile />} />
            <Route
              path="profile/edit"
              element={<UpdateServiceProviderProfile />}
            />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
