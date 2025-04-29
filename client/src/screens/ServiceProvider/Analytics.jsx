import React, { useEffect } from "react";
import * as echarts from "echarts";
import recentOrders from "../../lib/orders";
import salesOption from "../../lib/sales";
import visitorsOption from "../../lib/vistors";

const Analytics = () => {
  useEffect(() => {
    const salesChart = echarts.init(document.getElementById("salesChart"));
    const visitorsChart = echarts.init(
      document.getElementById("visitorsChart")
    );

    salesChart.setOption(salesOption);
    visitorsChart.setOption(visitorsOption);

    return () => {
      salesChart.dispose();
      visitorsChart.dispose();
    };
  }, []);

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            icon: "fa-users",
            label: "Customer Reached",
            value: "350",
            trend: "+12%",
          },
          {
            icon: "fa-screwdriver-wrench",
            label: "Job Completed",
            value: "1,500",
            trend: "+23%",
          },
          {
            icon: "fa-dollar-sign",
            label: "Reviews",
            value: "2,000",
            trend: "+18%",
          },
          { icon: "fa-box", label: "Services", value: "100", trend: "+7%" },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm !text-gray-600">{stat.label}</p>
                <h3 className="text-2xl font-semibold text-gray-800 mt-1">
                  {stat.value}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <i
                  className={`fa-solid ${stat.icon} text-blue-600 text-xl`}
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
          <div id="salesChart" style={{ height: "400px" }}></div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div id="visitorsChart" style={{ height: "400px" }}></div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold !text-gray-600">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium !text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium !text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium !text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium !text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium !text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm !text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Analytics;
