import React, { useState } from 'react';
import { Calendar, Users, TrendingDown, Zap, Shield, Heart, ArrowRight, CheckCircle, Star, Sparkles } from 'lucide-react';

export const LaunchPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuler l'envoi (à remplacer par un vrai appel API)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-secondary-50">
      {/* Hero Section avec Countdown */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Badge d'annonce */}
            <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
              <Calendar className="w-5 h-5 mr-2" />
              LANCEMENT LE 1ER SEPTEMBRE 2024
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              La révolution de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                l'immobilier participatif
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              LoopImmo transforme la vente immobilière entre particuliers en créant le premier 
              <span className="font-semibold text-primary-600"> écosystème collaboratif </span>
              où chacun devient acteur du succès.
            </p>

            {/* CTA Principal */}
            <div className="max-w-2xl mx-auto">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-secondary-500 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Devenez ambassadeur fondateur
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Rejoignez les 100 premiers ambassadeurs et bénéficiez d'avantages exclusifs
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email"
                      className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none text-lg"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <span>Inscription...</span>
                      ) : (
                        <>
                          Je m'inscris
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    🔒 Vos données sont sécurisées et ne seront jamais partagées
                  </p>
                </form>
              ) : (
                <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-2xl p-8 shadow-xl">
                  <CheckCircle className="w-16 h-16 text-accent-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Félicitations ! Vous êtes inscrit(e)
                  </h3>
                  <p className="text-gray-700">
                    Nous vous contacterons en priorité dès l'ouverture de la plateforme.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section Disruption */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Une disruption totale du marché
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              LoopImmo réinvente la vente immobilière en supprimant les intermédiaires coûteux 
              et en créant une communauté d'entraide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mb-6">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">90% d'économies</h3>
              <p className="text-gray-700 mb-4">
                Fini les commissions de 5 à 7% ! Avec LoopImmo, vendez votre bien pour un forfait unique à partir de 2 500€.
              </p>
              <div className="text-3xl font-bold text-red-600">2 500€</div>
              <p className="text-sm text-gray-600">au lieu de 15 000€ en moyenne</p>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Communauté active</h3>
              <p className="text-gray-700 mb-4">
                Des ambassadeurs locaux motivés font vivre votre annonce et trouvent les acheteurs dans leur réseau.
              </p>
              <div className="text-3xl font-bold text-primary-600">1000+</div>
              <p className="text-sm text-gray-600">ambassadeurs attendus dès le lancement</p>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-accent-200 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vente accélérée</h3>
              <p className="text-gray-700 mb-4">
                La force du réseau permet de vendre plus rapidement qu'avec une agence traditionnelle.
              </p>
              <div className="text-3xl font-bold text-accent-600">3 sem.</div>
              <p className="text-sm text-gray-600">délai moyen de vente estimé</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Ambassadeurs */}
      <section className="py-20 bg-gradient-to-b from-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Devenez ambassadeur LoopImmo
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Transformez votre réseau en opportunité et soyez récompensé pour chaque vente réussie
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Les avantages exclusifs des 100 premiers
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Star className="w-6 h-6 text-secondary-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Commission majorée</h4>
                    <p className="text-gray-600">1 500€ par vente réussie (au lieu de 1 000€)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Star className="w-6 h-6 text-secondary-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Formation exclusive</h4>
                    <p className="text-gray-600">Accès à notre programme de formation premium</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Star className="w-6 h-6 text-secondary-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Badge "Fondateur"</h4>
                    <p className="text-gray-600">Reconnaissance permanente sur la plateforme</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Star className="w-6 h-6 text-secondary-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Territoire prioritaire</h4>
                    <p className="text-gray-600">Choisissez votre zone d'action en premier</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comment ça marche ?
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-secondary-600 mr-4">
                    1
                  </div>
                  <p className="text-gray-800">Identifiez des vendeurs dans votre réseau</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-secondary-600 mr-4">
                    2
                  </div>
                  <p className="text-gray-800">Accompagnez-les dans leur projet de vente</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-secondary-600 mr-4">
                    3
                  </div>
                  <p className="text-gray-800">Organisez des visites et trouvez des acheteurs</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-secondary-600 mr-4">
                    4
                  </div>
                  <p className="text-gray-800 font-semibold">Recevez votre commission à la vente !</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <Heart className="w-16 h-16 mx-auto mb-6 animate-pulse" />
              <h2 className="text-4xl font-bold mb-6">
                Notre vision : l'immobilier humain et transparent
              </h2>
              <p className="text-xl leading-relaxed mb-8">
                "Nous croyons que vendre un bien immobilier est avant tout un moment de vie à valeur humaine. 
                LoopImmo redonne du sens à la transaction en créant des liens authentiques entre vendeurs, 
                acheteurs et ambassadeurs locaux."
              </p>
              <div className="flex items-center justify-center">
                <Shield className="w-6 h-6 mr-2" />
                <p className="text-lg font-semibold">
                  100% transparent • 100% sécurisé • 100% humain
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ne manquez pas le lancement !
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Les 100 premières places d'ambassadeurs partiront vite. Inscrivez-vous maintenant pour être prioritaire.
          </p>
          
          {!isSubmitted && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              Je réserve ma place
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          )}
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Lancement : 1er septembre 2024</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>Places limitées : 100 ambassadeurs</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
