// import axios from 'axios';
import axios from '../setup/axios';

// register
const RegisterUser = (email, username, phone, password) => {
  return axios.post('/api/register', { email, username, phone, password });
};

// login
const LoginUser = (valueLogin, password) => {
  return axios.post('/api/login', { valueLogin, password });
};

// get user
const fetchAllUser = (page, limit) => {
  return axios.get(`/api/user/read?page=${page}&limit=${limit}`);
};

// delete user
const deleteUser = (user) => {
  return axios.delete(`/api/user/delete`, { data: { id: user.id } });
};

// get group
const fetchGroup = () => {
  return axios.get('/api/group/read');
};

// create new user
const createNewUser = async (userData) => {
  return axios.post('/api/user/create', { ...userData });
};

// update user
const updateUser = async (userData) => {
  return axios.put('/api/user/update', { ...userData });
};

export { RegisterUser, LoginUser, fetchAllUser, deleteUser, fetchGroup, createNewUser, updateUser };
