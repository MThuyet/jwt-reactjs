import './App.scss';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Users from './components/ManageUser/Users';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import _ from 'lodash';

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let sessionAccount = sessionStorage.getItem('account');
    if (sessionAccount) {
      setAccount(JSON.parse(sessionAccount));
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}

        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/news">news</Route>
          <Route path="/about">about</Route>
          <Route path="/contact">contact</Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*">404 not found</Route>
        </Switch>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Router>
  );
}

export default App;
