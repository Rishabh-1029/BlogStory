import { useState, useEffect } from "react";
import api from "../api/api";
import BlogCard from "./BlogCard";
import NewBlogForm from "./NewBlogForm";
import "../styles/dashboard.css";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/Blog/get_All_Blog", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(response.data);
      } catch (err) {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]);

  return (
    <div className="dashboard-container">
      <h1>Blogstory</h1>

      <NewBlogForm onNewBlog={(blog) => setBlogs([blog, ...blogs])} />

      {loading && <p>Loading blogs...</p>}
      {error && <p className="error">{error}</p>}

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
