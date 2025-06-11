import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Home, Search, Users, Check, Lock, TrendingUp, 
  Euro, Calendar, Award, ChevronRight, Info
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { formatPrice } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface RoleInfo {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ElementType;
  benefits: string[];
  requirements?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

const rolesInfo: RoleInfo[] = [
  {
    role: 'seller',
    title: 'Vendeur',
    description: 'Vendez votre bien au meilleur prix avec notre forfait unique',
    icon: Home,
    benefits: [
      'Forfait fixe de 2 500€ à 12 000€',
      'Économies jusqu\'à 80% vs agences traditionnelles',
      'Accompagnement personnalisé',
      'Visibilité maximale'
    ],
    stats: [
      { label: 'Économies moyennes', value: '15 000€' },
      { label: 'Délai de vente', value: '45 jours' }
    ]
  },
  {
    role: 'buyer',
    title: 'Acheteur',
    description: 'Trouvez le bien de vos rêves avec notre réseau d\'ambassadeurs',
    icon: Search,
    benefits: [
      'Accès exclusif aux biens',
      'Visites accompagnées gratuites',
      'Négociation assistée',
      'Dossier de financement optimisé'
    ],
    stats: [
      { label: 'Biens disponibles', value: '2 847' },
      { label: 'Taux de satisfaction', value: '96%' }
    ]
  },
  {
    role: 'ambassador',
    title: 'Ambassadeur',
    description: 'Gagnez des revenus en accompagnant les visites dans votre quartier',
    icon: Users,
    benefits: [
      '125€ par visite organisée',
      '10% de commission sur les signatures',
      'Formation gratuite',
      'Flexibilité totale'
    ],
    requirements: [
      'Connaissance du quartier',
      'Disponibilité minimum 4h/semaine',
      'Excellent relationnel',
      'Quiz de validation'
    ],
    stats: [
      { label: 'Revenu moyen', value: '1 850€/mois' },
      { label: 'Ambassadeurs actifs', value: '347' }
    ]
  }
];

export const RolesManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activatingRole, setActivatingRole] = useState<UserRole | null>(null);

  if (!user) return null;

  const handleActivateRole = async (role: UserRole) => {
    setActivatingRole(role);
    
    // Simulate activation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real app, would update user roles via API
    console.log(`Activating role: ${role}`);
    
    // Navigate to role-specific onboarding or dashboard
    if (role === 'ambassador') {
      navigate('/ambassador/onboarding');
    } else {
      navigate(`/${role}/dashboard`);
    }
  };

  return (
    <DashboardLayout role={user.roles[0]}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gérer mes rôles</h1>
          <p className="text-gray-600">
            Activez de nouveaux rôles pour développer votre activité sur LoopImmo
          </p>
        </div>

        {/* Active Roles */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rôles actifs</h2>
          <div className="grid lg:grid-cols-3 gap-4">
            {rolesInfo
              .filter(info => user.roles.includes(info.role))
              .map(info => (
                <Card key={info.role} className="relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge variant="success" size="sm">
                      <Check className="w-3 h-3 mr-1" />
                      Actif
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {info.title}
                      </h3>
                    </div>
                    
                    {info.stats && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {info.stats.map((stat, index) => (
                          <div key={index}>
                            <p className="text-2xl font-bold text-gray-900">
                              {stat.value}
                            </p>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate(`/${info.role}/dashboard`)}
                    >
                      Accéder au dashboard
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Available Roles */}
        {user.roles.length < 3 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Rôles disponibles
            </h2>
            <div className="grid lg:grid-cols-3 gap-4">
              {rolesInfo
                .filter(info => !user.roles.includes(info.role))
                .map(info => (
                  <Card key={info.role} className="relative overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <info.icon className="w-6 h-6 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {info.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        {info.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-gray-900">Avantages :</p>
                        <ul className="space-y-1">
                          {info.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {info.requirements && (
                        <div className="p-3 bg-yellow-50 rounded-lg mb-4">
                          <div className="flex items-start space-x-2">
                            <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <p className="text-xs text-yellow-800">
                              Validation requise après inscription
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleActivateRole(info.role)}
                        disabled={activatingRole === info.role}
                      >
                        {activatingRole === info.role ? (
                          <>Activation en cours...</>
                        ) : (
                          <>
                            Activer ce rôle
                            <Lock className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Performance Overview */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance globale
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Euro className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Revenus totaux</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(15600)}
                </p>
                <p className="text-sm text-green-600">+23% ce mois</p>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Score global</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">847/1000</p>
                <p className="text-sm text-blue-600">Niveau Or</p>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600">Badges obtenus</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-purple-600">3 ce mois</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
