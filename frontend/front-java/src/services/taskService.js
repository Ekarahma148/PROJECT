import axios from "axios";

const API = import.meta.env.VITE_API;

const authHeader = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllTask = () => {
  return axios.get(
    `${API}/taskSvc/tasks/getAllTask`,
    authHeader()
  );
};

export const createTask = (data) => {
  return axios.post(
    `${API}/taskSvc/tasks/insertTask`,
    data,
    authHeader()
  );
};

export const updateTask = (data) => {
  return axios.put(
    `${API}/taskSvc/tasks/updateTask`,
    data,
    authHeader()
  );
};

export const deleteTask = (id) => {
  return axios.delete(
    `${API}/taskSvc/tasks/deleteTask`,
    {
      ...authHeader(),
      data: {
        idReq: id,
      },
    }
  );
};

export const getTasks = (
  userId,
  page,
  size,
  title,
  status,
  priority
) => {
  return axios.get(
    `${API}/taskSvc/tasks/list?userId=${userId}&page=${page}&size=${size}&title=${title}&status=${status}&priority=${priority}`,
    authHeader()
  );
};