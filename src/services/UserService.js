import axios from 'axios';

// register
const RegisterUser = (email, username, phone, password) => {
  return axios.post('http://localhost:8080/api/register', { email, username, phone, password });
};

// login
const LoginUser = (valueLogin, password) => {
  return axios.post('http://localhost:8080/api/login', { valueLogin, password });
};

// get user
const fetchAllUser = (page, limit) => {
  return axios.get(`http://localhost:8080/api/user/read?page=${page}&limit=${limit}`);
};

// delete user
const deleteUser = (user) => {
  return axios.delete(`http://localhost:8080/api/user/delete`, { data: { id: user.id } });
};

// get group
const fetchGroup = () => {
  return axios.get('http://localhost:8080/api/group/read');
};

// create new user
const createNewUser = async (userData) => {
  return axios.post('http://localhost:8080/api/user/create', { ...userData });
};

// update user
const updateUser = async (userData) => {
  return axios.put('http://localhost:8080/api/user/update', { ...userData });
};

export { RegisterUser, LoginUser, fetchAllUser, deleteUser, fetchGroup, createNewUser, updateUser };
