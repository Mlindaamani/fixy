import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import { Contact } from "./screens/Contact";
import { ServicesBooking } from "./screens/ServicesBooking";
import { ProfessionalsListing } from "./screens/ProfessionalsListing";
import { Dashboard } from "./screens/Dashboard";
import { ComprehensiveServices } from "./screens/ComprehensiveServices";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<ServicesBooking />} />
      <Route path="/professionals" element={<ProfessionalsListing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/booking" element={<ServicesBooking />} />
      <Route path="/extra" element={<ComprehensiveServices />} />
    </Routes>
  );
};
