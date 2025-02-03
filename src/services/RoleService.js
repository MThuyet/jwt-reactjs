import axios from '../setup/axios';

const createRoles = async (roles) => {
  return axios.post('/api/role/create', roles);
};

export { createRoles };
