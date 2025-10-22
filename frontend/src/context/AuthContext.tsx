import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  userName: string;
  petsOwned: any[];
}

interface Admin {
  id: string;
  userName: string;
}

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (userName: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  register: (userName: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    const adminData = localStorage.getItem('adminData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    
    if (token && adminData) {
      try {
        const parsedAdmin = JSON.parse(adminData);
        setAdmin(parsedAdmin);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminData');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (userName: string, password: string, isAdminLogin: boolean = false): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // For now, using mock authentication
      if (isAdminLogin) {
        if (userName === 'admin' && password === 'admin123') {
          const adminData = { id: '1', userName };
          setAdmin(adminData);
          localStorage.setItem('authToken', 'mock-admin-token');
          localStorage.setItem('adminData', JSON.stringify(adminData));
          return true;
        }
      } else {
        if (userName === 'user' && password === 'user123') {
          const userData = { id: '1', userName, petsOwned: [] };
          setUser(userData);
          localStorage.setItem('authToken', 'mock-user-token');
          localStorage.setItem('userData', JSON.stringify(userData));
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userName: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // For now, using mock registration
      const userData = { id: Date.now().toString(), userName, petsOwned: [] };
      setUser(userData);
      localStorage.setItem('authToken', 'mock-user-token');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('adminData');
  };

  const value: AuthContextType = {
    user,
    admin,
    isAdmin: !!admin,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

