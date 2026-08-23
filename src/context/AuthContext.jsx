import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Get current user
  // ==========================================

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/users/me");

      setUser(response.data?.data || null);

      return response.data?.data;
    } catch (error) {
      console.error(
        "Failed to fetch current user:",
        error
      );

      // Invalid/expired token
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }

      return null;
    }
  };

  // ==========================================
  // Restore authentication on app startup
  // ==========================================

  useEffect(() => {
    const restoreAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      await fetchCurrentUser();

      setLoading(false);
    };

    restoreAuth();
  }, [token]);

  // ==========================================
  // Login
  // ==========================================

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const data = response.data?.data;

    if (!data?.token) {
      throw new Error("Authentication token was not returned.");
    }

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // ==========================================
  // Register
  // ==========================================

  const register = async (
    name,
    email,
    password
  ) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    const data = response.data?.data;

    if (!data?.token) {
      throw new Error("Authentication token was not returned.");
    }

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // ==========================================
  // Logout
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  // ==========================================
  // Context value
  // ==========================================

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
    fetchCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// useAuth hook
// ==========================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}