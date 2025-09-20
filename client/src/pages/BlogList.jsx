import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BlogList() {
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
    <div className="container text-light">
      <br></br>
<br></br>
      <h1 className="mb-4">Our Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="card mb-4 p-3 shadow-lg bg-dark text-light border-0"
          >
            {blog.coverImage && (
              <img
                src={`${API_URL}/uploads/blogs/${blog.coverImage}`}
                alt={blog.title}
                className="img-fluid mb-3 rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}
            <h3>{blog.title}</h3>
            <p className="text-muted small">
              By {blog.author?.username || "Admin"} •{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p>{blog.excerpt}</p>
            <Link to={`/blog/${blog.slug}`} className="btn btn-outline-light">
              Read More →
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
