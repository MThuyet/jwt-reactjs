import './Role.scss';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../services/RoleService';

const Role = (props) => {
  const dataChildDefault = { url: '', description: '', isValidUrl: true };

  const [listChild, setListChild] = useState({
    child1: dataChildDefault,
  });

  // handle change input
  const handleOnChangeInput = (label, value, key) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][label] = value;

    if (value && label === 'url') {
      _listChild[key]['isValidUrl'] = true;
    }

    setListChild(_listChild);
  };

  // when click add new input
  const handleAddNewInput = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = dataChildDefault;
    setListChild(_listChild);
  };

  // when click trash
  const handleDeleteInput = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
  };

  // buildDataToPersist
  const buildDataToPersist = () => {
    let _listChild = _.cloneDeep(listChild);
    let result = [];

    Object.entries(_listChild).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });

    return result;
  };

  // when click save btn
  const handleSave = async () => {
    let invalidObj = Object.entries(listChild).find(([key, child], index) => {
      return child && !child.url;
    });

    if (!invalidObj) {
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res && +res.EC === 0) {
        toast.success(res.EM);
        setListChild({ child1: dataChildDefault });
      } else {
        toast.error(res.EM);
      }
    } else {
      let _listChild = _.cloneDeep(listChild);
      const key = invalidObj[0];
      _listChild[key]['isValidUrl'] = false;
      toast.error('URL is required');
      setListChild(_listChild);
    }
  };

  return (
    <>
      <div className="role-container">
        <div className="container">
          <div className=" mt-3">
            <div className="title-role">
              <h4>Add new role</h4>
              <div className="role-parents">
                {Object.entries(listChild).map(([key, child], index) => {
                  return (
                    <div className="row role-child mt-3" key={`child-${key}`}>
                      <div className="col-5 form-group">
                        <label htmlFor="">URL</label>
                        <input
                          type="text"
                          className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                          value={child.url}
                          onChange={(e) => handleOnChangeInput('url', e.target.value, key)}
                        />
                      </div>

                      <div className="col-5 form-group">
                        <label htmlFor="">Description </label>
                        <input
                          type="text"
                          className="form-control"
                          value={child.description}
                          onChange={(e) => handleOnChangeInput('description', e.target.value, key)}
                        />
                      </div>

                      <div className="col-2 mt-4 actions">
                        <button className="btn btn-primary mx-2" onClick={() => handleAddNewInput()}>
                          <i className="fa fa-plus-circle"></i>
                        </button>

                        {index >= 1 && (
                          <button className="btn btn-danger" onClick={() => handleDeleteInput(key)}>
                            <i className="fa fa-trash-o"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="mt-2">
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      handleSave();
                    }}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
