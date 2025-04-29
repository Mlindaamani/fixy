import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { FixyServices } from "./screens/Services";
import Contact from "./screens/Contact";
import Login from "./screens/Auth/Login";
import ProfessionalsListing from "./screens/ProfessionalsListing";
import Register from "./screens/Auth/Register";
import PageNotFound from "./components/PageNotFound";
import LandingPageLayout from "./layouts/LandingPageLayout";
import ServiceProviderLayout from "./layouts/ServiceProviderLayout";
import LoginLayout from "./layouts/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import Services from "./screens/serviceProvider/Services";
import Analytics from "./screens/serviceProvider/Analytics";
import Settings from "./screens/serviceProvider/Settings";
import LandingPage from "./screens/LandingPage";
import ServiceProviderProfile from "./screens/serviceProvider/ServiceProviderProfile";
import ServiceProRoom from "./screens/serviceProvider/ServiceProRoom";
import Reports from "./screens/serviceProvider/Reports";
import PrivateRoute from "./context/AuthRequired";
import LoadingSpinner from "./components/Spinner";
import UpdateServiceProviderProfile from "./screens/serviceProvider/UpdateServiceProviderProfile";

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
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<ServiceProviderProfile />} />
            <Route
              path="profile/edit"
              element={<UpdateServiceProviderProfile />}
            />
            <Route path="room" element={<ServiceProRoom />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
