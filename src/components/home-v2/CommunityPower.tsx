import React from 'react';
import { Users, TrendingUp, Heart, Shield } from 'lucide-react';

export const CommunityPower: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Le pouvoir de la <span className="text-primary-500">communauté</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Imaginez si chaque personne de votre quartier devenait ambassadeur de votre bien. 
              C'est la force de LoopImmo : transformer votre réseau en votre meilleur atout commercial.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Vos voisins, vos ambassadeurs</h3>
                  <p className="text-gray-600">Qui mieux qu'eux pour parler de la vie dans votre quartier ?</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Vente 3x plus rapide</h3>
                  <p className="text-gray-600">La recommandation personnelle accélère naturellement la vente</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Récompenses partagées</h3>
                  <p className="text-gray-600">Chaque contributeur est justement rémunéré pour son aide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={i}
                  className="relative group"
                  style={{
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 animate-float">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        [
                          '1507003211169-0a1dd7228f2d',
                          '1494790108377-be9c29b29330',
                          '1438761681033-6461ffad8d80',
                          '1500648767791-0d35fde19405',
                          '1534528741775-53994a69daeb',
                          '1517841905240-472988babdf9',
                          '1524504388940-b36de1c74a89',
                          '1506794778202-cad84cf45f1d',
                          '1507591064344-af0c6b7e3c18'
                        ][i - 1]
                      }?w=200&h=200&fit=crop`}
                      alt={`Ambassadeur ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium">Ambassadeur</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white rounded-full p-8 shadow-2xl">
                <Shield className="w-16 h-16 text-primary-500" />
                <p className="text-center mt-2 font-bold text-gray-900">+1000</p>
                <p className="text-center text-sm text-gray-600">Ambassadeurs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
