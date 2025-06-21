// working code 
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isMainAdmin, setIsMainAdmin] = useState(false);

  const parseJwt = token => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return {};
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const name = localStorage.getItem('userName');
    if (token) {
      const decoded = parseJwt(token);
      setAuthToken(token);
      setIsMainAdmin(!!decoded.isMain);
      if (name) {
        setUserName(name);
      } else if (decoded.name) {
        setUserName(decoded.name); // fallback: try from token if available
      } else {
        setUserName('Admin'); // default fallback
      }
    }
  }, []);

  const login = (token, nameOverride, mainFlag) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', nameOverride);
    setAuthToken(token);
    setUserName(nameOverride);
    setIsMainAdmin(mainFlag);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setAuthToken(null);
    setUserName(null);
    setIsMainAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ authToken, userName, isMainAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
