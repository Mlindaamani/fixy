import React, { useState, useEffect } from "react";
import { useProfileStore } from "../../stores/profileStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateCustomerProfile = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    location: "",
    profileImage: null,
  });

  const {
    isUpdatingProfile,
    getUserProfile,
    // updateServiceProviderProfile,
    updateProfileImage,
    profileData,
  } = useProfileStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    if (profileData && profileData.profile) {
      const {
        title = "Your title",
        bio = "I am part of fixy...",
        location = "",
      } = profileData.profile;

      setFormData({
        title,
        bio,
        location,
        profileImage: null,
      });
      setPreview(profileData.profileImage || null);
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.profileImage) {
      const objectUrl = URL.createObjectURL(formData.profileImage);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (profileData?.profileImage) {
      setPreview(profileData?.profileImage);
    } else {
      setPreview(null);
    }
  }, [formData.profileImage, profileData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setImageError("Please upload a JPEG or PNG image");
        setFormData((prev) => ({ ...prev, profileImage: null }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size must be less than 5MB");
        setFormData((prev) => ({ ...prev, profileImage: null }));
        return;
      }
      setImageError("");
      setFormData((prev) => ({ ...prev, profileImage: file }));
    } else {
      setImageError("");
      setFormData((prev) => ({ ...prev, profileImage: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Update profile data
      // await updateServiceProviderProfile(profileData.profile._id, {
      //   title: formData.title,
      //   bio: formData.bio,
      //   serviceCategory: formData.serviceCategory,
      //   location: formData.location,
      // });

      // Update profile image
      if (formData.profileImage) {
        const imageFormData = new FormData();
        imageFormData.append("profileImage", formData.profileImage);
        await updateProfileImage(imageFormData);
      }

      toast.success("Profile updated successfully", {
        duration: 5000,
        position: "top-right",
      });

      navigate("/customer/profile");
    } catch (error) {
      toast.error(error.message || "Failed to update profile", {
        duration: 5000,
        position: "top-right",
      });
    }
  };

  const validateForm = () => {
    if (!formData.serviceCategory) {
      toast.error("Service category is required", {
        duration: 5000,
        position: "top-right",
        id: "validationError",
      });
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h4 className="text-2xl font-bold !text-gray-600 mb-6 text-center">
            Update Profile
          </h4>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <img
                  src={preview || profileData?.profileImage}
                  alt="Profile preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <input
                  type="file"
                  name="profileImage"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                  aria-label="Profile Image"
                />
              </div>
              {imageError && (
                <p className="mt-2 text-sm text-red-600">{imageError}</p>
              )}
            </div>

            {/* Service Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Category <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                aria-label="Service Category"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                aria-label="Location"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/customer/profile")}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isUpdatingProfile ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Save Changes"
              >
                {isUpdatingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomerProfile;
