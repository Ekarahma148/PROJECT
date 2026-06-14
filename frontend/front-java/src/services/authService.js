import axios from "axios";

const TASK_API = import.meta.env.VITE_TASK_API;
const USER_API = import.meta.env.VITE_USER_API;
export const loginJwt = async (data) => {
  return axios.post(
    `${TASK_API}/auth/loginJwt`,
    data
  );
};

export const loginStateful = async (data) => {
  return axios.post(
    `${TASK_API}/auth/login`,
    data,
    {
      withCredentials: true,
    }
  );
};
export const getUserByUsername = (
  username
) => {
  return axios.get(
    `${USER_API}/users/username/${username}`
  );
};