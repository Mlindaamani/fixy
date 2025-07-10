import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/authStore";
import { useAnalyticsStore } from "../../stores/analyticsStore";
import LoadingSpinner from "../../components/Spinner";
import axios from "axios";

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { adminAnalytics, loading, error, fetchAdminAnalytics } =
    useAnalyticsStore();
  const [userFilter, setUserFilter] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    if (user?.role !== "admin") {
      toast.error("Access denied. Admins only.");
      navigate("/");
    } else {
      fetchAdminAnalytics(userFilter);
    }
  }, [user, fetchAdminAnalytics, navigate, userFilter]);

  useEffect(() => {
    if (adminAnalytics) {
      const userChart = echarts.init(document.getElementById("userChart"));
      const userOption = {
        title: { text: "User Growth", textStyle: { color: "#4B5563" } },
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: adminAnalytics.userGrowth.map((d) => d.month),
        },
        yAxis: { type: "value", name: "Users" },
        series: [
          {
            name: "Users",
            type: "line",
            data: adminAnalytics.userGrowth.map((d) => d.count),
            itemStyle: { color: "#4F46E5" },
          },
        ],
      };
      userChart.setOption(userOption);

      return () => userChart.dispose();
    }
  }, [adminAnalytics]);

  const handleServiceToggle = async (serviceId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "pending" : "active";
      await axios.patch(
        `/api/services/${serviceId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(`Service ${newStatus}`);
      fetchAdminAnalytics(userFilter); // Refresh data
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update service status"
      );
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    toast.error(error);
    return <div className="text-center text-red-600">Error: {error}</div>;
  }
  if (!adminAnalytics) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            icon: "fa-users",
            label: "Total Users",
            value: adminAnalytics.totalUsers,
            trend: "+10%",
          },
          {
            icon: "fa-screwdriver-wrench",
            label: "Total Services",
            value: adminAnalytics.totalServices,
            trend: "+15%",
          },
          {
            icon: "fa-dollar-sign",
            label: "Total Revenue",
            value: `Tsh ${adminAnalytics.totalRevenue.toLocaleString()}`,
            trend: "+20%",
          },
          {
            icon: "fa-comments",
            label: "Active Conversations",
            value: adminAnalytics.activeConversations,
            trend: "+5%",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <h3 className="text-2xl font-semibold text-gray-800 mt-1">
                  {stat.value}
                </h3>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
                <i
                  className={`fa-solid ${stat.icon} text-indigo-600 text-xl`}
                ></i>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">
              <i className="fa-solid fa-arrow-up mr-1"></i>
              {stat.trend} this month
            </p>
          </div>
        ))}
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div id="userChart" style={{ height: "400px" }}></div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-600">Users</h2>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border-none text-sm text-gray-800"
            aria-label="Filter users by role"
          >
            <option value="all">All Users</option>
            <option value="serviceProvider">Service Providers</option>
            <option value="customer">Customers</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adminAnalytics.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.role === "serviceProvider" && (
                      <button
                        onClick={() => setSelectedProvider(user)}
                        className="text-indigo-600 hover:text-indigo-800"
                        aria-label={`View profile of ${user.fullName}`}
                      >
                        View Profile
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-600">Services</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adminAnalytics.services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.providerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Tsh {service.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          service.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={service.status === "active"}
                        onChange={() =>
                          handleServiceToggle(service.id, service.status)
                        }
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors">
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provider Profile Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <img
                  src={selectedProvider.profileImage || "/default-profile.png"}
                  alt={selectedProvider.fullName}
                  className="w-24 h-24 rounded-full object-cover mr-6"
                />
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {selectedProvider.fullName}
                  </h2>
                  <p className="text-indigo-600 font-medium">
                    {selectedProvider.profile?.title}
                  </p>
                  <p className="text-gray-600">
                    {selectedProvider.profile?.bio}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProvider(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close profile modal"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProvider.services.map((service) => (
                  <div key={service.id} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-gray-600">{service.category}</p>
                    <p className="text-gray-600">
                      Tsh {service.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600">Status: {service.status}</p>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={service.status === "active"}
                        onChange={() =>
                          handleServiceToggle(service.id, service.status)
                        }
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors">
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {service.status === "active" ? "Active" : "Pending"}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
