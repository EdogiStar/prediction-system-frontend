import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../services/auth.service";

const AuthContext = createContext(null);

const TOKEN_KEY = "disease_prediction_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(() =>
    localStorage.getItem(TOKEN_KEY)
  );

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Restore authentication on page refresh
  // ==========================================

  useEffect(() => {
    const restoreAuth = async () => {
      const savedToken = localStorage.getItem(TOKEN_KEY);

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser(savedToken);

        setToken(savedToken);
        setUser(response.data);
      } catch (error) {
        // Invalid or expired token
        localStorage.removeItem(TOKEN_KEY);

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);

  // ==========================================
  // Login
  // ==========================================

  const login = async (email, password) => {
    const response = await loginUser({
      email,
      password,
    });

    const { user, token } = response.data;

    // Save token only after successful login
    localStorage.setItem(TOKEN_KEY, token);

    setToken(token);
    setUser(user);

    return user;
  };

  // ==========================================
  // Register
  // ==========================================

  const register = async (name, email, password) => {
    const response = await registerUser({
      name,
      email,
      password,
    });

    // Registration creates the account only.
    // Do NOT save the returned token.
    // User must sign in manually after registration.

    return response.data.user;
  };

  // ==========================================
  // Logout
  // ==========================================

  const logout = () => {
    logoutUser();

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

    isAuthenticated: Boolean(user && token),

    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// Custom hook
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