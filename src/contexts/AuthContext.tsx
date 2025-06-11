import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  addRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole>('buyer');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('activeRole') as UserRole;
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (storedRole && parsedUser.roles.includes(storedRole)) {
        setActiveRole(storedRole);
      } else {
        setActiveRole(parsedUser.roles[0]);
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'test123') {
      setUser(user);
      setActiveRole(user.roles[0]);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('activeRole', user.roles[0]);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setActiveRole('buyer');
    localStorage.removeItem('user');
    localStorage.removeItem('activeRole');
  };

  const handleSetActiveRole = (role: UserRole) => {
    if (user && user.roles.includes(role)) {
      setActiveRole(role);
      localStorage.setItem('activeRole', role);
    }
  };

  const addRole = async (role: UserRole) => {
    if (!user) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user roles
    const updatedUser = {
      ...user,
      roles: [...user.roles, role]
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      activeRole,
      setActiveRole: handleSetActiveRole,
      login, 
      logout, 
      isLoading,
      addRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
