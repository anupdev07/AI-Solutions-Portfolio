import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, [slug]);

  async function fetchBlog() {
    try {
      const res = await axios.get(`${API_URL}/api/blogs/${slug}`);
      setBlog(res.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  }

  if (!blog) return <p className="text-light">Loading...</p>;

  return (
    <div className="container text-light">
      <h1 className="mb-3">{blog.title}</h1>
      <p className="text-muted small">
        By {blog.author?.username || "Admin"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {blog.coverImage && (
        <img
          src={`${API_URL}/uploads/blogs/${blog.coverImage}`}
          alt={blog.title}
          className="img-fluid mb-4 rounded shadow"
        />
      )}

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blog.content || ""),
        }}
      />

      {blog.tags && blog.tags.length > 0 && (
        <p className="mt-3">
          <strong>Tags:</strong> {blog.tags.join(", ")}
        </p>
      )}

      {/* Back button */}
      <div className="mt-4">
        <Link to="/blog" className="btn btn-outline-light">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
