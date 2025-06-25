import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Heart, Shield, Clock, TrendingUp, Home, Filter, Eye, CheckCircle, Users, Sparkles } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const AcheterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.set('location', searchLocation);
    if (propertyType) params.set('type', propertyType);
    if (maxBudget) params.set('budget', maxBudget);
    
    navigate(`/recherche?${params.toString()}`);
  };

  const featuredProperties = [
    {
      id: '1',
      title: "Appartement T3 lumineux",
      location: "Lyon 6ème",
      price: 320000,
      surface: 75,
      rooms: 3,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      ambassador: "Marie D.",
      visits: 12
    },
    {
      id: '2',
      title: "Maison avec jardin",
      location: "Villeurbanne",
      price: 450000,
      surface: 120,
      rooms: 5,
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
      ambassador: "Thomas L.",
      visits: 8
    },
    {
      id: '3',
      title: "Studio moderne centre-ville",
      location: "Lyon 2ème",
      price: 180000,
      surface: 28,
      rooms: 1,
      image: "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800",
      ambassador: "Sophie M.",
      visits: 15
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Des biens vérifiés par notre communauté</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Trouvez votre <span className="text-primary-600">bien idéal</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Parcourez des biens sélectionnés et visités par nos ambassadeurs locaux. 
              Une transparence totale pour un achat en toute sérénité.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ville, quartier, code postal..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <select 
                  className="px-6 py-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">Type de bien</option>
                  <option value="apartment">Appartement</option>
                  <option value="house">Maison</option>
                  <option value="studio">Studio</option>
                </select>
                <select 
                  className="px-6 py-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                >
                  <option value="">Budget max</option>
                  <option value="200000">200 000€</option>
                  <option value="300000">300 000€</option>
                  <option value="400000">400 000€</option>
                  <option value="500000">500 000€+</option>
                </select>
                <Button size="lg" className="px-8 flex items-center gap-2" onClick={handleSearch}>
                  <Search className="w-5 h-5" />
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Achat sécurisé",
                description: "Accompagnement juridique complet",
                color: "primary"
              },
              {
                icon: Eye,
                title: "Transparence totale",
                description: "Prix affichés, pas de frais cachés",
                color: "secondary"
              },
              {
                icon: Clock,
                title: "Visites flexibles",
                description: "7j/7 avec nos ambassadeurs",
                color: "primary"
              },
              {
                icon: TrendingUp,
                title: "Prix négociables",
                description: "Grâce aux économies réalisées",
                color: "secondary"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-10 h-10 text-${item.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Biens à la une
              </h2>
              <p className="text-xl text-gray-600">
                Sélectionnés par nos ambassadeurs locaux
              </p>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate('/recherche')}
            >
              <Filter className="w-4 h-4" />
              Tous les biens
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-56 object-cover"
                  />
                  <button className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all">
                    <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {property.visits} visites
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    {property.location}
                  </p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-bold text-primary-600">
                      {property.price.toLocaleString('fr-FR')}€
                    </span>
                    <div className="text-sm text-gray-600 text-right">
                      <div>{property.surface}m²</div>
                      <div>{property.rooms} pièces</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white font-medium">
                        {property.ambassador.split(' ')[0][0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{property.ambassador}</p>
                        <p className="text-xs text-gray-600">Ambassadeur</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => navigate(`/bien/${property.id}`)}>
                      Voir le bien
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment acheter avec LoopImmo ?
            </h2>
            <p className="text-xl text-gray-600">
              Un processus simple et sécurisé en 4 étapes
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Recherchez",
                description: "Parcourez nos biens vérifiés et trouvez votre coup de cœur",
                icon: Search
              },
              {
                step: 2,
                title: "Visitez",
                description: "Organisez une visite avec l'ambassadeur du quartier",
                icon: Eye
              },
              {
                step: 3,
                title: "Négociez",
                description: "Faites une offre avec l'aide de nos experts",
                icon: TrendingUp
              },
              {
                step: 4,
                title: "Finalisez",
                description: "Signez en toute sécurité avec notre accompagnement juridique",
                icon: CheckCircle
              }
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg group-hover:scale-110 transition-transform">
                    <item.icon className="w-12 h-12" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à trouver votre futur chez-vous ?
          </h2>
          <p className="text-xl mb-10 text-primary-100">
            Rejoignez notre communauté et accédez à des biens exclusifs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Créer mon compte acheteur
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 text-white border-white hover:bg-white hover:text-primary-700 px-8"
              onClick={() => navigate('/recherche')}
            >
              Explorer les biens
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
