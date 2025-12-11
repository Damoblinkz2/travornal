import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/pageNav";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:3000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here

    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      navigate("/app/cities");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login to Your Account</h1>
        <div className={styles.row}>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <p className="login-message">{loginError}</p>

        <div className={styles.cta}>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
