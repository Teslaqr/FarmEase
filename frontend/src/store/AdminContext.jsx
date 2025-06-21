import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminContext = createContext();

// Helper to decode JWT payload
const parseJwt = (token) => {
  try {
    // atob to decode base64; split token and parse payload
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

export const AdminProvider = ({ children }) => {
  const { authToken } = useAuth();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    if (authToken) {
      const payload = parseJwt(authToken);
      if (payload?.email) {
        // derive adminName from email (or payload.name if backend includes it)
        setAdminName(payload.email);
      }
    } else {
      setAdminName('');
    }
  }, [authToken]);

  return (
    <AdminContext.Provider value={{ adminName, setAdminName }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
