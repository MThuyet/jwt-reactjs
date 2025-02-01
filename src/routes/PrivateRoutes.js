import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
  let history = useHistory();
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    console.log('user', user);
    let sessionAccount = sessionStorage.getItem('account');
    if (!sessionAccount) {
      history.push('/login');
      window.location.reload();
    }
  }, []);
  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};

export default PrivateRoutes;
