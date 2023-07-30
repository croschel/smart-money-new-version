import React, {ReactNode, createContext, useEffect, useState} from 'react';
import {isLogged} from '~/services/Auth';

interface Props {
  children: ReactNode;
}

interface AuthContextValues {
  userIsLogged: boolean;
  logoutUser: () => void;
  signUser: () => void;
}

export const AuthContext = createContext({} as AuthContextValues);

export const AuthProvider = ({children}: Props) => {
  const [userIsLogged, setUserIsLogged] = useState(false);

  const logoutUser = () => {
    setUserIsLogged(false);
  };

  const signUser = async () => {
    const userHasAuthToken = await isLogged();
    if (userHasAuthToken) {
      setUserIsLogged(userHasAuthToken);
    }
  };

  useEffect(() => {
    const userLoggedCheckin = async () => {
      const userHasAuthToken = await isLogged();
      if (userHasAuthToken) {
        setUserIsLogged(userHasAuthToken);
      }
    };
    userLoggedCheckin();
  }, []);

  return (
    <AuthContext.Provider value={{userIsLogged, logoutUser, signUser}}>
      {children}
    </AuthContext.Provider>
  );
};
