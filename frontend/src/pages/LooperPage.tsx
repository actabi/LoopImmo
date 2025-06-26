import React from 'react';
import { Users, TrendingUp, MapPin, Award, Briefcase, Heart, Calendar, Euro, Star, Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LooperPage: React.FC = () => {
  const benefits = [
    {
      icon: Euro,
      title: "Revenus attractifs",
      description: "30% de commission sur chaque vente, soit en moyenne 2 400€ par transaction",
      highlight: "2 400€/vente"
    },
    {
      icon: Calendar,
      title: "Liberté totale",
      description: "Gérez votre temps comme vous voulez, aucun quota ni obligation",
      highlight: "100% flexible"
    },
    {
      icon: MapPin,
      title: "Votre quartier",
      description: "Travaillez près de chez vous, dans le quartier que vous connaissez",
      highlight: "Local"
    },
    {
      icon: Heart,
      title: "Impact positif",
      description: "Aidez vos voisins à vendre ou acheter en toute confiance",
      highlight: "Communauté"
    }
  ];

  const ambassadors = [
    {
      name: "Marie Dupont",
      location: "Lyon 6ème",
      sales: 8,
      earnings: "19 200€",
      testimonial: "Être ambassadrice me permet d'arrondir mes fins de mois tout en rendant service à mes voisins.",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      joinedSince: "2023"
    },
    {
      name: "Thomas Bernard",
      location: "Villeurbanne",
      sales: 12,
      earnings: "28 800€",
      testimonial: "J'ai transformé ma connaissance du quartier en véritable activité complémentaire.",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      joinedSince: "2022"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Inscription",
      description: "Candidatez en ligne en 5 minutes",
      duration: "5 min"
    },
    {
      number: "02",
      title: "Formation",
      description: "Suivez notre formation gratuite en ligne",
      duration: "2h"
    },
    {
      number: "03",
      title: "Activation",
      description: "Recevez les opportunités de votre quartier",
      duration: "Immédiat"
    },
    {
      number: "04",
      title: "Commissions",
      description: "Gagnez 30% sur chaque vente réalisée",
      duration: "À vie"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                <span>Rejoignez 500+ loopers actifs</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Devenez <span className="text-secondary-600">looper</span> de votre quartier
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transformez votre connaissance locale en revenus complémentaires. 
                Aidez vos voisins, gagnez jusqu'à 2 400€ par vente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" variant="secondary" className="px-8">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Devenir looper
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('benefits')}
                >
                  En savoir plus
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-secondary-600">500+</p>
                  <p className="text-sm text-gray-600">Loopers</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-600">2 400€</p>
                  <p className="text-sm text-gray-600">Par vente</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-secondary-600">30%</p>
                  <p className="text-sm text-gray-600">Commission</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Loopers LoopImmo"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
                <p className="text-sm text-gray-600 mb-1">Revenus moyens annuels</p>
                <p className="text-3xl font-bold text-secondary-600">12 000€</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Les avantages d'être looper
            </h2>
            <p className="text-xl text-gray-600">
              Une activité flexible, valorisante et rémunératrice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-secondary-100 to-transparent w-32 h-32 -mr-16 -mt-16 rounded-full"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 mb-4">{benefit.description}</p>
                  <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    {benefit.highlight}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment devenir looper ?
            </h2>
            <p className="text-xl text-gray-600">
              Un processus simple et rapide
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <span className="text-3xl font-bold">{step.number}</span>
                      </div>
                      <div className="absolute -bottom-2 right-0 bg-white rounded-full px-3 py-1 text-xs font-medium text-secondary-600 shadow-md">
                        {step.duration}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full">
                      <ArrowRight className="w-8 h-8 text-gray-300 -ml-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos loopers témoignent
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez leurs parcours inspirants
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ambassadors.map((ambassador, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0">
                <div className="flex items-start gap-6 mb-6">
                  <img 
                    src={ambassador.image} 
                    alt={ambassador.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{ambassador.name}</h3>
                    <p className="text-gray-600">{ambassador.location}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex gap-1">
                        {[...Array(ambassador.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">Depuis {ambassador.joinedSince}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 italic mb-6">"{ambassador.testimonial}"</p>
                
                <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Ventes réalisées</p>
                    <p className="text-2xl font-bold text-gray-900">{ambassador.sales}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Gains totaux</p>
                    <p className="text-2xl font-bold text-secondary-600">{ambassador.earnings}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Faut-il avoir une expérience en immobilier ?",
                answer: "Non, aucune expérience n'est requise. Nous vous formons gratuitement et vous accompagnons sur chaque vente."
              },
              {
                question: "Combien de temps cela prend-il ?",
                answer: "C'est vous qui décidez ! En moyenne, nos loopers consacrent 5 à 10 heures par mois à cette activité."
              },
              {
                question: "Comment sont calculées les commissions ?",
                answer: "Vous recevez 30% du forfait LoopImmo sur chaque vente. Par exemple, sur un forfait de 8 000€, vous gagnez 2 400€."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-0">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à devenir looper ?
          </h2>
          <p className="text-xl mb-10 text-secondary-100">
            Rejoignez notre communauté et commencez à gagner dès maintenant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="primary" className="bg-white text-secondary-700 hover:bg-gray-100 px-8">
              <Users className="w-5 h-5 mr-2" />
              Postuler maintenant
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-secondary-700 px-8">
              <Calendar className="w-5 h-5 mr-2" />
              Participer à une réunion d'info
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
