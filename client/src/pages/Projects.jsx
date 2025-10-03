import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAcquisitionsIncorporated, FaAddressBook, FaAddressCard, FaUser } from "react-icons/fa";
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await axios.get(`${API_URL}/api/projects`);
      const sorted = res.data.sort((a, b) => (b.featured === true) - (a.featured === true));
      setProjects(sorted);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Our Projects</h1>
      <div className="row">
        {projects.length === 0 ? (
          <p className="text text-center">No projects yet.</p>
        ) : (
          projects.map((p) => (
            <div key={p._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-lg bg-dark text-light border-0 rounded-3 overflow-hidden project-card">
                {p.coverImage && (
                  <img
                    src={`${API_URL}/uploads/projects/${p.coverImage}`}
                    alt={p.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                {p.logo && (
                  <img
                    src={`${API_URL}/uploads/projects/${p.logo}`}
                    alt="logo"
                    className="rounded-circle border border-3 border-white position-absolute"
                    style={{
                      width: "70px",
                      height: "70px",
                      top: "150px",
                      left: "20px",
                      objectFit: "contain",
                      backgroundColor: "#fff",
                    }}
                  />
                )}

                <div className="card-body mt-4">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="text small mb-2"><FaAddressBook /> {p.clientName}</p>
                  <p className="card-text">{p.summary}</p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light btn-sm mt-2"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
