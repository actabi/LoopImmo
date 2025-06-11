import { Property, User, Visit, Offer, Ambassador } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Appartement T3 - Lyon 6ème',
    description: 'Magnifique appartement T3 de 75m² situé au cœur du 6ème arrondissement de Lyon. Entièrement rénové avec des matériaux de qualité, cet appartement offre un cadre de vie exceptionnel avec ses grandes fenêtres et sa luminosité naturelle tout au long de la journée.',
    price: 320000,
    surface: 75,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    type: 'apartment',
    location: {
      address: '45 rue Vendôme',
      city: 'Lyon',
      postalCode: '69006',
      lat: 45.7640,
      lng: 4.8357
    },
    features: [
      'Balcon',
      'Cave',
      'Parking',
      'Double vitrage',
      'Chauffage individuel',
      'Ascenseur',
      'Fibre optique',
      'Proximité transports'
    ],
    photos: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    energyClass: 'C',
    ghgClass: 'D',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sellerId: '1',
    ambassadorId: 'amb1',
    views: 456,
    favorites: 18,
    tier: {
      name: 'Essential',
      min: 150001,
      max: 300000,
      fee: 4000,
      color: 'bg-indigo-500'
    },
    availableVisitSlots: [
      {
        id: 'slot1',
        date: new Date('2024-02-20'),
        startTime: '10:00',
        endTime: '11:00',
        available: true
      },
      {
        id: 'slot2',
        date: new Date('2024-02-21'),
        startTime: '14:00',
        endTime: '15:00',
        available: true
      }
    ]
  },
  {
    id: '2',
    title: 'Maison 5 pièces - Écully',
    description: 'Belle maison familiale de 120m² avec jardin de 300m² dans un quartier calme d\'Écully. Idéale pour une famille, elle dispose de 4 chambres, 2 salles de bain et un grand séjour lumineux donnant sur le jardin.',
    price: 650000,
    surface: 120,
    rooms: 5,
    bedrooms: 4,
    bathrooms: 2,
    type: 'house',
    location: {
      address: '12 rue des Fleurs',
      city: 'Écully',
      postalCode: '69130',
      lat: 45.7719,
      lng: 4.8901
    },
    features: [
      'Jardin',
      'Garage',
      'Cave',
      'Terrasse',
      'Cheminée',
      'Cuisine équipée',
      'Dressing',
      'Alarme'
    ],
    photos: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    energyClass: 'D',
    ghgClass: 'E',
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    sellerId: '1',
    ambassadorId: 'amb2',
    views: 623,
    favorites: 24,
    tier: {
      name: 'Elite',
      min: 500001,
      max: 800000,
      fee: 8000,
      color: 'bg-pink-500'
    },
    availableVisitSlots: [
      {
        id: 'slot4',
        date: new Date('2024-02-20'),
        startTime: '11:00',
        endTime: '12:00',
        available: true
      }
    ]
  },
  {
    id: '3',
    title: 'Studio - Lyon 3ème',
    description: 'Studio entièrement rénové de 28m² en plein cœur du 3ème arrondissement. Parfait pour un investissement locatif ou un premier achat. Proche de toutes commodités et transports.',
    price: 190000,
    surface: 28,
    rooms: 1,
    bedrooms: 0,
    bathrooms: 1,
    type: 'studio',
    location: {
      address: '8 place Guichard',
      city: 'Lyon',
      postalCode: '69003',
      lat: 45.7578,
      lng: 4.8320
    },
    features: [
      'Meublé',
      'Cuisine équipée',
      'Double vitrage',
      'Digicode',
      'Fibre optique',
      'Proximité métro'
    ],
    photos: [
      'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    energyClass: 'B',
    ghgClass: 'B',
    status: 'active',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    sellerId: '1',
    views: 168,
    favorites: 12,
    tier: {
      name: 'Essential',
      min: 150001,
      max: 300000,
      fee: 4000,
      color: 'bg-indigo-500'
    },
    availableVisitSlots: [
      {
        id: 'slot6',
        date: new Date('2024-02-21'),
        startTime: '12:00',
        endTime: '13:00',
        available: true
      }
    ]
  },
  {
    id: '4',
    title: 'T2 avec terrasse - Lyon 7ème',
    description: 'Charmant T2 de 52m² avec terrasse de 15m² dans le quartier dynamique de la Guillotière. Appartement lumineux au 3ème étage avec ascenseur.',
    price: 280000,
    surface: 52,
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    type: 'apartment',
    location: {
      address: '23 avenue Jean Jaurès',
      city: 'Lyon',
      postalCode: '69007',
      lat: 45.7485,
      lng: 4.8467
    },
    features: [
      'Terrasse',
      'Cave',
      'Double vitrage',
      'Ascenseur',
      'Proximité commerces'
    ],
    photos: [
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    energyClass: 'C',
    ghgClass: 'C',
    status: 'draft',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    sellerId: '1',
    views: 0,
    favorites: 0,
    tier: {
      name: 'Essential',
      min: 150001,
      max: 300000,
      fee: 4000,
      color: 'bg-indigo-500'
    },
    availableVisitSlots: []
  },
  {
    id: '5',
    title: 'Loft industriel - Villeurbanne',
    description: 'Superbe loft de 95m² dans ancienne usine réhabilitée. Hauteur sous plafond de 4m, grandes baies vitrées, style industriel conservé.',
    price: 420000,
    surface: 95,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    type: 'apartment',
    location: {
      address: '56 cours Émile Zola',
      city: 'Villeurbanne',
      postalCode: '69100',
      lat: 45.7669,
      lng: 4.8798
    },
    features: [
      'Loft',
      'Hauteur sous plafond',
      'Parking',
      'Cave',
      'Fibre optique'
    ],
    photos: [
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    energyClass: 'B',
    ghgClass: 'B',
    status: 'sold',
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2024-02-15'),
    sellerId: '1',
    views: 892,
    favorites: 67,
    tier: {
      name: 'Premium',
      min: 300001,
      max: 500000,
      fee: 6000,
      color: 'bg-purple-500'
    },
    availableVisitSlots: []
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'vendeur@test.com',
    firstName: 'Pierre',
    lastName: 'Dupont',
    roles: ['seller', 'ambassador'],
    phone: '0612345678',
    createdAt: new Date('2024-01-01'),
    properties: ['1', '2', '3', '4', '5']
  },
  {
    id: 'buyer1',
    email: 'acheteur@test.com',
    firstName: 'Marie',
    lastName: 'Martin',
    roles: ['buyer'],
    phone: '0687654321',
    createdAt: new Date('2024-01-05'),
    savedSearches: [],
    favoriteProperties: ['1', '3']
  },
  {
    id: 'amb1',
    email: 'ambassadeur@test.com',
    firstName: 'Jean',
    lastName: 'Bernard',
    roles: ['ambassador'],
    phone: '0698765432',
    createdAt: new Date('2023-12-01')
  },
  {
    id: 'amb2',
    email: 'ambassadeur2@test.com',
    firstName: 'Sophie',
    lastName: 'Martin',
    roles: ['ambassador'],
    phone: '0698765433',
    createdAt: new Date('2023-12-05')
  },
  {
    id: 'amb3',
    email: 'ambassadeur3@test.com',
    firstName: 'Pierre',
    lastName: 'Bernard',
    roles: ['ambassador'],
    phone: '0698765434',
    createdAt: new Date('2023-12-10')
  },
  {
    id: 'amb4',
    email: 'ambassadeur4@test.com',
    firstName: 'Marc',
    lastName: 'Dubois',
    roles: ['ambassador'],
    phone: '0698765435',
    createdAt: new Date('2023-12-15')
  },
  {
    id: 'amb5',
    email: 'ambassadeur5@test.com',
    firstName: 'Claire',
    lastName: 'Durand',
    roles: ['ambassador'],
    phone: '0698765436',
    createdAt: new Date('2023-12-20')
  }
];

export const mockAmbassadors: Ambassador[] = [
  {
    id: 'amb1',
    userId: 'amb1',
    zone: 'Lyon 6ème',
    commission: 0.3,
    totalSales: 8,
    totalEarnings: 19200,
    rating: 4.8,
    specialties: ['Appartements', 'Investissement locatif'],
    availability: 'Disponible 7j/7',
    bio: 'Ambassadeur passionné du 6ème arrondissement depuis 3 ans.',
    verifiedProperties: ['1'],
    completedVisits: 45,
    activeProperties: 3
  },
  {
    id: 'amb2',
    userId: 'amb2',
    zone: 'Lyon Ouest',
    commission: 0.25,
    totalSales: 5,
    totalEarnings: 12500,
    rating: 4.6,
    specialties: ['Maisons', 'Familles'],
    availability: 'Disponible en semaine',
    bio: 'Expert du secteur ouest lyonnais depuis 2 ans.',
    verifiedProperties: ['2'],
    completedVisits: 30,
    activeProperties: 2
  },
  {
    id: 'amb3',
    userId: 'amb3',
    zone: 'Lyon 3ème',
    commission: 0.3,
    totalSales: 10,
    totalEarnings: 30000,
    rating: 4.7,
    specialties: ['Studios', 'Investisseurs'],
    availability: 'Disponible 6j/7',
    bio: "Conseiller dynamique spécialisé dans l'est de Lyon.",
    verifiedProperties: [],
    completedVisits: 60,
    activeProperties: 4
  },
  {
    id: 'amb4',
    userId: 'amb4',
    zone: 'Lyon Métropole',
    commission: 0.28,
    totalSales: 12,
    totalEarnings: 48000,
    rating: 4.9,
    specialties: ['Tous types de biens'],
    availability: 'Disponible sur rendez-vous',
    bio: 'Ambassadeur historique avec un large réseau.',
    verifiedProperties: [],
    completedVisits: 70,
    activeProperties: 5
  },
  {
    id: 'amb5',
    userId: 'amb5',
    zone: 'Villeurbanne',
    commission: 0.27,
    totalSales: 6,
    totalEarnings: 15000,
    rating: 4.5,
    specialties: ['Biens étudiants', 'Petits budgets'],
    availability: 'Disponible le week-end',
    bio: 'Connaisseur du marché villeurbannais.',
    verifiedProperties: [],
    completedVisits: 20,
    activeProperties: 1
  }
];

export const PRICE_TIERS = [
  {
    name: 'Starter',
    min: 0,
    max: 150000,
    fee: 2500,
    color: 'bg-blue-500'
  },
  {
    name: 'Essential',
    min: 150001,
    max: 300000,
    fee: 4000,
    color: 'bg-indigo-500'
  },
  {
    name: 'Premium',
    min: 300001,
    max: 500000,
    fee: 6000,
    color: 'bg-purple-500'
  },
  {
    name: 'Elite',
    min: 500001,
    max: 800000,
    fee: 8000,
    color: 'bg-pink-500'
  },
  {
    name: 'Prestige',
    min: 800001,
    max: 1200000,
    fee: 10000,
    color: 'bg-orange-500'
  },
  {
    name: 'Luxury',
    min: 1200001,
    max: Infinity,
    fee: 12000,
    color: 'bg-red-500'
  }
];
