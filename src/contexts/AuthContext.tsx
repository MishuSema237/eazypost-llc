import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateUser } from '../services/userService';
import { User } from '../types/user';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => { },
  logout: async () => { },
  loading: false,
  error: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user session on load
    const storedUser = localStorage.getItem('eazypost_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('eazypost_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const authenticatedUser = await validateUser(email, password);

      if (authenticatedUser) {
        setCurrentUser(authenticatedUser);
        localStorage.setItem('eazypost_user', JSON.stringify(authenticatedUser));
      } else {
        throw new Error('Authentication failed. Invalid authorization credentials.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('eazypost_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;