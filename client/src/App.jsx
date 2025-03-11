import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./chat/LandingPage";
import { ProfessionalsListing } from "./chat/ProfessionalsListing";
import { Contact } from "./chat/Contact";
import { ServicesBooking } from "./chat/ServicesBooking";
import { Dashboard } from "./chat/Dashboard";
import { ComprehensiveServices } from "./chat/ComprehensiveServices";

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
