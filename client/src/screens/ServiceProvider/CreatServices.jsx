import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useServiceStore } from "../../stores/serviceStore";
import LoadingSpinner from "../../components/Spinner";

const ServiceForm = () => {
  const { services, createService, updateService, isLoading } =
    useServiceStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  console.log(services);

  const initialFormData = {
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "plumbing",
    image: "",
    coverage: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      const service = services.find((s) => s._id === id);
      if (service) {
        setFormData({
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          category: service.category,
          image: service.image,
          coverage: service.coverage,
          location: service.location,
        });
      }
    }
  }, [id, services, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("duration", formData.duration);
      submitData.append("category", formData.category);
      submitData.append("coverage", formData.coverage);
      submitData.append("location", formData.location);
      if (file) {
        submitData.append("image", file);
      } else if (isEdit) {
        // Keep existing URL if no new file
        submitData.append("image", formData.image);
      }

      if (isEdit) {
        await updateService(id, submitData);
      } else {
        await createService(submitData);
      }
      navigate("/provider/services");
    } catch (err) {
      setError(err.message || "Failed to save service");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container min-h-screen py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold !text-gray-600 mb-6 text-center">
          {isEdit ? "Update Service" : "Add New Service"}
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm"
              rows="4"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="e.g., 2 hours"
                className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm"
            >
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hvac">HVAC</option>
              <option value="carpentry">Carpentry</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/jpeg,image/jpg,image/png,image/gif"
              required={!isEdit}
              className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm"
            />
            {isEdit && formData.image && (
              <p className="text-gray-600 text-sm mt-1">
                Current:{" "}
                <a
                  href={formData.image}
                  target="_blank"
                  className="text-indigo-600"
                >
                  View Image
                </a>
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Coverage Area
            </label>
            <input
              type="text"
              name="coverage"
              value={formData.coverage}
              onChange={handleChange}
              required
              placeholder="e.g., Dar es Salaam"
              className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Tanzania, Oysterbay"
              className="w-full px-4 py-2.5 border rounded-lg text-gray-600 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 !rounded-lg hover:bg-indigo-700 text-sm"
          >
            {isEdit ? "Update Service" : "Create Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
