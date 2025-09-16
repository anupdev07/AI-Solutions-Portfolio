import { Link, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import logo from "./assets/logo.png";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel"; // <-- make this file
import Blog from "./pages/Blog";
import Services from "./pages/Services";
import Events from "./pages/Events";

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom">
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
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              {/* Admin link only if logged in as admin */}
              {user && user.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Right: Auth Button */}
          <div className="d-flex">
            {user ? (
              <button id="logoutbtn" onClick={handleLogout}>
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

      <div className="container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              user && user.role === "admin" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
