import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Home, Users, Shield, Star, ArrowRight, Building, TrendingUp } from 'lucide-react';

export const HomePageV2: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Dupont',
      role: 'Vendeuse',
      content: "J'ai vendu mon appartement en 3 semaines grâce à ImmoConnect. Service impeccable !",
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 2,
      name: 'Pierre Martin',
      role: 'Acheteur',
      content: "Processus simple et transparent. J'ai trouvé la maison de mes rêves rapidement.",
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      role: 'Ambassadrice',
      content: "Être ambassadrice ImmoConnect m'a permis de développer mon activité avec succès.",
      rating: 5,
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  const stats = [
    { value: '15K+', label: 'Biens vendus' },
    { value: '98%', label: 'Clients satisfaits' },
    { value: '45j', label: 'Délai moyen' },
    { value: '500+', label: 'Ambassadeurs' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">ImmoConnect</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/acheter" className="text-gray-700 hover:text-blue-600 font-medium">
                Acheter
              </Link>
              <Link to="/vendre" className="text-gray-700 hover:text-blue-600 font-medium">
                Vendre
              </Link>
              <Link to="/ambassadeur" className="text-gray-700 hover:text-blue-600 font-medium">
                Devenir ambassadeur
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern Split Design */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                L'immobilier
                <span className="text-blue-600"> réinventé</span>
                <br />
                pour vous
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Vendez, achetez ou devenez ambassadeur. 
                Une plateforme unique pour tous vos projets immobiliers.
              </p>
              
              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/acheter"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all"
                >
                  Explorer les biens
                  <Search className="ml-2 h-5 w-5" />
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 transform rotate-6 rounded-3xl"></div>
              <img
                src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern house"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Une solution pour chaque besoin
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez comment ImmoConnect peut vous aider
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pour les vendeurs</h3>
              <p className="text-gray-600 mb-6">
                Vendez votre bien au meilleur prix avec notre accompagnement complet
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Estimation gratuite
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Photos professionnelles
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Visites organisées
                </li>
              </ul>
              <Link
                to="/login"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pour les acheteurs</h3>
              <p className="text-gray-600 mb-6">
                Trouvez le bien de vos rêves parmi notre sélection exclusive
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Alertes personnalisées
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Visites virtuelles
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Accompagnement complet
                </li>
              </ul>
              <Link
                to="/acheter"
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
              >
                Voir les biens
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pour les ambassadeurs</h3>
              <p className="text-gray-600 mb-6">
                Développez votre activité avec notre programme partenaire
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Commissions attractives
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Formation complète
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Outils professionnels
                </li>
              </ul>
              <Link
                to="/login"
                className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700"
              >
                Devenir ambassadeur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de nos utilisateurs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à transformer votre projet immobilier ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers d'utilisateurs satisfaits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Créer mon compte
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/acheter"
              className="inline-flex items-center bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-all"
            >
              Découvrir les biens
              <Home className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">ImmoConnect</span>
              </div>
              <p className="text-gray-400">
                La plateforme immobilière nouvelle génération
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/acheter" className="hover:text-white">Acheter</Link></li>
                <li><Link to="/vendre" className="hover:text-white">Vendre</Link></li>
                <li><Link to="/estimation" className="hover:text-white">Estimation</Link></li>
                <li><Link to="/ambassadeur" className="hover:text-white">Programme ambassadeur</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">À propos</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carrières</a></li>
                <li><a href="#" className="hover:text-white">Presse</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ImmoConnect. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
