import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Book,
  Download,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import {
  legalUpdatesData,
  complianceChecklistData,
  complianceResources,
} from '../../mocks';

export const ComplianceCenter: React.FC = () => {
  const legalUpdates = legalUpdatesData;
  const complianceChecklist = complianceChecklistData;
  const resources = complianceResources;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Centre de Conformité
        </h1>
        <p className="text-gray-600">
          Veille légale et outils de conformité Loi Hoguet
        </p>
      </div>

      {/* Compliance Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-green-500">98.5%</span>
          </div>
          <p className="text-sm font-medium text-gray-900">Taux de conformité</p>
          <p className="text-xs text-gray-500 mt-1">Ce mois</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold text-yellow-500">3</span>
          </div>
          <p className="text-sm font-medium text-gray-900">Alertes réglementaires</p>
          <p className="text-xs text-gray-500 mt-1">À traiter</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-blue-500">15/02</span>
          </div>
          <p className="text-sm font-medium text-gray-900">Prochaine formation</p>
          <p className="text-xs text-gray-500 mt-1">Loi Climat</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Legal Updates */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Actualités légales
              </h3>
              <Button variant="ghost" size="sm">
                Voir tout
              </Button>
            </div>
            
            <div className="space-y-4">
              {legalUpdates.map((update) => (
                <div key={update.id} className="border-l-4 border-primary-500 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{update.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{update.summary}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          {update.date.toLocaleDateString('fr-FR')}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          update.impact === 'high' ? 'bg-red-100 text-red-700' :
                          update.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          Impact {update.impact === 'high' ? 'élevé' : update.impact === 'medium' ? 'moyen' : 'faible'}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Resources */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ressources et modèles
            </h3>
            
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {resource.type === 'pdf' && <FileText className="w-5 h-5 text-red-500" />}
                    {resource.type === 'video' && <Book className="w-5 h-5 text-blue-500" />}
                    {resource.type === 'zip' && <FileText className="w-5 h-5 text-green-500" />}
                    <div>
                      <p className="font-medium text-gray-900">{resource.title}</p>
                      <p className="text-sm text-gray-500">{resource.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Compliance Checklist */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Check-list de conformité
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {complianceChecklist.map((section) => (
              <div key={section.category}>
                <h4 className="font-medium text-gray-900 mb-3">{section.category}</h4>
                <div className="space-y-2">
                  {section.items.map((item, index) => (
                    <label key={index} className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1 rounded text-primary-600" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Dernière mise à jour: 15/01/2024
            </p>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Télécharger la check-list
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
