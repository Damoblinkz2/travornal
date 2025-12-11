import { useState } from "react";
import styles from "./Signup.module.css";
import PageNav from "../components/pageNav";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:3000";

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Handle Sign logic here

      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      console.log({ email, username, password });
      //   const data = await res.json();
      await res.json();

      if (res.ok) {
        //   localStorage.setItem("token", data.access_token);
        navigate("/login");
      }
    } catch (error) {
      setSignUpError("An error occurred during signup");
      console.error("Signup error:", error);
    }
  };

  return (
    <main className={styles.signup}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Create Account</h1>
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
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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

        <p className="login-message">{signUpError}</p>

        <div className={styles.cta}>
          <Button type="primary">Create Account</Button>
        </div>

        <Link to="/login">
          <h4 className={styles.login}>Already have an account? Login</h4>
        </Link>
      </form>
    </main>
  );
}
