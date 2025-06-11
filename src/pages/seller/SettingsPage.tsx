import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  User, Bell, Shield, CreditCard, Globe, Smartphone,
  Mail, Lock, Eye, EyeOff, Check, X, Info,
  ChevronRight, Save, AlertCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    address: '15 rue de la Paix',
    city: 'Paris',
    postalCode: '75002'
  });

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'new_lead',
      label: 'Nouveaux leads',
      description: 'Recevez une notification pour chaque nouveau lead qualifié',
      email: true,
      push: true,
      sms: false
    },
    {
      id: 'visit_request',
      label: 'Demandes de visite',
      description: 'Soyez alerté des nouvelles demandes de visite',
      email: true,
      push: true,
      sms: true
    },
    {
      id: 'offer_received',
      label: 'Offres reçues',
      description: 'Notification immédiate pour chaque offre',
      email: true,
      push: true,
      sms: true
    },
    {
      id: 'document_status',
      label: 'Statut des documents',
      description: 'Mises à jour sur la validation de vos documents',
      email: true,
      push: false,
      sms: false
    },
    {
      id: 'market_insights',
      label: 'Insights marché',
      description: 'Rapports hebdomadaires sur votre secteur',
      email: true,
      push: false,
      sms: false
    }
  ]);

  const handleNotificationToggle = (id: string, channel: 'email' | 'push' | 'sms') => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, [channel]: !notif[channel] } : notif
    ));
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'billing', label: 'Facturation', icon: CreditCard }
  ];

  return (
    <DashboardLayout role="seller">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Gérez vos préférences et informations personnelles</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                  activeTab === tab.id 
                    ? "border-primary-500 text-primary-600" 
                    : "border-transparent text-gray-600 hover:text-gray-900"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations personnelles</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Adresse</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ville
                        </label>
                        <input
                          type="text"
                          value={profileData.city}
                          onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Code postal
                        </label>
                        <input
                          type="text"
                          value={profileData.postalCode}
                          onChange={(e) => setProfileData({ ...profileData, postalCode: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button variant="primary">
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer les modifications
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Statut du compte</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Vérification email</span>
                      <Badge variant="success">
                        <Check className="w-3 h-3 mr-1" />
                        Vérifié
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Vérification téléphone</span>
                      <Badge variant="success">
                        <Check className="w-3 h-3 mr-1" />
                        Vérifié
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">KYC</span>
                      <Badge variant="success">
                        <Check className="w-3 h-3 mr-1" />
                        Validé
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Préférences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Newsletter LoopImmo</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Conseils personnalisés</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Partager mes stats</span>
                      <input type="checkbox" className="toggle" />
                    </label>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Préférences de notification</h2>
                
                <div className="space-y-6">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{notif.label}</h3>
                          <p className="text-sm text-gray-600">{notif.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notif.email}
                            onChange={() => handleNotificationToggle(notif.id, 'email')}
                            className="rounded"
                          />
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">Email</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notif.push}
                            onChange={() => handleNotificationToggle(notif.id, 'push')}
                            className="rounded"
                          />
                          <Smartphone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">Push</span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notif.sms}
                            onChange={() => handleNotificationToggle(notif.id, 'sms')}
                            className="rounded"
                          />
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">SMS</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">Notifications importantes</p>
                      <p>Les notifications critiques (offres, visites) seront toujours envoyées pour ne pas manquer d'opportunités.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Changer le mot de passe</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe actuel
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="pt-4">
                    <Button variant="primary" className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Mettre à jour le mot de passe
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Authentification à deux facteurs</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </p>
                  <Button variant="outline" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Activer 2FA
                  </Button>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Sessions actives</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">iPhone 13 Pro</p>
                          <p className="text-xs text-gray-600">Paris, France • Maintenant</p>
                        </div>
                      </div>
                      <Badge variant="success">Actuel</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Chrome sur MacBook</p>
                          <p className="text-xs text-gray-600">Paris, France • Il y a 2h</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Historique des paiements</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Forfait Premium - Appartement République</p>
                      <p className="text-sm text-gray-600">Payé le 1 mars 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">6 000€</p>
                      <Badge variant="success">Payé</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Option Photos Pro</p>
                      <p className="text-sm text-gray-600">Payé le 5 mars 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">150€</p>
                      <Badge variant="success">Payé</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger les factures
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Moyens de paiement</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expire 12/25</p>
                      </div>
                    </div>
                    <Badge variant="info">Par défaut</Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un moyen de paiement
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
