import logo from "../assets/logo.png";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="text-center">
      <img src={logo} alt="AI-Solutions Logo" style={{ maxWidth: "300px", marginBottom: "20px" }} />
      <h1 style={{ color: "var(--baby-powder)", fontWeight: "bold" }}>
        Welcome to AI-Solutions
      </h1>
      <p className="lead" style={{ color: "var(--davys-gray)" }}>
        {user 
          ? `Hello, ${user.username}! Empowering businesses with cutting-edge IT and AI solutions.` 
          : "Your trusted partner in IT innovation and AI-driven success."}
      </p>
      {
        <div className="mt-4">
          <h3 style={{ color: "var(--vermilion)" }}>Innovate. Automate. Dominate.</h3>
          <p>
            We help you unlock the power of artificial intelligence, streamline operations, 
            and achieve growth like never before.
          </p>
          <button className="btn btn-custom me-2">Explore Services</button>
          <button className="btn btn-outline-light">Read Our Blog</button>
        </div>
      }
    </div>
  );
}

export default Home;
