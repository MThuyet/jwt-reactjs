import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { fetchGroup } from '../../services/UserService';
import { toast } from 'react-toastify';

const ModalUser = (props) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [group, setGroup] = useState([]);

  const [userGroup, setUserGroup] = useState([]);

  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && +res.data.EC === 0) {
      setGroup(res.data.DT);
    } else {
      toast.error(res.data.EM);
    }
  };
  useEffect(() => {
    getGroup();
  }, []);

  return (
    <>
      <Modal size="lg" show={true} backdrop="static" keyboard={false} className="modal-user">
        <Modal.Header closeButton>
          <Modal.Title>
            <span>{props.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-md-6 col-12 form-group">
              <label htmlFor="email">
                Email <span className="text-danger">*</span>
              </label>
              <input id="email" name="email" type="email" className="form-control" />
            </div>

            <div className="col-md-6 col-12 form-group">
              <label htmlFor="phone">
                Phone number <span className="text-danger">*</span>
              </label>
              <input id="phone" name="phone" type="text" className="form-control" />
            </div>

            <div className="col-md-6 col-12 form-group">
              <label htmlFor="username">
                Username <span className="text-danger">*</span>
              </label>
              <input id="username" name="username" type="text" className="form-control" />
            </div>

            <div className="col-md-6 col-12 form-group">
              <label htmlFor="password">
                Password <span className="text-danger">*</span>
              </label>
              <input id="password" name="password" type="password" className="form-control" />
            </div>

            <div className="col-md-6 col-12 form-group">
              <label htmlFor="group">
                Group <span className="text-danger">*</span>
              </label>
              <select className="form-select" id="group" name="group">
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
              <label htmlFor="gender">Gender</label>
              <select className="form-select" id="gender" name="gender" defaultValue="Male">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className=" col-12 form-group">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" className="form-control" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser} className="btn btn-primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
