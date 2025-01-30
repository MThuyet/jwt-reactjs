import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { fetchGroup, createNewUser, updateUser } from '../../services/UserService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {
  const { action, dataModalUser } = props;

  const defaultUserData = {
    email: '',
    phone: '',
    username: '',
    password: '',
    address: '',
    sex: '',
    groupId: '',
  };

  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    groupId: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);

  // get data user groupId
  const [userGroup, setUserGroup] = useState([]);

  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && +res.EC === 0) {
      setUserGroup(res.DT);
      if (res.DT.length > 0) {
        setUserData({ ...userData, groupId: res.DT[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    if (action === 'UPDATE') {
      setUserData({ ...dataModalUser, groupId: dataModalUser.Group ? dataModalUser.Group.id : '' });
    }
  }, [dataModalUser]);

  useEffect(() => {
    if (action === 'CREATE') {
      if (userGroup && userGroup.length > 0) {
        setUserData({ ...userData, groupId: userGroup[0].id });
      }
    }
  }, [action]);

  // handle change input
  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  // check validate
  const checkValidateInput = (event) => {
    if (action === 'UPDATE') return true;
    setValidInputs(validInputsDefault);

    let arr = ['email', 'phone', 'username', 'password', 'groupId'];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        toast.error(`Empty input ${arr[i]}`);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);
        check = false;
        break;
      }
    }

    return check;
  };

  // handle confirm
  const handleConfirmUser = async () => {
    // create user
    let check = checkValidateInput();
    if (check === true) {
      let res = action === 'CREATE' ? await createNewUser(userData) : await updateUser(userData);
      if (res && +res.EC === 0) {
        toast.success(res.EM);
        props.onHide();
        setUserData({ ...defaultUserData, groupId: userGroup && userGroup.length > 0 ? userGroup[0].id : '' });
        setValidInputs(validInputsDefault);
      } else {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };

  // handle close modal
  const handleCloseModal = () => {
    props.onHide();
    setUserData(defaultUserData);
    setValidInputs(validInputsDefault);
  };

  return (
    <>
      <Modal size="lg" show={props.show} backdrop="static" keyboard={false} className="modal-user" onHide={handleCloseModal}>
        <Modal.Header closeButton={true}>
          <Modal.Title>
            <span>{props.action === 'CREATE' ? 'Create new user' : 'Edit current user'}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-md-6 col-12 form-group">
              <label htmlFor="email">
                Email <span className="text-danger">*</span>
              </label>
              <input
                disabled={action === 'CREATE' ? false : true}
                value={userData.email}
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, 'email');
                }}
                id="email"
                name="email"
                type="email"
                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
              />
            </div>

            <div className="col-md-6 col-12 form-group">
              <label htmlFor="phone">
                Phone number <span className="text-danger">*</span>
              </label>
              <input
                disabled={action === 'CREATE' ? false : true}
                value={userData.phone}
                onChange={(event) => handleOnChangeInput(event.target.value, 'phone')}
                id="phone"
                name="phone"
                type="text"
                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
              />
            </div>

            <div className="col-md-6 col-12 form-group">
              <label htmlFor="username">
                Username <span className="text-danger">*</span>
              </label>
              <input
                value={userData.username}
                onChange={(event) => handleOnChangeInput(event.target.value, 'username')}
                id="username"
                name="username"
                type="text"
                className={validInputs.username ? 'form-control' : 'form-control is-invalid'}
              />
            </div>

            <div className="col-md-6 col-12 form-group">
              {action === 'CREATE' && (
                <>
                  <label htmlFor="password">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    value={userData.password}
                    onChange={(event) => handleOnChangeInput(event.target.value, 'password')}
                    id="password"
                    name="password"
                    type="password"
                    className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                  />
                </>
              )}
            </div>

            <div className="col-md-6 col-12 form-group">
              <label htmlFor="groupId">
                Group <span className="text-danger">*</span>
              </label>
              <select
                className={validInputs.groupId ? 'form-select' : 'form-select is-invalid'}
                id="groupId"
                name="groupId"
                onChange={(event) => handleOnChangeInput(event.target.value, 'groupId')}
                value={userData.groupId ? userData.groupId : ''}>
                <option value="">Select group</option>
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

            <div className="col-md-6 col-12 form-group">
              <label htmlFor="gender">Sex</label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                onChange={(event) => handleOnChangeInput(event.target.value, 'sex')}
                value={userData.sex ? userData.sex : ''}>
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className=" col-12 form-group">
              <label htmlFor="address">Address</label>
              <input
                value={userData.address}
                onChange={(event) => handleOnChangeInput(event.target.value, 'address')}
                id="address"
                name="address"
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseModal();
            }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()} className="btn btn-primary">
            {action === 'CREATE' ? 'Create' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
