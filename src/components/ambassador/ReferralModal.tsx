import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { 
  X, User, Phone, Mail, Euro, FileText, 
  AlertCircle, CheckCircle, Users, Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface ReferralModalProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    managedBy: string;
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
  property,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
    budget: '',
    financing: 'loan_pending',
    timeline: '3_months',
    message: '',
    notes: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.buyerName) newErrors.buyerName = 'Nom requis';
    if (!formData.buyerPhone) newErrors.buyerPhone = 'Téléphone requis';
    if (!formData.buyerEmail) newErrors.buyerEmail = 'Email requis';
    if (!formData.budget) newErrors.budget = 'Budget requis';
    if (!formData.message) newErrors.message = 'Message requis';
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.buyerEmail && !emailRegex.test(formData.buyerEmail)) {
      newErrors.buyerEmail = 'Email invalide';
    }
    
    // Validate phone format
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (formData.buyerPhone && !phoneRegex.test(formData.buyerPhone)) {
      newErrors.buyerPhone = 'Téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const potentialCommission = 300; // Calculate based on property price

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Référer un acheteur pour ce bien
              </h2>
              <p className="text-sm text-gray-600">
                Partagez la commission 50/50 avec {property.managedBy}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Property Info */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{property.title}</h3>
              <p className="text-sm text-gray-600">{property.location}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary-600">
                {property.price.toLocaleString('fr-FR')}€
              </p>
              <p className="text-sm text-gray-600">Prix de vente</p>
            </div>
          </div>
        </div>

        {/* Commission Info */}
        <div className="p-4 bg-green-50 border-b border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Euro className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Commission potentielle : {potentialCommission}€
              </p>
              <p className="text-sm text-gray-600">
                Votre part (50%) en cas de vente réussie
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Buyer Info */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations de l'acheteur
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <Input
                  value={formData.buyerName}
                  onChange={(e) => setFormData({...formData, buyerName: e.target.value})}
                  placeholder="Jean Dupont"
                  className={errors.buyerName ? 'border-red-500' : ''}
                />
                {errors.buyerName && (
                  <p className="text-xs text-red-500 mt-1">{errors.buyerName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone *
                </label>
                <Input
                  value={formData.buyerPhone}
                  onChange={(e) => setFormData({...formData, buyerPhone: e.target.value})}
                  placeholder="06 12 34 56 78"
                  className={errors.buyerPhone ? 'border-red-500' : ''}
                />
                {errors.buyerPhone && (
                  <p className="text-xs text-red-500 mt-1">{errors.buyerPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.buyerEmail}
                  onChange={(e) => setFormData({...formData, buyerEmail: e.target.value})}
                  placeholder="jean.dupont@email.com"
                  className={errors.buyerEmail ? 'border-red-500' : ''}
                />
                {errors.buyerEmail && (
                  <p className="text-xs text-red-500 mt-1">{errors.buyerEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget validé *
                </label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="300000"
                  className={errors.budget ? 'border-red-500' : ''}
                />
                {errors.budget && (
                  <p className="text-xs text-red-500 mt-1">{errors.budget}</p>
                )}
              </div>
            </div>
          </div>

          {/* Qualification */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Qualification
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Financement
                </label>
                <select
                  value={formData.financing}
                  onChange={(e) => setFormData({...formData, financing: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="cash">Cash</option>
                  <option value="loan_approved">Prêt accordé</option>
                  <option value="loan_pending">Prêt en cours</option>
                  <option value="not_started">Non démarré</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Délai d'achat
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="immediate">Immédiat</option>
                  <option value="1_month">Sous 1 mois</option>
                  <option value="3_months">Sous 3 mois</option>
                  <option value="6_months">Sous 6 mois</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message pour {property.managedBy} *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Décrivez pourquoi ce client est intéressé par ce bien..."
              rows={3}
              className={cn(
                "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500",
                errors.message ? 'border-red-500' : ''
              )}
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">{errors.message}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes internes (optionnel)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Informations supplémentaires sur le client..."
              rows={2}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Comment ça marche ?</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>{property.managedBy} recevra votre demande et pourra l'accepter ou la refuser</li>
                  <li>Si acceptée, le client sera ajouté à la liste des leads du bien</li>
                  <li>Vous toucherez 50% de la commission ({potentialCommission}€) si la vente se conclut</li>
                  <li>Vous serez tenu informé de l'avancement du dossier</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              <Users className="w-4 h-4 mr-2" />
              Envoyer la référence
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
