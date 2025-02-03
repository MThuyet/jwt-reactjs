import axios from '../setup/axios';

const createRoles = async (roles) => {
  return axios.post('/api/role/create', roles);
};

const fetchAllRoles = () => {
  return axios.get('/api/role/read');
};

const deleteRole = async (role) => {
  return axios.delete('/api/role/delete', { data: { id: role.id } });
};

const fetchRolesByGroup = async (groupId) => {
  return axios.get(`/api/role/by-group/${groupId}`);
};

export { createRoles, fetchAllRoles, deleteRole, fetchRolesByGroup };
