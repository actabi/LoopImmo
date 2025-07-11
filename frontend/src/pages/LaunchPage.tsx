import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiUrl } from "../utils/api";
import {
  Calendar,
  Users,
  TrendingDown,
  Zap,
  Shield,
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Euro,
  Eye,
  MapPin,
  Lock,
  AlertCircle,
} from "lucide-react";
import {
  calculateSavings,
  formatPrice,
  formatPercentage,
} from "../utils/calculations";

export const LaunchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const referredBy = searchParams.get("ref") || undefined;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"seller" | "buyer" | "ambassador">("seller");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Format d'email invalide");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer un email valide");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(apiUrl("/api/subscribe"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, referredBy }),
      });
      if (res.status === 409) {
        setEmailError("Cet email est déjà enregistré");
        return;
      }
      if (!res.ok) {
        throw new Error("Request failed");
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  // Exemple de calcul dynamique pour un bien de 300 000€
  const examplePrice = 300000;
  const exampleSavings = calculateSavings(examplePrice);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Badge d'annonce */}
            <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              BÊTA OUVERTE PROCHAINEMENT - INSCRIVEZ-VOUS EN PRIORITÉ
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              La révolution de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                l'immobilier participatif
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              LoopImmo transforme la vente immobilière entre particuliers en
              créant le premier
              <span className="font-semibold text-primary-600">
                {" "}
                écosystème collaboratif{" "}
              </span>
              où chacun devient acteur du succès.
            </p>

            {/* CTA Principal */}
            <div className="max-w-2xl mx-auto">
              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
                >
                  <div className="flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-secondary-500 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Rejoignez la communauté LoopImmo
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Rejoignez le mouvement dès maintenant : recevez votre code
                    de parrainage et bénéficiez d'avantages pour chaque vente
                    générée par votre réseau.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Votre adresse email"
                        className={`w-full px-6 py-4 border-2 rounded-lg focus:outline-none text-lg transition-colors ${
                          emailError
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-primary-500"
                        }`}
                        required
                      />
                      {emailError && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {emailError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !!emailError}
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
                    Nous vous contacterons en priorité dès l'ouverture de la
                    plateforme.
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
            LoopImmo réinvente la vente immobilière en supprimant les
            intermédiaires coûteux et en créant une communauté d'entraide.
            Notre plateforme sécurise chaque étape et vous accompagne jusqu'à
            la signature
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 1. Ancien bloc rouge -> maintenant bleu (primary) */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mb-6">
              <TrendingDown className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vendez malin</h3>
            <p className="text-gray-700 mb-4">
              Une structure tarifaire claire, des frais entièrement décryptés
              : vendez sans stress et protégez votre pouvoir d’achat
            </p>
            <div className="text-3xl font-bold text-primary-600">72 % d’économie</div>
            <p className="text-xs text-gray-500 mt-2">
              selon{' '}
              <a
                href="https://immobilier.lefigaro.fr/article/l-autorite-de-la-concurrence-veut-faire-baisser-les-frais-d-agences-immobilieres_1d6a4672-052f-11ee-8de7-e9bdb740637b/?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                l’analyse que fait l’autorité de la concurrence
              </a>
            </p>
          </div>

          {/* 2. Ancien bloc bleu -> maintenant jaune (accent) */}
          <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-accent-200 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-accent-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Communauté active</h3>
            <p className="text-gray-700 mb-4">
              Des loopers locaux motivés, rémunérés pour chaque vente,
              font vivre votre annonce et trouvent les acheteurs dans leur
              réseau.
            </p>
            <div className="text-3xl font-bold text-accent-600">600€ - 1 500€</div>
            <p className="text-sm text-gray-600">de primes selon le palier</p>
          </div>

          {/* 3. Ancien bloc jaune -> maintenant vert (secondary) */}
          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-secondary-200 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-secondary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vente accélérée</h3>
            <p className="text-gray-700 mb-4">
              La force du réseau associée à l'accompagnement d'un conseiller
              qualifié garantit une vente rapide et sécurisée.
            </p>
            <div className="text-3xl font-bold text-secondary-600">3 sem.</div>
            <p className="text-sm text-gray-600">délai moyen de vente estimé</p>
          </div>
        </div>
      </div>
    </section>

      {/* Section Vendeurs */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Vendeurs, économisez gros
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Profitez d'un accompagnement complet et d'un réseau local tout en
              gardant la maîtrise de votre budget.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-start">
                <Euro className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Forfait unique à paliers
                  </h4>
                  <p className="text-gray-600">
                    Économisez jusqu'à 72% vs agence traditionnelle
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Loopers proches ou pourquoi pas vous ?
                  </h4>
                  <p className="text-gray-600">
                    Des experts de votre quartier pour valoriser votre bien ou
                    soyez votre propre looper
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Shield className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Sécurité maximale
                  </h4>
                  <p className="text-gray-600">
                    Diagnostics, contrats et signature encadrés
                  </p>
                  <p className="text-sm text-primary-600 mt-1">
                    Validation KYC par Trust Manager certifié
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Zap className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Vente rapide
                  </h4>
                  <p className="text-gray-600">
                    Mise en avant optimale et suivi des visites
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Les étapes clés
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-primary-600 mr-4">
                    1
                  </div>
                  <p className="text-gray-800">
                    Estimez votre bien gratuitement avec notre IA
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-primary-600 mr-4">
                    2
                  </div>
                  <p className="text-gray-800">
                    Validation Trust Manager en 30 min
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-primary-600 mr-4">
                    3
                  </div>
                  <p className="text-gray-800">Publication multi-canaux</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-primary-600 mr-4">
                    4
                  </div>
                  <p className="text-gray-800 font-semibold">
                    Concluez chez le notaire
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Manager Vendeurs */}
          <div className="mt-8 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary-700 mr-2" />
            <p className="text-primary-700 font-medium text-sm">
              Validation KYC & conformité légale en 30 min par notre Trust
              Manager certifié Loi Hoguet
            </p>
          </div>
        </div>
      </section>

			{/*  Section Loopers*/}
    <section className="py-20 bg-gradient-to-b from-accent-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Devenez looper LoopImmo
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Transformez votre réseau en opportunité et soyez récompensé pour
            chaque vente réussie
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avantages Loopers */}
          <div>
            <div className="space-y-4">
              <div className="flex items-start">
                <Star className="w-6 h-6 text-accent-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Faites vous un complement de revenu
                  </h4>
                  <p className="text-gray-600">
										Comission par vente
                  </p>
									<p className="text-sm text-accent-600 mt-1">
                    De 600€ à 1 500€ selon le palier de prix
									</p>
                </div>
              </div>

              <div className="flex items-start">
                <Star className="w-6 h-6 text-accent-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Zones exclusives
                  </h4>
                  <p className="text-gray-600">
                    Territoire protégé de 5 km autour de vos mandats
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Star className="w-6 h-6 text-accent-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Formation dédiée
                  </h4>
                  <p className="text-gray-600">
                    Accès à nos programmes de formation pour maîtriser le rôle
                    d'looper
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Star className="w-6 h-6 text-accent-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                     Boostez vos revenus grâce au parrainage
                  </h4>
                  <p className="text-gray-600">
                    Générez un revenu complémentaire grâce à vos filleuls
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comment ça marche ? (carte jaune) */}
          <div className="bg-gradient-to-br from-accent-100 to-accent-200 rounded-3xl p-10 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Comment ça marche ?
            </h3>

            <div className="space-y-6">
              {['Identifiez des vendeurs dans votre réseau', 'Accompagnez-les dans leur projet de vente', 'Organisez des visites et trouvez des acheteurs', 'Recevez votre commission à la vente !'].map((text, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-accent-600 mr-4">
                    {i + 1}
                  </div>
                  <p className={`text-gray-800 ${i === 3 ? 'font-semibold' : ''}`}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Manager Loopers */}
        <div className="mt-8 bg-gradient-to-r from-accent-50 to-accent-100 rounded-xl p-4 flex items-center justify-center">
          <Lock className="w-5 h-5 text-accent-700 mr-2" />
          <p className="text-accent-700 font-medium text-sm">
            Validation KYC & conformité légale en 30 min par notre Trust
            Manager certifié Loi Hoguet
          </p>
        </div>
      </div>
    </section>

      {/* Section Acheteurs */}
      <section className="py-20 bg-gradient-to-b from-secondary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Acheteurs, trouvez votre bonheur
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Des biens sélectionnés par la communauté et un suivi personnalisé
              pour sécuriser votre achat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Parcours simplifié
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-secondary-600 mr-4">
                    1
                  </div>
                  <p className="text-gray-800">
                    Créez vos alertes personnalisées
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-secondary-600 mr-4">
                    2
                  </div>
                  <p className="text-gray-800">
                    Visitez avec un looper local
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-secondary-600 mr-4">
                    3
                  </div>
                  <p className="text-gray-800">Négociez au juste prix</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-secondary-600 mr-4">
                    4
                  </div>
                  <p className="text-gray-800 font-semibold">
                    Signez en toute sérénité
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-secondary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Biens vérifiés
                  </h4>
                  <p className="text-gray-600">
                    Documents et diagnostics contrôlés
                  </p>
                  <p className="text-sm text-secondary-600 mt-1">
                    Validation Trust Manager systématique
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Eye className="w-6 h-6 text-secondary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Visites flexibles
                  </h4>
                  <p className="text-gray-600">
                    Organisées selon vos disponibilités
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <TrendingDown className="w-6 h-6 text-secondary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Frais réduits
                  </h4>
                  <p className="text-gray-600">
                    Un prix plus juste grâce à la vente directe
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-secondary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Accompagnement complet
                  </h4>
                  <p className="text-gray-600">
                    Financement et démarches simplifiés
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Manager Acheteurs */}
          <div className="mt-8 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-xl p-4 flex items-center justify-center">
            <Lock className="w-5 h-5 text-secondary-700 mr-2" />
            <p className="text-secondary-700 font-medium text-sm">
              Validation KYC & conformité légale en 30 min par notre Trust
              Manager certifié Loi Hoguet
            </p>
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
                "Nous croyons que vendre un bien immobilier est avant tout un
                moment de vie à valeur humaine. LoopImmo redonne du sens à la
                transaction en créant des liens authentiques entre vendeurs,
                acheteurs et loopers locaux."
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
            Inscrivez-vous aujourd'hui : accès anticipé + récompenses pour
            chaque vente générée via vos partages.
          </p>

          {!isSubmitted && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              Je réserve ma place
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          )}

          <div className="mt-12 flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              <span>Bêta ouverte prochainement</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>Programme de parrainage ouvert à tous</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
