import { useState, useEffect, useMemo } from "react";
import api from "../api/api";
import BlogCard from "./BlogCard";
import NewBlogForm from "./NewBlogForm";
import "../styles/dashboard.css";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token, user } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [view, setView] = useState("all");
  const [search, setSearch] = useState("");

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

  const filteredBlogs = useMemo(() => {
    if (view !== "all") return [];

    if (!search.trim()) return blogs;

    return blogs.filter((blog) => {
      const query = search.toLowerCase();
      return (
        blog.title?.toLowerCase().includes(query) ||
        blog.content?.toLowerCase().includes(query)
      );
    });
  }, [blogs, search, view]);

  const myBlogs = useMemo(() => {
    return blogs.filter((blog) => blog.creatorId === user?.username);
  }, [blogs, user]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Blogstory</h1>
          <p className="user-info">Welcome</p>
        </div>

        <div className="dashboard-actions">
          <button
            className={view === "all" ? "active" : ""}
            onClick={() => setView("all")}
          >
            All Blogs
          </button>
          <button
            className={view === "my" ? "active" : ""}
            onClick={() => setView("my")}
          >
            My Blogs
          </button>
        </div>
      </header>

      {view === "all" && (
        <input
          type="text"
          placeholder="Search blogs..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {view === "my" && (
        <>
          <NewBlogForm onNewBlog={(blog) => setBlogs([blog, ...blogs])} />

          <div className="blogs-grid">
            {myBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}

      {view === "all" && (
        <>
          {loading && <p className="loading">Loading blogs...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && filteredBlogs.length === 0 && search && (
            <p className="loading">No blogs match your search.</p>
          )}

          <div className="blogs-grid">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
