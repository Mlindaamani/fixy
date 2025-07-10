import React, { useEffect } from "react";
import * as echarts from "echarts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/authStore";
import LoadingSpinner from "../../components/Spinner";
import { useAnalyticsStore } from "../../stores/analyticsStore";

const ServiceProviderAnalytics = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { analytics, loading, error, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    if (user?.role !== "serviceProvider") {
      toast.error("Access denied. Service providers only.");
      navigate("/");
    } else {
      fetchAnalytics();
    }
  }, [user, fetchAnalytics, navigate]);

  useEffect(() => {
    if (analytics) {
      const revenueChart = echarts.init(
        document.getElementById("revenueChart")
      );
      const jobsChart = echarts.init(document.getElementById("jobsChart"));

      const revenueOption = {
        title: { text: "Revenue Over Time", textStyle: { color: "#4B5563" } },
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: analytics.revenueOverTime.map((d) => d.month),
        },
        yAxis: { type: "value", name: "Revenue (Tsh)" },
        series: [
          {
            name: "Revenue",
            type: "line",
            data: analytics.revenueOverTime.map((d) => d.amount),
            itemStyle: { color: "#4F46E5" }, // indigo-600
          },
        ],
      };

      const jobsOption = {
        title: {
          text: "Jobs by Service Category",
          textStyle: { color: "#4B5563" },
        },
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: analytics.jobsByCategory.map((j) => j.category),
          axisLabel: { rotate: 45 },
        },
        yAxis: { type: "value", name: "Jobs" },
        series: [
          {
            name: "Jobs",
            type: "bar",
            data: analytics.jobsByCategory.map((j) => j.count),
            itemStyle: { color: "#4F46E5" },
          },
        ],
      };

      revenueChart.setOption(revenueOption);
      jobsChart.setOption(jobsOption);

      return () => {
        revenueChart.dispose();
        jobsChart.dispose();
      };
    }
  }, [analytics]);

  if (loading) return <LoadingSpinner />;
  if (error) {
    toast.error(error);
    return <div className="text-center text-red-600">Error: {error}</div>;
  }
  if (!analytics) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            icon: "fa-users",
            label: "Customers Reached",
            value: analytics.uniqueCustomers,
            trend: "+12%",
          },
          {
            icon: "fa-screwdriver-wrench",
            label: "Jobs Completed",
            value: analytics.totalJobs,
            trend: "+23%",
          },
          {
            icon: "fa-star",
            label: "Average Rating",
            value: analytics.averageRating.toFixed(1),
            trend: "+18%",
          },
          {
            icon: "fa-dollar-sign",
            label: "Total Revenue",
            value: `Tsh ${analytics.totalRevenue.toLocaleString()}`,
            trend: "+7%",
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div id="revenueChart" style={{ height: "400px" }}></div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div id="jobsChart" style={{ height: "400px" }}></div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-600">
            Recent Bookings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
              {analytics.recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.serviceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Tsh {booking.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          booking.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() =>
                        navigate(
                          `/customer/room?conversationId=${booking.conversationId}`
                        )
                      }
                      className="text-indigo-600 hover:text-indigo-800"
                      aria-label={`Chat about booking ${booking.id}`}
                    >
                      Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderAnalytics;
