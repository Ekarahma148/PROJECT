import axios from "axios";

const API = import.meta.env.VITE_API;

export const registerUser = async (data) => {
  return axios.post(
    `${API}/userSvc/users/register`,
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
    `${API}/userSvc/users/getAllUser`,
    authHeader()
  );
};

export const updateUser = (data) => {
  return axios.put(
    `${API}/userSvc/users/updateUser`,
    data,
    authHeader()
  );
};

export const deleteUser = (id) => {
  return axios.delete(
    `${API}/userSvc/users/deleteUser`,
    {
      ...authHeader(),
      data: {
        idReq: id,
      },
    }
  );
};