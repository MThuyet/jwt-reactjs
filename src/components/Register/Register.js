import './Register.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Register = (props) => {
  useEffect(() => {
    axios.get('http://localhost:8080/api/test-api').then((res) => console.log('check data ', res));
  }, []);

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
              <input type="text" id="email" name="email" className="form-control" placeholder="Email address" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number:</label>
              <input type="text" id="phone" name="phone" className="form-control" placeholder="Phone" />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" className="form-control" placeholder="Username" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" className="form-control" placeholder="Password" />
            </div>

            <div className="form-group">
              <label htmlFor="re-enter-password">Re-enter-password:</label>
              <input
                type="re-enter-password"
                id="re-enter-password"
                name="re-enter-password"
                className="form-control"
                placeholder="Re-enter-password"
              />
            </div>

            <button className="btn btn-primary">Register</button>

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
