import './Login.scss';

const Login = (props) => {
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
            <input type="text" className="form-control" placeholder="Email address or phone number" />
            <input type="password" className="form-control" placeholder="Password" />
            <button className="btn btn-primary">Login</button>

            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>

            <hr />

            <div className="text-center">
              <button className="btn btn-success">Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
