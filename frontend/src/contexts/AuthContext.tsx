import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { getUsers } from '../services/dataService';
import { apiUrl } from '../utils/api';

const useMocks = import.meta.env.VITE_USE_MOCKS !== 'false';

export interface RegisterData {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  referredBy?: string;
  roles: UserRole[];
}

interface AuthContextType {
  user: User | null;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
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
    const user = getUsers().find(u => u.email === email);
    
    if (user && password === 'test123') {
      setUser(user);
      setActiveRole(user.roles[0]);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('activeRole', user.roles[0]);
    } else {
      throw new Error('Invalid credentials');
    }
  };

   const register = async (data: RegisterData) => {
    if (!useMocks) {
      const res = await fetch(apiUrl('/api/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          roles: data.roles,
          referredBy: data.referredBy
        })
      });
      if (!res.ok) {
        throw new Error('Registration failed');
      }
      const newUser: User = await res.json();
      setUser(newUser);
      setActiveRole(newUser.roles[0]);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('activeRole', newUser.roles[0]);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      roles: data.roles,
      referralCode: Math.random().toString(36).slice(2, 8).toUpperCase(),
      referredBy: data.referredBy,
      createdAt: new Date()
    };

    getUsers().push(newUser);
    setUser(newUser);
    setActiveRole(data.roles[0]);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('activeRole', data.roles[0]);
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
      register,
      logout,
      isLoading,
      addRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
