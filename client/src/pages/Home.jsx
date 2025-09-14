import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="home-container text-light">
      {/* Top Section: About Company */}
      <div className="row align-items-center mb-5">
        {/* Left: Big Heading + CTA */}
        <div className="col-md-6 mb-4">
          <h1 className="fw-bold display-5" style={{ color: "var(--baby-powder)" }}>
            SkyRocket <br /> business with AI-Solutions
          </h1>
          <p className="mt-3" style={{ color: "var(--davys-gray)", fontSize: "1.1rem" }}>
            We're reimagining the IT and AI industry, and we need exceptional people 
            and businesses to help us grow together.
          </p>
          <Link to="/contact" className="btn btn-custom btn-lg mt-3">
            Contact us today
          </Link>
        </div>

        {/* Right: Description */}
        <div className="col-md-6">
          <p style={{ color: "var(--baby-powder)" }}>
            Backed by innovation and a strong vision, AI-Solutions is one of the fastest growing 
            IT and AI-driven solution providers in Nepal. 
          </p>
          <p style={{ color: "var(--baby-powder)" }}>
            By deeply studying workflows across industries, we design and deliver 
            software solutions that empower organizations to work smarter and 
            achieve greater results.
          </p>
          <p style={{ color: "var(--baby-powder)" }}>
            Join us if you value innovation, collaboration, and want to 
            transform how businesses adopt AI and IT services.
          </p>
        </div>
      </div>

      {/* Bottom Section: Scrolling Logos */}
      <div className="logos-container mt-5">
        <div className="logos-slide">
          <img src="/src/assets/company1.png" alt="Company 1" />
          <img src="/src/assets/company2.png" alt="Company 2" />
          <img src="/src/assets/company3.png" alt="Company 3" />
          <img src="/src/assets/company4.png" alt="Company 4" />
          <img src="/src/assets/company5.png" alt="Company 5" />
          <img src="/src/assets/company6.png" alt="Company 5" />
        </div>
        {/* Duplicate for infinite loop */}
        <div className="logos-slide">
          <img src="/src/assets/company1.png" alt="Company 1" />
          <img src="/src/assets/company2.png" alt="Company 2" />
          <img src="/src/assets/company3.png" alt="Company 3" />
          <img src="/src/assets/company4.png" alt="Company 4" />
          <img src="/src/assets/company5.png" alt="Company 5" />
          <img src="/src/assets/company6.png" alt="Company 5" /> 
        </div>
      </div>
    </div>
  );
}

export default Home;
