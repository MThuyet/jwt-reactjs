import { useEffect } from 'react';
import './Users.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Users = (props) => {
  let history = useHistory();
  useEffect(() => {
    let sessionAccount = sessionStorage.getItem('account');
    if (!sessionAccount) {
      history.push('/login');
    }
  }, []);
  return <div>User List</div>;
};

export default Users;
