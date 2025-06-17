import { ServiceProvider, ServiceProposal, Subscription, SubscriptionFeature } from '../types';

export const mockServiceProviders: ServiceProvider[] = [
  // Photographers
  {
    id: 'sp1',
    name: 'Studio Photo Pro',
    type: 'photographer',
    description: 'Spécialiste de la photographie immobilière avec drone',
    rating: 4.8,
    reviewCount: 127,
    price: 150,
    priceUnit: 'fixed',
    availability: 'within_24h',
    specialties: ['Drone', 'Visite virtuelle 360°', 'HDR'],
    certifications: ['Certifié drone DGAC', 'Google Street View Trusted'],
    location: 'Paris 15e',
    distance: '2.3 km',
    portfolio: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'
    ],
    verified: true
  },
  {
    id: 'sp2',
    name: 'Marie Photographie',
    type: 'photographer',
    description: 'Photographe indépendante, mise en valeur de vos espaces',
    rating: 4.6,
    reviewCount: 89,
    price: 120,
    priceUnit: 'fixed',
    availability: 'immediate',
    specialties: ['Intérieurs', 'Jardins', 'Twilight'],
    certifications: [],
    location: 'Paris 14e',
    distance: '1.1 km',
    verified: true
  },

  // Diagnosticians
  {
    id: 'sp3',
    name: 'Diagimmo Expert',
    type: 'diagnostician',
    description: 'Tous diagnostics immobiliers obligatoires',
    rating: 4.9,
    reviewCount: 234,
    price: 450,
    priceUnit: 'fixed',
    availability: 'within_week',
    specialties: ['DPE', 'Amiante', 'Plomb', 'Termites', 'Électricité', 'Gaz'],
    certifications: ['Certifié COFRAC', 'Assurance RC Pro'],
    location: 'Paris',
    distance: '5.2 km',
    verified: true
  },
  {
    id: 'sp4',
    name: 'Contrôle Habitat',
    type: 'diagnostician',
    description: 'Diagnostics rapides et précis',
    rating: 4.7,
    reviewCount: 156,
    price: 380,
    priceUnit: 'fixed',
    availability: 'within_24h',
    specialties: ['DPE', 'Électricité', 'Gaz', 'Carrez'],
    certifications: ['Certifié Bureau Veritas'],
    location: 'Boulogne-Billancourt',
    distance: '3.8 km',
    verified: true
  },

  // Home Stagers
  {
    id: 'sp5',
    name: 'Home Sweet Home Staging',
    type: 'home_stager',
    description: 'Valorisation et mise en scène de votre bien',
    rating: 4.9,
    reviewCount: 67,
    price: 80,
    priceUnit: 'hourly',
    availability: 'within_week',
    specialties: ['Staging complet', 'Conseil déco', 'Location mobilier'],
    certifications: ['Certifié FFHS'],
    location: 'Paris Ouest',
    distance: '4.5 km',
    verified: true
  },
  {
    id: 'sp6',
    name: 'Virtual Staging 3D',
    type: 'home_stager',
    description: 'Home staging virtuel par modélisation 3D',
    rating: 4.5,
    reviewCount: 43,
    price: 50,
    priceUnit: 'fixed',
    availability: 'immediate',
    specialties: ['Staging virtuel', 'Modélisation 3D', 'Retouche photo'],
    certifications: [],
    location: 'En ligne',
    verified: true
  },

  // Financial Advisors
  {
    id: 'sp7',
    name: 'Crédit Expert Conseil',
    type: 'financial_advisor',
    description: 'Courtier en prêt immobilier, négociation des meilleurs taux',
    rating: 4.8,
    reviewCount: 312,
    price: 0.1,
    priceUnit: 'percentage',
    availability: 'immediate',
    specialties: ['Prêt immobilier', 'Rachat crédit', 'Investissement locatif'],
    certifications: ['ORIAS', 'CIF'],
    location: 'Paris',
    distance: '2.1 km',
    verified: true
  },
  {
    id: 'sp8',
    name: 'Finance Plus',
    type: 'financial_advisor',
    description: 'Solutions de financement sur mesure',
    rating: 4.6,
    reviewCount: 189,
    price: 0.15,
    priceUnit: 'percentage',
    availability: 'within_24h',
    specialties: ['Primo-accédants', 'PTZ', 'Prêt relais'],
    certifications: ['IOBSP'],
    location: 'Levallois-Perret',
    distance: '6.3 km',
    verified: true
  },

  // Notaries
  {
    id: 'sp9',
    name: 'Maître Dupont & Associés',
    type: 'notary',
    description: 'Étude notariale spécialisée en transactions immobilières',
    rating: 4.9,
    reviewCount: 456,
    price: 500,
    priceUnit: 'fixed',
    availability: 'within_week',
    specialties: ['Vente', 'Succession', 'Donation'],
    certifications: ['Notaire de France'],
    location: 'Paris 8e',
    distance: '3.2 km',
    verified: true
  },

  // Lawyers
  {
    id: 'sp10',
    name: 'Cabinet Juridique Immo',
    type: 'lawyer',
    description: 'Avocat spécialisé en droit immobilier',
    rating: 4.7,
    reviewCount: 98,
    price: 150,
    priceUnit: 'hourly',
    availability: 'within_24h',
    specialties: ['Litiges', 'Copropriété', 'Urbanisme'],
    certifications: ['Barreau de Paris'],
    location: 'Paris 16e',
    distance: '4.8 km',
    verified: true
  },

  // Contractors
  {
    id: 'sp11',
    name: 'Rénovation Express',
    type: 'contractor',
    description: 'Travaux de rénovation et mise aux normes',
    rating: 4.6,
    reviewCount: 178,
    price: 50,
    priceUnit: 'hourly',
    availability: 'within_week',
    specialties: ['Peinture', 'Électricité', 'Plomberie', 'Menuiserie'],
    certifications: ['RGE', 'Qualibat'],
    location: 'Paris et banlieue',
    distance: '5.5 km',
    verified: true
  }
];

