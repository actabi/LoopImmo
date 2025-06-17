import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Users, MapPin, Calendar, Euro, Award, CheckCircle, 
  ArrowRight, ArrowLeft, Home, MessageSquare, Camera,
  FileText, Shield, Zap, Target, Clock, Star, Gift,
  BookOpen, Phone, Mail, Building, ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal info
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    
    // Availability
    availability: [] as string[],
    hoursPerWeek: '',
    
    // Experience
    hasRealEstateExperience: false,
    localKnowledge: '',
    languages: [] as string[],
    
    // Motivation
    motivation: '',
    goals: [] as string[],
    
    // Documents
    identityVerified: false,
    criminalRecordProvided: false,
    termsAccepted: false
  });

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Bienvenue chez LoopImmo',
      description: 'Découvrez comment devenir ambassadeur',
      icon: Users,
      content: <WelcomeStep />
    },
    {
      id: 2,
      title: 'Informations personnelles',
      description: 'Complétez votre profil ambassadeur',
      icon: FileText,
      content: <PersonalInfoStep formData={formData} setFormData={setFormData} />
    },
    {
      id: 3,
      title: 'Disponibilités',
      description: 'Indiquez vos créneaux disponibles',
      icon: Calendar,
      content: <AvailabilityStep formData={formData} setFormData={setFormData} />
    },
    {
      id: 4,
      title: 'Expérience et compétences',
      description: 'Partagez votre expertise',
      icon: Award,
      content: <ExperienceStep formData={formData} setFormData={setFormData} />
    },
    {
      id: 5,
      title: 'Validation et documents',
      description: 'Finalisez votre inscription',
      icon: Shield,
      content: <ValidationStep formData={formData} setFormData={setFormData} />
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form and navigate to dashboard
      console.log('Form submitted:', formData);
      navigate('/ambassador/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Devenir Ambassadeur LoopImmo
            </h1>
            <Badge variant="secondary">
              Étape {currentStep + 1} sur {steps.length}
            </Badge>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-primary-500 -translate-y-1/2 transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
            
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      isCompleted ? "bg-primary-500 text-white" :
                      isCurrent ? "bg-white border-2 border-primary-500 text-primary-500" :
                      "bg-gray-200 text-gray-400"
                    )}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={cn(
                      "text-xs mt-2 hidden sm:block",
                      isCurrent ? "text-primary-600 font-medium" : "text-gray-500"
                    )}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">{currentStepData.description}</p>
          </div>

          <div className="min-h-[400px]">
            {currentStepData.content}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Step Components
const WelcomeStep: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Users className="w-12 h-12 text-secondary-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Bienvenue dans l'aventure LoopImmo !
      </h3>
      <p className="text-gray-600 max-w-2xl mx-auto">
        En devenant ambassadeur, vous rejoignez une communauté dynamique et bénéficiez 
        d'opportunités de revenus attractives tout en aidant les gens à réaliser leurs projets immobiliers.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
        <Euro className="w-8 h-8 text-green-600 mb-3" />
        <h4 className="font-semibold text-gray-900 mb-2">Revenus attractifs</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
            125€ par visite organisée
          </li>
          <li className="flex items-start">
            <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
            0.8% à 1.2% de commission sur les ventes
          </li>
          <li className="flex items-start">
            <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
            Bonus de performance jusqu'à 1500€
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
        <Zap className="w-8 h-8 text-blue-600 mb-3" />
        <h4 className="font-semibold text-gray-900 mb-2">Avantages exclusifs</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <Check className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
            Formation complète gratuite
          </li>
          <li className="flex items-start">
            <Check className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
            Outils professionnels fournis
          </li>
          <li className="flex items-start">
            <Check className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
            Flexibilité totale des horaires
          </li>
        </ul>
      </div>
    </div>

    <div className="bg-purple-50 p-6 rounded-lg">
      <div className="flex items-start space-x-4">
        <Target className="w-8 h-8 text-purple-600 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Ce que nous attendons de vous
          </h4>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-purple-500 mr-2" />
              Excellente présentation
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-purple-500 mr-2" />
              Sens du service client
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-purple-500 mr-2" />
              Connaissance du quartier
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-purple-500 mr-2" />
              Disponibilité régulière
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const PersonalInfoStep: React.FC<{
  formData: any;
  setFormData: (data: any) => void;
}> = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone mobile *
        </label>
        <input
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="06 12 34 56 78"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ville *
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Lyon"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Adresse complète *
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        placeholder="123 rue de la République"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
    </div>

    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">Zone d'intervention</p>
          <p className="text-sm text-blue-700 mt-1">
            Vous interviendrez principalement dans un rayon de 15km autour de votre adresse.
            Vous pourrez modifier cette zone plus tard.
          </p>
        </div>
      </div>
    </div>

    <div className="border-t pt-6">
      <h4 className="font-medium text-gray-900 mb-4">Informations de contact</h4>
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700">
            J'accepte de recevoir des SMS pour les urgences
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700">
            J'accepte de recevoir la newsletter ambassadeurs
          </span>
        </label>
      </div>
    </div>
  </div>
);

