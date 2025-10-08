import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import Chatbot from "./components/Chatbot";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserCircle,
  FaUser,
} from "react-icons/fa";

function App() {
  const navigate = useNavigate();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpenUserMenu(false);
    navigate("/login");
  };

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  // Close user menu on outside click or Escape
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setOpenUserMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left: Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/home">
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
          </Link>

          {/* Center: Menu */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Events
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/gallery">
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects">
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reviews">
                  Reviews
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Right: Auth/User Menu */}
          <div className="d-flex align-items-center" ref={menuRef}>
            {user ? (
              <button
                type="button"
                aria-label="User menu"
                onClick={() => setOpenUserMenu((s) => !s)}
                className="bg-transparent border-0 p-0"
                style={{ outline: "none" }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaUser size={22} color="#fff" />
                </div>
              </button>
            ) : (
              <Link to="/login" id="loginbtn">
                Login
              </Link>
            )}

            {/* Dropdown */}
            {user && openUserMenu && (
              <div
                className="shadow"
                style={{
                  position: "absolute",
                  top: "60px",
                  right: "16px",
                  width: 300,
                  background: "#1f1f1f",
                  color: "#eaeaea",
                  border: "1px solid #2b2b2b",
                  borderRadius: 12,
                  zIndex: 1050,
                }}
              >
                <div
                  style={{
                    padding: "18px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      border: "2px solid #fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <FaUser size={30} color="#fff" />
                  </div>

                  <div
                    style={{
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 4,
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={user?.username || "User"}
                  >
                    {user?.username || "User"}
                  </div>

                  <div
                    style={{
                      color: "#bdbdbd",
                      fontSize: 13,
                      marginBottom: 16,
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={user?.email}
                  >
                    {user?.email }
                  </div>
                  {user?.role === "admin" &&
                  <button
                    id="loginbtn"
                    className="btn btn-sm w-50 mb-2"
                    onClick={() => {
                      setOpenUserMenu(false);
                      navigate("/admin");
                    }}
                  >
                    Dashboard
                  </button>
                   }
                  <button
                    className="btn btn-sm btn-custom w-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container py-5" style={{ marginTop: "80px" }}>
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-light pt-5 pb-4 mt-5">
        <div className="container">
          <div className="row gy-4">
            {/* Brand & About */}
            <div className="col-12 col-md-5">
              <div className="d-flex align-items-center mb-2">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ height: "38px", marginRight: "12px" }}
                />
                <span className="fs-5 fw-bold">AI Solutions</span>
              </div>
              <p className="small text-secondary mb-3">
                Empowering businesses with AI, automation, and modern IT
                solutions. We help you innovate, grow, and lead in your
                industry.
              </p>
              <div className="d-flex align-items-center mb-2">
                <FaMapMarkerAlt className="me-2" />
                <span className="small">Butwal-11, Kalikanagar</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <FaEnvelope className="me-2" />
                <a
                  href="mailto:info@aisolutions.com"
                  className="small text-light text-decoration-none"
                >
                  info@aisolutions.com
                </a>
              </div>
              <div className="d-flex align-items-center mb-2">
                <FaPhoneAlt className="me-2" />
                <a
                  href="tel:+977-9800000000"
                  className="small text-light text-decoration-none"
                >
                  +977-9800000000
                </a>
              </div>
              <div className="mt-3">
                <a href="#" className="text-light me-3 fs-5">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-light me-3 fs-5">
                  <FaTwitter />
                </a>
                <a href="#" className="text-light fs-5">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
            {/* Quick Links */}
            <div className="col-6 col-md-3">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li>
                  <Link className="footer-link" to="/services">
                    Services
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/events">
                    Events
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/projects">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/reviews">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            {/* Company */}
            <div className="col-6 col-md-4">
              <h6 className="fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                <li>
                  <Link className="footer-link" to="/about">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="footer-link" to="/terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-4 border-secondary" />
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <span className="small text-secondary mb-2 mb-md-0">
              © {new Date().getFullYear()} AI Solutions. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
      <Chatbot />
    </>
  );
}

export default App;
