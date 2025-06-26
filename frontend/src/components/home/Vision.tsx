import React from 'react';
import { Sparkles, Users, Eye, Zap } from 'lucide-react';

export const Vision: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Notre Vision
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            LoopImmo a pour ambition de réinventer la vente immobilière en France en plaçant la <span className="font-semibold text-primary-600">communauté</span>, la <span className="font-semibold text-primary-600">transparence</span> et la <span className="font-semibold text-primary-600">digitalisation</span> au cœur du processus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Écosystème Collaboratif</h3>
            <p className="text-gray-600">
              Chaque acteur devient looper d'un bien, participant activement à sa commercialisation
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Eye className="w-10 h-10 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparence Totale</h3>
            <p className="text-gray-600">
              Une expérience de vente plus juste et moins coûteuse pour le vendeur
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-10 h-10 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Valorisation Équitable</h3>
            <p className="text-gray-600">
              Récompenser financièrement ceux qui contribuent à la réussite de la vente
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
