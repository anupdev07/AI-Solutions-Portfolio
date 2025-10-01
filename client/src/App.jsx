import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left: Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
          </Link>

          {/* Center: Menu */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Right: Auth Button */}
          <div className="d-flex">
            {user ? (
              <button
                id="logoutbtn"
                onClick={handleLogout}
                className="btn btn-custom"
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            ) : (
              <Link to="/login" id="loginbtn">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container py-5" style={{ marginTop: "80px" }}>
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-light py-4 mt-5">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          {/* Left - Logo + Name */}
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <img src={logo} alt="Logo" style={{ height: "30px", marginRight: "10px" }} />
            <span>© {new Date().getFullYear()} AI Solutions. All rights reserved.</span>
          </div>

          {/* Center - Nav links */}
          <ul className="nav mb-3 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link px-2 text-light" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 text-light" to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 text-light" to="/events">Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 text-light" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Right - Social icons */}
          <div>
            <a href="#" className="text-light me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-light me-3">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-light">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
 
export default App;
