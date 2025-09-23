// client/src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

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

  if (!blog) return <p className="text-center">Loading...</p>;

  return (
    <div className="container py-5">
      {blog.coverImage && (
        <img
          src={`${API_URL}/uploads/blogs/${blog.coverImage}`}
          alt="cover"
          className="img-fluid mb-4 rounded shadow"
          style={{ maxHeight: "450px", objectFit: "cover", width: "100%" }}
        />
      )}
      <h1 className="mb-3">{blog.title}</h1>
      <p className="text-muted">
        By {blog.author?.username || "Admin"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div
        className="mt-4"
        style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <hr className="my-4" />
      <Link to="/blog" className="btn btn-outline-light">
        ← Back to Blogs
      </Link>
    </div>
  );
}
