import React from 'react';
import { Star, Heart, Users, TrendingUp, Quote } from 'lucide-react';
import { Card } from '../ui/Card';

const testimonials = [
  {
    type: 'seller',
    name: "Claire Dubois",
    location: "Toulouse",
    avatar: "CD",
    content: "J'ai vendu ma maison grâce à mes voisins ! Ils connaissaient des acheteurs potentiels et ont parlé du quartier avec passion. Résultat : vendu en 2 semaines avec 12 000€ d'économies.",
    metric: "12 000€ économisés",
    rating: 5,
    highlight: "Vendu en 2 semaines"
  },
  {
    type: 'ambassador',
    name: "Marc Leroy",
    location: "Lille",
    avatar: "ML",
    content: "Je suis devenu ambassadeur pour aider mes voisins. J'ai déjà accompagné 3 ventes et gagné 5 400€ tout en rendant service à ma communauté. C'est gratifiant !",
    metric: "5 400€ gagnés",
    rating: 5,
    highlight: "3 ventes réussies"
  },
  {
    type: 'buyer',
    name: "Emma et Lucas",
    location: "Strasbourg",
    avatar: "EL",
    content: "L'ambassadeur nous a fait découvrir le quartier comme personne. On a eu des infos qu'aucune agence n'aurait pu nous donner. On a trouvé notre maison de rêve !",
    metric: "Achat réussi",
    rating: 5,
    highlight: "Quartier parfait trouvé"
  },
  {
    type: 'community',
    name: "Association Les Lilas",
    location: "Montpellier",
    avatar: "AL",
    content: "LoopImmo a dynamisé notre quartier ! Les voisins s'entraident pour les ventes, créant une vraie solidarité. C'est bien plus qu'une plateforme immobilière.",
    metric: "15 ventes dans le quartier",
    rating: 5,
    highlight: "Communauté renforcée"
  }
];

const typeConfig = {
  seller: { icon: TrendingUp, color: 'primary', label: 'Vendeur', bgColor: 'bg-primary-50', textColor: 'text-primary-700' },
  ambassador: { icon: Users, color: 'secondary', label: 'Ambassadeur', bgColor: 'bg-secondary-50', textColor: 'text-secondary-700' },
  buyer: { icon: Heart, color: 'accent', label: 'Acheteur', bgColor: 'bg-accent-50', textColor: 'text-accent-700' },
  community: { icon: Users, color: 'green', label: 'Communauté', bgColor: 'bg-green-50', textColor: 'text-green-700' }
};

export const CommunityTestimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            La communauté <span className="text-primary-500">témoigne</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment LoopImmo transforme des transactions en moments de vie partagés
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => {
            const config = typeConfig[testimonial.type as keyof typeof typeConfig];
            const Icon = config.icon;
            
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow bg-white">
                <div className="absolute top-0 right-0 opacity-10">
                  <Quote className="w-24 h-24 text-gray-400" />
                </div>
                
                <div className="relative p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-xl font-bold ${config.textColor}`}>{testimonial.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.location}</p>
                        </div>
                        <div className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                          <Icon className="w-3 h-3" />
                          {config.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>

                  <div className="flex items-center justify-between">
                    <div className={`${config.bgColor} rounded-lg px-3 py-2`}>
                      <p className={`text-sm font-semibold ${config.textColor}`}>
                        {testimonial.metric}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                      {testimonial.highlight}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">98%</p>
              <p className="text-sm text-gray-600">Satisfaction client</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary-600">4.9/5</p>
              <p className="text-sm text-gray-600">Note moyenne</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-4xl font-bold text-accent-600">+2000</p>
              <p className="text-sm text-gray-600">Ventes réussies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
