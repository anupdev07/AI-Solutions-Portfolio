import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card card-custom p-4">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" style={{ width: "150px" }} />
            
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input className="form-control" name="username" placeholder="Username" onChange={handleChange} required />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input className="form-control" name="email" type="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-custom w-100">Register</button>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/login" style={{ color: "var(--vermilion)" }}>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
