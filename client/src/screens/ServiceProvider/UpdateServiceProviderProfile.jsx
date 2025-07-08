import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../stores/profileStore";
import toast from "react-hot-toast";

const UpdateServiceProviderProfile = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    serviceCategory: "",
    specialties: [],
    yearsOfExperience: 0,
    location: "",
    availability: "",
    hourlyRate: 0,
    certifications: [],
    profileImage: null,
  });

  const {
    isUpdatingProfile,
    getUserProfile,
    updateServiceProviderProfile,
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
        serviceCategory = "",
        specialties = [],
        yearsOfExperience = 0,
        location = "",
        availability = "",
        hourlyRate = 0,
        certifications = [],
      } = profileData.profile;

      setFormData({
        title,
        bio,
        serviceCategory,
        specialties,
        yearsOfExperience,
        location,
        availability,
        hourlyRate,
        certifications: certifications.filter(
          (cert) => cert.name && cert.issuer && cert.dateIssued
        ),
        profileImage: null,
      });
      setPreview(profileData.profileImage || null);
    }
  }, [profileData]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "yearsOfExperience" || name === "hourlyRate"
          ? Number(value)
          : value,
    }));
  };

  const handleSpecialtiesChange = (e) => {
    const specialties = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setFormData((prev) => ({ ...prev, specialties }));
  };

  const handleCertificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index][name] = value;
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: "", issuer: "", dateIssued: "" },
      ],
    }));
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications.splice(index, 1);
    setFormData({ ...formData, certifications: updatedCertifications });
  };

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

  const validateForm = () => {
    if (!formData.serviceCategory) {
      toast.error("Service category is required", {
        duration: 5000,
        position: "top-right",
        id: "validationError",
      });
      return false;
    }

    if (formData.yearsOfExperience < 0) {
      toast.error("Years of experience cannot be negative.", {
        duration: 5000,
        position: "top-right",
        id: "validationError",
      });
      return false;
    }

    if (formData.hourlyRate < 0) {
      toast.error("Hourly rate cannot be negative.", {
        duration: 5000,
        position: "top-right",
        id: "validationError",
      });
      return false;
    }

    for (const cert of formData.certifications) {
      if (cert.name && (!cert.issuer || !cert.dateIssued)) {
        toast.error(
          "All certification fields (name, issuer, date issued) are required if name is provided.",
          {
            duration: 5000,
            position: "top-right",
            id: "validationError",
          }
        );
        return false;
      }

      if (cert.dateIssued && new Date(cert.dateIssued) > new Date()) {
        toast.error("Certification date cannot be in the future.", {
          duration: 5000,
          position: "top-right",
          id: "validationError",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Update profile data
      await updateServiceProviderProfile(profileData.profile._id, {
        title: formData.title,
        bio: formData.bio,
        serviceCategory: formData.serviceCategory,
        specialties: formData.specialties,
        yearsOfExperience: formData.yearsOfExperience,
        location: formData.location,
        availability: formData.availability,
        hourlyRate: formData.hourlyRate,
        certifications: formData.certifications,
      });

      // Update profile image if selected
      if (formData.profileImage) {
        const imageFormData = new FormData();
        imageFormData.append("profileImage", formData.profileImage);
        await updateProfileImage(imageFormData);
      }

      toast.success("Profile updated successfully", {
        duration: 5000,
        position: "top-right",
      });
      navigate("/provider/profile");
    } catch (error) {
      toast.error(error.message || "Failed to update profile", {
        duration: 5000,
        position: "top-right",
      });
    }
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
                  src={
                    preview ||
                    profileData?.profileImage ||
                    "https://via.placeholder.com/100"
                  }
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

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 w-full p-2 border !border-gray-300 rounded-lg focus:!ring-indigo-400 !focus:border-indigo-400"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:!ring-indigo-400 focus:!border-indigo-400"
                aria-label="Bio"
              />
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

            {/* Specialties */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Specialties (comma-separated)
              </label>
              <input
                type="text"
                value={formData.specialties.join(", ")}
                onChange={handleSpecialtiesChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                aria-label="Specialties"
                placeholder="e.g., Smart Locks, Home Automation"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                min="0"
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                aria-label="Years of Experience"
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

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                aria-label="Availability"
                placeholder="e.g., Mon-Fri, 9am-5pm"
              />
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hourly Rate (Tsh)
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                min="0"
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                aria-label="Hourly Rate"
              />
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-lg font-semibold !text-gray-600 mb-4">
                Certifications
              </h2>
              {formData.certifications.map((cert, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleCertificationChange(index, e)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                        aria-label={`Certification ${index + 1} Name`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Issuer
                      </label>
                      <input
                        name="issuer"
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleCertificationChange(index, e)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                        aria-label={`Certification ${index + 1} Issuer`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date Issued
                      </label>
                      <input
                        name="dateIssued"
                        type="date"
                        value={
                          cert.dateIssued
                            ? new Date(cert.dateIssued)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) => handleCertificationChange(index, e)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400"
                        aria-label={`Certification ${index + 1} Date Issued`}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                    aria-label={`Remove Certification ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addCertification}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                aria-label="Add Certification"
              >
                + Add Certification
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/provider/profile")}
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

export default UpdateServiceProviderProfile;
