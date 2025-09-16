import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (user.role === "admin") {
        navigate("/admin"); // Admin panel
      } else {
        navigate("/"); // Normal homepage
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input className="form-control" name="email" type="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-custom w-100">Login</button>
          </form>
          <div className="text-center mt-3">
            <p>New user? <Link to="/register" style={{ color: "var(--vermilion)" }}>Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
