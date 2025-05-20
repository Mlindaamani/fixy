import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Spinner";
import { useProfileStore } from "../../stores/profileStore";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const { getUserProfile, isFetchingProfile, profileData } = useProfileStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  if (isFetchingProfile) return <LoadingSpinner />;

  if (!profileData) return <LoadingSpinner />;

  const {
    fullName,
    email,
    phoneNumber,
    isVerified,
    profile,
    profileImage,
    role,
  } = profileData;

  console.log(profileData);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={profileImage || "https://via.placeholder.com/100"}
                alt={`${fullName}'s profile`}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold !text-gray-600">
                  {fullName}
                </h2>
                <p className="text-lg text-indigo-600 capitalize">
                  {role || "Service Provider"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  isVerified
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {isVerified ? "Verified" : "Not Verified"}
              </span>
              <button
                onClick={() => navigate("/customer/profile/edit")}
                className="px-4 py-2 bg-indigo-600 text-white !rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h4 className="text-xl font-semibold !text-gray-600 mb-4">
            Profile Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-gray-700">{profile.location || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h4 className="text-xl font-semibold !text-gray-600 mb-4">Stats</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Customer Status</p>
              <p className={`text-gray-700 capitalize`}>No data to show</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h4 className="text-xl font-semibold !text-gray-600 mb-4">
            Contact Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-700">{email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-gray-700">{phoneNumber || "N/A"}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Note: Contact details are private and only visible to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
