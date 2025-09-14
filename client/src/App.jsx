import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

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
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center text-light" to="/">
            <img src={logo} alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
           
          </Link>
          <button 
            className="navbar-toggler text-light" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse centered" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              {user ? (
                <li className="nav-item">
                  <button className="btn btn-custom ms-2"  onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li className="nav-item" id="loginbtn"><Link className="nav-link" to="/login">Login</Link></li>
                  
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
