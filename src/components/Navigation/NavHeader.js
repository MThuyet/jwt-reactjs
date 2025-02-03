import React from 'react';
import './Nav.scss';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LogoutUser } from '../../services/UserService';
import { toast } from 'react-toastify';

const NavHeader = (props) => {
  const { user, logoutContext } = React.useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogoutUser = async () => {
    let data = await LogoutUser(); // clear cookies
    localStorage.removeItem('jwt'); // clear localstorage
    logoutContext(); // clear user context

    if (data && +data.EC === 0) {
      toast.success(data.EM);
      history.push('/login');
    } else {
      toast.error(data.EM);
    }
  };

  if ((user && user.isAuthenticated === true) || location.pathname === '/') {
    return (
      <>
        <div className="nav-header">
          <Navbar expand="lg" className="bg-body-tertiary bg-header">
            <Container>
              <Navbar.Brand href="#">
                <img
                  src="https://www.svgrepo.com/show/303500/react-1-logo.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="d-inline-block align-top logo-react"
                />
                <span className="brand-name">React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link" exact>
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    User
                  </NavLink>
                  <NavLink to="/role" className="nav-link">
                    Role
                  </NavLink>
                  <NavLink to="/group-role" className="nav-link">
                    Group-Role
                  </NavLink>
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>

                <Nav>
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-link">Welcome {user.account.username}!</Nav.Item>
                      <NavDropdown title="Setting" id="basic-nav-dropdown">
                        <NavDropdown.Item>Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <span onClick={() => handleLogoutUser()}>Logout</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
