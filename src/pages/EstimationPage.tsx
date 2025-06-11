import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, MapPin, Square, Bed, Bath, Calendar, TrendingUp, 
  ChevronRight, Check, Info, Calculator, Building, Trees,
  Car, Sun, Wrench, Star, ArrowRight, BarChart3, Shield, Clock,
  AlertCircle, Eye, Hammer, Train, School, ShoppingBag, Zap,
  Volume2, Thermometer, Waves, Mountain, Users, FileText
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { cn } from '../utils/cn';

interface EstimationData {
  type: 'apartment' | 'house' | 'studio' | null;
  surface: string;
  rooms: string;
  bedrooms: string;
  bathrooms: string;
  floor?: string;
  hasElevator?: boolean;
  hasParking?: boolean;
  hasBalcony?: boolean;
  hasTerrace?: boolean;
  hasGarden?: boolean;
  condition: 'new' | 'good' | 'toRefresh' | 'toRenovate' | null;
  yearBuilt: string;
  address: string;
  postalCode: string;
  city: string;
}

const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Appartement', icon: Building },
  { value: 'house', label: 'Maison', icon: Home },
  { value: 'studio', label: 'Studio', icon: Square }
];

const CONDITIONS = [
  { value: 'new', label: 'Neuf', description: 'Moins de 5 ans' },
  { value: 'good', label: 'Bon état', description: 'Habitable en l\'état' },
  { value: 'toRefresh', label: 'À rafraîchir', description: 'Travaux légers' },
  { value: 'toRenovate', label: 'À rénover', description: 'Gros travaux' }
];

const PRICE_FACTORS = [
  {
    category: 'Localisation précise',
    icon: MapPin,
    factors: [
      { name: 'Étage élevé avec vue', impact: '+5 à +15%', color: 'text-green-600' },
      { name: 'Rez-de-chaussée sur rue', impact: '-10 à -20%', color: 'text-red-600' },
      { name: 'Quartier en développement', impact: '+10 à +25%', color: 'text-green-600' },
      { name: 'Nuisances sonores', impact: '-15 à -30%', color: 'text-red-600' }
    ]
  },
  {
    category: 'Caractéristiques uniques',
    icon: Star,
    factors: [
      { name: 'Cachet ancien préservé', impact: '+10 à +20%', color: 'text-green-600' },
      { name: 'Architecture remarquable', impact: '+15 à +30%', color: 'text-green-600' },
      { name: 'Vis-à-vis important', impact: '-10 à -15%', color: 'text-red-600' },
      { name: 'Orientation nord uniquement', impact: '-5 à -10%', color: 'text-red-600' }
    ]
  },
  {
    category: 'Équipements & Services',
    icon: Zap,
    factors: [
      { name: 'Domotique intégrée', impact: '+5 à +10%', color: 'text-green-600' },
      { name: 'Piscine privée', impact: '+15 à +25%', color: 'text-green-600' },
      { name: 'Chauffage collectif ancien', impact: '-5 à -15%', color: 'text-red-600' },
      { name: 'Absence de fibre optique', impact: '-3 à -5%', color: 'text-red-600' }
    ]
  },
  {
    category: 'Environnement immédiat',
    icon: Trees,
    factors: [
      { name: 'Proximité métro (<300m)', impact: '+10 à +20%', color: 'text-green-600' },
      { name: 'Vue sur parc/monument', impact: '+15 à +25%', color: 'text-green-600' },
      { name: 'Proximité voie ferrée', impact: '-20 à -35%', color: 'text-red-600' },
      { name: 'Zone inondable', impact: '-15 à -25%', color: 'text-red-600' }
    ]
  }
];

