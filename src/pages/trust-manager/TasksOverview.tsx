import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Clock, CheckCircle, AlertCircle, Filter, Search,
  FileCheck, Camera, Users, FileText, Archive,
  ChevronRight, Calendar, Euro
} from 'lucide-react';
import { formatPrice } from '../../utils/calculations';
import { trustManagerTasks } from '../../mocks';

interface Task {
  id: string;
  type: 'validation' | 'quality_control' | 'lead_qualification' | 'contract_review' | 'notary_coordination';
  title: string;
  property: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  createdAt: Date;
  dueDate: Date;
  estimatedDuration: number;
  cost: number;
  assignedTo?: string;
}

export const TasksOverview: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const tasks: Task[] = trustManagerTasks;

  const getTypeIcon = (type: Task['type']) => {
    switch (type) {
      case 'validation': return FileCheck;
      case 'quality_control': return Camera;
      case 'lead_qualification': return Users;
      case 'contract_review': return FileText;
      case 'notary_coordination': return Archive;
    }
  };

  const getTypeLabel = (type: Task['type']) => {
    switch (type) {
      case 'validation': return 'Validation';
      case 'quality_control': return 'Contrôle qualité';
      case 'lead_qualification': return 'Qualification lead';
      case 'contract_review': return 'Relecture contrat';
      case 'notary_coordination': return 'Coordination notaire';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in_progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-gray-600 bg-gray-50';
      case 'blocked': return 'text-red-600 bg-red-50';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'pending': return 'En attente';
      case 'blocked': return 'Bloqué';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status !== filter) return false;
    if (selectedType !== 'all' && task.type !== selectedType) return false;
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !task.property.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    urgent: tasks.filter(t => t.priority === 'urgent').length,
    totalCost: tasks.reduce((sum, t) => sum + t.cost, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des tâches</h1>
        <p className="text-gray-600">Gérez et suivez toutes vos tâches de validation</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Terminées</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgentes</p>
              <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Coût total</p>
              <p className="text-2xl font-bold text-purple-600">{formatPrice(stats.totalCost)}</p>
            </div>
            <Euro className="w-8 h-8 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une tâche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              <option value="validation">Validation</option>
              <option value="quality_control">Contrôle qualité</option>
              <option value="lead_qualification">Qualification lead</option>
              <option value="contract_review">Relecture contrat</option>
              <option value="notary_coordination">Coordination notaire</option>
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={cn(
                  "px-3 py-1 rounded text-sm font-medium transition-colors",
                  filter === 'all' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                )}
              >
                Toutes
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={cn(
                  "px-3 py-1 rounded text-sm font-medium transition-colors",
                  filter === 'pending' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                )}
              >
                En attente
              </button>
              <button
                onClick={() => setFilter('in_progress')}
                className={cn(
                  "px-3 py-1 rounded text-sm font-medium transition-colors",
                  filter === 'in_progress' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                )}
              >
                En cours
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={cn(
                  "px-3 py-1 rounded text-sm font-medium transition-colors",
                  filter === 'completed' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                )}
              >
                Terminées
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const Icon = getTypeIcon(task.type);
          const timeRemaining = task.dueDate.getTime() - new Date().getTime();
          const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
          
          return (
            <Card key={task.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    task.type === 'validation' && "bg-blue-100",
                    task.type === 'quality_control' && "bg-green-100",
                    task.type === 'lead_qualification' && "bg-purple-100",
                    task.type === 'contract_review' && "bg-orange-100",
                    task.type === 'notary_coordination' && "bg-indigo-100"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6",
                      task.type === 'validation' && "text-blue-600",
                      task.type === 'quality_control' && "text-green-600",
                      task.type === 'lead_qualification' && "text-purple-600",
                      task.type === 'contract_review' && "text-orange-600",
                      task.type === 'notary_coordination' && "text-indigo-600"
                    )} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        getPriorityColor(task.priority)
                      )}>
                        {task.priority === 'urgent' ? 'Urgent' : 
                         task.priority === 'high' ? 'Haute' :
                         task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        getStatusColor(task.status)
                      )}>
                        {getStatusLabel(task.status)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Réf: {task.property}</span>
                      <span>Type: {getTypeLabel(task.type)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.estimatedDuration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        {formatPrice(task.cost)} HT
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-gray-500">
                        Créée le {task.createdAt.toLocaleDateString('fr-FR')}
                      </span>
                      {task.status === 'pending' && hoursRemaining > 0 && (
                        <span className={cn(
                          "font-medium",
                          hoursRemaining < 2 ? "text-red-600" : 
                          hoursRemaining < 6 ? "text-orange-600" : "text-gray-600"
                        )}>
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {hoursRemaining < 24 
                            ? `${hoursRemaining}h restantes`
                            : `${Math.floor(hoursRemaining / 24)}j restants`
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {task.status === 'pending' && (
                    <Button size="sm">
                      Commencer
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                  {task.status === 'in_progress' && (
                    <Button size="sm" variant="outline">
                      Continuer
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                  {task.status === 'completed' && (
                    <Button size="sm" variant="ghost">
                      Voir détails
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">Aucune tâche trouvée</p>
        </Card>
      )}
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
