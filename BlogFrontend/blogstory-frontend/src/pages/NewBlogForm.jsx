import { useState } from "react";
import api from "../api/api";
import "../styles/dashboard.css";
import { useAuth } from "../context/AuthContext";

export default function NewBlogForm({ onNewBlog }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/Blog/create_Blog",
        { title, body },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onNewBlog(response.data);
      setTitle("");
      setBody("");
    } catch (err) {
      setError("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="new-blog-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your blog..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
}
