import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  BookOpen, CheckCircle, Clock, ArrowRight, Play, 
  FileText, Camera, Euro, Calendar, Users, Shield,
  TrendingUp, Award, Info, ChevronRight, Lightbulb,
  Target, Zap, Heart, Star
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface GuideStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'completed' | 'current' | 'upcoming';
  duration: string;
  tasks: Array<{
    title: string;
    completed: boolean;
  }>;
  tips: string[];
  resources: Array<{
    title: string;
    type: 'video' | 'article' | 'checklist';
    url: string;
  }>;
}

const guideSteps: GuideStep[] = [
  {
    id: 'preparation',
    title: 'Préparation du bien',
    description: 'Préparez votre bien pour maximiser son attractivité',
    icon: Heart,
    status: 'completed',
    duration: '1-2 semaines',
    tasks: [
      { title: 'Désencombrer et dépersonnaliser', completed: true },
      { title: 'Effectuer les petites réparations', completed: true },
      { title: 'Nettoyer en profondeur', completed: true },
      { title: 'Améliorer la luminosité', completed: true }
    ],
    tips: [
      'Un bien rangé paraît 20% plus grand',
      'Les acheteurs doivent pouvoir se projeter',
      'La première impression est cruciale'
    ],
    resources: [
      { title: 'Guide du home staging', type: 'article', url: '#' },
      { title: 'Checklist de préparation', type: 'checklist', url: '#' },
      { title: 'Vidéo : 10 erreurs à éviter', type: 'video', url: '#' }
    ]
  },
  {
    id: 'photos',
    title: 'Photos professionnelles',
    description: 'Capturez votre bien sous son meilleur jour',
    icon: Camera,
    status: 'completed',
    duration: '1 jour',
    tasks: [
      { title: 'Prendre les photos en journée', completed: true },
      { title: 'Photographier chaque pièce', completed: true },
      { title: 'Inclure des vues extérieures', completed: true },
      { title: 'Optimiser avec l\'IA', completed: false }
    ],
    tips: [
      '95% des acheteurs regardent d\'abord les photos',
      'Minimum 15 photos de qualité recommandées',
      'L\'ordre des photos influence l\'intérêt'
    ],
    resources: [
      { title: 'Techniques de photographie', type: 'article', url: '#' },
      { title: 'Amélioration IA des photos', type: 'video', url: '#' }
    ]
  },
  {
    id: 'pricing',
    title: 'Fixation du prix',
    description: 'Trouvez le juste prix pour vendre rapidement',
    icon: Euro,
    status: 'current',
    duration: '2-3 jours',
    tasks: [
      { title: 'Analyser les biens similaires', completed: true },
      { title: 'Considérer l\'état du marché', completed: true },
      { title: 'Définir une stratégie de prix', completed: false },
      { title: 'Prévoir une marge de négociation', completed: false }
    ],
    tips: [
      'Un bien surévalué de 5% met 2x plus de temps à vendre',
      'Le bon prix génère plusieurs offres rapidement',
      'Prévoyez 3-5% de marge de négociation'
    ],
    resources: [
      { title: 'Analyse comparative du marché', type: 'article', url: '#' },
      { title: 'Calculateur de prix optimal', type: 'checklist', url: '#' }
    ]
  },
  {
    id: 'visits',
    title: 'Organisation des visites',
    description: 'Accueillez efficacement les acheteurs potentiels',
    icon: Calendar,
    status: 'upcoming',
    duration: '2-8 semaines',
    tasks: [
      { title: 'Définir les créneaux de visite', completed: false },
      { title: 'Préparer le parcours de visite', completed: false },
      { title: 'Créer une fiche descriptive', completed: false },
      { title: 'Former l\'ambassadeur', completed: false }
    ],
    tips: [
      'Les visites groupées créent un sentiment d\'urgence',
      'Un parcours logique améliore l\'impression',
      'Laissez les visiteurs s\'approprier l\'espace'
    ],
    resources: [
      { title: 'Guide de la visite parfaite', type: 'article', url: '#' },
      { title: 'Questions fréquentes des acheteurs', type: 'checklist', url: '#' }
    ]
  },
  {
    id: 'negotiation',
    title: 'Négociation',
    description: 'Gérez les offres et négociez sereinement',
    icon: Users,
    status: 'upcoming',
    duration: '1-2 semaines',
    tasks: [
      { title: 'Analyser chaque offre', completed: false },
      { title: 'Vérifier la solidité financière', completed: false },
      { title: 'Négocier les conditions', completed: false },
      { title: 'Choisir la meilleure offre', completed: false }
    ],
    tips: [
      'Ne répondez jamais immédiatement à une offre',
      'Considérez l\'ensemble : prix, délais, conditions',
      'Un acheteur au comptant vaut 5% de plus'
    ],
    resources: [
      { title: 'Stratégies de négociation', type: 'video', url: '#' },
      { title: 'Évaluer une offre d\'achat', type: 'article', url: '#' }
    ]
  },
  {
    id: 'closing',
    title: 'Finalisation',
    description: 'Concrétisez la vente en toute sécurité',
    icon: Shield,
    status: 'upcoming',
    duration: '2-3 mois',
    tasks: [
      { title: 'Signer la promesse de vente', completed: false },
      { title: 'Lever les conditions suspensives', completed: false },
      { title: 'Préparer l\'acte définitif', completed: false },
      { title: 'Signer chez le notaire', completed: false }
    ],
    tips: [
      'Le délai moyen est de 3 mois après l\'offre',
      'Restez disponible pour le notaire',
      'Préparez votre déménagement à l\'avance'
    ],
    resources: [
      { title: 'Comprendre la promesse de vente', type: 'article', url: '#' },
      { title: 'Checklist avant signature', type: 'checklist', url: '#' }
    ]
  }
];

