import './GroupRole.scss';
import { useState, useEffect } from 'react';
import { fetchGroup } from '../../services/UserService';
import { toast } from 'react-toastify';
import { fetchAllRoles, fetchRolesByGroup } from '../../services/RoleService';
import _ from 'lodash';

const GroupRole = (props) => {
  const [userGroup, setUserGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState('');
  const [listRoles, setListRoles] = useState([]);
  const [asignRolesByGroup, setAsignRolesByGroup] = useState([]);

  // get group
  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && +res.EC === 0) {
      setUserGroup(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  // get all role
  const getAllRoles = async () => {
    let data = await fetchAllRoles();

    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  useEffect(() => {
    getGroup();
    getAllRoles();
  }, []);

  // when change select
  const handleOnChangeSelect = async (value) => {
    setSelectGroup(value);
    if (value) {
      let data = await fetchRolesByGroup(value);
      if (data && +data.EC === 0) {
        let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
        setAsignRolesByGroup(result);
      } else {
        toast.error(data.EM);
      }
    }
  };

  // build data role by group
  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role, index) => {
        let obj = {};
        obj.id = role.id;
        obj.url = role.url;
        obj.description = role.description;
        obj.isAssigned = false;

        if (groupRoles && groupRoles.length > 0) {
          obj.isAssigned = groupRoles.some((item) => item.url === obj.url);
        }

        result.push(obj);
      });
    }

    return result;
  };

  // onChange role
  const handleSelectRole = (value) => {
    let _asignRolesByGroup = _.cloneDeep(asignRolesByGroup);
    let findIndex = _asignRolesByGroup.findIndex((item) => +item.id === +value);
    if (findIndex > -1) {
      _asignRolesByGroup[findIndex].isAssigned = !_asignRolesByGroup[findIndex].isAssigned;
      setAsignRolesByGroup(_asignRolesByGroup);
    }
  };

  return (
    <div className="group-role-container">
      <div className="container">
        <div className="title mt-3">
          <h4>Group Role</h4>
        </div>

        <div className="assign-group-role">
          <div className="col-md-6 col-12 form-group">
            <label htmlFor="groupId">
              Select Group <span className="text-danger">*</span>
            </label>
            <select className="form-select" id="groupId" name="groupId" onChange={(event) => handleOnChangeSelect(event.target.value)}>
              <option value="">Please select group</option>
              {userGroup &&
                userGroup.length > 0 &&
                userGroup.map((item, index) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <hr />
          {selectGroup && (
            <div className="roles">
              <h5>Assign Role</h5>
              {asignRolesByGroup &&
                asignRolesByGroup.length > 0 &&
                asignRolesByGroup.map((item, index) => {
                  return (
                    <div className="form-check" key={`role-${item.id}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item.id}
                        id={item.id}
                        checked={item.isAssigned}
                        onChange={(event) => handleSelectRole(event.target.value)}
                      />
                      <label className="form-check-label" htmlFor={item.id}>
                        {item.url}
                      </label>
                    </div>
                  );
                })}
              <div className="mt-3">
                <button className="btn btn-warning">Save</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupRole;
