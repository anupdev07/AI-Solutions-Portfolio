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
  <div className="container-fluid d-flex justify-content-between align-items-center">
    
    {/* Left: Logo */}
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <img src={logo} alt="Logo" style={{ height: "40px" }} />
    </Link>

    {/* Center: Menu */}
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
      </ul>
    </div>

    {/* Right: Auth Button */}
    <div className="d-flex">
      {user ? (
        <button  id="logoutbtn" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i></button>
        
      ) : (
        <Link to="/login" id="loginbtn">Login</Link>
        
      )}
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
