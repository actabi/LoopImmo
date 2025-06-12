import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Shield, CheckCircle, AlertCircle, Clock, TrendingUp,
  FileCheck, Camera, Users, FileText, Archive, Euro,
  AlertTriangle, Calendar, BarChart3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice } from '../../utils/calculations';

export const TrustManagerHome: React.FC = () => {
  const { user } = useAuth();

  // Mock data - in real app, fetch from API
  const stats = {
    pendingTasks: 12,
    completedToday: 8,
    urgentTasks: 3,
    averageTime: 25,
    monthlyProcessed: 156,
    complianceRate: 98.5,
    estimatedCost: 2340
  };

  const taskBreakdown = [
    { type: 'Validation initiale', count: 4, icon: FileCheck, color: 'blue', avgTime: 30, cost: 15 },
    { type: 'Contrôle qualité', count: 3, icon: Camera, color: 'green', avgTime: 30, cost: 15 },
    { type: 'Qualification leads', count: 2, icon: Users, color: 'purple', avgTime: 30, cost: 15 },
    { type: 'Relecture compromis', count: 2, icon: FileText, color: 'orange', avgTime: 20, cost: 10 },
    { type: 'Coordination notaire', count: 1, icon: Archive, color: 'indigo', avgTime: 15, cost: 7.5 }
  ];

  const recentAlerts = [
    { id: 1, type: 'urgent', message: 'DPE manquant - Appartement Lyon 6', property: 'REF-2024-001' },
    { id: 2, type: 'warning', message: 'Photos non conformes - Maison Écully', property: 'REF-2024-003' },
    { id: 3, type: 'info', message: 'Nouveau lead à qualifier - Jean Martin', property: 'REF-2024-002' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Centre de Contrôle Trust Manager
          </h1>
          <p className="text-gray-600">
            Carte T: {user?.carteT || 'T-75-2024-000123'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/trust-manager/compliance">
            <Button variant="outline" size="sm">
              <Shield className="w-4 h-4 mr-2" />
              Centre de conformité
            </Button>
          </Link>
          <Link to="/trust-manager/tasks">
            <Button size="sm">
              Voir toutes les tâches
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-orange-500">{stats.pendingTasks}</span>
          </div>
          <p className="text-sm font-medium text-gray-900">Tâches en attente</p>
          <p className="text-xs text-gray-500 mt-1">{stats.urgentTasks} urgentes</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-green-500">{stats.completedToday}</span>
          </div>
          <p className="text-sm font-medium text-gray-900">Complétées aujourd'hui</p>
          <p className="text-xs text-gray-500 mt-1">Temps moyen: {stats.averageTime} min</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-blue-500">{stats.complianceRate}%</span>
          </div>
          <p className="text-sm font-medium text-gray-900">Taux de conformité</p>
          <p className="text-xs text-gray-500 mt-1">Ce mois</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Euro className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-purple-500">{formatPrice(stats.estimatedCost)}</span>
          </div>
          <p className="text-sm font-medium text-gray-900">Coût estimé</p>
          <p className="text-xs text-gray-500 mt-1">Ce mois</p>
        </Card>
      </div>

      {/* Task Breakdown */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition des tâches
          </h3>
          <div className="space-y-4">
            {taskBreakdown.map((task) => {
              const Icon = task.icon;
              return (
                <div key={task.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${task.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${task.color}-600`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{task.type}</p>
                      <p className="text-sm text-gray-500">
                        ~{task.avgTime} min/tâche • {formatPrice(task.cost)} HT
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-gray-900">{task.count}</span>
                    <Link to={`/trust-manager/${task.type.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button size="sm" variant="outline">
                        Traiter
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Alertes récentes
            </h3>
            <Link to="/trust-manager/tasks?filter=alerts">
              <Button variant="ghost" size="sm">
                Voir tout
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start space-x-3 p-3 rounded-lg",
                  alert.type === 'urgent' && "bg-red-50",
                  alert.type === 'warning' && "bg-yellow-50",
                  alert.type === 'info' && "bg-blue-50"
                )}
              >
                {alert.type === 'urgent' && <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />}
                {alert.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />}
                {alert.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">Réf: {alert.property}</p>
                </div>
                <Button size="sm" variant="ghost">
                  Traiter
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Performance Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance mensuelle
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dossiers traités</span>
                <span className="font-semibold">{stats.monthlyProcessed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Temps moyen/dossier</span>
                <span className="font-semibold">{stats.averageTime} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Taux d'erreur</span>
                <span className="font-semibold text-green-600">1.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Satisfaction vendeurs</span>
                <span className="font-semibold">4.8/5</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Actions rapides
            </h3>
            <div className="space-y-3">
              <Link to="/trust-manager/validation" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FileCheck className="w-4 h-4 mr-2" />
                  Nouvelle validation d'annonce
                </Button>
              </Link>
              <Link to="/trust-manager/quality-control" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="w-4 h-4 mr-2" />
                  Contrôler photos/diagnostics
                </Button>
              </Link>
              <Link to="/trust-manager/lead-qualification" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Qualifier un lead acheteur
                </Button>
              </Link>
              <Link to="/trust-manager/contracts" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Relire un compromis
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
