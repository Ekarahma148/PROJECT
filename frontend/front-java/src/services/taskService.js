import axios from "axios";

const API = import.meta.env.VITE_TASK_API;

const authHeader = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllTask = () => {
  return axios.get(
    `${API}/tasks/getAllTask`,
    authHeader()
  );
};

export const createTask = (data) => {
  return axios.post(
    `${API}/tasks/insertTask`,
    data,
    authHeader()
  );
};

export const updateTask = (data) => {
  return axios.put(
    `${API}/tasks/updateTask`,
    data,
    authHeader()
  );
};

export const deleteTask = (id) => {
  return axios.delete(
    `${API}/tasks/deleteTask`,
    {
      ...authHeader(),
      data: {
        idReq: id,
      },
    }
  );
};