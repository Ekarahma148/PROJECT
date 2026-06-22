import axios from "axios";

const API = import.meta.env.VITE_API;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const downloadExcel = () => {
  return axios.get(
    `${API}/taskSvc/tasks/downloadExcel`,
    {
      ...authHeader(),
      responseType: "blob",
    }
  );
};

export const downloadTemplate = () => {
  return axios.get(
    `${API}/taskSvc/tasks/downloadTemplate`,
    {
      ...authHeader(),
      responseType: "blob",
    }
  );
};

export const uploadExcel = (formData) => {
  return axios.post(
    `${API}/taskSvc/tasks/uploadExcel`,
    formData,
    authHeader()
  );
};

export const downloadMyTask = (userId) => {
  return axios.get(
    `${API}/taskSvc/tasks/downloadExcelUser?userId=${userId}`,
    {
      ...authHeader(),
      responseType: "blob",
    }
  );
};