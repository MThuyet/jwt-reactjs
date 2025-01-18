import './Register.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Register = (props) => {
  // init state
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // handle button register
  const handleRegister = () => {
    let userData = { email, phone, username, password, confirmPassword };
    console.log('check user data', userData);
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="re-enter-password">Re-enter-password:</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="re-enter-password"
                id="re-enter-password"
                name="re-enter-password"
                className="form-control"
                placeholder="Re-enter-password"
              />
            </div>

            <button className="btn btn-primary" onClick={() => handleRegister()}>
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
