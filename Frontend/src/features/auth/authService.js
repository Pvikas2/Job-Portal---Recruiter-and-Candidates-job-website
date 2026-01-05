import API from "../../services/api";

const register = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};

const authService = {
  register,
  login,
};

export default authService;
