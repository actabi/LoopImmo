import React from 'react';
import { Check, X } from 'lucide-react';
import { Card } from '../ui/Card';

const features = [
  { name: 'Commission', loopimmo: 'Forfait fixe', traditional: '3-5% du prix', pap: 'Gratuit' },
  { name: 'Accompagnement', loopimmo: true, traditional: true, pap: false },
  { name: 'Photos pro', loopimmo: true, traditional: true, pap: false },
  { name: 'Estimation IA', loopimmo: true, traditional: false, pap: false },
  { name: 'Visites organisées', loopimmo: true, traditional: true, pap: false },
  { name: 'Négociation', loopimmo: true, traditional: true, pap: false },
  { name: 'Sécurité juridique', loopimmo: true, traditional: true, pap: false },
  { name: 'Temps moyen de vente', loopimmo: '4 semaines', traditional: '3 mois', pap: '6 mois+' },
];

export const CompetitorComparison: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir LoopImmo ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comparez nos services avec les alternatives du marché
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-4 px-6"></th>
                <th className="text-center py-4 px-6">
                  <div className="inline-block">
                    <div className="bg-primary-500 text-white rounded-lg px-4 py-2 mb-2">
                      LoopImmo
                    </div>
                    <p className="text-sm text-gray-600">Recommandé</p>
                  </div>
                </th>
                <th className="text-center py-4 px-6">
                  <div className="text-gray-700 font-semibold">Agence traditionnelle</div>
                </th>
                <th className="text-center py-4 px-6">
                  <div className="text-gray-700 font-semibold">Particulier à particulier</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-4 px-6 font-medium text-gray-900">{feature.name}</td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.loopimmo === 'boolean' ? (
                      feature.loopimmo ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-primary-600 font-semibold">{feature.loopimmo}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.traditional === 'boolean' ? (
                      feature.traditional ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700">{feature.traditional}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.pap === 'boolean' ? (
                      feature.pap ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700">{feature.pap}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card className="mt-8 bg-primary-50 border-primary-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary-900 mb-2">
              Le meilleur des deux mondes
            </h3>
            <p className="text-primary-700">
              LoopImmo combine l'accompagnement professionnel d'une agence avec des tarifs transparents et abordables.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
