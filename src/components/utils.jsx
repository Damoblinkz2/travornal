import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3000";

export default function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthState({ isLoading: false, isAuthenticated: false });
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          setAuthState({ isLoading: false, isAuthenticated: true });
        } else {
          localStorage.removeItem("token");
          setAuthState({ isLoading: false, isAuthenticated: false });
        }
      } catch (error) {
        localStorage.removeItem("token");
        setAuthState({ isLoading: false, isAuthenticated: false });
        console.error("Error verifying auth:", error);
      }
    };

    validateAuth();
  }, []);

  if (authState.isLoading) {
    return <div>Verifying authentication...</div>;
  }

  if (!authState.isAuthenticated) {
    navigate("/login");
    return;
  }

  return children;
}
