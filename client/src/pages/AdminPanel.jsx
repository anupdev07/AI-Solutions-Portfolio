import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    coverImage: null,
  });

  const [editBlog, setEditBlog] = useState(null); // holds blog being edited
  const [status, setStatus] = useState("");

  const token = localStorage.getItem("token");

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(editBlog ? "Updating blog..." : "Creating blog...");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      data.append("tags", formData.tags);
      if (formData.coverImage) data.append("coverImage", formData.coverImage);

      if (editBlog) {
        // Update blog
        await axios.put(`http://localhost:5000/api/blogs/${editBlog._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setStatus("Blog updated successfully!");
      } else {
        // Create new blog
        await axios.post("http://localhost:5000/api/blogs", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setStatus("Blog created successfully!");
      }

      setFormData({ title: "", excerpt: "", content: "", tags: "", coverImage: null });
      setEditBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error(error);
      setStatus("Error saving blog");
    }
  };

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      tags: blog.tags.join(", "),
      coverImage: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up to form
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container text-light">
      <h2 className="fw-bold mb-4">Admin Panel - Blog Management</h2>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="card card-custom p-4 mb-5">
        <h4 className="mb-3">{editBlog ? "Edit Blog" : "Create New Blog"}</h4>
        <div className="mb-3">
          <input type="text" name="title" placeholder="Title" className="form-control"
            value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" name="excerpt" placeholder="Excerpt" className="form-control"
            value={formData.excerpt} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea name="content" placeholder="Content" className="form-control" rows="6"
            value={formData.content} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <input type="text" name="tags" placeholder="Tags (comma separated)" className="form-control"
            value={formData.tags} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input type="file" name="coverImage" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-custom w-100">
          {editBlog ? "Update Blog" : "Create Blog"}
        </button>
        {status && <p className="mt-3">{status}</p>}
      </form>

      {/* Blog List */}
      <h4>All Blogs</h4>
      <div className="list-group">
        {blogs.map((blog) => (
          <div key={blog._id} className="list-group-item card-custom mb-3 p-3">
            <h5>{blog.title}</h5>
            <p>{blog.excerpt}</p>
            {blog.coverImage && (
              <img
                src={`http://localhost:5000/uploads/blogs/${blog.coverImage}`}
                alt="Cover"
                style={{ maxWidth: "200px", borderRadius: "6px" }}
              />
            )}
            <div className="mt-2">
              <button className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(blog)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm"
                onClick={() => handleDelete(blog._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
