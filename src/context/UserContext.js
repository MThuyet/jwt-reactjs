import React, { useState, useEffect } from 'react';
import { getUserAccount } from '../services/UserService';

const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
  const defaultDataUser = {
    isLoading: true,
    isAuthenticated: false,
    token: 'faketoken',
    account: {},
  };
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState(defaultDataUser);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...defaultDataUser, isLoading: false });
  };

  const fetchUser = async () => {
    const res = await getUserAccount();
    if (res && res.EC === 0) {
      let groupWithRoles = res.DT.groupWithRoles;
      let email = res.DT.email;
      let username = res.DT.username;
      let token = res.DT.access_token;

      let data = {
        isLoading: false,
        isAuthenticated: true,
        token,
        account: { groupWithRoles, email, username },
      };

      setUser(data);
    } else {
      setUser({ ...defaultDataUser, isLoading: false });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, loginContext, logoutContext }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
