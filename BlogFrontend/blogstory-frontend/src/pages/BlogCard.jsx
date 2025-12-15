import React from "react";
import "../styles/dashboard.css";
export default function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.body}</p>
      <p className="creator">By: {blog.creator?.name || "Unknown"}</p>
    </div>
  );
}
2;
