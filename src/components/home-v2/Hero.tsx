import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingDown, Shield, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Motif géométrique subtil en arrière-plan */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">La révolution immobilière est en marche</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Vendez votre bien grâce à la force de votre{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-500">
                communauté
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Transformez vos voisins, amis et collègues en ambassadeurs. 
              Économisez jusqu'à <span className="font-bold text-primary-600">76% sur vos frais</span> tout en 
              récompensant ceux qui vous aident à vendre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/calculateur">
                <Button size="lg" className="w-full sm:w-auto group">
                  Calculer mes économies
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/comment-ca-marche">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Découvrir le concept
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="w-8 h-8 text-primary-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">+5000</p>
                <p className="text-sm text-gray-600">Ambassadeurs actifs</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <TrendingDown className="w-8 h-8 text-secondary-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">-76%</p>
                <p className="text-sm text-gray-600">Sur vos frais</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="w-8 h-8 text-accent-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-600">Sécurisé</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Communauté heureuse"
                className="rounded-2xl shadow-2xl"
              />
              
              {/* Carte flottante 1 */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🏠</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Vendu en 14 jours</p>
                    <p className="text-xs text-gray-600">12 000€ économisés</p>
                  </div>
                </div>
              </div>

              {/* Carte flottante 2 */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-bounce-light animation-delay-2000">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">💰</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Commission ambassadeur</p>
                    <p className="text-xs text-gray-600">1 800€ gagnés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
