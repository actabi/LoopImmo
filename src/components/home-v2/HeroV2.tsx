import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Home, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroV2: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-medium text-gray-700">La révolution immobilière par la communauté</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Vendez votre bien,
            <br />
            <span className="text-gradient from-primary-500 to-secondary-500">partagez votre vie de quartier</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Avec LoopImmo, ce n'est pas juste un bien que vous vendez, c'est une histoire, 
            un quartier, une communauté. Vos voisins deviennent vos meilleurs ambassadeurs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/calculateur">
              <Button size="lg" className="group">
                <Heart className="mr-2 w-5 h-5 group-hover:text-red-400 transition-colors" />
                Rejoindre le mouvement
              </Button>
            </Link>
            <Link to="/comment-ca-marche">
              <Button variant="outline" size="lg">
                <Users className="mr-2 w-5 h-5" />
                Découvrir la communauté
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Communauté active</h3>
              <p className="text-gray-600">Vos voisins et amis deviennent ambassadeurs de votre bien</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Valeur humaine</h3>
              <p className="text-gray-600">Un moment de vie partagé, pas une simple transaction</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparence totale</h3>
              <p className="text-gray-600">Des frais justes qui servent vraiment votre vente</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
