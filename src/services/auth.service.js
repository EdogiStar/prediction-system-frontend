import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const TOKEN_KEY = "disease_prediction_token";

// ==========================================
// Register
// ==========================================

export const registerUser = async ({
  name,
  email,
  password,
}) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};

// ==========================================
// Login
// ==========================================

export const loginUser = async ({
  email,
  password,
}) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};

// ==========================================
// Get current user
// ==========================================

export const getCurrentUser = async (token) => {
  const response = await axios.get(
    `${API_URL}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==========================================
// Logout
// ==========================================

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};