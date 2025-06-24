import React, { useState, useEffect,useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Users, TrendingDown, Shield, Home, Search, Euro, Clock, CheckCircle, Star, Heart, Zap, Award, UserCheck, FileCheck, Handshake, ArrowDown, Gift, Percent, UserPlus, Copy, Check, Info, X, Share2 } from 'lucide-react';
import CloudflareTurnstile from '../components/shared/CloudflareTurnstile';

// Déclaration TypeScript pour Turnstile
declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: any) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export const LaunchPageV2: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showReferralSuccess, setShowReferralSuccess] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralCode(ref);
    }
  }, [searchParams]);


  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

    const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
  };

  const handleTurnstileError = () => {
    setTurnstileToken(null);
    alert('Erreur de vérification. Veuillez réessayer.');
  };

  const handleEmailSubmit = (role: string) => async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('Veuillez entrer un email valide');
      return;
    }

        if (!turnstileToken) {
      alert('Veuillez compléter la vérification de sécurité');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, referredBy: referralCode, role, turnstileToken  }),
      });

      if (res.status === 409) {
        alert('Cet email est déjà enregistré');
        return;
      }

      if (!res.ok) {
        throw new Error('Request failed');
      }

      setShowReferralSuccess(true);
      setTimeout(() => {
        alert(
          "Merci ! Nous vous contacterons dès l'ouverture de la bêta. Votre code de parrainage vous sera envoyé par email."
        );
        setEmail('');
        setReferralCode('');
        setTurnstileToken(null);
        setShowReferralSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Popup Component
  const ReferralPopup = () => (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-xl">
        {/* Header compact */}
        <div className="flex justify-between items-center p-5 pb-3 border-b">
          <h3 className="text-xl font-bold text-gray-900">Comment fonctionne le parrainage ?</h3>
          <button
            onClick={() => setShowReferralPopup(false)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto p-5">
          {/* Les 3 étapes */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Les étapes</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                  <UserPlus className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 text-sm">1. Parrainez un proche</h5>
                  <p className="text-xs text-gray-600">Invitez avec votre code reçu par email</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                  <Handshake className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 text-sm">2. Votre filleul s'inscrit</h5>
                  <p className="text-xs text-gray-600">Il devient vendeur, acheteur ou Looper</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                  <Percent className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 text-sm">3. Gagnez à vie</h5>
                  <p className="text-xs text-gray-600">Un % sur chaque vente, versé au compromis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Les gains */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Vos gains</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
                <p className="text-2xl font-bold text-purple-600">10%</p>
                <p className="text-xs font-medium text-gray-700">Filleul vendeur</p>
                <p className="text-xs text-gray-500 mt-1">du forfait</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                <p className="text-2xl font-bold text-green-600">10%</p>
                <p className="text-xs font-medium text-gray-700">Filleul Looper</p>
                <p className="text-xs text-gray-500 mt-1">du forfait</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                <p className="text-2xl font-bold text-blue-600">100€</p>
                <p className="text-xs font-medium text-gray-700">Filleul acheteur</p>
                <p className="text-xs text-gray-500 mt-1">prime d'achat</p>
              </div>
            </div>
          </div>

          {/* Exemple */}
          <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-100">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <h4 className="text-sm font-semibold text-gray-900">Exemple : Bien vendu à 400 000€</h4>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-xs text-gray-600">Vous touchez</p>
                <p className="text-lg font-bold text-yellow-700">500€ HT</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Votre filleul touche</p>
                <p className="text-lg font-bold text-green-600">1 250€ HT</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-center text-white">
            <Share2 className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-semibold">Partagez et gagnez !</p>
            <p className="text-xs text-blue-100 mt-1">Plus vous partagez, plus vous gagnez</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Popup */}
      {showReferralPopup && <ReferralPopup />}

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
              className="h-24 md:h-32 lg:h-40 mx-auto"
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
              J'arrondis mes fins de mois
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

					
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">-72%</h3>
              <p className="text-gray-700 font-medium">de frais par rapport aux agences traditionnelles</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">1 500€</div>
              <p className="text-gray-700 font-medium">complement de revenu moy. versée au Looper par vente</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-yellow-600 mb-2">IA 24/7</div>
              <p className="text-gray-700 font-medium">Assistance personnalisée à chaque étape</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-red-600 mb-2">3 en 1</div>
              <p className="text-gray-700 font-medium">Diagnostic, conformité & rénovation gérés par nos partenaires</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Parrainage */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Gift className="w-4 h-4 mr-2" />
              Programme de parrainage exclusif
						</div>
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
								Stratégie gagnante
							</h2>
							<div className="text-xl text-gray-600 max-w-3xl mx-auto space-y-4">
								<p>
									Vous croyez au concept ? Ne perdez pas une minute :{' '}
									<strong>inscrivez-vous dès maintenant</strong> et{' '}
									<strong>partagez votre code de parrainage</strong> autour de vous.
								</p>
								<p>
									En attendant l'ouverture officielle,{' '}
									<strong>soyez parmi les premiers</strong> à mobiliser votre réseau et
									maximisez vos gains !
								</p>
							</div>
						</div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Gift className="w-12 h-12 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Votre code de parrainage</h3>
                <button
                  onClick={() => setShowReferralPopup(true)}
                  className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
                  title="Comment ça marche ?"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Votre code personnel vous sera envoyé par email</strong> après votre inscription
                </p>
                <div className="flex items-center justify-center gap-2 text-purple-700">
                  <Share2 className="w-5 h-5" />
                  <span className="font-semibold">Partagez le concept dès maintenant !</span>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="font-bold text-gray-900 mb-3">🚀 Stratégie gagnante</h4>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Plus vous partagez LoopImmo autour de vous, plus vous maximisez vos chances de gains !</strong><br/>
                  Parlez-en à vos amis, famille, collègues... Si vous croyez au concept, 
                  faites-le connaître avant l'ouverture officielle pour être les premiers bénéficiaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi LoopImmo */}
      <section id="pourquoi-section" className="py-20 bg-white">
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
                  <p className="text-lg text-gray-700"><strong>Sécurité légale garantie</strong> par nos expert en interne</p>
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
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">2. Validation de l'annonce</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">3. Diffusion</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">4. Signature</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Home className="w-16 h-16 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à vendre ?</h3>

                <form onSubmit={handleEmailSubmit('seller')} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Code de parrainage (optionnel)"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowReferralPopup(true)}
                      title="Détails parrainage"
                      className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors flex-shrink-0"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mb-4">
  <CloudflareTurnstile
    onSuccess={handleTurnstileSuccess}
    onError={handleTurnstileError}
  />
</div>
                  {referralCode && email && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-700">
                        <Gift className="w-4 h-4 inline mr-1" />
                        <strong>10 %</strong> des gains de vos filleuls pour chacune des ventes réalisées !
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {isLoading ? 'Envoi...' : 'Je veux vendre'}
                  </button>
                </form>

                {showReferralSuccess && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Code de parrainage validé !
                    </p>
                  </div>
                )}
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
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Devenir Looper</h3>
                
                <form onSubmit={handleEmailSubmit('looper')} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Code de parrainage (optionnel)"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowReferralPopup(true)}
                      title="Détails parrainage"
                      className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors flex-shrink-0"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
<div className="mb-4">
  <CloudflareTurnstile
    onSuccess={handleTurnstileSuccess}
    onError={handleTurnstileError}
  />
</div>
                  {referralCode && email && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-700">
                        <Gift className="w-4 h-4 inline mr-1" />
                        <strong>10 %</strong> des gains de vos filleuls pour chacune des ventes réalisées !
                      </p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {isLoading ? "Envoi..." : "Je veux gagner de l'argent"}
                  </button>
                </form>
                
                {showReferralSuccess && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Code de parrainage validé !
                    </p>
                  </div>
                )}
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
                  <p className="text-lg text-gray-700"><strong>Biens vérifiés</strong> par nos experts en interne</p>
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
                <div className="flex items-center justify-center mb-4">
                  <Search className="w-16 h-16 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à acheter ?</h3>
                
                <form onSubmit={handleEmailSubmit('buyer')} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Code de parrainage (optionnel)"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowReferralPopup(true)}
                      title="Détails parrainage"
                      className="p-3 bg-yellow-100 text-yellow-600 rounded-xl hover:bg-yellow-200 transition-colors flex-shrink-0"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
<div className="mb-4">
  <CloudflareTurnstile
    onSuccess={handleTurnstileSuccess}
    onError={handleTurnstileError}
  />
</div>
                  {referralCode && email && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-700">
                        <Gift className="w-4 h-4 inline mr-1" />
                        <strong>10 %</strong> des gains de vos filleuls pour chacune des ventes réalisées !
                      </p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {isLoading ? 'Envoi...' : 'Je veux acheter'}
                  </button>
                </form>
                
                {showReferralSuccess && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Code de parrainage validé !
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appel Final */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo.svg" 
              alt="LoopImmo" 
              className="h-12 md:h-16 mx-auto filter brightness-0 invert"
            />
          </div>

          <div className="mb-12">
            <blockquote className="text-2xl md:text-3xl font-light text-white mb-8 leading-relaxed">
              "LoopImmo remet de l'humain dans l'immobilier. Chaque vente devient une aventure collective et une source de revenus partagés."
            </blockquote>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Heart className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">100% Humain</h3>
              <p className="text-gray-300">Des vraies personnes, pas des algorithmes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Shield className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">100% Sécurisé</h3>
              <p className="text-gray-300">Experts internes et garanties légales</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <FileCheck className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">100% Transparent</h3>
              <p className="text-gray-300">Tarifs clairs, pas de frais cachés</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Rejoignez la révolution immobilière</h3>
            <p className="text-blue-100 mb-6 text-lg">
              Soyez parmi les premiers à découvrir une nouvelle façon de vendre, acheter et gagner de l'argent dans l'immobilier.
            </p>
            <div className="inline-flex items-center bg-yellow-400 text-gray-900 px-6 py-3 rounded-full text-sm font-semibold">
              <Zap className="w-4 h-4 mr-2" />
              Bêta ouverte prochainement
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
