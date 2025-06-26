import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Shield,
  Home,
  Search,
  Euro,
  CheckCircle,
  Star,
  Heart,
  Zap,
  Award,
  UserCheck,
  FileCheck,
  Handshake,
  ArrowDown,
  Gift,
  Percent,
  UserPlus,
  Info,
  AlertCircle,
  X,
  Share2,
} from "lucide-react";
import Altcha from "../components/shared/Altcha";
import { CommissionSlider } from "../utils/CommissionSlider";
import { LooperEarningsSlider } from "../utils/LooperEarningsSlider";

export const LaunchPageV2: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showReferralSuccess, setShowReferralSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success"
  );
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const altchaRef = useRef<{ value: string | null }>(null);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferralCode(ref);
    }
  }, [searchParams]);

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const handleEmailSubmit = (role: string) => async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setFeedbackType("error");
      setFeedbackMessage("Veuillez entrer un email valide");
      setShowReferralSuccess(true);
      setTimeout(() => setShowReferralSuccess(false), 5000);
      return;
    }

    const token = altchaRef.current?.value;

    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, referredBy: referralCode, role, token }),
      });

      if (res.status === 409) {
        setFeedbackType("error");
        setFeedbackMessage("Cet email est déjà enregistré");
        setShowReferralSuccess(true);
        setTimeout(() => setShowReferralSuccess(false), 5000);
        return;
      }

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setFeedbackType("success");
      setFeedbackMessage(
        "Merci ! Nous vous contacterons dès l'ouverture de la bêta. Votre code de parrainage vous sera envoyé par email."
      );
      setShowReferralSuccess(true);
      setEmail("");
      setReferralCode("");
      setTimeout(() => setShowReferralSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setFeedbackType("error");
      setFeedbackMessage("Erreur lors de l'inscription");
      setShowReferralSuccess(true);
      setTimeout(() => setShowReferralSuccess(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Popup Component
  const ReferralPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-xl">
        {/* Header compact */}
        <div className="flex justify-between items-center p-5 pb-3 border-b">
          <h3 className="text-xl font-bold text-gray-900">
            Comment fonctionne le parrainage ?
          </h3>
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
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Les étapes
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                  <UserPlus className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 text-sm">
                    1. Parrainez un proche
                  </h5>
                  <p className="text-xs text-gray-600">
                    Invitez avec votre code reçu par email
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                  <Handshake className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 text-sm">
                    2. Votre filleul s'inscrit
                  </h5>
                  <p className="text-xs text-gray-600">
                    Il devient vendeur, acheteur ou Looper
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                  <Percent className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 text-sm">
                    3. Gagnez à vie
                  </h5>
                  <p className="text-xs text-gray-600">
                    Un % sur chaque vente, versé au compromis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Les gains */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Vos gains
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
                <p className="text-2xl font-bold text-purple-600">10%</p>
                <p className="text-xs font-medium text-gray-700">
                  Filleul vendeur
                </p>
                <p className="text-xs text-gray-500 mt-1">du forfait</p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                <p className="text-2xl font-bold text-green-600">10%</p>
                <p className="text-xs font-medium text-gray-700">
                  Filleul Looper
                </p>
                <p className="text-xs text-gray-500 mt-1">du forfait</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                <p className="text-2xl font-bold text-blue-600">100€</p>
                <p className="text-xs font-medium text-gray-700">
                  Filleul acheteur
                </p>
                <p className="text-xs text-gray-500 mt-1">prime d'achat</p>
              </div>
            </div>
          </div>

          {/* Exemple */}
          <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-100">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <h4 className="text-sm font-semibold text-gray-900">
                Exemple : Bien vendu à 400 000€
              </h4>
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
            <p className="text-xs text-blue-100 mt-1">
              Plus vous partagez, plus vous gagnez
            </p>
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

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight break-words">
            La révolution de l'immobilier
            <span className="block" style={{ color: "#1974cc" }}>
              {" "}
              participatif
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            Avec LoopImmo, votre voisin, vos amis et vous-même devenez des{" "}
            <strong>Loopers</strong> : gagnez des primes en diffusant l'annonce
            et en accompagnant les visites.
          </p>

          <div className="flex flex-col gap-4 justify-center mb-16 max-w-4xl mx-auto px-4">
            <button
              onClick={() => scrollToSection("vendeur-section")}
              className="px-6 sm:px-6 py-4 sm:py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center text-sm sm:text-sm md:text-base flex-1 sm:flex-none min-h-[60px]"
            >
              <Home className="w-5 h-5 sm:w-5 sm:h-5 mr-2 sm:mr-2 flex-shrink-0" />
              <span className="text-center leading-tight">
                Je vends, ça m'intéresse
              </span>
            </button>
            <button
              onClick={() => scrollToSection("looper-section")}
              className="px-6 sm:px-6 py-4 sm:py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 flex items-center justify-center text-sm sm:text-sm md:text-base flex-1 sm:flex-none min-h-[60px]"
            >
              <Award className="w-5 h-5 sm:w-5 sm:h-5 mr-2 sm:mr-2 flex-shrink-0" />
              <span className="text-center leading-tight">
                Devenir Looper, avoir un complément de revenus
              </span>
            </button>
            <button
              onClick={() => scrollToSection("acheteur-section")}
              className="px-6 sm:px-6 py-4 sm:py-4 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 transition-all transform hover:scale-105 flex items-center justify-center text-sm sm:text-sm md:text-base flex-1 sm:flex-none min-h-[60px]"
            >
              <Search className="w-5 h-5 sm:w-5 sm:h-5 mr-2 sm:mr-2 flex-shrink-0" />
              <span className="text-center leading-tight">
                Je cherche un bien
              </span>
            </button>
          </div>

          {/* Bouton découvrir en plus */}
          <div className="mb-16">
            <button
              onClick={() => scrollToSection("pourquoi-section")}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <span className="mr-2">Découvrir le concept</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                -72%
              </h3>
              <p className="text-sm md:text-base text-gray-700 font-medium">
                Par rapport à une agence classique, vos économies sont
                immédiates
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                1 500€
              </div>
              <p className="text-sm md:text-base text-gray-700 font-medium">
                complement de revenu moy. versée au Looper par vente
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
                IA 24/7
              </div>
              <p className="text-sm md:text-base text-gray-700 font-medium">
                Support juridique, annonces & dossiers 24/7
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                3 en 1
              </div>
              <p className="text-sm md:text-base text-gray-700 font-medium">
                Diagnostic, conformité & rénovation gérés par nos partenaires
              </p>
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
                Vous croyez au concept ? Ne perdez pas une minute :{" "}
                <strong>inscrivez-vous dès maintenant</strong> et{" "}
                <strong>partagez votre code de parrainage</strong> autour de
                vous.
              </p>
              <p>
                En attendant l'ouverture officielle,{" "}
                <strong>soyez parmi les premiers</strong> à mobiliser votre
                réseau et maximisez vos gains !
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Gift className="w-12 h-12 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Votre code de parrainage
                </h3>
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
                  <strong>
                    Votre code personnel vous sera envoyé par email
                  </strong>{" "}
                  après votre inscription
                </p>
                <div className="flex items-center justify-center gap-2 text-purple-700">
                  <Share2 className="w-5 h-5" />
                  <span className="font-semibold">
                    Partagez le concept dès maintenant !
                  </span>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="font-bold text-gray-900 mb-3">
                  🚀 Stratégie gagnante
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  <strong>
                    Plus vous partagez LoopImmo autour de vous, plus vous
                    maximisez vos chances de gains !
                  </strong>
                  <br />
                  Parlez-en à vos amis, famille, collègues... Si vous croyez au
                  concept, faites-le connaître avant l'ouverture officielle pour
                  être les premiers bénéficiaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi LoopImmo */}
      <section id="pourquoi-section" className="py-20 bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/logo.svg"
              alt="LoopImmo"
              className="h-16 md:h-20 lg:h-24 mx-auto"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            L'immobilier réinventé par la communauté
          </h2>

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              <strong>LoopImmo</strong> transforme la vente immobilière en
              mobilisant votre
              <strong style={{ color: "#1974cc" }}> communauté locale</strong> :
              voisins, anciens occupants, connaissances deviennent des{" "}
              <strong>Loopers rémunérés</strong>.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Comment ça fonctionne ?
              </h3>
              <div className="text-left space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p>
                    <strong>Le vendeur choisit un Looper de confiance</strong>{" "}
                    pour piloter sa vente
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p>
                    <strong>
                      Chaque Looper contribue selon ses compétences
                    </strong>{" "}
                    : rédaction, photos, visites, recommandations
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p>
                    <strong>L'IA accompagne chaque étape</strong> : réponses
                    juridiques, rédaction d'annonces, tri des photos et suivi de
                    dossier
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p>
                    <strong>
                      Tous sont rémunérés uniquement si la vente se conclut
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              Résultat : des <strong>forfaits fixes transparents</strong>{" "}
              jusqu'à 70% moins chers que les agences, et une communauté qui
              partage les bénéfices.
            </p>
          </div>

          {/* Exemple concret épuré */}
          {/* <div className="bg-white rounded-2xl p-4 sm:p-8 mb-8 max-w-4xl mx-auto shadow-lg">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
                Exemple concret : Appartement 300 000€
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <p className="text-gray-600 text-xs mb-2">
                  Agence traditionnelle (5%)
                </p>
                <p className="text-2xl font-bold text-red-500">15 000€</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-gray-600 text-xs mb-2">
                  LoopImmo (forfait palier)
                </p>
                <p className="text-2xl font-bold text-green-600">4 000€</p>
              </div>
            </div>

            <div className="text-center pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-base sm:text-lg text-gray-700 mb-4 px-2">
                <strong className="text-green-600">11 000€ d'économie</strong>{" "}
                pour le vendeur
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> + </span>
                <strong className="text-blue-600">1 400€ partagés</strong> entre
                les Loopers
              </p>
              <span className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                -73% par rapport à une agence
              </span>
            </div>
          </div> */}

          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-semibold">
            <Zap className="w-4 h-4 mr-2" />
            Rejoignez le mouvement - Bêta ouverte prochainement
          </div>
        </div>
      </section>

      {/* Section Vendeur */}
      <section
        id="vendeur-section"
        className="py-20 bg-gradient-to-br from-blue-50 to-blue-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Vendez malin, vendez communautaire.
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Forfait ultra-compétitif à paliers</strong> :{" "}
                    <span className="underline">
                      toujours 15–30&nbsp;% moins cher que les agences
                      traditionnelles et néo-agences
                    </span>
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Zéro commission surprise</strong> : tout est
                    annoncé, tout est maîtrisé.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Communauté locale activée</strong> : chaque voisin,
                    ancien occupant ou contact peut devenir looper et être
                    récompensé.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Accompagnement complet & digitalisé</strong> :
                    estimation IA, diffusion multi-plateformes, support
                    juridique et gestion des offres intégrés.
                  </p>
                </div>
              </div>

              {/* Comparateur dynamique */}
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg mb-8">
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
                  Comparez les frais en 2 secondes&nbsp;:
                </h3>
                <CommissionSlider />
                <p className="text-sm text-gray-600 mt-2">
                  Bougez le curseur pour voir l’économie réalisée sur votre bien
                  selon les principaux acteurs du marché.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Home className="w-16 h-16 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Prêt à vendre ?
                </h3>

                <form
                  onSubmit={handleEmailSubmit("seller")}
                  className="space-y-4"
                >
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
                  {email && (
                    <div>
                      {" "}
                      <fieldset>
                        <Altcha ref={altchaRef} />
                      </fieldset>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {isLoading ? "Envoi..." : "Je veux vendre"}
                  </button>
                </form>

                {showReferralSuccess && (
                  <div
                    className={`mt-4 p-3 rounded-lg border ${
                      feedbackType === "success"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        feedbackType === "success"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {feedbackType === "success" ? (
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                      ) : (
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                      )}
                      {feedbackMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Looper */}
      <section
        id="looper-section"
        className="py-20 bg-gradient-to-br from-green-50 to-green-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Devenir Looper
                </h3>

                <form
                  onSubmit={handleEmailSubmit("looper")}
                  className="space-y-4"
                >
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

                  {email && (
                    <div>
                      {" "}
                      <fieldset>
                        <Altcha ref={altchaRef} />
                      </fieldset>
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
                  <div
                    className={`mt-4 p-3 rounded-lg border ${
                      feedbackType === "success"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        feedbackType === "success"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {feedbackType === "success" ? (
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                      ) : (
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                      )}
                      {feedbackMessage}
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
                  <p className="text-lg text-gray-700">
                    <strong>Identifiez des vendeurs ou acheteurs</strong> dans
                    votre quartier
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Organisez ou relayez des visites</strong> en tant
                    que local
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Gagnez des primes à la signature</strong> selon
                    votre contribution
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Formation gratuite + bonus parrainage</strong>{" "}
                    inclus
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>IA à disposition</strong> pour vous guider sur
                    chaque mission
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Simulez vos gains Looper :
                </h3>
                <LooperEarningsSlider />
                <p className="text-sm text-gray-600 mt-2">
                  Déplacez le curseur : découvrez ce que vous pouvez gagner par
                  vente signée (aucun plafond, aucune exclusivité).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Acheteur */}
      <section
        id="acheteur-section"
        className="py-20 bg-gradient-to-br from-yellow-50 to-yellow-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Acheteurs, trouvez votre bonheur en toute sécurité
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Biens vérifiés</strong> par nos experts en interne
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Visites avec des Loopers proches</strong> qui
                    connaissent le quartier
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Zéro frais d'agence</strong> - Économisez des
                    milliers d'euros
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>Accompagnement jusqu'au notaire</strong> pour une
                    transaction sereine
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-lg text-gray-700">
                    <strong>IA disponible</strong> pour vos questions et votre
                    financement
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Avantages acheteur :
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-yellow-600 mr-2" />
                    <span className="text-xs md:text-sm font-medium">
                      Sécurisé
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Euro className="w-4 h-4 md:w-5 md:h-5 text-yellow-600 mr-2" />
                    <span className="text-xs md:text-sm font-medium">
                      Sans frais
                    </span>
                  </div>
                  <div className="flex items-center">
                    <UserCheck className="w-4 h-4 md:w-5 md:h-5 text-yellow-600 mr-2" />
                    <span className="text-xs md:text-sm font-medium">
                      Accompagné
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-yellow-600 mr-2" />
                    <span className="text-xs md:text-sm font-medium">
                      Humain
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Search className="w-16 h-16 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Prêt à acheter ?
                </h3>

                <form
                  onSubmit={handleEmailSubmit("buyer")}
                  className="space-y-4"
                >
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

                  {email && (
                    <div>
                      {" "}
                      <fieldset>
                        <Altcha ref={altchaRef} />
                      </fieldset>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {isLoading ? "Envoi..." : "Je veux acheter"}
                  </button>
                </form>

                {showReferralSuccess && (
                  <div
                    className={`mt-4 p-3 rounded-lg border ${
                      feedbackType === "success"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        feedbackType === "success"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {feedbackType === "success" ? (
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                      ) : (
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                      )}
                      {feedbackMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Verbatims */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils témoignent : pourquoi changer ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les vraies frustrations du marché immobilier actuel
            </p>
          </div>

          {/* 3 colonnes compactes */}
          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
            {/* Vendeurs */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 rounded-full p-2 mr-3">
                  <Home className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Vendeurs</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-3 border-red-300 pl-3">
                  <p className="text-sm text-gray-700 italic mb-1">
                    "L'agent a mis 3 semaines à publier l'annonce, et les photos
                    étaient moches..."
                  </p>
                  <span className="text-xs text-gray-500">
                    — Sophie, Marseille
                  </span>
                </div>

                <div className="border-l-3 border-red-300 pl-3">
                  <p className="text-sm text-gray-700 italic mb-1">
                    "11 000€ de frais pour qu'au final, ce soit moi qui fasse
                    les visites."
                  </p>
                  <span className="text-xs text-gray-500">— Didier, Lyon</span>
                </div>

                <div className="border-l-3 border-red-300 pl-3">
                  <p className="text-sm text-gray-700 italic mb-1">
                    "On a l’impression que l’agence travaille pour elle, pas
                    pour nous. Leur priorité, c’est de faire vite, pas de faire
                    bien."
                  </p>
                  <span className="text-xs text-gray-500">
                    — Karine, Toulouse
                  </span>
                </div>
              </div>
            </div>

            {/* Acheteurs */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Acheteurs</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-3 border-blue-300 pl-3">
                  <p className="text-sm text-gray-700 italic mb-1">
                    "Les meilleurs biens, tu les vois jamais. Ils partent avant
                    d’être publiés, réservés à des "clients de l’agence". Si
                    t’as pas le bon contact, t’as rien"
                  </p>
                  <span className="text-xs text-gray-500">— Céline, Paris</span>
                </div>

                <div className="border-l-3 border-blue-300 pl-3">
                  <p className="text-sm text-gray-700 italic mb-1">
                    " J’ai visité un bien avec une agente qui lisait la fiche en
                    même temps que moi. J’en savais plus qu’elle."
                  </p>
                  <span className="text-xs text-gray-500">
                    — Thomas, Nanterre
                  </span>
                </div>

                <div className="border-l-3 border-blue-300 pl-3">
                  <p className="text-sm text-gray-700 italic mb-1">
                    "Photos retouchées vs réalité : on dirait Tinder version
                    immobilier."
                  </p>
                  <span className="text-xs text-gray-500">— Ludovic, Nice</span>
                </div>
              </div>
            </div>

            {/* Agents */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Professionnels
                </h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-3 border-gray-300 pl-3">
                  <p className="text-sm text-gray-700 italic mb-1">
                    "60 appels pour 2 RDV, et tu bosses des semaines sans être
                    sûr de toucher 1€."
                  </p>
                  <span className="text-xs text-gray-500">
                    — Léo, mandataire
                  </span>
                </div>

                <div className="border-l-3 border-gray-300 pl-3">
                  <p className="text-sm text-gray-700 italic mb-1">
                    "12 agences se battent pour les mêmes vendeurs. On se bouffe
                    entre nous."
                  </p>
                  <span className="text-xs text-gray-500">
                    — Isabelle, directrice
                  </span>
                </div>

                <div className="border-l-3 border-gray-300 pl-3">
                  <p className="text-sm text-gray-700 italic mb-1">
                    "Le problème, c’est la pression commerciale. Tu dois rentrer
                    du mandat, peu importe comment."
                  </p>
                  <span className="text-xs text-gray-500">
                    — Amélie, Bordeaux
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA compact */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-2">
                Ces témoignages vous parlent ?
              </h3>
              <p className="text-blue-100 mb-4">
                LoopImmo apporte une solution concrète à ces frustrations.
              </p>
              <div className="inline-flex items-center bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                <Heart className="w-4 h-4 mr-2" />
                Ensemble, changeons l'immobilier
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
              "LoopImmo remet de l'humain dans l'immobilier. Chaque vente
              devient une aventure collective et une source de revenus
              partagés."
            </blockquote>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Heart className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">
                100% Humain
              </h3>
              <p className="text-gray-300">
                Des vraies personnes, pas des algorithmes
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Shield className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">
                100% Sécurisé
              </h3>
              <p className="text-gray-300">
                Experts internes et garanties légales
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <FileCheck className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">
                100% Transparent
              </h3>
              <p className="text-gray-300">
                Tarifs clairs, pas de frais cachés
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Rejoignez la révolution immobilière
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Soyez parmi les premiers à découvrir une nouvelle façon de vendre,
              acheter et gagner de l'argent dans l'immobilier.
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
