import { useState } from "react";
import "../styles/auth.css";
import Logo from "../components/Logo";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import qs from "qs";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/User/create_user", { name, email, password });

      const data = qs.stringify({
        username: email,
        password,
        grant_type: "password",
      });

      const response = await api.post("/login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token } = response.data;
      login(access_token);
      navigate("/dashboard");
    } catch (err) {
      let message = "Something went wrong. Please try again.";

      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (Array.isArray(detail)) {
          message = detail
            .map((d) => {
              const loc = d.loc ? d.loc.join(" -> ") : "";
              return loc ? `${loc}: ${d.msg}` : d.msg;
            })
            .join(", ");
        } else if (typeof detail === "string") {
          message = detail;
        } else if (typeof detail === "object") {
          message = JSON.stringify(detail);
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <Logo />

        <p className="subtitle">Sign up to Login</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="redirect">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
