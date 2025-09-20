import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="container">
      <h1 className="mb-4">Our Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map((b) => (
          <div key={b._id} className="card mb-4 p-3 shadow">
            {b.coverImage && (
              <img
                src={`${API_URL}/uploads/blogs/${b.coverImage}`}
                alt="cover"
                className="img-fluid mb-3"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}
            <h3>{b.title}</h3>
            <p className="text-muted">
              By {b.author?.username || "Admin"} •{" "}
              {new Date(b.createdAt).toLocaleDateString()}
            </p>
            <p>{b.excerpt}</p>
            {/* Later: link to full blog detail page */}
          </div>
        ))
      )}
    </div>
  );
}
