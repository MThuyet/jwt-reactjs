import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { fetchAllRoles, deleteRole } from '../../services/RoleService';
import { toast } from 'react-toastify';

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);

  const getAllRoles = async () => {
    let data = await fetchAllRoles();

    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchListRoleAgain: async () => {
      await getAllRoles();
    },
  }));

  const handleDeleteRole = async (role) => {
    let res = await deleteRole(role);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      await getAllRoles();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">URL</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            <>
              {listRoles.map((role, index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td>{role.id}</td>
                    <td>{role.url}</td>
                    <td>{role.description}</td>
                    <td>
                      <span title="Edit" className="btn btn-warning mx-2">
                        <i className="fa fa-pencil-square-o"></i>
                      </span>
                      <span title="Delete" onClick={() => handleDeleteRole(role)} className="btn btn-danger">
                        <i className="fa fa-trash-o"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              <tr>
                <td className="text-center" colSpan={5}>
                  Not found roles
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
});

export default TableRole;
