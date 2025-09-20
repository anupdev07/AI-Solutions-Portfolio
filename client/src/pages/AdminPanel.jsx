import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBlog,
  FaEnvelope,
  FaCogs,
  FaUserShield,
  FaSignOutAlt,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import "../styles/AdminPanel.css";

export default function AdminPanel() {
  const navigate = useNavigate();

  // API base - change if your backend is on another host/port
  const API_URL = "http://localhost:5000";

  const [activeTab, setActiveTab] = useState("blogs");
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Form state for create/edit
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  const token = localStorage.getItem("token");

  // Guard: redirect non-admins (double-check)
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.role !== "admin") {
        navigate("/login");
      }
    } catch (e) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchInquiries();
    // eslint-disable-next-line
  }, []);

  async function fetchBlogs() {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data || []);
    } catch (err) {
      console.error("fetchBlogs:", err);
    }
  }

  async function fetchInquiries() {
    try {
      const res = await axios.get(`${API_URL}/api/contact`);
      setInquiries(res.data || []);
    } catch (err) {
      console.error("fetchInquiries:", err);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setCoverFile(file || null);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  function resetForm() {
    setTitle("");
    setExcerpt("");
    setContent("");
    setTags("");
    setCoverFile(null);
    setPreview(null);
    setEditingId(null);
    setStatusMsg("");
  }

  async function submitBlog(e) {
    e.preventDefault();
    setStatusMsg("Saving...");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("tags", tags); // backend will split by comma
      if (coverFile) formData.append("coverImage", coverFile);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingId) {
        await axios.put(`${API_URL}/api/blogs/${editingId}`, formData, config);
        setStatusMsg("Blog updated successfully");
      } else {
        await axios.post(`${API_URL}/api/blogs`, formData, config);
        setStatusMsg("Blog created successfully");
      }

      await fetchBlogs();
      resetForm();
    } catch (err) {
      console.error("submitBlog:", err);
      setStatusMsg(err.response?.data?.msg || "Failed to save blog");
    }
  }

  async function handleEdit(blog) {
    setEditingId(blog._id);
    setTitle(blog.title || "");
    setExcerpt(blog.excerpt || "");
    setContent(blog.content || "");
    setTags(Array.isArray(blog.tags) ? blog.tags.join(", ") : (blog.tags || ""));
    setCoverFile(null);
    setPreview(blog.coverImage ? `${API_URL}/uploads/blogs/${blog.coverImage}` : null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveTab("blogs");
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("handleDelete:", err);
      alert("Delete failed");
    }
  }

  function handleCancelEdit() {
    resetForm();
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  // Utility to format date
  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h4>Admin</h4>
        </div>

        <ul className="admin-nav">
          <li className={activeTab === "blogs" ? "active" : ""} onClick={() => setActiveTab("blogs")}>
            <FaBlog className="me-2" /> Blogs
          </li>
          <li className={activeTab === "inquiries" ? "active" : ""} onClick={() => setActiveTab("inquiries")}>
            <FaEnvelope className="me-2" /> Inquiries
          </li>
          <li className={activeTab === "services" ? "active" : ""} onClick={() => setActiveTab("services")}>
            <FaCogs className="me-2" /> Services
          </li>
          <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
            <FaUserShield className="me-2" /> Users
          </li>
        </ul>

        <div className="mt-auto">
          <button className="btn btn-logout w-100" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* BLOG MANAGEMENT */}
        {activeTab === "blogs" && (
          <section id="blogs-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">Blog Management</h2>
              <div>
                <button className="btn btn-secondary me-2" onClick={() => { resetForm(); setActiveTab("blogs"); }}>
                  New Post
                </button>
              </div>
            </div>

            {/* Form */}
            <form className="card card-dark p-3 mb-4" onSubmit={submitBlog}>
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Excerpt (short summary)"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  placeholder="Content (HTML or Markdown)"
                  rows="6"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Cover image (optional, replace on edit)</label>
                <input className="form-control" type="file" accept="image/*" onChange={handleFileChange} />
              </div>

              {preview && (
                <div className="mb-2">
                  <p className="small">Preview:</p>
                  <img src={preview} alt="preview" className="img-preview" />
                </div>
              )}

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Update Blog" : "Create Blog"}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-outline-secondary" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                )}
                <span className="ms-auto text-muted">{statusMsg}</span>
              </div>
            </form>

            {/* Blog list */}
            <div className="mb-5">
              <h5 className="mb-3">All Posts</h5>
              {blogs.length === 0 ? (
                <p className="text-muted">No blog posts yet.</p>
              ) : (
                blogs.map((b) => (
                  <div key={b._id} className="card card-dark p-3 mb-2 d-flex align-items-center">
                    <div className="d-flex w-100 gap-3 align-items-center">
                      <div style={{ width: 120 }}>
                        {b.coverImage ? (
                          <img
                            src={`${API_URL}/uploads/blogs/${b.coverImage}`}
                            alt="cover"
                            className="img-thumb"
                          />
                        ) : (
                          <div className="no-thumb">No image</div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{b.title}</h6>
                        <p className="mb-1 small text-muted">{b.excerpt}</p>
                        <p className="mb-0 small text-muted">By {b.author?.username || "admin"} • {fmtDate(b.createdAt)}</p>
                        <div className="mt-2">
                          <button className="btn btn-sm btn-outline-light me-2" onClick={() => handleEdit(b)}>
                            <FaEdit className="me-1" /> Edit
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b._id)}>
                            <FaTrash className="me-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* INQUIRIES */}
        {activeTab === "inquiries" && (
          <section id="inquiries-section">
            <h2>User Inquiries</h2>
            {inquiries.length === 0 ? (
              <p className="text-muted">No inquiries yet.</p>
            ) : (
              inquiries.map((inq) => (
                <div key={inq._id} className="card card-dark p-3 mb-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{inq.name}</strong> • <span className="text-muted small">{inq.email}</span>
                      <p className="mb-1 small text-muted">{fmtDate(inq.createdAt)}</p>
                      <p className="mb-1">{inq.subject ? <strong>{inq.subject}</strong> : null}</p>
                      <p className="mb-1">{inq.message}</p>
                    </div>
                    <div>
                      <a className="btn btn-sm btn-primary" href={`mailto:${inq.email}`}><FaEnvelope className="me-1" /> Reply</a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* Services (placeholder) */}
        {activeTab === "services" && (
          <section id="services-section">
            <h2>Services Management</h2>
            <p className="text-muted">This area will let you CRUD services later.</p>
          </section>
        )}

        {/* Users (placeholder) */}
        {activeTab === "users" && (
          <section id="users-section">
            <h2>User / Admin Management</h2>
            <p className="text-muted">Add new admins and manage users here (coming soon).</p>
          </section>
        )}
      </main>
    </div>
  );
}
