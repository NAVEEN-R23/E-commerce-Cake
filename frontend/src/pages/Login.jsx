import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";   
import { jwtDecode } from "jwt-decode"

function Login() {

  const navigate = useNavigate();  

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Real-time field validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({ ...errors, email: emailPattern.test(value) ? "" : "Enter a valid email" });
    }

    if (name === "password") {
      setErrors({ ...errors, password: value.length >= 6 ? "" : "Password must be at least 6 characters" });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) newErrors.email = "Enter a valid email";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

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

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log("userdata :" , res.data.data);
      console.log("token :" , res.data.token);

      const user = {
        name: res.data.data.name,
        email: res.data.data.email
      };
      localStorage.setItem("user",JSON.stringify(user));

      const token =  res.data.token
      alert(res.data.message);

      localStorage.setItem("token",token);

      const decoded = jwtDecode(token)

      if(decoded.role === "admin"){
        navigate("/admin")
      }else{
        navigate("/")
      }

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#3b2207] text-white py-3 rounded-md hover:bg-[#5a3412] transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#3b2207] font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;