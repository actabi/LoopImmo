import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Users, ArrowRight } from 'lucide-react';

export const RoleSelector: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'seller',
      title: 'Vendeur',
      description: 'Je souhaite vendre mon bien immobilier',
      icon: Home,
      color: 'blue',
      features: [
        'Estimation gratuite de votre bien',
        'Photos professionnelles incluses',
        'Gestion des visites simplifiée',
        'Documents légaux fournis',
      ],
      path: '/seller/dashboard',
    },
    {
      id: 'buyer',
      title: 'Acheteur',
      description: 'Je recherche un bien immobilier',
      icon: Search,
      color: 'green',
      features: [
        'Accès à tous les biens disponibles',
        'Alertes personnalisées',
        'Visites virtuelles',
        'Accompagnement dans vos démarches',
      ],
      path: '/buyer/dashboard',
    },
    {
      id: 'ambassador',
      title: 'Ambassadeur',
      description: 'Je souhaite devenir partenaire ImmoConnect',
      icon: Users,
      color: 'purple',
      features: [
        'Commissions attractives',
        'Formation complète',
        'Outils de prospection',
        'Support dédié',
      ],
      path: '/ambassador/dashboard',
    },
  ];

  const handleRoleSelect = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre profil
          </h1>
          <p className="text-xl text-gray-600">
            Sélectionnez le rôle qui correspond à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const bgColor = {
              blue: 'bg-blue-50 hover:bg-blue-100',
              green: 'bg-green-50 hover:bg-green-100',
              purple: 'bg-purple-50 hover:bg-purple-100',
            }[role.color];
            const iconColor = {
              blue: 'text-blue-600',
              green: 'text-green-600',
              purple: 'text-purple-600',
            }[role.color];
            const buttonColor = {
              blue: 'bg-blue-600 hover:bg-blue-700',
              green: 'bg-green-600 hover:bg-green-700',
              purple: 'bg-purple-600 hover:bg-purple-700',
            }[role.color];

            return (
              <div
                key={role.id}
                className={`${bgColor} rounded-2xl p-8 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-gray-200`}
                onClick={() => handleRoleSelect(role.path)}
              >
                <div className={`${iconColor} mb-6`}>
                  <Icon className="h-16 w-16" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {role.title}
                </h2>
                <p className="text-gray-600 mb-6">{role.description}</p>
                <ul className="space-y-3 mb-8">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`${iconColor} mr-2 mt-1`}>✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full ${buttonColor} text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors`}
                >
                  Continuer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Vous pourrez changer de rôle à tout moment depuis votre profil
          </p>
        </div>
      </div>
    </div>
  );
};
