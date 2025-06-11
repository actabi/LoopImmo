import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { 
  Calculator, Euro, Calendar, TrendingUp, Info,
  PieChart, BarChart, FileText, Download, Phone,
  Building, Users, Shield, ChevronRight
} from 'lucide-react';

export const BuyerFinancing: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('350000');
  const [duration, setDuration] = useState('20');
  const [rate, setRate] = useState('3.5');
  
  // Calcul simple de la mensualité
  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const numberOfPayments = parseFloat(duration) * 12;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return Math.round(monthlyPayment);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalCost = monthlyPayment * parseFloat(duration) * 12;
  const totalInterest = totalCost - parseFloat(loanAmount);

  const partners = [
    {
      name: 'Crédit Mutuel',
      logo: 'https://images.pexels.com/photos/351264/pexels-photo-351264.jpeg?auto=compress&cs=tinysrgb&w=100',
      rate: '3.2%',
      features: ['Taux fixe', 'Sans frais de dossier']
    },
    {
      name: 'BNP Paribas',
      logo: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=100',
      rate: '3.4%',
      features: ['Assurance incluse', 'Réponse en 48h']
    },
    {
      name: 'LCL',
      logo: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=100',
      rate: '3.5%',
      features: ['Modulable', 'Report possible']
    }
  ];

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Simulation de financement
          </h1>
          <p className="text-gray-600">
            Estimez votre capacité d'emprunt et trouvez le meilleur financement
          </p>
        </div>

        {/* Simulator */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Calculateur de prêt immobilier
            </h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant à emprunter
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée (années)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taux d'intérêt (%)
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-primary-50 rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Mensualité</p>
                  <p className="text-3xl font-bold text-primary-600">
                    {monthlyPayment.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Coût total du crédit</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {totalCost.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Intérêts totaux</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {totalInterest.toLocaleString('fr-FR')} €
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Conseil LoopImmo</p>
                  <p>
                    Pour un prêt de {loanAmount} € sur {duration} ans, vos revenus mensuels 
                    devraient être d'au moins {Math.round(monthlyPayment * 3).toLocaleString('fr-FR')} € 
                    (taux d'endettement de 33%).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Capacity Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Analyse de votre capacité
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Taux d'endettement</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Excellent (max recommandé : 33%)</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Apport personnel</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Bon (recommandé : 10-20%)</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Évolution sur la durée
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Capital emprunté</span>
                  <span className="font-medium">{parseFloat(loanAmount).toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Intérêts totaux</span>
                  <span className="font-medium">{totalInterest.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Assurance (estimation)</span>
                  <span className="font-medium">{Math.round(parseFloat(loanAmount) * 0.036).toLocaleString('fr-FR')} €</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Coût total</span>
                    <span className="text-lg font-bold text-primary-600">
                      {(totalCost + Math.round(parseFloat(loanAmount) * 0.036)).toLocaleString('fr-FR')} €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Partner Banks */}
        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Nos partenaires bancaires</h3>
            <p className="text-sm text-gray-600 mt-1">
              Comparez les offres et obtenez les meilleures conditions
            </p>
          </div>
          <div className="divide-y">
            {partners.map((partner, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{partner.name}</h4>
                      <div className="flex gap-2 mt-1">
                        {partner.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Taux à partir de</p>
                    <p className="text-2xl font-bold text-primary-600">{partner.rate}</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Obtenir une offre
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Accompagnement personnalisé
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Nos experts vous accompagnent dans toutes vos démarches de financement
                </p>
                <Button variant="primary" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Parler à un expert
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Téléchargez votre simulation
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Recevez un rapport détaillé de votre simulation par email
                </p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le PDF
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
