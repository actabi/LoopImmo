import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Save, X, Camera, MapPin, Euro, Home, 
  Ruler, Bed, Bath, Calendar, AlertCircle,
  CheckCircle, Info, Plus, Trash2
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface PropertyFormProps {
  property?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  userRole: 'seller' | 'ambassador';
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ 
  property, 
  onSave, 
  onCancel,
  userRole 
}) => {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    type: property?.type || 'apartment',
    price: property?.price || '',
    surface: property?.surface || '',
    rooms: property?.rooms || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    floor: property?.floor || '',
    address: property?.location?.address || '',
    city: property?.location?.city || '',
    postalCode: property?.location?.postalCode || '',
    description: property?.description || '',
    features: property?.features || [],
    energyClass: property?.energyClass || '',
    gasClass: property?.gasClass || '',
    yearBuilt: property?.yearBuilt || '',
    charges: property?.charges || '',
    taxeFonciere: property?.taxeFonciere || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Informations générales', icon: Home },
    { id: 2, title: 'Localisation', icon: MapPin },
    { id: 3, title: 'Caractéristiques', icon: Ruler },
    { id: 4, title: 'Description', icon: FileText }
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title) newErrors.title = 'Le titre est requis';
        if (!formData.price) newErrors.price = 'Le prix est requis';
        if (!formData.type) newErrors.type = 'Le type est requis';
        break;
      case 2:
        if (!formData.address) newErrors.address = 'L\'adresse est requise';
        if (!formData.city) newErrors.city = 'La ville est requise';
        if (!formData.postalCode) newErrors.postalCode = 'Le code postal est requis';
        break;
      case 3:
        if (!formData.surface) newErrors.surface = 'La surface est requise';
        if (!formData.rooms) newErrors.rooms = 'Le nombre de pièces est requis';
        break;
      case 4:
        if (!formData.description) newErrors.description = 'La description est requise';
        if (formData.description.length < 100) {
          newErrors.description = 'La description doit faire au moins 100 caractères';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSave(formData);
    }
  };

  const commonFeatures = [
    'Ascenseur', 'Balcon', 'Terrasse', 'Parking', 'Cave', 
    'Gardien', 'Interphone', 'Digicode', 'Fibre optique',
    'Double vitrage', 'Parquet', 'Cheminée', 'Climatisation'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors",
                    isActive ? "bg-primary-500 text-white" :
                    isCompleted ? "bg-green-500 text-white" :
                    "bg-gray-200 text-gray-500"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    isActive ? "text-primary-600" : "text-gray-500"
                  )}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-4 mt-6",
                    step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <Card>
        <div className="p-6">
          {/* Step 1: General Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de l'annonce *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={cn(
                    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
                    errors.title && "border-red-500"
                  )}
                  placeholder="Ex: Appartement lumineux avec vue sur parc"
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de bien *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="studio">Studio</option>
                    <option value="loft">Loft</option>
                    <option value="duplex">Duplex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix de vente *
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className={cn(
                        "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
                        errors.price && "border-red-500"
                      )}
                      placeholder="320000"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-red-600 mt-1">{errors.price}</p>
                  )}
                </div>
              </div>

              {userRole === 'ambassador' && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Information importante</p>
                      <p className="text-sm text-blue-700 mt-1">
                        En tant qu'looper, vous créez cette annonce pour le compte du vendeur. 
                        Il pourra la modifier et la compléter une fois connecté.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Localisation</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={cn(
                    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
                    errors.address && "border-red-500"
                  )}
                  placeholder="15 rue de la Paix"
                />
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className={cn(
                      "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
                      errors.city && "border-red-500"
                    )}
                    placeholder="Paris"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                    className={cn(
                      "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
                      errors.postalCode && "border-red-500"
                    )}
                    placeholder="75001"
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Étage
                </label>
                <input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => setFormData({...formData, floor: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="3ème étage avec ascenseur"
                />
              </div>
            </div>
          )}

          {/* Step 3: Characteristics */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Caractéristiques</h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surface (m²) *
                  </label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={formData.surface}
                      onChange={(e) => setFormData({...formData, surface: e.target.value})}
                      className={cn(
                        "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
                        errors.surface && "border-red-500"
                      )}
                      placeholder="65"
                    />
                  </div>
                  {errors.surface && (
                    <p className="text-sm text-red-600 mt-1">{errors.surface}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de pièces *
                  </label>
                  <input
                    type="number"
                    value={formData.rooms}
                    onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                    className={cn(
                      "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
                      errors.rooms && "border-red-500"
                    )}
                    placeholder="3"
                  />
                  {errors.rooms && (
                    <p className="text-sm text-red-600 mt-1">{errors.rooms}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chambres
                  </label>
                  <div className="relative">
                    <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salles de bain
                  </label>
                  <div className="relative">
                    <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Année de construction
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({...formData, yearBuilt: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="1985"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Charges (€/mois)
                  </label>
                  <input
                    type="number"
                    value={formData.charges}
                    onChange={(e) => setFormData({...formData, charges: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="150"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Équipements et caractéristiques
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {commonFeatures.map((feature) => (
                    <label key={feature} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, features: [...formData.features, feature]});
                          } else {
                            setFormData({...formData, features: formData.features.filter((f: string) => f !== feature)});
                          }
                        }}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Description */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description détaillée *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={cn(
                    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
                    errors.description && "border-red-500"
                  )}
                  rows={8}
                  placeholder="Décrivez votre bien en détail : atouts, environnement, proximité des transports..."
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-500">
                    {formData.description.length} caractères
                  </p>
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Classe énergie
                  </label>
                  <select
                    value={formData.energyClass}
                    onChange={(e) => setFormData({...formData, energyClass: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Sélectionner</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Classe GES
                  </label>
                  <select
                    value={formData.gasClass}
                    onChange={(e) => setFormData({...formData, gasClass: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Sélectionner</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Presque terminé !</p>
                    <p className="text-sm text-green-700 mt-1">
                      Vérifiez vos informations puis cliquez sur "Enregistrer" pour créer votre annonce.
                      Vous pourrez ajouter des photos dans l'étape suivante.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>

            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Précédent
                </Button>
              )}
              
              {currentStep < steps.length ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
