import React, { useState } from 'react';
import { Bell, X, Home, Search, Users, Clock, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { cn } from '../../utils/cn';
import { Badge } from '../ui/Badge';

interface Notification {
  id: string;
  role: UserRole;
  title: string;
  message: string;
  time: Date;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'cross-role';
  action?: {
    label: string;
    onClick: () => void;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    role: 'seller',
    title: 'Nouvelle visite programmée',
    message: 'M. Dubois visitera votre bien demain à 14h',
    time: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    type: 'info'
  },
  {
    id: '2',
    role: 'seller',
    title: 'Offre reçue !',
    message: 'Une offre de 315 000€ a été déposée sur votre appartement',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    type: 'success'
  },
  {
    id: '3',
    role: 'ambassador',
    title: 'Nouveau lead assigné',
    message: 'Marie Martin recherche un 3 pièces dans votre secteur',
    time: new Date(Date.now() - 1000 * 60 * 60 * 3),
    read: true,
    type: 'info'
  },
  {
    id: '4',
    role: 'ambassador',
    title: 'Commission validée',
    message: 'Votre commission de 125€ a été créditée',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    type: 'success'
  },
  {
    id: '5',
    role: 'buyer',
    title: 'Opportunité cross-rôle',
    message: 'Devenez ambassadeur dans le 7ème arrondissement où vous cherchez',
    time: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: false,
    type: 'cross-role',
    action: {
      label: 'Devenir ambassadeur',
      onClick: () => console.log('Navigate to ambassador signup')
    }
  }
];

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<UserRole | 'all'>('all');
  const { user } = useAuth();

  if (!user) return null;

  const roleIcons = {
    seller: Home,
    buyer: Search,
    ambassador: Users,
    trust_manager: Shield
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;
  
  const filteredNotifications = activeTab === 'all' 
    ? mockNotifications 
    : mockNotifications.filter(n => n.role === activeTab);

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `il y a ${days}j`;
    if (hours > 0) return `il y a ${hours}h`;
    return `il y a ${minutes}min`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                    activeTab === 'all'
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  Toutes
                </button>
                {user.roles.map(role => {
                  const Icon = roleIcons[role];
                  const roleNotifCount = mockNotifications.filter(n => n.role === role && !n.read).length;
                  
                  return (
                    <button
                      key={role}
                      onClick={() => setActiveTab(role)}
                      className={cn(
                        "flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors",
                        activeTab === role
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="capitalize">{role}</span>
                      {roleNotifCount > 0 && (
                        <span className="ml-1 text-xs">({roleNotifCount})</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Aucune notification
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredNotifications.map(notification => {
                    const Icon = roleIcons[notification.role];
                    
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 hover:bg-gray-50 transition-colors",
                          !notification.read && "bg-blue-50"
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            notification.type === 'success' && "bg-green-100",
                            notification.type === 'warning' && "bg-yellow-100",
                            notification.type === 'info' && "bg-blue-100",
                            notification.type === 'cross-role' && "bg-purple-100"
                          )}>
                            <Icon className={cn(
                              "w-5 h-5",
                              notification.type === 'success' && "text-green-600",
                              notification.type === 'warning' && "text-yellow-600",
                              notification.type === 'info' && "text-blue-600",
                              notification.type === 'cross-role' && "text-purple-600"
                            )} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                {notification.action && (
                                  <button
                                    onClick={notification.action.onClick}
                                    className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                                  >
                                    {notification.action.label} →
                                  </button>
                                )}
                              </div>
                              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                {formatTime(notification.time)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <button className="w-full text-center text-sm font-medium text-primary-600 hover:text-primary-700">
                Voir toutes les notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
