import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Real-time field validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "name") {
      setErrors({ ...errors, name: value.trim() ? "" : "Name is required" });
    }

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        email: emailPattern.test(value) ? "" : "Enter a valid email",
      });
    }

    if (name === "phone") {
      setErrors({
        ...errors,
        phone: value.length === 10 ? "" : "Enter a 10-digit phone",
      });
    }

    if (name === "password") {
      setErrors({
        ...errors,
        password:
          value.length >= 6 ? "" : "Password must be at least 6 characters",
      });
    }

    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPassword:
          value === formData.password ? "" : "Passwords do not match",
      });
    }
  };

  // Full validation before submit
  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!emailPattern.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (formData.phone.length !== 10)
      newErrors.phone = "Enter a 10-digit phone";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      // remove confirmPassword before sending
      const { confirmPassword, ...dataToSend } = formData;

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        dataToSend
      );

      // console.log(res.data.data);

      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});

      alert("Registered Successfully");

      // redirect
      navigate("/login");

    } catch (error) {
      if (error.response) {
        setErrors({ email: error.response.data.message });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              className="w-full border p-3 rounded-md"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#3b2207] text-white py-3 rounded-md hover:bg-[#5a3412] transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#3b2207] font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;