import './Register.scss';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RegisterUser } from '../../services/UserService';

const Register = (props) => {
  let history = useHistory();
  // useEffect(() => {
  //   // axios.get('http://localhost:8080/api/test-api').then((res) => console.log(res.data));
  // }, []);

  // init state
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  // validate form
  const isValidInput = () => {
    setObjCheckInput({ ...defaultValidInput });

    if (!email) {
      toast.error('Email is required');
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (regx.test(email) === false) {
      toast.error('Email is invalid');
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!phone) {
      toast.error('Phone is required');
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });

      return false;
    }
    if (!username) {
      toast.error('Username is required');
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false });

      return false;
    }
    if (!password) {
      toast.error('Password is required');
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Your password is not the same');
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      return false;
    }

    return true;
  };

  // handle button register
  const handleRegister = async () => {
    let check = isValidInput();
    if (check === true) {
      let res = await RegisterUser(email, username, phone, password);
      let serverData = res.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push('/login');
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none d-lg-block col-lg-7">
            <div className="brand">Fullstack Developer</div>
            <div className="detail">Learning and make project with React, NodeJS and SQL, MongoDB</div>
          </div>

          <div className="content-right col-12 col-lg-5 d-flex flex-column gap-3 p-3">
            <div className="brand d-lg-none">Fullstack Developer</div>

            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="email"
                name="email"
                className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                placeholder="Email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number:</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                id="phone"
                name="phone"
                className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                placeholder="Phone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
                className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                placeholder="Username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="re-enter-password">Re-enter-password:</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="re-enter-password"
                name="re-enter-password"
                className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                placeholder="Re-enter-password"
              />
            </div>

            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </button>

            <hr />

            <div className="text-center">
              <Link to="/login" className="btn btn-success">
                Already have an account. Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
