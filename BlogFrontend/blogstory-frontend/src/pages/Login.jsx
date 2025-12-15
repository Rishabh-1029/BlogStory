import { useState } from "react";
import "../styles/auth.css";
import Logo from "../components/Logo";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import qs from "qs";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = qs.stringify({
        username,
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
      let message = "Invalid username or password";

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

        <p className="subtitle">Login to continue</p>

        <input
          type="text"
          placeholder="Username / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="redirect">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
