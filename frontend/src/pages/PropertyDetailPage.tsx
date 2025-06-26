import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Heart, Share2, MapPin, Home, Bed, Bath, Square, Calendar,
  Shield, Eye, Phone, MessageCircle, ChevronLeft, ChevronRight, Check,
  Clock, TrendingUp, Users, Star, Camera, Video
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getProperties } from '../services/dataService';
import { cn } from '../utils/cn';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVisitSlot, setSelectedVisitSlot] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const properties = getProperties();

  // Find property - in real app, fetch from API
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Bien non trouvé</h1>
            <Button onClick={() => navigate('/acheter')}>Retour aux biens</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.photos.length) % property.photos.length);
  };

  const similarProperties = properties.filter(p =>
    p.id !== property.id && 
    p.type === property.type && 
    Math.abs(p.price - property.price) < 100000
  ).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate('/acheter')}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour aux biens</span>
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <section className="relative bg-black">
          <div className="relative h-[500px] overflow-hidden">
            <img 
              src={property.photos[currentImageIndex]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows */}
            {property.photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {property.photos.length}
            </div>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-gray-700 hover:bg-white"
                )}
              >
                <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
              </button>
              <button className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-white/80 rounded-full flex items-center gap-2 hover:bg-white transition-colors text-sm font-medium">
                <Camera className="w-4 h-4" />
                Toutes les photos
              </button>
              <button className="px-4 py-2 bg-white/80 rounded-full flex items-center gap-2 hover:bg-white transition-colors text-sm font-medium">
                <Video className="w-4 h-4" />
                Visite virtuelle
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="bg-gray-900 p-2">
            <div className="flex gap-2 overflow-x-auto max-w-7xl mx-auto">
              {property.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-16 rounded overflow-hidden transition-opacity",
                    currentImageIndex === index ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Price */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <p className="text-gray-600 flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5" />
                  {property.location.address}, {property.location.city} {property.location.postalCode}
                </p>
                <div className="flex items-end gap-4">
                  <span className="text-4xl font-bold text-primary-600">
                    {property.price.toLocaleString('fr-FR')}€
                  </span>
                  <span className="text-gray-600 pb-1">
                    soit {Math.round(property.price / property.surface).toLocaleString('fr-FR')}€/m²
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <Card className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Square className="w-6 h-6 text-primary-600" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{property.surface}m²</p>
                    <p className="text-sm text-gray-600">Surface</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Home className="w-6 h-6 text-primary-600" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{property.rooms}</p>
                    <p className="text-sm text-gray-600">Pièces</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Bed className="w-6 h-6 text-primary-600" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{property.bedrooms}</p>
                    <p className="text-sm text-gray-600">Chambres</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Bath className="w-6 h-6 text-primary-600" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{property.bathrooms}</p>
                    <p className="text-sm text-gray-600">Salle{property.bathrooms > 1 ? 's' : ''} de bain</p>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{property.description}</p>
                
                <h3 className="font-semibold text-gray-900 mb-3">Caractéristiques</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Performance */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance du bien</h2>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">Vues</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{property.views}</p>
                    <p className="text-sm text-green-600">+12% cette semaine</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">Favoris</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{property.favorites}</p>
                    <p className="text-sm text-gray-600">18 acheteurs intéressés</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">En ligne depuis</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">
                      {Math.floor((new Date().getTime() - property.createdAt.getTime()) / (1000 * 60 * 60 * 24))}j
                    </p>
                    <p className="text-sm text-gray-600">Moyenne: 45j</p>
                  </div>
                </div>
              </Card>

              {/* Location */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Localisation</h2>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-gray-400" />
                  <span className="ml-2 text-gray-600">Carte interactive</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Transports</p>
                    <p className="font-medium">Métro ligne A à 5 min</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Commerces</p>
                    <p className="font-medium">Centre commercial à 10 min</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Écoles</p>
                    <p className="font-medium">École primaire à 300m</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Parcs</p>
                    <p className="font-medium">Parc de la Tête d'Or à 15 min</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ambassador Card */}
              <Card className="p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-medium text-secondary-700">
                      {property.ambassadorId ? 'PB' : 'LI'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {property.ambassadorId ? 'Pierre Bernard' : 'Équipe LoopImmo'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {property.ambassadorId ? 'Looper du quartier' : 'Support dédié'}
                    </p>
                    {property.ambassadorId && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-sm text-gray-600">(23 avis)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button 
                    className="w-full"
                    onClick={() => setShowContactForm(!showContactForm)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contacter
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                </div>

                {showContactForm && (
                  <div className="border-t pt-4 mb-4">
                    <textarea
                      placeholder="Bonjour, je suis intéressé(e) par ce bien..."
                      className="w-full p-3 border rounded-lg resize-none h-24 text-sm"
                    />
                    <Button size="sm" className="w-full mt-2">Envoyer</Button>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Planifier une visite</h4>
                  <div className="space-y-2">
                    {property.availableVisitSlots?.slice(0, 3).map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedVisitSlot(slot.id)}
                        className={cn(
                          "w-full p-3 rounded-lg border text-left transition-colors",
                          selectedVisitSlot === slot.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <p className="font-medium text-sm">
                          {new Date(slot.date).toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </button>
                    ))}
                  </div>
                  {selectedVisitSlot && (
                    <Button className="w-full mt-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      Réserver ce créneau
                    </Button>
                  )}
                  <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 mt-3">
                    Voir plus de créneaux
                  </button>
                </div>

                {/* Trust badges */}
                <div className="border-t pt-4 mt-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Transaction sécurisée</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span>Prix négociable</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span>Accompagnement complet</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Biens similaires</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {similarProperties.map((prop) => (
                  <Card 
                    key={prop.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/bien/${prop.id}`)}
                  >
                    <div className="relative h-48">
                      <img 
                        src={prop.photos[0]} 
                        alt={prop.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-sm font-medium">
                        {prop.price.toLocaleString('fr-FR')}€
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{prop.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{prop.location.city}</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{prop.surface}m²</span>
                        <span>{prop.rooms} pièces</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
