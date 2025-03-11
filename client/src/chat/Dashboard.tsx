import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

export const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New order received from John Anderson", time: "5m ago" },
    { id: 2, text: "Server maintenance scheduled for tonight", time: "1h ago" },
    { id: 3, text: "Product inventory low: SKU-789", time: "2h ago" },
  ]);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  useEffect(() => {
    const salesChart = echarts.init(document.getElementById("salesChart"));
    const visitorsChart = echarts.init(
      document.getElementById("visitorsChart")
    );

    const salesOption = {
      animation: false,
      title: { text: "Sales Overview", left: "center" },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
        },
      ],
    };

    const visitorsOption = {
      animation: false,
      title: { text: "Visitors Statistics", left: "center" },
      tooltip: { trigger: "item" },
      series: [
        {
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Desktop" },
            { value: 735, name: "Mobile" },
            { value: 580, name: "Tablet" },
          ],
        },
      ],
    };

    salesChart.setOption(salesOption);
    visitorsChart.setOption(visitorsOption);

    return () => {
      salesChart.dispose();
      visitorsChart.dispose();
    };
  }, []);

  const sidebarLinks = [
    { icon: "fa-solid fa-house", label: "Dashboard", active: true },
    { icon: "fa-solid fa-chart-line", label: "Analytics" },
    { icon: "fa-solid fa-users", label: "Users" },
    { icon: "fa-solid fa-box", label: "Products" },
    { icon: "fa-solid fa-shopping-cart", label: "Orders" },
    { icon: "fa-solid fa-gear", label: "Settings" },
  ];

  const recentOrders = [
    {
      id: "#ORD-7829",
      customer: "Emily Thompson",
      date: "2025-03-11",
      amount: "$1,299.99",
      status: "Completed",
    },
    {
      id: "#ORD-7830",
      customer: "Michael Roberts",
      date: "2025-03-11",
      amount: "$849.50",
      status: "Processing",
    },
    {
      id: "#ORD-7831",
      customer: "Sarah Williams",
      date: "2025-03-10",
      amount: "$2,199.00",
      status: "Pending",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-white shadow-lg transition-all duration-300 fixed h-full`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img
            src="https://public.readdy.ai/ai/img_res/f1d44971ec9f235eee60de48824aa38a.jpg"
            alt="Logo"
            className={`${isSidebarCollapsed ? "hidden" : "block"} h-8`}
          />
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="!rounded-button cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <i
              className={`fa-solid ${
                isSidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"
              }`}
            ></i>
          </button>
        </div>
        <nav className="mt-6">
          {sidebarLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center p-4 ${
                link.active ? "bg-blue-50 text-blue-600" : "text-gray-600"
              } hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer`}
            >
              <i className={`${link.icon} text-lg`}></i>
              <span
                className={`ml-4 ${isSidebarCollapsed ? "hidden" : "block"}`}
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } transition-all duration-300`}
      >
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
                  }
                  className="!rounded-button cursor-pointer relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <i className="fa-solid fa-bell text-lg"></i>
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>

                {isNotificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm text-gray-800">
                          {notification.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="!rounded-button cursor-pointer flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    src="https://public.readdy.ai/ai/img_res/52bb8b440f147b2e284209915175d499.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-800">
                      Alexander Mitchell
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <i className="fa-solid fa-chevron-down text-gray-500 text-sm"></i>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <hr className="my-2" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <a href="#" className="hover:text-blue-600">
              Dashboard
            </a>
            <i className="fa-solid fa-chevron-right mx-2 text-gray-400 text-xs"></i>
            <span className="text-gray-800">Overview</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                icon: "fa-users",
                label: "Total Users",
                value: "24,589",
                trend: "+12%",
              },
              {
                icon: "fa-shopping-cart",
                label: "Total Orders",
                value: "1,789",
                trend: "+23%",
              },
              {
                icon: "fa-dollar-sign",
                label: "Revenue",
                value: "$45,289",
                trend: "+18%",
              },
              { icon: "fa-box", label: "Products", value: "456", trend: "+7%" },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
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
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
        </main>
      </div>
    </div>
  );
};
