import axios from 'axios';

const RegisterUser = (email, username, phone, password) => {
  return axios.post('http://localhost:8080/api/register', { email, username, phone, password });
};

export { RegisterUser };
