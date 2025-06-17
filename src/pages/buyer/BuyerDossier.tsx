import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { 
  FileText, Upload, CheckCircle, AlertCircle, Clock,
  User, Briefcase, CreditCard, Home, Download,
  Shield, Lock, Info, Plus, Trash2
} from 'lucide-react';

export const BuyerDossier: React.FC = () => {
  const [completionRate] = useState(75);
  
  const sections = [
    {
      id: 'identity',
      title: 'Identité',
      icon: User,
      status: 'complete',
      documents: [
        { name: 'Carte d\'identité', status: 'validated', date: '2024-03-01' },
        { name: 'Justificatif de domicile', status: 'validated', date: '2024-03-01' }
      ]
    },
    {
      id: 'income',
      title: 'Revenus',
      icon: Briefcase,
      status: 'partial',
      documents: [
        { name: 'Bulletins de salaire (3 derniers mois)', status: 'validated', date: '2024-03-05' },
        { name: 'Avis d\'imposition 2023', status: 'pending', date: '2024-03-10' },
        { name: 'Contrat de travail', status: 'missing', date: null }
      ]
    },
    {
      id: 'bank',
      title: 'Situation bancaire',
      icon: CreditCard,
      status: 'partial',
      documents: [
        { name: 'Relevés bancaires (3 derniers mois)', status: 'validated', date: '2024-03-08' },
        { name: 'Attestation de prêt', status: 'missing', date: null }
      ]
    },
    {
      id: 'property',
      title: 'Patrimoine',
      icon: Home,
      status: 'complete',
      documents: [
        { name: 'Titre de propriété actuel', status: 'validated', date: '2024-03-02' },
        { name: 'Taxe foncière', status: 'validated', date: '2024-03-02' }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'validated':
        return <Badge variant="success" className="text-xs"><CheckCircle className="w-3 h-3 mr-1" />Validé</Badge>;
      case 'pending':
        return <Badge variant="warning" className="text-xs"><Clock className="w-3 h-3 mr-1" />En vérification</Badge>;
      case 'missing':
        return <Badge variant="danger" className="text-xs"><AlertCircle className="w-3 h-3 mr-1" />Manquant</Badge>;
      default:
        return null;
    }
  };

  const getSectionStatus = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'partial':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'empty':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mon dossier acheteur
            </h1>
            <p className="text-gray-600">
              Un dossier complet augmente vos chances d'obtenir le bien de vos rêves
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Télécharger mon dossier
          </Button>
        </div>

        {/* Progress Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Progression du dossier</h2>
            <span className="text-2xl font-bold text-primary-600">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-primary-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Info className="w-4 h-4" />
            <span>Il vous manque 3 documents pour compléter votre dossier</span>
          </div>
        </Card>

        {/* Security Notice */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Vos données sont sécurisées</p>
              <p className="text-sm text-blue-700 mt-1">
                Tous vos documents sont chiffrés et stockés de manière sécurisée. 
                Seuls les agents immobiliers autorisés peuvent y accéder avec votre permission.
              </p>
            </div>
          </div>
        </Card>

        {/* Document Sections */}
        <div className="space-y-6">
          {sections.map(section => (
            <Card key={section.id}>
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  {getSectionStatus(section.status)}
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {section.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                          {doc.date && (
                            <p className="text-xs text-gray-500">
                              Ajouté le {new Date(doc.date).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(doc.status)}
                        {doc.status === 'missing' ? (
                          <Button size="sm" variant="primary">
                            <Upload className="w-4 h-4 mr-1" />
                            Ajouter
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Documents */}
        <Card>
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Documents complémentaires</h3>
            <p className="text-sm text-gray-600 mt-1">
              Ajoutez des documents supplémentaires pour renforcer votre dossier
            </p>
          </div>
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Glissez vos documents ici ou cliquez pour parcourir</p>
              <p className="text-xs text-gray-500">PDF, JPG, PNG jusqu'à 10MB</p>
              <Button variant="primary" size="sm" className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un document
              </Button>
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Lock className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-700 mb-1">Confidentialité garantie</p>
            <p>
              Vos documents ne sont partagés qu'avec votre autorisation explicite. 
              Vous gardez le contrôle total sur qui peut accéder à votre dossier.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
