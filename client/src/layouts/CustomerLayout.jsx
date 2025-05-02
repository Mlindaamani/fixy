import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUtilsStore } from "../stores/utilsStore";
import CustomerSidebar from "../screens/Customer/CustomerSidebar";
import DashboardHeader from "../components/DashboardHeader";

const CustomerLayout = () => {
  const { isSidebarCollapsed } = useUtilsStore();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <CustomerSidebar />
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
      </div>
      <Toaster />
    </div>
  );
};

export default CustomerLayout;
