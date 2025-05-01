import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, isAuthenticated } = useAuthStore();
  const { search } = useLocation();
  const role = new URLSearchParams(search).get("role") || "customer";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    location: "",
    role,
    serviceCategory: "",
    yearsOfExperience: "",
    availability: "",
    hourlyRate: "",
    certifications: [{ name: "", issuer: "", dateIssued: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("certifications.")) {
      const [, index, field] = name.split(".");
      const certifications = [...formData.certifications];
      certifications[index] = { ...certifications[index], [field]: value };
      setFormData({ ...formData, certifications });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addCertification = () =>
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        { name: "", issuer: "", dateIssued: "" },
      ],
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData, navigate);
  };

  if (isAuthenticated) navigate("/");

  return (
    <div>
      <h4 className="text-3xl font-bold !text-gray-600 text-center mb-8">
        Register as {role === "serviceProvider" ? "Pro" : "Customer"}
      </h4>
      <div className="mb-4 mt-3 items-center">
        <Link
          title="back home"
          to={`/`}
          className="text-indigo-600 text-lg  hover:bg-gray-300 p-1 rounded-full text-center"
        >
          <i className="fas fa-arrow-left mr-2"></i>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              label: "Full Name",
              name: "fullName",
              type: "text",
              required: true,
            },

            {
              label: "Phone Number",
              name: "phoneNumber",
              type: "text",
              required: true,
            },

            { label: "Email", name: "email", type: "email", required: true },

            {
              label: "Password",
              name: "password",
              type: "password",
              required: true,
            },
          ].map(({ label, name, type, required }) => (
            <div key={name}>
              <label className="block !text-gray-600 text-base font-medium mb-2">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                className="w-full px-2 py-2 border rounded-lg !text-gray-600 text-lg"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block !text-gray-600 text-base font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Tanzania, Oysterbay"
            className="w-full px-2 py-2 border rounded-lg !text-gray-600 text-lg"
          />
        </div>
        {role === "serviceProvider" && (
          <div>
            <label className="block !text-gray-600 text-base font-medium mb-2">
              Service Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  label: "Service Category",
                  name: "serviceCategory",
                  required: true,
                },
                {
                  label: "Years of Experience",
                  name: "yearsOfExperience",
                  type: "number",
                },
                { label: "Hourly Rate", name: "hourlyRate", type: "number" },
                {
                  label: "Availability",
                  name: "availability",
                  placeholder: "e.g., Mon-Fri, 9 AM - 5 PM",
                },
              ].map(({ label, name, type = "text", required, placeholder }) => (
                <div key={name}>
                  <label className="block !text-gray-600 text-base font-medium mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    placeholder={placeholder}
                    className="w-full px-2 py-2 border rounded-lg !text-gray-600 text-lg"
                  />
                </div>
              ))}
            </div>
            <label className="block !text-gray-600 text-base font-medium mt-8 mb-2">
              Certifications
            </label>
            {formData.certifications.map((cert, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-6"
              >
                <input
                  type="text"
                  name={`certifications.${index}.name`}
                  value={cert.name}
                  onChange={handleChange}
                  placeholder="Certification Name"
                  className="w-full px-2 py-2 border rounded-lg !text-gray-600 text-lg"
                />
                <input
                  type="text"
                  name={`certifications.${index}.issuer`}
                  value={cert.issuer}
                  onChange={handleChange}
                  placeholder="Issuer"
                  className="w-full px-2 py-2 border rounded-lg !text-gray-600 text-lg"
                />
                <input
                  type="date"
                  name={`certifications.${index}.dateIssued`}
                  value={cert.dateIssued}
                  onChange={handleChange}
                  className="w-full px-2 py-2 border rounded-lg !text-gray-600 text-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addCertification}
              className="text-indigo-600 hover:underline text-base"
            >
              + Add Certification
            </button>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-3 py-3 !rounded-lg hover:bg-indigo-700 text-lg mb-2"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-center !text-gray-600 text-base mt-1">
          Have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
