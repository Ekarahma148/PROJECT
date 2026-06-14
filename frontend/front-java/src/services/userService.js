import axios from "axios";

const USER_API = import.meta.env.VITE_USER_API;

export const registerUser = async (data) => {
  return axios.post(
    `${USER_API}/users/register`,
    data
  );
};