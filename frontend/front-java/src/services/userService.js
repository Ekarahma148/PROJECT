import axios from "axios";

const USER_API = import.meta.env.VITE_USER_API;

export const registerUser = async (data) => {
  return axios.post(
    `${USER_API}/users/register`,
    data
  );
};
const authHeader = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllUser = () => {
  return axios.get(
    `${USER_API}/users/getAllUser`,
    authHeader()
  );
};

export const updateUser = (data) => {
  return axios.put(
    `${USER_API}/users/updateUser`,
    data
  );
};

export const deleteUser = (id) => {
  return axios.delete(
    `${USER_API}/users/deleteUser`,
    {
      data: {
        idReq: id,
      },
    }
  );
};