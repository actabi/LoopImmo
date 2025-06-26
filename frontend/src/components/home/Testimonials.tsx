import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Vendeuse à Lyon",
      content: "J'ai économisé 12 000€ sur la vente de mon appartement. Le processus était simple et l'équipe très réactive.",
      rating: 5,
      savings: "12 000€ économisés",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Thomas Martin",
      role: "Looper à Paris",
      content: "En tant qu'looper, j'ai gagné 2 500€ en 3 mois en aidant mes voisins à vendre. C'est gratifiant et rémunérateur!",
      rating: 5,
      earnings: "2 500€ gagnés",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Sophie Bernard",
      role: "Vendeuse à Bordeaux",
      content: "Mon voisin m'a aidée pour les visites et a touché une prime. C'est gagnant-gagnant! Vendu en 3 semaines.",
      rating: 5,
      time: "Vendu en 3 semaines",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ils ont choisi LoopImmo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de nos vendeurs et loopers satisfaits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-8 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200" />
              
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>

              {testimonial.savings && (
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.savings}
                </span>
              )}
              {testimonial.earnings && (
                <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.earnings}
                </span>
              )}
              {testimonial.time && (
                <span className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.time}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
