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
  FaCalendar,
  FaUserLock,
  FaRProject,
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

  // Services state
  const [services, setServices] = useState([]);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceIcon, setServiceIcon] = useState(null);

  // Events
  const [events, setEvents] = useState([]);
  const [evTitle, setEvTitle] = useState("");
  const [evDescription, setEvDescription] = useState("");
  const [evDetails, setEvDetails] = useState("");
  const [evDate, setEvDate] = useState("");
  const [evVenue, setEvVenue] = useState("");
  const [evCategory, setEvCategory] = useState("");
  const [evCover, setEvCover] = useState(null);
  const [evImages, setEvImages] = useState([]);
  const [eventMsg, setEventMsg] = useState("");

  // Projects state
  const [projects, setProjects] = useState([]);
  const [pTitle, setPTitle] = useState("");
  const [pClient, setPClient] = useState("");
  const [pSummary, setPSummary] = useState("");
  const [pDetails, setPDetails] = useState("");
  const [pYear, setPYear] = useState("");
  const [pLink, setPLink] = useState("");
  const [pFeatured, setPFeatured] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  // const [coverFile, setCoverFile] = useState(null);
  const [pMsg, setPMsg] = useState("");

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
    fetchServices();
    fetchEvents();
    fetchProjects();
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

  async function fetchEvents() {
    try {
      const res = await axios.get(`${API_URL}/api/events`);
      setEvents(res.data || []);
    } catch (err) {
      console.error("fetchEvents:", err);
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
    setTags(Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "");
    setCoverFile(null);
    setPreview(
      blog.coverImage ? `${API_URL}/uploads/blogs/${blog.coverImage}` : null
    );
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

  async function handleDeleteInquiry(id) {
    if (!window.confirm("Are you sure you want to delete this inquiry?"))
      return;
    try {
      await axios.delete(`${API_URL}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
    } catch (err) {
      console.error("Delete inquiry failed:", err);
    }
  }

  async function fetchServices() {
    try {
      const res = await axios.get(`${API_URL}/api/services`);
      setServices(res.data || []);
    } catch (err) {
      console.error("fetchServices:", err);
    }
  }

  function handleCoverChange(e) {
    setEvCover(e.target.files[0] || null);
  }

  function handleImagesChange(e) {
    setEvImages([...e.target.files]);
  }

  async function submitEvent(e) {
    e.preventDefault();
    setEventMsg("Saving...");
    try {
      const formData = new FormData();
      formData.append("title", evTitle);
      formData.append("description", evDescription);
      formData.append("details", evDetails);
      formData.append("date", evDate);
      formData.append("venue", evVenue);
      formData.append("category", evCategory);
      if (evCover) formData.append("coverImage", evCover);
      evImages.forEach((file) => formData.append("images", file));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(`${API_URL}/api/events`, formData, config);
      setEventMsg("Event created successfully");
      resetEventForm();
      fetchEvents();
    } catch (err) {
      console.error("submitEvent:", err);
      setEventMsg(err.response?.data?.msg || "Failed to save event");
    }
  }

  function resetEventForm() {
    setEvTitle("");
    setEvDescription("");
    setEvDetails("");
    setEvDate("");
    setEvVenue("");
    setEvCategory("");
    setEvCover(null);
    setEvImages([]);
    setEventMsg("");
  }

  async function handleDeleteEvent(id) {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`${API_URL}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      console.error("deleteEvent:", err);
    }
  }

  async function handleAddImages(id, files) {
    if (!files.length) return;
    try {
      const formData = new FormData();
      for (let f of files) {
        formData.append("images", f);
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.put(`${API_URL}/api/events/${id}/images`, formData, config);
      fetchEvents();
    } catch (err) {
      console.error("addImages:", err);
    }
  }

  async function handleDeleteImage(id, imgName) {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`${API_URL}/api/events/${id}/image/${imgName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      console.error("deleteImage:", err);
    }
  }

  function handleCancelEdit() {
    resetForm();
  }
  async function fetchProjects() {
    try {
      const res = await axios.get(`${API_URL}/api/projects`);
      setProjects(res.data || []);
    } catch (err) {
      console.error("fetchProjects:", err);
    }
  }

  async function submitProject(e) {
    e.preventDefault();
    setPMsg("Saving...");
    try {
      const formData = new FormData();
      formData.append("title", pTitle);
      formData.append("clientName", pClient);
      formData.append("summary", pSummary);
      formData.append("details", pDetails);
      formData.append("year", pYear);
      formData.append("link", pLink);
      formData.append("featured", pFeatured);

      if (logoFile) formData.append("logo", logoFile);
      if (coverFile) formData.append("coverImage", coverFile);

      await axios.post(`${API_URL}/api/projects`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPMsg("Project created!");
      resetProjectForm();
      fetchProjects();
    } catch (err) {
      console.error("submitProject:", err);
      setPMsg(err.response?.data?.msg || "Failed to save project");
    }
  }

  function resetProjectForm() {
    setPTitle("");
    setPClient("");
    setPSummary("");
    setPDetails("");
    setPYear("");
    setPLink("");
    setPFeatured(false);
    setLogoFile(null);
    setCoverFile(null);
    setPMsg("");
  }

  async function handleDeleteProject(id) {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("deleteProject:", err);
    }
  }

  async function handleToggleFeatured(id, featured) {
    try {
      await axios.patch(`${API_URL}/api/projects/${id}/feature`, { featured }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (err) {
      console.error("toggleFeatured:", err);
    }
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
          <li
            className={activeTab === "blogs" ? "active" : ""}
            onClick={() => setActiveTab("blogs")}
          >
            <FaBlog className="me-2" /> Blogs
          </li>
          <li
            className={activeTab === "inquiries" ? "active" : ""}
            onClick={() => setActiveTab("inquiries")}
          >
            <FaEnvelope className="me-2" /> Inquiries
          </li>
          <li
            className={activeTab === "services" ? "active" : ""}
            onClick={() => setActiveTab("services")}
          >
            <FaCogs className="me-2" /> Services
          </li>
          <li
            className={activeTab === "events" ? "active" : ""}
            onClick={() => setActiveTab("events")}
          >
            <FaCalendar className="me-2" /> Events
          </li>
          <li
            className={activeTab === "projects" ? "active" : ""}
            onClick={() => setActiveTab("projects")}
          >
            <FaCogs className="me-2" /> Projects
          </li>

          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            <FaUserShield className="me-2" /> Users
          </li>
        </ul>

        <div className="mt-auto">
          <button
            className="btn btn-outline-light w-100"
            onClick={handleLogout}
          >
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
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    resetForm();
                    setActiveTab("blogs");
                  }}
                >
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
                <label className="form-label">
                  Cover image (optional, replace on edit)
                </label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
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
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancelEdit}
                  >
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
                  <div
                    key={b._id}
                    className="card card-dark p-3 mb-2 d-flex align-items-center"
                  >
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
                        <p className="mb-0 small text-muted">
                          By {b.author?.username || "admin"} •{" "}
                          {fmtDate(b.createdAt)}
                        </p>
                        <div className="mt-2">
                          <button
                            className="btn btn-sm btn-outline-light me-2"
                            onClick={() => handleEdit(b)}
                          >
                            <FaEdit className="me-1" /> Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(b._id)}
                          >
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
          <div className="mb-5">
            <h5 className="mb-3">All Inquiries</h5>

            {inquiries.length === 0 ? (
              <p className="text-muted">No inquiries yet.</p>
            ) : (
              inquiries.map((inq) => (
                <div key={inq._id} className="card card-dark p-3 mb-2">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{inq.name}</strong> • <span>{inq.email}</span>
                      <p className="mb-1 small">
                        {inq.phone} | {inq.company} | {inq.country}
                      </p>
                      <p className="mb-1">
                        <strong>{inq.jobTitle}</strong>
                      </p>
                      <p className="mb-1">{inq.jobDetails}</p>
                      <p className="mb-1">{inq.message}</p>
                    </div>
                    <div className="d-flex flex-column">
                      {/* redirects to gmail with email address filled in with default message */}
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                          inq.email
                        )}&su=Regarding your inquiry&body=${encodeURIComponent(
                          `Hello ${inq.name},\n\nThank you for reaching out to us regarding your inquiry about ${inq.jobTitle}. We appreciate your interest in our services and will get back to you shortly.\n\nBest regards,\nAI Solutions`
                        )}`}
                      >
                        <button className="btn btn-sm btn-primary mb-2">
                          Reply
                        </button>
                      </a>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteInquiry(inq._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                   <hr />
                </div>
                
              ))
            )}
            
          </div>
         
        )}

        {/* SERVICES MANAGEMENT */}
        {activeTab === "services" && (
          <section id="services-section">
            <h2 className="mb-3">Services Management</h2>

            {/* Create Service Form */}
            <form
              className="card card-dark p-3 mb-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setStatusMsg("Saving...");

                try {
                  const formData = new FormData();
                  formData.append("title", serviceTitle);
                  formData.append("description", serviceDesc);
                  formData.append("category", serviceCategory);
                  if (serviceIcon) formData.append("icon", serviceIcon);

                  await axios.post(`${API_URL}/api/services`, formData, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "multipart/form-data",
                    },
                  });

                  setStatusMsg("Service created successfully");
                  setServiceTitle("");
                  setServiceDesc("");
                  setServiceCategory("");
                  setServiceIcon(null);
                  await fetchServices();
                } catch (err) {
                  console.error("createService:", err);
                  setStatusMsg(
                    err.response?.data?.msg || "Failed to save service"
                  );
                }
              }}
            >
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Service Title"
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  placeholder="Service Description"
                  rows="3"
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Category (optional)"
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Icon (optional)</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setServiceIcon(e.target.files[0])}
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Create Service
                </button>
                <span className="ms-auto text-muted">{statusMsg}</span>
              </div>
            </form>

            {/* List Services */}
            <div className="mb-5">
              <h5 className="mb-3">All Services</h5>
              {services.length === 0 ? (
                <p className="text-muted">No services yet.</p>
              ) : (
                services.map((s) => (
                  <div
                    key={s._id}
                    className="card card-dark p-3 mb-2 d-flex align-items-center"
                  >
                    <div className="d-flex w-100 gap-3 align-items-center">
                      <div style={{ width: 80 }}>
                        {s.icon ? (
                          <img
                            src={`${API_URL}/uploads/blogs/${s.icon}`}
                            alt="icon"
                            className="img-thumb"
                          />
                        ) : (
                          <div className="no-thumb">No Icon</div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{s.title}</h6>
                        <p className="mb-1 small text-muted">{s.category}</p>
                        <p className="mb-0">{s.description}</p>
                        <div className="mt-2">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={async () => {
                              if (!window.confirm("Delete this service?"))
                                return;
                              try {
                                await axios.delete(
                                  `${API_URL}/api/services/${s._id}`,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                setServices((prev) =>
                                  prev.filter((srv) => srv._id !== s._id)
                                );
                              } catch (err) {
                                console.error("deleteService:", err);
                                alert("Delete failed");
                              }
                            }}
                          >
                            Delete
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

        {/* EVENTS MANAGEMENT */}
        {activeTab === "events" && (
          <section id="events-section">
            <h2 className="mb-3">Event Management</h2>

            {/* Create Form */}
            <form className="card card-dark p-3 mb-4" onSubmit={submitEvent}>
              <input
                className="form-control mb-2"
                placeholder="Title"
                value={evTitle}
                onChange={(e) => setEvTitle(e.target.value)}
                required
              />
              <textarea
                className="form-control mb-2"
                placeholder="Short Description"
                value={evDescription}
                onChange={(e) => setEvDescription(e.target.value)}
                required
              />
              <textarea
                className="form-control mb-2"
                placeholder="Detailed Info"
                value={evDetails}
                onChange={(e) => setEvDetails(e.target.value)}
              />
              <input
                className="form-control mb-2"
                type="date"
                value={evDate}
                onChange={(e) => setEvDate(e.target.value)}
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Venue"
                value={evVenue}
                onChange={(e) => setEvVenue(e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="Category (e.g., Hackathon2025)"
                value={evCategory}
                onChange={(e) => setEvCategory(e.target.value)}
              />
              <label className="form-label">Cover Image</label>
              <input
                type="file"
                className="form-control mb-2"
                onChange={handleCoverChange}
              />
              <label className="form-label">Gallery Images</label>
              <input
                type="file"
                multiple
                className="form-control mb-2"
                onChange={handleImagesChange}
              />
              <button type="submit" className="btn btn-primary">
                Create Event
              </button>
              <span className="ms-3 text-muted">{eventMsg}</span>
            </form>

            {/* Event List */}
            <h5>All Events</h5>
            {events.length === 0 ? (
              <p className="text-muted">No events yet.</p>
            ) : (
              events.map((ev) => (
                <div
                  key={ev._id}
                  className="card card-dark p-3 mb-3 border-dark"
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>{ev.title}</h4>
                      {ev.coverImage && (
                        <img
                          src={`${API_URL}/uploads/events/${ev.coverImage}`}
                          alt="cover"
                          style={{
                            width: "150px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          className="me-3"
                        />
                      )}

                      <p className="small text-muted italic">
                        {new Date(ev.date).toLocaleDateString()} @ {ev.venue}
                      </p>
                      <p>{ev.description}</p>
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteEvent(ev._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <hr />
                  {/* Manage Images */}
                  <div className="mt-2">
                    <h6>Manage Images</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {ev.images?.map((img) => (
                        <div key={img} className="position-relative">
                          <img
                            src={`${API_URL}/uploads/events/${img}`}
                            alt="gallery"
                            style={{
                              width: "100px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                          <button
                            className="btn btn-sm btn-danger position-absolute top-0 end-0 "
                            onClick={() => handleDeleteImage(ev._id, img)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="file"
                      multiple
                      className="form-control mt-2"
                      onChange={(e) =>
                        handleAddImages(ev._id, [...e.target.files])
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* PROJECTS MANAGEMENT */}
        
        {activeTab === "projects" && (
          <section id="projects-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">Project Management</h2>
            </div>

            {/* Form */}
            <form className="card card-dark p-3 mb-4" onSubmit={submitProject}>
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Project Title"
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Client Name"
                  value={pClient}
                  onChange={(e) => setPClient(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Summary"
                  value={pSummary}
                  onChange={(e) => setPSummary(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  placeholder="Details"
                  rows="4"
                  value={pDetails}
                  onChange={(e) => setPDetails(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="Year"
                  type="number"
                  value={pYear}
                  onChange={(e) => setPYear(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  placeholder="External Link"
                  value={pLink}
                  onChange={(e) => setPLink(e.target.value)}
                />
              </div>

              <div className="form-check mb-2">
                {/* Default value should be unfeatured */}
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="featuredCheck"
                  checked={pFeatured}
                  onChange={(e) => setPFeatured(e.target.checked)}
                />
                <label htmlFor="featuredCheck" className="form-check-label">
                  Featured Project
                </label>
              </div>

              <div className="mb-2">
                <label className="form-label">Logo (optional)</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Cover Image (optional)</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Create Project
                </button>
                <span className="ms-auto text-muted">{pMsg}</span>
              </div>
            </form>

            {/* Project list */}
            <div className="mb-5">
              <h5 className="mb-3">All Projects</h5>
              {projects.length === 0 ? (
                <p className="text-muted">No projects yet.</p>
              ) : (
                projects.map((p) => (
                  <div
                    key={p._id}
                    className="card card-dark p-3 mb-2 d-flex align-items-center"
                  >
                    <div className="d-flex w-100 gap-3 align-items-center">
                      <div style={{ width: 120 }}>
                        {p.coverImage ? (
                          <img
                            src={`${API_URL}/uploads/projects/${p.coverImage}`}
                            alt="cover"
                            className="img-thumb"
                          />
                        ) : (
                          <div className="no-thumb">No cover</div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{p.title}</h6>
                        <p className="mb-1 small text-muted">
                          {p.clientName} • {p.year}
                        </p>
                        <p className="mb-1 small">{p.summary}</p>
                        {p.featured && (
                          <span className="badge bg-success">Featured</span>
                        )}

                        <div className="mt-2 d-flex gap-2">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteProject(p._id)}
                          >
                            <FaTrash className="me-1" /> Delete
                          </button>
                        {/* Feature toggle (buttons with respective colors for feature and unfeature)*/}
                        
                        <button
                          className={`btn btn-sm ${p.featured ? "btn-warning" : "btn-success"}`}
                          onClick={() => handleToggleFeatured(p._id, !p.featured)}                        >
                          {p.featured ? "Unfeature" : "Feature"}
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

        {/* Users (placeholder) */}
        {activeTab === "users" && (
          <section id="users-section">
            <h2>User / Admin Management</h2>
            <p className="text-muted">
              Add new admins and manage users here (coming soon).
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
