import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Users } from 'lucide-react';
import { Button } from '../ui/Button';

export const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à révolutionner votre vente ?
          </h2>
          <p className="text-xl mb-12 text-primary-100 max-w-2xl mx-auto">
            Rejoignez des milliers de vendeurs qui ont déjà économisé grâce à LoopImmo
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/vendre">
              <Button size="lg" variant="secondary" className="group">
                <Home className="w-5 h-5 mr-2" />
                Je vends mon bien
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/ambassadeur">
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary-700">
                <Users className="w-5 h-5 mr-2" />
                Devenir ambassadeur
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">90%</p>
              <p className="text-primary-100">d'économies en moyenne</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">3</p>
              <p className="text-primary-100">semaines pour vendre</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">1000+</p>
              <p className="text-primary-100">ambassadeurs actifs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
