import React from 'react';
import { FileText, Users, Camera, Handshake } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: "Créez votre annonce",
    description: "Remplissez le formulaire et notre IA génère une annonce professionnelle en 5 minutes",
    color: "bg-primary-100 text-primary-600"
  },
  {
    icon: Users,
    title: "Un looper vous accompagne",
    description: "Un expert local de votre quartier organise les visites et vous conseille",
    color: "bg-secondary-100 text-secondary-600"
  },
  {
    icon: Camera,
    title: "Photos professionnelles",
    description: "Shooting photo inclus pour mettre en valeur votre bien",
    color: "bg-accent-100 text-accent-600"
  },
  {
    icon: Handshake,
    title: "Signature sécurisée",
    description: "Accompagnement jusqu'à la signature chez le notaire",
    color: "bg-purple-100 text-purple-600"
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un processus simple et transparent en 4 étapes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200 -z-10">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-200 rounded-full"></div>
                </div>
              )}
              
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4 relative`}>
                  <step.icon className="w-10 h-10" />
                  <span className="absolute -top-2 -right-2 bg-white text-gray-900 text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
