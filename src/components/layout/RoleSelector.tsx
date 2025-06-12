import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Home, Search, Users, Plus, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { cn } from '../../utils/cn';

interface RoleOption {
  role: UserRole;
  label: string;
  icon: React.ElementType;
  path: string;
  notifications?: number;
}

const roleOptions: RoleOption[] = [
  { role: 'seller', label: 'Mode Vendeur', icon: Home, path: '/seller/dashboard' },
  { role: 'buyer', label: 'Mode Acheteur', icon: Search, path: '/buyer/dashboard' },
  { role: 'ambassador', label: 'Mode Ambassadeur', icon: Users, path: '/ambassador/dashboard' },
  { role: 'trust_manager', label: 'Mode Trust Manager', icon: Shield, path: '/trust-manager/dashboard' },
];

export const RoleSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, activeRole, setActiveRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const currentRoleOption = roleOptions.find(opt => opt.role === activeRole);
  const availableRoles = roleOptions.filter(opt => user.roles.includes(opt.role));
  const inactiveRoles = roleOptions.filter(opt => !user.roles.includes(opt.role));

  // Mock notifications - in real app, fetch from API
  const notifications = {
    seller: 2,
    buyer: 0,
    ambassador: 5
  };

  const handleRoleSwitch = (role: UserRole) => {
    if (!user.roles.includes(role)) return;
    
    setActiveRole(role);
    const targetPath = roleOptions.find(opt => opt.role === role)?.path;
    if (targetPath) {
      navigate(targetPath);
    }
    setIsOpen(false);
  };

  const handleAddRole = () => {
    navigate('/profile/roles');
    setIsOpen(false);
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= availableRoles.length) {
          handleRoleSwitch(availableRoles[num - 1].role);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [availableRoles]);

  if (!currentRoleOption) return null;

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between space-x-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <currentRoleOption.icon className="w-5 h-5 text-primary-600" />
          <span className="text-sm font-medium text-gray-700">{currentRoleOption.label}</span>
        </div>
        <div className="flex items-center space-x-2">
          {notifications[activeRole] > 0 && (
            <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
              {notifications[activeRole]}
            </span>
          )}
          <ChevronDown className={cn(
            "w-4 h-4 text-gray-500 transition-transform",
            isOpen && "rotate-180"
          )} />
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                Mes rôles actifs
              </div>
              
              {availableRoles.map((option, index) => (
                <button
                  key={option.role}
                  onClick={() => handleRoleSwitch(option.role)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
                    activeRole === option.role
                      ? "bg-primary-50 text-primary-700"
                      : "hover:bg-gray-50 text-gray-700"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <option.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{option.label}</span>
                    {activeRole === option.role && (
                      <span className="text-xs text-primary-600">(actuel)</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {notifications[option.role] > 0 && (
                      <div className="flex items-center space-x-1">
                        <Bell className="w-4 h-4 text-gray-400" />
                        <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                          {notifications[option.role]}
                        </span>
                      </div>
                    )}
                    <span className="text-xs text-gray-400">
                      Ctrl+{index + 1}
                    </span>
                  </div>
                </button>
              ))}

              {inactiveRoles.length > 0 && (
                <>
                  <div className="my-2 border-t border-gray-200" />
                  <button
                    onClick={handleAddRole}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-sm font-medium">Ajouter un rôle</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
