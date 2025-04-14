import axios from 'axios';

const BASE_URL = 'https://backend-zo7d.onrender.com'; // or your deployed backend URL

export const register = (data) =>
  axios.post(`${BASE_URL}/api/auth/register`, data);

export const login = (data) =>
  axios.post(`${BASE_URL}/api/auth/login`, data);

export const uploadAvatar = (formData) =>
  axios.post(`${BASE_URL}/api/upload/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const getUsers = () =>
  axios.get(`${BASE_URL}/api/auth/users`);
    
export const getMessages = () =>
  axios.get(`${BASE_URL}/api/messages`);

export const postMessage = (data, token) =>
  axios.post(`${BASE_URL}/api/messages`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteMessage = (id, token) =>
  axios.delete(`${BASE_URL}/api/messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
