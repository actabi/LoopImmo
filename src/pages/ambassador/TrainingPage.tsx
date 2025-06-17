import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  GraduationCap, BookOpen, Video, FileText, Download,
  Award, Clock, CheckCircle, Lock, PlayCircle,
  Star, TrendingUp, Users, MessageSquare, Calendar,
  Zap, Target, Shield, Briefcase, ChevronRight,
  Trophy, Certificate, Brain, Lightbulb, Rocket,
  BarChart3, Camera, Home, Euro, Heart, ArrowRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

// Types pour les formations
interface Course {
  id: string;
  title: string;
  description: string;
  category: 'basics' | 'advanced' | 'expert' | 'tools';
  duration: number; // en minutes
  modules: Module[];
  progress: number;
  completed: boolean;
  locked: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ElementType;
  certificateAvailable: boolean;
}

interface Module {
  id: string;
  title: string;
  duration: number;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  completed: boolean;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'guide' | 'template' | 'checklist' | 'script';
  format: 'pdf' | 'doc' | 'video' | 'link';
  size?: string;
  downloadUrl: string;
  popular: boolean;
  new: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward?: string;
}

// Mock data
const courses: Course[] = [
  {
    id: '1',
    title: 'Fondamentaux LoopImmo',
    description: 'Découvrez le modèle LoopImmo et votre rôle d\'ambassadeur',
    category: 'basics',
    duration: 45,
    progress: 100,
    completed: true,
    locked: false,
    difficulty: 'beginner',
    icon: GraduationCap,
    certificateAvailable: true,
    modules: [
      { id: '1-1', title: 'Bienvenue chez LoopImmo', duration: 10, type: 'video', completed: true },
      { id: '1-2', title: 'Le modèle économique', duration: 15, type: 'video', completed: true },
      { id: '1-3', title: 'Votre rôle d\'ambassadeur', duration: 15, type: 'text', completed: true },
      { id: '1-4', title: 'Quiz de validation', duration: 5, type: 'quiz', completed: true }
    ]
  },
  {
    id: '2',
    title: 'Maîtriser la prospection',
    description: 'Techniques avancées pour trouver et qualifier vos clients',
    category: 'advanced',
    duration: 90,
    progress: 60,
    completed: false,
    locked: false,
    difficulty: 'intermediate',
    icon: Target,
    certificateAvailable: true,
    modules: [
      { id: '2-1', title: 'Identifier les bons prospects', duration: 20, type: 'video', completed: true },
      { id: '2-2', title: 'Techniques de cold calling', duration: 25, type: 'video', completed: true },
      { id: '2-3', title: 'Qualification des leads', duration: 20, type: 'exercise', completed: true },
      { id: '2-4', title: 'Gestion du pipeline', duration: 15, type: 'text', completed: false },
      { id: '2-5', title: 'Cas pratiques', duration: 10, type: 'exercise', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Photographie immobilière',
    description: 'Créez des annonces qui se démarquent avec des photos pro',
    category: 'tools',
    duration: 120,
    progress: 0,
    completed: false,
    locked: false,
    difficulty: 'intermediate',
    icon: Camera,
    certificateAvailable: true,
    modules: [
      { id: '3-1', title: 'Matériel recommandé', duration: 15, type: 'video', completed: false },
      { id: '3-2', title: 'Techniques de prise de vue', duration: 30, type: 'video', completed: false },
      { id: '3-3', title: 'Retouche photo', duration: 25, type: 'video', completed: false },
      { id: '3-4', title: 'Home staging virtuel', duration: 20, type: 'video', completed: false },
      { id: '3-5', title: 'Créer une visite virtuelle', duration: 30, type: 'exercise', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Négociation avancée',
    description: 'Maximisez vos ventes avec des techniques de négociation éprouvées',
    category: 'expert',
    duration: 150,
    progress: 0,
    completed: false,
    locked: true,
    difficulty: 'advanced',
    icon: Briefcase,
    certificateAvailable: true,
    modules: [
      { id: '4-1', title: 'Psychologie de l\'acheteur', duration: 30, type: 'video', completed: false },
      { id: '4-2', title: 'Techniques de closing', duration: 40, type: 'video', completed: false },
      { id: '4-3', title: 'Gestion des objections', duration: 30, type: 'exercise', completed: false },
      { id: '4-4', title: 'Négociation multi-parties', duration: 25, type: 'video', completed: false },
      { id: '4-5', title: 'Études de cas', duration: 25, type: 'exercise', completed: false }
    ]
  }
];

const resources: Resource[] = [
  {
    id: 'r1',
    title: 'Guide de démarrage rapide',
    description: 'Tout ce qu\'il faut savoir pour bien commencer',
    category: 'guide',
    format: 'pdf',
    size: '2.4 MB',
    downloadUrl: '#',
    popular: true,
    new: false
  },
  {
    id: 'r2',
    title: 'Scripts d\'appel vendeurs',
    description: 'Scripts testés et approuvés pour vos premiers contacts',
    category: 'script',
    format: 'doc',
    size: '156 KB',
    downloadUrl: '#',
    popular: true,
    new: false
  },
  {
    id: 'r3',
    title: 'Checklist visite immobilière',
    description: 'Ne rien oublier lors de vos visites',
    category: 'checklist',
    format: 'pdf',
    size: '89 KB',
    downloadUrl: '#',
    popular: false,
    new: true
  },
  {
    id: 'r4',
    title: 'Modèle de mandat exclusif',
    description: 'Template juridique validé par nos experts',
    category: 'template',
    format: 'doc',
    size: '234 KB',
    downloadUrl: '#',
    popular: false,
    new: false
  },
  {
    id: 'r5',
    title: 'Guide estimation immobilière',
    description: 'Méthodologie complète pour estimer un bien',
    category: 'guide',
    format: 'pdf',
    size: '4.1 MB',
    downloadUrl: '#',
    popular: true,
    new: true
  }
];

const achievements: Achievement[] = [
  {
    id: 'a1',
    title: 'Première vente',
    description: 'Réalisez votre première vente',
    icon: Trophy,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    reward: 'Badge Bronze'
  },
  {
    id: 'a2',
    title: 'Expert en formation',
    description: 'Complétez 5 formations',
    icon: GraduationCap,
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    reward: '100€ de bonus'
  },
  {
    id: 'a3',
    title: 'Maître du réseau',
    description: 'Parrainez 10 clients',
    icon: Users,
    unlocked: false,
    progress: 4,
    maxProgress: 10,
    reward: 'Accès VIP événements'
  },
  {
    id: 'a4',
    title: 'Champion des ventes',
    description: '20 ventes réalisées',
    icon: Star,
    unlocked: false,
    progress: 12,
    maxProgress: 20,
    reward: 'Voyage incentive'
  }
];

// Composant pour une carte de formation
const CourseCard: React.FC<{ course: Course; onStart: () => void }> = ({ course, onStart }) => {
  const Icon = course.icon;
  
  const getDifficultyColor = () => {
    switch (course.difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
    }
  };

  const getCategoryLabel = () => {
    switch (course.category) {
      case 'basics': return 'Fondamentaux';
      case 'advanced': return 'Avancé';
      case 'expert': return 'Expert';
      case 'tools': return 'Outils';
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all hover:shadow-lg",
      course.locked && "opacity-75"
    )}>
      {course.completed && (
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline" size="sm">{getCategoryLabel()}</Badge>
          <Badge className={getDifficultyColor()} size="sm">
            {course.difficulty === 'beginner' ? 'Débutant' : 
             course.difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{course.duration} min</span>
          </div>
        </div>

        {!course.locked && (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progression</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 bg-primary-500 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {course.modules.filter(m => m.completed).length}/{course.modules.length} modules
              </div>
              <Button 
                size="sm" 
                variant={course.progress > 0 ? "outline" : "primary"}
                onClick={onStart}
              >
                {course.progress === 0 ? 'Commencer' : 
                 course.progress === 100 ? 'Revoir' : 'Continuer'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        )}

        {course.locked && (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Débloqué au niveau Argent</span>
          </div>
        )}

        {course.certificateAvailable && course.completed && (
          <div className="mt-3 pt-3 border-t">
            <Button size="sm" variant="outline" className="w-full">
              <Award className="w-4 h-4 mr-2" />
              Télécharger le certificat
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

// Composant pour une ressource
const ResourceItem: React.FC<{ resource: Resource }> = ({ resource }) => {
  const getFormatIcon = () => {
    switch (resource.format) {
      case 'pdf': return FileText;
      case 'doc': return FileText;
      case 'video': return Video;
      case 'link': return ChevronRight;
    }
  };

  const getCategoryColor = () => {
    switch (resource.category) {
      case 'guide': return 'bg-blue-100 text-blue-600';
      case 'template': return 'bg-purple-100 text-purple-600';
      case 'checklist': return 'bg-green-100 text-green-600';
      case 'script': return 'bg-orange-100 text-orange-600';
    }
  };

  const FormatIcon = getFormatIcon();

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", getCategoryColor())}>
          <FormatIcon className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900">{resource.title}</h4>
            {resource.popular && <Badge variant="secondary" size="sm">Populaire</Badge>}
            {resource.new && <Badge variant="info" size="sm">Nouveau</Badge>}
          </div>
          <p className="text-sm text-gray-600">{resource.description}</p>
          {resource.size && <p className="text-xs text-gray-500 mt-1">{resource.size}</p>}
        </div>
      </div>
      <Button size="sm" variant="outline">
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
};

// Composant principal
export const TrainingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'resources' | 'achievements'>('courses');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Statistiques de formation
  const trainingStats = {
    completedCourses: 2,
    totalHours: 4.5,
    certificates: 2,
    currentStreak: 7,
    rank: 'Top 15%'
  };

  // Filtrer les cours
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  return (
    <DashboardLayout role="ambassador">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Formation & Ressources</h1>
            <p className="text-gray-600 mt-1">Développez vos compétences et boostez vos performances</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">Votre rang</p>
              <p className="font-semibold text-primary-600">{trainingStats.rank}</p>
            </div>
            <Button variant="primary">
              <Trophy className="w-4 h-4 mr-2" />
              Mes certificats
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{trainingStats.completedCourses}</p>
                <p className="text-sm text-gray-600">Formations complétées</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{trainingStats.totalHours}h</p>
                <p className="text-sm text-gray-600">Temps de formation</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{trainingStats.certificates}</p>
                <p className="text-sm text-gray-600">Certificats obtenus</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{trainingStats.currentStreak}</p>
                <p className="text-sm text-gray-600">Jours consécutifs</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Learning Path */}
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Votre parcours d'apprentissage</h3>
                <p className="text-sm text-gray-600 mt-1">Suivez votre progression vers le niveau Expert</p>
              </div>
              <Rocket className="w-8 h-8 text-primary-600" />
            </div>
            
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300" />
              <div className="absolute top-5 left-0 h-0.5 bg-primary-500" style={{ width: '40%' }} />
              
              <div className="relative flex justify-between">
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                    ✓
                  </div>
                  <p className="text-xs font-medium">Débutant</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                    2
                  </div>
                  <p className="text-xs font-medium">Intermédiaire</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold mb-2">
                    3
                  </div>
                  <p className="text-xs font-medium">Avancé</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold mb-2">
                    <Lock className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-medium">Expert</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prochain objectif</p>
                <p className="font-medium text-gray-900">Complétez 3 formations avancées</p>
              </div>
              <Button size="sm" variant="primary">
                Voir le parcours complet
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('courses')}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === 'courses' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Formations
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === 'resources' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Ressources
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === 'achievements' 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Trophy className="w-4 h-4 inline mr-2" />
            Succès
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'courses' && (
          <>
            {/* Category Filter */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                Toutes
              </Button>
              <Button
                size="sm"
                variant={selectedCategory === 'basics' ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory('basics')}
              >
                Fondamentaux
              </Button>
              <Button
                size="sm"
                variant={selectedCategory === 'advanced' ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory('advanced')}
              >
                Avancé
              </Button>
              <Button
                size="sm"
                variant={selectedCategory === 'tools' ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory('tools')}
              >
                Outils
              </Button>
              <Button
                size="sm"
                variant={selectedCategory === 'expert' ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory('expert')}
              >
                Expert
              </Button>
            </div>

            {/* Courses Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onStart={() => console.log('Start course:', course.id)}
                />
              ))}
            </div>

            {/* Upcoming Courses */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Prochaines formations live</h3>
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Video className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Masterclass : Closing avancé</p>
                        <p className="text-sm text-gray-600">Avec Jean-Marc Expert</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Jeudi 15 Nov</p>
                      <p className="text-xs text-gray-600">14h00 - 16h00</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Atelier : Réseaux sociaux</p>
                        <p className="text-sm text-gray-600">Marketing digital immobilier</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Mardi 20 Nov</p>
                      <p className="text-xs text-gray-600">18h00 - 19h30</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Voir tout le calendrier
                </Button>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'resources' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents essentiels</h3>
                <div className="space-y-2">
                  {resources.map(resource => (
                    <ResourceItem key={resource.id} resource={resource} />
                  ))}
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Outils recommandés</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Camera className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Application photo LoopImmo</p>
                          <p className="text-sm text-gray-600">Retouche automatique</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Installer</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Calculateur de commission</p>
                          <p className="text-sm text-gray-600">Excel optimisé</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Télécharger</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Templates SMS/Email</p>
                          <p className="text-sm text-gray-600">Messages pré-rédigés</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Accéder</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Centre d'aide</h3>
                      <p className="text-sm text-gray-700 mb-4">
                        Retrouvez toutes les réponses à vos questions dans notre base de connaissances.
                      </p>
                      <div className="space-y-2">
                        <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                          <ChevronRight className="w-4 h-4 mr-1" />
                          FAQ Ambassadeurs
                        </a>
                        <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                          <ChevronRight className="w-4 h-4 mr-1" />
                          Guides juridiques
                        </a>
                        <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                          <ChevronRight className="w-4 h-4 mr-1" />
                          Support technique
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {achievements.map(achievement => (
              <Card key={achievement.id} className={cn(
                "p-6",
                !achievement.unlocked && "opacity-75"
              )}>
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    achievement.unlocked ? "bg-yellow-100" : "bg-gray-100"
                  )}>
                    <achievement.icon className={cn(
                      "w-6 h-6",
                      achievement.unlocked ? "text-yellow-600" : "text-gray-400"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      {achievement.unlocked && (
                        <Badge variant="success" size="sm">Débloqué</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    
                    {!achievement.unlocked && (
                      <>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progression</span>
                          <span className="font-medium">{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 bg-yellow-500 rounded-full"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                      </>
                    )}
                    
                    {achievement.reward && (
                      <div className="mt-3 flex items-center gap-2">
                        <Gift className="w-4 h-4 text-primary-600" />
                        <span className="text-sm font-medium text-primary-600">
                          Récompense : {achievement.reward}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Motivation Section */}
        <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Continuez à apprendre !</h3>
                <p className="text-primary-100">
                  Les ambassadeurs les mieux formés réalisent 3x plus de ventes en moyenne.
                </p>
              </div>
              <Brain className="w-16 h-16 text-primary-200" />
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" className="bg-white text-primary-600 hover:bg-primary-50">
                Parcours personnalisé
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Coaching individuel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
