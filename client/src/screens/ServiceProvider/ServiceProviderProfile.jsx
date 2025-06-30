import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Spinner";
import { useProfileStore } from "../../stores/profileStore";

const ServiceProviderProfile = () => {
  const navigate = useNavigate();
  const { getUserProfile, isFetchingProfile, profileData } = useProfileStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  if (isFetchingProfile || !profileData) return <LoadingSpinner />;

  const { fullName, email, phoneNumber, isVerified, profile, profileImage } =
    profileData;

  const {
    title,
    bio,
    serviceCategory,
    specialties,
    yearsOfExperience,
    location,
    availability,
    hourlyRate,
    certifications,
    totalJobCompleted,
    rating,
    profile_status,
  } = profile;

  const validCertifications = certifications?.filter(
    (cert) => cert.name && cert.issuer && cert.dateIssued
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
                <p className="text-lg text-indigo-600">
                  {title || "Service Provider"}
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
                onClick={() => navigate("/provider/profile/edit")}
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
              <p className="text-sm text-gray-500">Bio</p>
              <p className="text-gray-700">{bio || "No bio provided."}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Service Category</p>
              <p className="text-gray-700">{serviceCategory || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-gray-700">{location || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Availability</p>
              <p className="text-gray-700">{availability || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hourly Rate</p>
              <p className="text-gray-700">Tsh {hourlyRate || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Years of Experience</p>
              <p className="text-gray-700">{yearsOfExperience || 0} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Specialties</p>
              <p className="text-gray-700">
                {specialties?.length > 0 ? specialties.join(", ") : "None"}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h4 className="text-xl font-semibold !text-gray-600 mb-4">
            Certifications
          </h4>
          {validCertifications?.length > 0 ? (
            <ul className="space-y-4">
              {validCertifications.map((cert) => (
                <li key={cert._id} className="border-b pb-2">
                  <p className="text-gray-700 font-medium">{cert.name}</p>
                  <p className="text-sm text-gray-500">Issuer: {cert.issuer}</p>
                  <p className="text-sm text-gray-500">
                    Issued: {new Date(cert.dateIssued).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No certifications available.</p>
          )}
        </div>

        {/* Stats Section */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h4 className="text-xl font-semibold !text-gray-600 mb-4">Stats</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Jobs Completed</p>
              <p className="text-gray-700">{totalJobCompleted || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <p className="text-gray-700">{rating || 0}/5</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Profile Status</p>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  isVerified
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {profile_status || "N/A"}
              </span>
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

export default ServiceProviderProfile;
