import React from 'react';
import { MapPin, Coffee, School, ShoppingBag, Trees, Heart } from 'lucide-react';

const stories = [
  {
    name: "Marie & Pierre",
    location: "Lyon 6ème",
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800",
    story: "Après 15 ans dans ce quartier, nous connaissons chaque recoin. Le marché du dimanche, le meilleur boulanger, l'école extraordinaire... C'est tout ça que nous partageons avec les futurs acheteurs.",
    highlights: ["Marché dominical", "École Montessori", "Parc de la Tête d'Or"],
    role: "Vendeurs-Ambassadeurs"
  },
  {
    name: "Julien",
    location: "Bordeaux Chartrons",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    story: "Mon voisin vendait son appartement. J'ai parlé du quartier à des amis qui cherchaient. Aujourd'hui, ils sont mes nouveaux voisins et j'ai gagné 1 800€ !",
    highlights: ["Quais animés", "Commerces de proximité", "Vie culturelle"],
    role: "Voisin-Ambassadeur"
  },
  {
    name: "Sophie",
    location: "Nantes Île de Nantes",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800",
    story: "En vendant mon loft, j'ai réalisé que je ne vendais pas des murs mais un mode de vie. Les Machines de l'île, les restos sur les quais, l'ambiance créative... Mes ambassadeurs l'ont parfaitement transmis.",
    highlights: ["Quartier créatif", "Machines de l'île", "Restaurants tendance"],
    role: "Vendeuse"
  }
];

export const NeighborhoodLife: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary-100 rounded-full px-4 py-2 mb-4">
            <MapPin className="w-5 h-5 text-secondary-600" />
            <span className="text-sm font-medium text-secondary-700">Vendez une vie de quartier</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ce n'est pas un bien, c'est une <span className="text-secondary-500">histoire</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vos ambassadeurs ne vendent pas des mètres carrés, ils partagent les petits bonheurs du quotidien, 
            les adresses secrètes, l'âme de votre quartier.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="group">
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.location}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        index === 0 ? '1534528741775-53994a69daeb' : 
                        index === 1 ? '1507003211169-0a1dd7228f2d' : 
                        '1494790108377-be9c29b29330'
                      }?w=100&h=100&fit=crop`}
                      alt={story.name}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div>
                      <h3 className="font-semibold">{story.name}</h3>
                      <p className="text-sm opacity-90">{story.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-3 opacity-95 italic">"{story.story}"</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{story.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {story.highlights.map((highlight, i) => (
                      <span key={i} className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Les petits plus qui font la différence
              </h3>
              <p className="text-gray-700 mb-6">
                Ce sont ces détails que seuls les habitants connaissent qui font craquer les acheteurs. 
                Avec LoopImmo, chaque ambassadeur devient le meilleur commercial de votre bien.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Coffee className="w-8 h-8 text-secondary-500" />
                  <span className="text-sm font-medium">Le meilleur café</span>
                </div>
                <div className="flex items-center gap-3">
                  <School className="w-8 h-8 text-primary-500" />
                  <span className="text-sm font-medium">Les écoles réputées</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-8 h-8 text-accent-500" />
                  <span className="text-sm font-medium">Les commerces locaux</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trees className="w-8 h-8 text-green-500" />
                  <span className="text-sm font-medium">Les espaces verts</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-xl">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-center text-lg font-semibold text-gray-900 mb-2">
                  "On ne vend pas une maison, on transmet un mode de vie"
                </p>
                <p className="text-center text-sm text-gray-600">
                  La philosophie LoopImmo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
