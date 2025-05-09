import React, { useEffect } from "react";
import { useServiceStore } from "../../stores/serviceStore";
import LoadingSpinner from "../../components/Spinner";

const Services = () => {
  const { services, getActiveServices, isLoading } = useServiceStore();

  useEffect(() => {
    getActiveServices();
  }, [getActiveServices]);

  if (isLoading) <LoadingSpinner />;

  return (
    <div className="container min-h-screen">
      <div className="bg-white flex justify-between items-center shadow-lg mb-3 p-3 rounded-lg">
        <div className="w-10 h-10 flex justify-center items-center bg-blue-100 rounded-full p-6">
          <i className="fa-solid fa-briefcase text-indigo-600"></i>
        </div>
        <h5 className="!text-indigo-600 font-semibold p-2">My Services</h5>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {services.map((_, index) => (
          <div
            className="bg-white rounded-lg p-6 shadow-sm text-gray-600 text-sm transition-transform hover:-translate-y-2 cursor-pointer"
            key={index}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            voluptate ducimus blanditiis aut obcaecati at nemo deserunt? Quia,
            dignissimos iste?
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