export const EstimationPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [showDetailedFactors, setShowDetailedFactors] = useState(false);
  const [formData, setFormData] = useState<EstimationData>({
    type: null,
    surface: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    condition: null,
    yearBuilt: '',
    address: '',
    postalCode: '',
    city: ''
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Calculate estimation
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.type !== null;
      case 2:
        return formData.surface && formData.rooms && formData.bedrooms && formData.bathrooms;
      case 3:
        return formData.condition !== null && formData.yearBuilt;
      case 4:
        return formData.address && formData.postalCode && formData.city;
      default:
        return false;
    }
  };

  // Mock estimation calculation
  const calculateEstimation = () => {
    const basePricePerM2 = formData.city.toLowerCase().includes('lyon') ? 4500 : 3500;
    const surface = parseInt(formData.surface) || 0;
    let multiplier = 1;

    // Adjust based on condition
    switch (formData.condition) {
      case 'new': multiplier *= 1.2; break;
      case 'good': multiplier *= 1.1; break;
      case 'toRefresh': multiplier *= 0.95; break;
      case 'toRenovate': multiplier *= 0.8; break;
    }

    // Adjust based on features
    if (formData.hasParking) multiplier *= 1.05;
    if (formData.hasBalcony) multiplier *= 1.03;
    if (formData.hasTerrace) multiplier *= 1.08;
    if (formData.hasGarden) multiplier *= 1.15;

    const estimatedPrice = Math.round(surface * basePricePerM2 * multiplier);
    const minPrice = Math.round(estimatedPrice * 0.9);
    const maxPrice = Math.round(estimatedPrice * 1.1);

    return { estimatedPrice, minPrice, maxPrice };
  };

  if (showResult) {
    const { estimatedPrice, minPrice, maxPrice } = calculateEstimation();
    
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Estimation terminée !</h1>
              <p className="text-gray-600">Voici l'estimation de votre bien basée sur les données du marché</p>
            </div>

            <Card className="p-8 mb-8">
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-2">Valeur estimée de votre bien</p>
                <p className="text-5xl font-bold text-primary-600 mb-4">
                  {estimatedPrice.toLocaleString('fr-FR')}€
                </p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="text-gray-600">Fourchette:</span>
                  <span className="font-medium">{minPrice.toLocaleString('fr-FR')}€</span>
                  <span className="text-gray-400">-</span>
                  <span className="font-medium">{maxPrice.toLocaleString('fr-FR')}€</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-900">+3.2%</p>
                  <p className="text-sm text-gray-600">vs année dernière</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900">45 jours</p>
                  <p className="text-sm text-gray-600">Délai moyen de vente</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Très demandé</p>
                  <p className="text-sm text-gray-600">Dans votre quartier</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Récapitulatif de votre bien</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium">
                      {PROPERTY_TYPES.find(t => t.value === formData.type)?.label}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Surface:</span>
                    <span className="ml-2 font-medium">{formData.surface}m²</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Pièces:</span>
                    <span className="ml-2 font-medium">{formData.rooms}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">État:</span>
                    <span className="ml-2 font-medium">
                      {CONDITIONS.find(c => c.value === formData.condition)?.label}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-600">Adresse:</span>
                    <span className="ml-2 font-medium">
                      {formData.address}, {formData.postalCode} {formData.city}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Disclaimer Section */}
            <Card className="p-6 bg-amber-50 border-amber-200 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Cette estimation est approximative
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Notre algorithme se base sur les données que vous avez fournies et les prix moyens du marché. 
                    Cependant, de nombreux critères non pris en compte peuvent faire varier significativement 
                    le prix final de <span className="font-semibold">±35%</span> ou plus.
                  </p>
                  <button
                    onClick={() => setShowDetailedFactors(!showDetailedFactors)}
                    className="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center gap-2"
                  >
                    {showDetailedFactors ? 'Masquer' : 'Voir'} les facteurs d'influence
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      showDetailedFactors && "rotate-90"
                    )} />
                  </button>
                </div>
              </div>

              {showDetailedFactors && (
                <div className="mt-6 pt-6 border-t border-amber-200">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Facteurs pouvant influencer le prix de votre bien :
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {PRICE_FACTORS.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div key={category.category}>
                          <div className="flex items-center gap-2 mb-3">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <h5 className="font-medium text-gray-900">{category.category}</h5>
                          </div>
                          <div className="space-y-2">
                            {category.factors.map((factor) => (
                              <div key={factor.name} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{factor.name}</span>
                                <span className={cn("font-medium", factor.color)}>
                                  {factor.impact}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">
                      Autres facteurs non évaluables en ligne :
                    </h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Qualité de la copropriété et montant des charges</li>
                      <li>• Luminosité naturelle et exposition</li>
                      <li>• Qualité des matériaux et finitions</li>
                      <li>• Historique du bien et travaux récents</li>
                      <li>• Ambiance du quartier et voisinage</li>
                      <li>• Performance énergétique réelle (DPE)</li>
                      <li>• Potentiel d'aménagement ou d'extension</li>
                    </ul>
                  </div>

                  <div className="mt-4 text-sm text-gray-700">
                    <p className="font-medium mb-1">Pour une estimation précise :</p>
                    <p>
                      Nous recommandons une visite sur place par un expert LoopImmo qui prendra en compte 
                      l'ensemble de ces critères pour affiner la valorisation de votre bien.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white mb-8">
              <h3 className="text-xl font-semibold mb-2">Vendez avec LoopImmo</h3>
              <p className="mb-4 opacity-90">
                Économisez jusqu'à {Math.round((estimatedPrice * 0.05) - 6000).toLocaleString('fr-FR')}€ 
                par rapport aux agences traditionnelles
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/vendre')}
                >
                  Mettre en vente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Recevoir le rapport détaillé
                </Button>
              </div>
            </Card>

            {/* Expert Evaluation CTA */}
            <Card className="p-6 border-2 border-primary-200 bg-primary-50/50 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Besoin d'une estimation plus précise ?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Nos experts peuvent réaliser une évaluation complète de votre bien en prenant en compte 
                    tous les critères spécifiques qui le valorisent. Service gratuit et sans engagement.
                  </p>
                  <Button 
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/contact')}
                  >
                    Demander une expertise gratuite
                    <Users className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <button
                onClick={() => {
                  setShowResult(false);
                  setStep(1);
                  setFormData({
                    type: null,
                    surface: '',
                    rooms: '',
                    bedrooms: '',
                    bathrooms: '',
                    condition: null,
                    yearBuilt: '',
                    address: '',
                    postalCode: '',
                    city: ''
                  });
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Faire une nouvelle estimation
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Estimez votre bien en 2 minutes
            </h1>
            <p className="text-gray-600">
              Obtenez une estimation gratuite et instantanée basée sur les données du marché
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Étape {step} sur {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% complété</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form Steps */}
          <Card className="p-8">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Quel est le type de votre bien ?
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {PROPERTY_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setFormData({ ...formData, type: type.value as any })}
                        className={cn(
                          "p-6 rounded-lg border-2 transition-all",
                          formData.type === type.value
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <Icon className="w-8 h-8 mx-auto mb-3 text-primary-600" />
                        <p className="font-medium">{type.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Caractéristiques principales
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surface habitable (m²)
                    </label>
                    <input
                      type="number"
                      value={formData.surface}
                      onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Ex: 75"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de pièces
                      </label>
                      <input
                        type="number"
                        value={formData.rooms}
                        onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ex: 3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chambres
                      </label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ex: 2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salles de bain
                      </label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ex: 1"
                      />
                    </div>
                  </div>

                  {formData.type === 'apartment' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Étage
                      </label>
                      <input
                        type="number"
                        value={formData.floor}
                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ex: 3"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Équipements
                    </label>
                    <div className="space-y-3">
                      {formData.type === 'apartment' && (
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.hasElevator}
                            onChange={(e) => setFormData({ ...formData, hasElevator: e.target.checked })}
                            className="mr-3"
                          />
                          <span>Ascenseur</span>
                        </label>
                      )}
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.hasParking}
                          onChange={(e) => setFormData({ ...formData, hasParking: e.target.checked })}
                          className="mr-3"
                        />
                        <span>Parking / Garage</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.hasBalcony}
                          onChange={(e) => setFormData({ ...formData, hasBalcony: e.target.checked })}
                          className="mr-3"
                        />
                        <span>Balcon</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.hasTerrace}
                          onChange={(e) => setFormData({ ...formData, hasTerrace: e.target.checked })}
                          className="mr-3"
                        />
                        <span>Terrasse</span>
                      </label>
                      {formData.type === 'house' && (
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.hasGarden}
                            onChange={(e) => setFormData({ ...formData, hasGarden: e.target.checked })}
                            className="mr-3"
                          />
                          <span>Jardin</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  État et année de construction
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      État général du bien
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {CONDITIONS.map((condition) => (
                        <button
                          key={condition.value}
                          onClick={() => setFormData({ ...formData, condition: condition.value as any })}
                          className={cn(
                            "p-4 rounded-lg border-2 text-left transition-all",
                            formData.condition === condition.value
                              ? "border-primary-500 bg-primary-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <p className="font-medium">{condition.label}</p>
                          <p className="text-sm text-gray-600">{condition.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Année de construction
                    </label>
                    <input
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Ex: 1995"
                      min="1800"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Localisation du bien
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Ex: 45 rue Vendôme"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code postal
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ex: 69006"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ex: Lyon"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Pourquoi l'adresse est importante ?</p>
                      <p>
                        La localisation représente jusqu'à 70% de la valeur d'un bien. 
                        Nous analysons les prix du quartier, la proximité des transports et des commerces 
                        pour vous fournir l'estimation la plus précise possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Retour
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                {step === totalSteps ? 'Obtenir mon estimation' : 'Suivant'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Trust indicators */}
          <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">100% Gratuit</p>
              <p className="text-xs text-gray-600">Sans engagement</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Estimation précise</p>
              <p className="text-xs text-gray-600">Basée sur 50k+ ventes</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Résultat immédiat</p>
              <p className="text-xs text-gray-600">En moins de 2 minutes</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
