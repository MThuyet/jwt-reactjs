import './Login.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LoginUser } from '../../services/UserService';
import React from 'react';
import { UserContext } from '../../context/UserContext';

const Login = (props) => {
  const { user, loginContext } = React.useContext(UserContext);

  let history = useHistory();

  useEffect(() => {
    if (user && user.isAuthenticated === true) {
      toast.warning('You are already login');
      history.push('/');
    }
  }, []);

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

    let res = await LoginUser(valueLogin, password);

    // success
    if (res && +res.EC === 0) {
      let groupWithRoles = res.DT.groupWithRoles;
      let email = res.DT.email;
      let username = res.DT.username;
      let token = res.DT.access_token;

      let data = {
        isAuthenticated: true,
        token,
        account: { groupWithRoles, email, username },
      };

      toast.success(res.EM);
      history.push('/');
      localStorage.setItem('jwt', token);
      loginContext(data);
    }

    // fail
    if (res && +res.EC !== 0) {
      // fail
      toast.error(res.EM);
    }
  };

  const handlePressEnter = (e) => {
    if (e.code === 'Enter' && e.which === 13) {
      handleLogin();
    }
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
              onKeyDown={(e) => {
                handlePressEnter(e);
              }}
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

            <div className="text-center">
              <Link to="/" className="text-decoration-none">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