export const GuidePage: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<GuideStep>(
    guideSteps.find(s => s.status === 'current') || guideSteps[0]
  );

  const completedSteps = guideSteps.filter(s => s.status === 'completed').length;
  const progressPercentage = (completedSteps / guideSteps.length) * 100;

  return (
    <DashboardLayout role="seller">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Guide de vente</h1>
            <p className="text-gray-600 mt-1">Suivez nos conseils d'experts pour vendre rapidement et au meilleur prix</p>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium">Niveau Expert</span>
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Votre progression</h3>
              <span className="text-2xl font-bold text-primary-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{completedSteps} étapes complétées sur {guideSteps.length}</span>
              <span className="text-gray-600">Temps estimé restant : 3-4 semaines</span>
            </div>
          </div>
        </Card>

        {/* Steps Timeline */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Étapes de vente</h3>
                <div className="space-y-3">
                  {guideSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isSelected = selectedStep.id === step.id;
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => setSelectedStep(step)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg transition-all",
                          isSelected ? "bg-primary-50 ring-2 ring-primary-500" : "hover:bg-gray-50",
                          step.status === 'completed' && !isSelected && "opacity-75"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            step.status === 'completed' ? "bg-green-100" :
                            step.status === 'current' ? "bg-primary-100" : "bg-gray-100"
                          )}>
                            {step.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Icon className={cn(
                                "w-5 h-5",
                                step.status === 'current' ? "text-primary-600" : "text-gray-400"
                              )} />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{step.title}</p>
                            <p className="text-xs text-gray-600">{step.duration}</p>
                          </div>
                          {isSelected && (
                            <ChevronRight className="w-4 h-4 text-primary-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Selected Step Details */}
            <Card>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedStep.title}</h3>
                    <p className="text-gray-600 mt-1">{selectedStep.description}</p>
                  </div>
                  <Badge 
                    variant={
                      selectedStep.status === 'completed' ? 'success' :
                      selectedStep.status === 'current' ? 'primary' : 'default'
                    }
                  >
                    {selectedStep.status === 'completed' ? 'Terminé' :
                     selectedStep.status === 'current' ? 'En cours' : 'À venir'}
                  </Badge>
                </div>

                {/* Tasks Checklist */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Tâches à accomplir</h4>
                  <div className="space-y-2">
                    {selectedStep.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          task.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                        )}>
                          {task.completed && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className={cn(
                          "text-sm",
                          task.completed ? "text-gray-500 line-through" : "text-gray-700"
                        )}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Conseils d'expert</h4>
                  </div>
                  <ul className="space-y-1">
                    {selectedStep.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Ressources utiles</h4>
                  <div className="grid gap-3">
                    {selectedStep.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {resource.type === 'video' ? <Play className="w-5 h-5 text-red-600" /> :
                           resource.type === 'article' ? <FileText className="w-5 h-5 text-blue-600" /> :
                           <CheckCircle className="w-5 h-5 text-green-600" />}
                          <span className="text-sm font-medium text-gray-900">{resource.title}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Délai moyen de vente</p>
                    <p className="text-xl font-bold text-gray-900">45 jours</p>
                    <p className="text-xs text-green-600">-30 jours vs moyenne</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600">Satisfaction vendeurs</p>
                    <p className="text-xl font-bold text-gray-900">4.8/5</p>
                    <p className="text-xs text-gray-600">Sur 1250 avis</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Expert Tip of the Day */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Astuce du jour</h3>
                <p className="text-gray-700">
                  Les biens avec des photos prises entre 10h et 14h reçoivent 32% plus de vues. 
                  La lumière naturelle fait toute la différence !
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
