import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, TrendingUp, Shield, Clock, Users, Calculator, 
  CheckCircle, ArrowRight, Star, Camera, FileText, 
  MessageCircle, Calendar, BarChart3, Zap, Heart,
  Building, MapPin, Euro, Phone
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const SELLER_BENEFITS = [
  {
    icon: Euro,
    title: 'Forfait unique transparent',
    description: 'De 2 500€ à 10 000€ selon le prix de vente, sans surprise'
  },
  {
    icon: Users,
    title: 'Réseau d\'ambassadeurs',
    description: 'Des experts locaux pour valoriser votre bien'
  },
  {
    icon: Shield,
    title: 'Accompagnement complet',
    description: 'De l\'estimation à la signature chez le notaire'
  },
  {
    icon: Zap,
    title: 'Vente accélérée',
    description: 'Vendez 2x plus vite qu\'en agence traditionnelle'
  }
];

const PROCESS_STEPS = [
  {
    number: '1',
    title: 'Estimation gratuite',
    description: 'Obtenez une estimation précise de votre bien en 2 minutes',
    icon: Calculator
  },
  {
    number: '2',
    title: 'Mise en valeur',
    description: 'Photos professionnelles et visite virtuelle 3D',
    icon: Camera
  },
  {
    number: '3',
    title: 'Diffusion maximale',
    description: 'Votre bien sur tous les portails immobiliers majeurs',
    icon: BarChart3
  },
  {
    number: '4',
    title: 'Visites organisées',
    description: 'Gestion des visites par nos ambassadeurs locaux',
    icon: Calendar
  },
  {
    number: '5',
    title: 'Négociation',
    description: 'Accompagnement dans la négociation des offres',
    icon: MessageCircle
  },
  {
    number: '6',
    title: 'Finalisation',
    description: 'Suivi jusqu\'à la signature chez le notaire',
    icon: FileText
  }
];

const SUCCESS_STORIES = [
  {
    name: 'Marie L.',
    location: 'Lyon 6ème',
    property: 'Appartement T3',
    soldIn: '3 semaines',
    saved: '8 500€',
    testimonial: 'J\'ai économisé plus de 8000€ par rapport à une agence classique. L\'ambassadeur était très professionnel.',
    rating: 5
  },
  {
    name: 'Pierre et Sophie D.',
    location: 'Villeurbanne',
    property: 'Maison 120m²',
    soldIn: '5 semaines',
    saved: '15 000€',
    testimonial: 'Service impeccable du début à la fin. La visite virtuelle a fait la différence.',
    rating: 5
  },
  {
    name: 'Thomas R.',
    location: 'Lyon 3ème',
    property: 'Studio 28m²',
    soldIn: '2 semaines',
    saved: '4 000€',
    testimonial: 'Vente ultra rapide grâce à la visibilité sur tous les portails. Je recommande !',
    rating: 5
  }
];

export const VendrePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <TrendingUp className="w-4 h-4" />
                  <span>Vendez 2x plus vite qu'en agence</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Vendez votre bien au
                  <span className="text-primary-600"> juste prix</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Économisez jusqu'à 80% sur les frais d'agence tout en bénéficiant 
                  d'un accompagnement complet par nos experts locaux.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => navigate('/estimer')}>
                    <Calculator className="w-5 h-5 mr-2" />
                    Estimer mon bien
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Parler à un expert
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">15 000+</p>
                    <p className="text-sm text-gray-600">Biens vendus</p>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">4.8/5</p>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10">
                  <img 
                    src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Maison vendue"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Vendu en 3 semaines</p>
                        <p className="text-sm text-gray-600">15 000€ économisés</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-200 rounded-full blur-3xl opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pourquoi vendre avec LoopImmo ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Combinez le meilleur de la technologie et de l'expertise humaine 
                pour vendre votre bien rapidement et au meilleur prix.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SELLER_BENEFITS.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-xl text-gray-600">
                Un processus simple et transparent en 6 étapes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    {index < PROCESS_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-300 -translate-x-1/2 z-0"></div>
                    )}
                    <Card className="relative z-10 p-6 bg-white hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {step.number}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" onClick={() => navigate('/estimer')}>
                Commencer l'estimation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ils ont vendu avec LoopImmo
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez les témoignages de nos vendeurs satisfaits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {SUCCESS_STORIES.map((story, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{story.testimonial}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{story.name}</p>
                    <p className="text-sm text-gray-600">{story.location}</p>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type de bien:</span>
                        <span className="font-medium">{story.property}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Vendu en:</span>
                        <span className="font-medium text-green-600">{story.soldIn}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Économisé:</span>
                        <span className="font-medium text-primary-600">{story.saved}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à vendre votre bien ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Obtenez une estimation gratuite en 2 minutes et découvrez 
              combien vous pouvez économiser avec LoopImmo.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/estimer')}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Estimer gratuitement
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Phone className="w-5 h-5 mr-2" />
                01 23 45 67 89
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-6">
              Service disponible 7j/7 de 9h à 20h
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
