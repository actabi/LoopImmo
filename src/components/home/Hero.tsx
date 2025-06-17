import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, Users, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingDown className="w-4 h-4 mr-2" />
            Économisez jusqu'à 90% sur vos frais de vente
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Vendez votre bien avec
            <span className="text-gradient from-primary-600 to-secondary-600"> la communauté</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            LoopImmo révolutionne l'immobilier : un forfait transparent, une communauté d'ambassadeurs, 
            et des économies exceptionnelles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/vendre">
              <Button size="lg" className="group">
                Je vends mon bien
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/ambassadeur">
              <Button size="lg" variant="outline">
                <Users className="mr-2 w-5 h-5" />
                Devenir ambassadeur
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">2 500€</div>
              <p className="text-gray-600">Forfait à partir de</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-600 mb-2">3 sem.</div>
              <p className="text-gray-600">Délai moyen de vente</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-600 mb-2">100%</div>
              <p className="text-gray-600">Transparent</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
