import axios from 'axios';

const RegisterUser = (email, username, phone, password) => {
  return axios.post('http://localhost:8080/api/register', { email, username, phone, password });
};

const LoginUser = (valueLogin, password) => {
  return axios.post('http://localhost:8080/api/login', { valueLogin, password });
};

const fetchAllUser = (page, limit) => {
  return axios.get(`http://localhost:8080/api/user/read?page=${page}&limit=${limit}`);
};

export { RegisterUser, LoginUser, fetchAllUser };
