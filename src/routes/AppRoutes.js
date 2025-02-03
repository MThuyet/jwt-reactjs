import { Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUser/Users';
import PrivateRoutes from './PrivateRoutes';
import Role from '../components/Role/Role';
import GroupRole from '../components/GroupRole/GroupRole';

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />

        <PrivateRoutes path="/projects" component={Users} />

        <PrivateRoutes path="/role" component={Role} />

        <PrivateRoutes path="/group-role" component={GroupRole} />

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/" exact>
          home
        </Route>

        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
