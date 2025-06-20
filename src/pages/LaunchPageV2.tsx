import React, { useState } from 'react';
import { ArrowRight, Users, TrendingDown, Shield, Home, Search, Euro, Clock, CheckCircle, Star, Heart, Zap, Award, UserCheck, FileCheck, Handshake, ArrowDown } from 'lucide-react';

export const LaunchPageV2: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Intégrer avec le système d'inscription
    console.log('Email soumis:', email);
    alert('Merci ! Nous vous contacterons dès l\'ouverture de la bêta.');
    setEmail('');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HÉRO Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo.svg" 
              alt="LoopImmo" 
              className="h-16 md:h-20 mx-auto"
            />
          </div>

          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Bêta ouverte prochainement
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            La révolution de l'immobilier
            <span className="block" style={{ color: '#1974cc' }}> participatif</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Grâce aux <strong>Loopers</strong>, vendre ou acheter devient plus rapide, plus juste et plus humain.
          </p>

          {/* Boutons de découverte par rôle */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 max-w-4xl mx-auto">
            <button
              onClick={() => scrollToSection('vendeur-section')}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Je veux vendre
            </button>
            <button
              onClick={() => scrollToSection('looper-section')}
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <Award className="w-5 h-5 mr-2" />
              Je veux gagner de l'argent
            </button>
            <button
              onClick={() => scrollToSection('acheteur-section')}
              className="px-8 py-4 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Je veux acheter
            </button>
          </div>

          {/* Bouton découvrir en plus */}
          <div className="mb-16">
            <button
              onClick={() => scrollToSection('pourquoi-section')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <span className="mr-2">Découvrir le concept</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">-72%</div>
              <p className="text-gray-700 font-medium">de frais en moins</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">1500€</div>
              <p className="text-gray-700 font-medium">revenus Looper max</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-yellow-600 mb-2">3 sem.</div>
              <p className="text-gray-700 font-medium">délai moyen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi LoopImmo */}
      <section id="pourquoi-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi LoopImmo ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une nouvelle façon de vendre et d'acheter, pensée pour tous
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Euro className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💸 Vendez malin</h3>
              <p className="text-lg text-gray-600">
                Jusqu'à <strong>-72% de frais</strong> par rapport aux agences traditionnelles
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🧩 Communauté active</h3>
              <p className="text-lg text-gray-600">
                <strong>Loopers rémunérés</strong> jusqu'à 1 500 € pour vous accompagner
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">⏱️ Vente accélérée</h3>
              <p className="text-lg text-gray-600">
                <strong>3 semaines en moyenne</strong> grâce à notre réseau local
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vendeur */}
      <section id="vendeur-section" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Vendeurs, économisez gros
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Forfait unique à paliers</strong> - Transparence totale</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Loopers locaux</strong> pour vous aider dans vos démarches</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Sécurité légale garantie</strong> par nos Trust Managers</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Zéro commission surprise</strong> - Ce que vous voyez, c'est ce que vous payez</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Étapes simplifiées :</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">1. Estimation IA</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">2. Validation Trust Manager</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">3. Diffusion</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">4. Signature</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <Home className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à vendre ?</h3>
                <form onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl mb-4 focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Je veux vendre
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Looper */}
      <section id="looper-section" className="py-20 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <Award className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Devenir Looper</h3>
                <form onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl mb-4 focus:border-green-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Je veux gagner de l'argent
                  </button>
                </form>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Devenez Looper et touchez jusqu'à 1 500 € par vente
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Identifiez des vendeurs ou acheteurs</strong> dans votre quartier</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Organisez ou relayez des visites</strong> en tant que local</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Gagnez des primes à la signature</strong> selon votre contribution</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Formation gratuite + bonus parrainage</strong> inclus</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Rémunération Looper :</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">300€</div>
                    <div className="text-sm text-gray-600">Mise en relation</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">800€</div>
                    <div className="text-sm text-gray-600">Accompagnement</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">1500€</div>
                    <div className="text-sm text-gray-600">Vente complète</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Acheteur */}
      <section id="acheteur-section" className="py-20 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Acheteurs, trouvez votre bonheur en toute sécurité
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Biens vérifiés</strong> par nos Trust Managers experts</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Visites avec des Loopers proches</strong> qui connaissent le quartier</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Zéro frais d'agence</strong> - Économisez des milliers d'euros</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700"><strong>Accompagnement jusqu'au notaire</strong> pour une transaction sereine</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Avantages acheteur :</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium">Sécurisé</span>
                  </div>
                  <div className="flex items-center">
                    <Euro className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium">Sans frais</span>
                  </div>
                  <div className="flex items-center">
                    <UserCheck className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium">Accompagné</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium">Humain</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <Search className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à acheter ?</h3>
                <form onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl mb-4 focus:border-yellow-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 transition-colors"
                  >
                    Je veux acheter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vision/Valeurs */}
      <section className="py-20 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="mb-12">
            <div className="text-6xl mb-6">💫</div>
            <blockquote className="text-2xl md:text-3xl font-light text-white mb-8 leading-relaxed">
              "LoopImmo remet de l'humain dans l'immobilier. Chaque vente devient une aventure collective et une source de revenus partagés."
            </blockquote>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Heart className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">100% Humain</h3>
              <p className="text-gray-300">Des vraies personnes, pas des algorithmes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Shield className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">100% Sécurisé</h3>
              <p className="text-gray-300">Trust Managers et garanties légales</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <FileCheck className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">100% Transparent</h3>
              <p className="text-gray-300">Tarifs clairs, pas de frais cachés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Appel Final */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo.svg" 
              alt="LoopImmo" 
              className="h-12 md:h-16 mx-auto"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Notre vision : révolutionner l'immobilier
          </h2>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              <strong>LoopImmo</strong> transforme l'immobilier en créant une communauté où chacun trouve sa place : 
              vendeurs qui économisent, acheteurs protégés, et <strong style={{ color: '#1974cc' }}>Loopers</strong> rémunérés 
              pour leur contribution locale.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ensemble, nous construisons un écosystème plus juste, plus transparent et plus humain, 
              où la technologie sert l'humain et non l'inverse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">🤝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Communauté</h3>
              <p className="text-gray-600">Des liens humains au cœur de chaque transaction</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">💡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">La technologie au service de l'humain</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-yellow-600 mb-2">⚖️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Équité</h3>
              <p className="text-gray-600">Des bénéfices partagés pour tous</p>
            </div>
          </div>

          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-semibold">
            <Zap className="w-4 h-4 mr-2" />
            Rejoignez le mouvement - Bêta ouverte prochainement
          </div>
        </div>
      </section>
    </div>
  );
};