export const mockServiceProposals: ServiceProposal[] = [
  {
    id: 'prop1',
    propertyId: '1',
    providerId: 'sp1',
    provider: mockServiceProviders[0],
    status: 'pending',
    proposedDate: new Date('2024-01-20T10:00:00'),
    message: 'Je peux intervenir dès demain pour les photos avec drone inclus',
    createdAt: new Date('2024-01-18T14:30:00')
  },
  {
    id: 'prop2',
    propertyId: '1',
    providerId: 'sp3',
    provider: mockServiceProviders[2],
    status: 'accepted',
    proposedDate: new Date('2024-01-25T14:00:00'),
    customPrice: 420,
    message: 'Tarif préférentiel pour client LoopImmo',
    createdAt: new Date('2024-01-17T09:15:00')
  }
];

export const subscriptionFeatures: SubscriptionFeature[] = [
  // Search features
  {
    id: 'f1',
    name: 'Alertes personnalisées illimitées',
    description: 'Créez autant d\'alertes que vous souhaitez pour ne rater aucune opportunité',
    plans: ['premium', 'platinum'],
    category: 'search'
  },
  {
    id: 'f2',
    name: 'Recherche avancée par critères',
    description: 'Accès à tous les filtres de recherche (exposition, étage, année construction...)',
    plans: ['premium', 'platinum'],
    category: 'search'
  },
  {
    id: 'f3',
    name: 'Historique des prix',
    description: 'Consultez l\'évolution des prix sur les 5 dernières années',
    plans: ['platinum'],
    category: 'search'
  },

  // Support features
  {
    id: 'f4',
    name: 'Support prioritaire 7j/7',
    description: 'Assistance dédiée par téléphone et chat',
    plans: ['premium', 'platinum'],
    category: 'support'
  },
  {
    id: 'f5',
    name: 'Conseiller dédié',
    description: 'Un expert immobilier attitré pour vous accompagner',
    plans: ['platinum'],
    category: 'support'
  },
  {
    id: 'f6',
    name: 'Aide à la négociation',
    description: 'Conseils personnalisés pour optimiser votre négociation',
    plans: ['premium', 'platinum'],
    category: 'support'
  },

  // Analytics features
  {
    id: 'f7',
    name: 'Analyses de marché détaillées',
    description: 'Rapports complets sur les tendances de votre secteur',
    plans: ['premium', 'platinum'],
    category: 'analytics'
  },
  {
    id: 'f8',
    name: 'Comparateur de biens avancé',
    description: 'Comparez jusqu\'à 10 biens simultanément',
    plans: ['platinum'],
    category: 'analytics'
  },
  {
    id: 'f9',
    name: 'Prévisions de prix IA',
    description: 'Estimations futures basées sur l\'intelligence artificielle',
    plans: ['platinum'],
    category: 'analytics'
  },

  // Priority features
  {
    id: 'f10',
    name: 'Visites prioritaires',
    description: 'Accès en avant-première aux nouveaux biens',
    plans: ['premium', 'platinum'],
    category: 'priority'
  },
  {
    id: 'f11',
    name: 'Mise en relation directe vendeur',
    description: 'Contactez directement les vendeurs sans intermédiaire',
    plans: ['platinum'],
    category: 'priority'
  },

  // Tools features
  {
    id: 'f12',
    name: 'Simulateur de prêt avancé',
    description: 'Calculs précis avec tous les frais inclus',
    plans: ['basic', 'premium', 'platinum'],
    category: 'tools'
  },
  {
    id: 'f13',
    name: 'Générateur de dossier',
    description: 'Créez un dossier complet en PDF pour vos visites',
    plans: ['premium', 'platinum'],
    category: 'tools'
  },
  {
    id: 'f14',
    name: 'Checklist personnalisée',
    description: 'Guide étape par étape adapté à votre projet',
    plans: ['premium', 'platinum'],
    category: 'tools'
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub1',
    userId: '1',
    plan: 'premium',
    status: 'active',
    startDate: new Date('2024-01-01'),
    features: ['f1', 'f2', 'f4', 'f6', 'f7', 'f10', 'f12', 'f13', 'f14'],
    price: 29,
    billingCycle: 'monthly'
  }
];

