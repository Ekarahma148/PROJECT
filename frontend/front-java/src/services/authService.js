import axios from "axios";

const API = import.meta.env.VITE_API;
export const loginJwt = async (data) => {
  return axios.post(
    `${API}/taskSvc/auth/loginJwt`,
    data
  );
};

export const getUserByUsername = (
  username
) => {
  return axios.get(
    `${API}/userSvc/users/username/${username}`
  );
};