const AvailabilityStep: React.FC<{
  formData: any;
  setFormData: (data: any) => void;
}> = ({ formData, setFormData }) => {
  const timeSlots = [
    { id: 'morning', label: 'Matin (8h-12h)', icon: '🌅' },
    { id: 'afternoon', label: 'Après-midi (12h-18h)', icon: '☀️' },
    { id: 'evening', label: 'Soirée (18h-21h)', icon: '🌆' },
    { id: 'weekend', label: 'Week-end', icon: '🎉' }
  ];

  const toggleAvailability = (slotId: string) => {
    const newAvailability = formData.availability.includes(slotId)
      ? formData.availability.filter((id: string) => id !== slotId)
      : [...formData.availability, slotId];
    
    setFormData({ ...formData, availability: newAvailability });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-4">
          Quand êtes-vous disponible pour organiser des visites ?
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => toggleAvailability(slot.id)}
              className={cn(
                "p-4 rounded-lg border-2 transition-all",
                formData.availability.includes(slot.id)
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="text-2xl mb-2">{slot.icon}</div>
              <p className="font-medium text-gray-900">{slot.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Combien d'heures par semaine pouvez-vous consacrer ? *
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          value={formData.hoursPerWeek}
          onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
        >
          <option value="">Sélectionnez</option>
          <option value="4-8">4 à 8 heures</option>
          <option value="8-16">8 à 16 heures</option>
          <option value="16-24">16 à 24 heures</option>
          <option value="24+">Plus de 24 heures</option>
        </select>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <div className="flex items-start space-x-4">
          <Clock className="w-8 h-8 text-green-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Estimation de vos revenus
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              Basé sur votre disponibilité, voici une estimation de vos revenus potentiels :
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded">
                <p className="text-sm text-gray-600">Visites/mois</p>
                <p className="text-xl font-bold text-gray-900">8-12</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-sm text-gray-600">Revenus estimés</p>
                <p className="text-xl font-bold text-green-600">1000-1500€</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceStep: React.FC<{
  formData: any;
  setFormData: (data: any) => void;
}> = ({ formData, setFormData }) => {
  const languages = ['Français', 'Anglais', 'Espagnol', 'Italien', 'Arabe', 'Autre'];
  const goals = [
    { id: 'main-income', label: 'Revenu principal', icon: '💼' },
    { id: 'extra-income', label: 'Complément de revenu', icon: '💰' },
    { id: 'network', label: 'Développer mon réseau', icon: '🤝' },
    { id: 'learn', label: 'Apprendre l\'immobilier', icon: '📚' }
  ];

  const toggleLanguage = (lang: string) => {
    const newLanguages = formData.languages.includes(lang)
      ? formData.languages.filter((l: string) => l !== lang)
      : [...formData.languages, lang];
    
    setFormData({ ...formData, languages: newLanguages });
  };

  const toggleGoal = (goalId: string) => {
    const newGoals = formData.goals.includes(goalId)
      ? formData.goals.filter((g: string) => g !== goalId)
      : [...formData.goals, goalId];
    
    setFormData({ ...formData, goals: newGoals });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center space-x-3 mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            checked={formData.hasRealEstateExperience}
            onChange={(e) => setFormData({ ...formData, hasRealEstateExperience: e.target.checked })}
          />
          <span className="text-gray-700">J'ai déjà une expérience dans l'immobilier</span>
        </label>

        {formData.hasRealEstateExperience && (
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
            placeholder="Décrivez brièvement votre expérience..."
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Connaissance du quartier *
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={3}
          placeholder="Décrivez votre connaissance du quartier (commerces, transports, écoles...)"
          value={formData.localKnowledge}
          onChange={(e) => setFormData({ ...formData, localKnowledge: e.target.value })}
        />
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3">Langues parlées</h4>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                formData.languages.includes(lang)
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3">Vos objectifs</h4>
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={cn(
                "p-3 rounded-lg border-2 transition-all text-left",
                formData.goals.includes(goal.id)
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{goal.icon}</span>
                <span className="text-sm font-medium text-gray-900">{goal.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qu'est-ce qui vous motive à devenir ambassadeur ?
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={3}
          placeholder="Partagez votre motivation..."
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
        />
      </div>
    </div>
  );
};

const ValidationStep: React.FC<{
  formData: any;
  setFormData: (data: any) => void;
}> = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <div className="bg-yellow-50 p-4 rounded-lg">
      <div className="flex items-start space-x-3">
        <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-yellow-900">Vérification d'identité</p>
          <p className="text-sm text-yellow-700 mt-1">
            Pour la sécurité de tous, nous devons vérifier votre identité et votre casier judiciaire.
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900">Pièce d'identité</h4>
          {formData.identityVerified ? (
            <Badge variant="success" size="sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              Vérifié
            </Badge>
          ) : (
            <Badge variant="warning" size="sm">En attente</Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Carte d'identité ou passeport en cours de validité
        </p>
        <Button size="sm" variant="outline">
          <Camera className="w-4 h-4 mr-2" />
          Prendre une photo
        </Button>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900">Casier judiciaire</h4>
          {formData.criminalRecordProvided ? (
            <Badge variant="success" size="sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              Fourni
            </Badge>
          ) : (
            <Badge variant="warning" size="sm">Requis</Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Extrait de casier judiciaire de moins de 3 mois
        </p>
        <Button size="sm" variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Télécharger le document
        </Button>
      </div>
    </div>

    <div className="border-t pt-6">
      <h4 className="font-medium text-gray-900 mb-4">Conditions et engagements</h4>
      <div className="space-y-3">
        <label className="flex items-start">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
          />
          <span className="ml-2 text-sm text-gray-700">
            J'accepte les <a href="#" className="text-primary-600 hover:underline">conditions générales</a> et 
            le <a href="#" className="text-primary-600 hover:underline">code de conduite</a> des ambassadeurs LoopImmo
          </span>
        </label>
        <label className="flex items-start">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
          />
          <span className="ml-2 text-sm text-gray-700">
            Je m'engage à respecter la confidentialité des informations clients
          </span>
        </label>
        <label className="flex items-start">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
          />
          <span className="ml-2 text-sm text-gray-700">
            Je comprends que mon statut est celui d'indépendant
          </span>
        </label>
      </div>
    </div>

    <div className="bg-green-50 p-6 rounded-lg">
      <div className="flex items-center space-x-4">
        <Gift className="w-8 h-8 text-green-600" />
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">
            Bonus de bienvenue !
          </h4>
          <p className="text-sm text-gray-700">
            Recevez 200€ après votre première vente réalisée dans les 30 jours
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Helper component
const Check: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
