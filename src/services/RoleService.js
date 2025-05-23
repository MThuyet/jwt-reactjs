import axios from '../setup/axios';

const createRoles = (roles) => {
  return axios.post('/api/role/create', roles);
};

const fetchAllRoles = () => {
  return axios.get('/api/role/read');
};

const deleteRole = (role) => {
  return axios.delete('/api/role/delete', { data: { id: role.id } });
};

const fetchRolesByGroup = (groupId) => {
  return axios.get(`/api/role/by-group/${groupId}`);
};

const assignRoleToGroup = (data) => {
  return axios.post('/api/role/assign-to-group', data);
};

export { createRoles, fetchAllRoles, deleteRole, fetchRolesByGroup, assignRoleToGroup };
