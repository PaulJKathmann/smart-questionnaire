import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/tasks';

export const fetchTasks = () => {
  return axios.get(API_URL);
};

export const createTask = (task) => {
  return axios.post(API_URL, task);
};

export const apiUpdateTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task);
};

export const apiDeleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
