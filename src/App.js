import './App.scss';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = React.useContext(UserContext);
  return (
    <Router>
      {user && user.isLoading ? (
        <div className="loading-container">
          <Rings heigth="1000" width="1000" color="#1877f2" ariaLabel="loading" />
          <div>Loading data...</div>
        </div>
      ) : (
        <>
          <div className="app-header">
            <Nav />
          </div>

          <div className="app-container">
            <AppRoutes />
          </div>
        </>
      )}

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
