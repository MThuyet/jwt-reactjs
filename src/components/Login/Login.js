import './Login.scss';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LoginUser } from '../../services/UserService';

const Login = (props) => {
  let history = useHistory();

  // init state
  const [valueLogin, setValueLogin] = useState('');
  const [password, setPassword] = useState('');

  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };

  const [objCheckValidInput, setObjCheckValidInput] = useState(defaultValidInput);

  // handle login
  const handleLogin = async () => {
    setObjCheckValidInput({ ...defaultValidInput });

    if (!valueLogin) {
      toast.error('Email or phone number is required');
      setObjCheckValidInput({ ...defaultValidInput, isValidValueLogin: false });
      return;
    }
    if (!password) {
      toast.error('Password is required');
      setObjCheckValidInput({ ...defaultValidInput, isValidPassword: false });
      return;
    }

    await LoginUser(valueLogin, password);
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none d-lg-block col-lg-7">
            <div className="brand">Fullstack Developer</div>
            <div className="detail">Learning and make project with React, NodeJS and SQL, MongoDB</div>
          </div>

          <div className="content-right col-12 col-lg-5 d-flex flex-column gap-3 p-3">
            <div className="brand d-lg-none">Fullstack Developer</div>
            <input
              value={valueLogin}
              onChange={(e) => {
                setValueLogin(e.target.value);
              }}
              type="text"
              className={objCheckValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
              placeholder="Email address or phone number"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className={objCheckValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
              placeholder="Password"
            />

            <button
              className="btn btn-primary"
              onClick={() => {
                handleLogin();
              }}>
              Login
            </button>

            <span className="text-center">
              <Link className="forgot-password" to="/register">
                Forgot your password?
              </Link>
            </span>

            <hr />

            <div className="text-center">
              <Link to="/register" className="btn btn-success">
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