export const subscriptionPlans = {
  buyer: [
    {
      id: 'basic',
      name: 'Essentiel',
      price: 0,
      billingCycle: 'monthly',
      description: 'Pour commencer votre recherche',
      features: [
        '5 alertes de recherche',
        'Simulateur de prêt basique',
        'Support par email'
      ],
      highlighted: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29,
      billingCycle: 'monthly',
      description: 'Pour les acheteurs sérieux',
      features: [
        'Alertes illimitées',
        'Support prioritaire 7j/7',
        'Analyses de marché',
        'Aide à la négociation',
        'Visites prioritaires',
        'Générateur de dossier PDF'
      ],
      highlighted: true,
      badge: 'Plus populaire'
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: 79,
      billingCycle: 'monthly',
      description: 'L\'accompagnement complet',
      features: [
        'Tout Premium +',
        'Conseiller dédié',
        'Historique des prix',
        'Comparateur avancé',
        'Prévisions IA',
        'Contact direct vendeur'
      ],
      highlighted: false
    }
  ],
  seller: [
    {
      id: 'basic',
      name: 'Autonome',
      price: 0,
      billingCycle: 'one-time',
      description: 'Gérez votre vente en toute autonomie',
      features: [
        'Publication multi-sites',
        'Outils de base',
        'Support par email'
      ],
      highlighted: false
    },
    {
      id: 'premium',
      name: 'Accompagné',
      price: 199,
      billingCycle: 'one-time',
      description: 'Un coup de pouce pour votre vente',
      features: [
        'Shooting photo professionnel',
        'Rédaction optimisée IA+',
        'Boost visibilité 30 jours',
        'Support prioritaire',
        'Conseils personnalisés'
      ],
      highlighted: true,
      badge: 'Recommandé'
    },
    {
      id: 'platinum',
      name: 'Sérénité',
      price: 499,
      billingCycle: 'one-time',
      description: 'Vendez l\'esprit tranquille',
      features: [
        'Tout Accompagné +',
        'Home staging virtuel',
        'Visite virtuelle 360°',
        'Gestion complète visites',
        'Négociation assistée',
        'Garantie vente 6 mois*'
      ],
      highlighted: false
    }
  ]
};
