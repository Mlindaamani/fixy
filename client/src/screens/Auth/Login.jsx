import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, navigate);
  };

  return (
    <div>
      <h5 className="text-1xl font-bold !text-gray-600 text-center mb-6">
        Login
      </h5>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "Email", name: "email", type: "email", required: true },
          {
            label: "Password",
            name: "password",
            type: "password",
            required: true,
          },
        ].map(({ label, name, type, required }) => (
          <div key={name}>
            <label className="block !text-gray-600 text-sm font-medium mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={required}
              className="w-full px-4 py-2.5 border rounded-lg !text-gray-600 text-base"
            />
          </div>
        ))}
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-indigo-600 text-white px-3 py-3 !rounded-lg hover:bg-indigo-700 text-base"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-center !text-gray-600 mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
