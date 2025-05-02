import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ServiceProSidebar from "../screens/serviceProvider/ServiceProSidebar";
import { useUtilsStore } from "../stores/utilsStore";
import DashboardHeader from "../components/DashboardHeader";

const ServiceProviderLayout = () => {
  const { isSidebarCollapsed } = useUtilsStore();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <ServiceProSidebar />

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } transition-all duration-300`}
      >
        {/* Dashborad header */}
        <DashboardHeader />

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
};

export default ServiceProviderLayout;
