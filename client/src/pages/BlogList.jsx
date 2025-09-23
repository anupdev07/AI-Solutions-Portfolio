import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const API_URL = "http://localhost:5000"; // backend base URL

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Our Blogs</h1>
      <div className="row g-4">
        {blogs.length === 0 ? (
          <p className="text-center">No blogs yet.</p>
        ) : (
          blogs.map((b) => (
            <div key={b._id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow h-100">
                {b.coverImage && (
                  <img
                    src={`${API_URL}/uploads/blogs/${b.coverImage}`}
                    alt="cover"
                    className="card-img-top"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                )}
                {/* dark bootstrap card */}
                <div className="card-body d-flex flex-column bg-dark text-white">
                  <h5 className="card-title">{b.title}</h5>
                  <p className="text-muted small text-white">
                    By {b.author?.username || "Admin"} •{" "}
                    {new Date(b.createdAt).toLocaleDateString()}
                  </p>
                  <p className="card-text">{b.excerpt}</p>
                  <Link
                    to={`/blog/${b.slug}`}
                    className="btn btn-outline-light mt-auto"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
