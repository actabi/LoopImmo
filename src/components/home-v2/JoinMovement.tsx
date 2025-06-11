import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Users, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const JoinMovement: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Rejoignez le mouvement</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Ensemble, réinventons
            <br />
            <span className="text-yellow-300">l'immobilier de demain</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Que vous soyez vendeur, acheteur ou simplement passionné par votre quartier, 
            il y a une place pour vous dans la communauté LoopImmo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/calculateur">
              <Button size="lg" variant="secondary" className="group bg-white text-primary-600 hover:bg-gray-100">
                <Heart className="mr-2 w-5 h-5 group-hover:text-red-500 transition-colors" />
                Je vends mon bien
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/devenir-ambassadeur">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Users className="mr-2 w-5 h-5" />
                Je deviens ambassadeur
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Pour les vendeurs</h3>
              <p className="text-white/80">
                Économisez jusqu'à 90% sur vos frais tout en bénéficiant d'un accompagnement complet
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Pour les ambassadeurs</h3>
              <p className="text-white/80">
                Gagnez un complément de revenu en aidant vos voisins à vendre leur bien
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Pour les acheteurs</h3>
              <p className="text-white/80">
                Découvrez des biens uniques présentés par ceux qui connaissent vraiment le quartier
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
