export const mockProposals = [
  {
    id: 'P001',
    title: 'Appartement T3 avec terrasse',
    type: 'apartment',
    price: 285000,
    surface: 72,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    address: '45 rue de la République',
    city: 'Lyon',
    postalCode: '69003',
    description: 'Bel appartement lumineux avec grande terrasse...',
    features: ['Terrasse', 'Parking', 'Cave'],
    photos: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=400'],
    owner: {
      name: 'Marie Dubois',
      phone: '06 12 34 56 78',
      email: 'marie.dubois@email.com',
      isRegistered: true,
      userId: 'U123'
    },
    status: 'pending_owner',
    ownerValidation: {
      status: 'pending'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    ambassadorId: 'A001',
    estimatedCommission: 600,
    marketAnalysis: {
      averagePrice: 290000,
      pricePosition: 'below',
      demandLevel: 'high',
      estimatedDaysToSell: 35
    }
  },
  {
    id: 'P002',
    title: 'Maison familiale avec jardin',
    type: 'house',
    price: 420000,
    surface: 120,
    rooms: 5,
    bedrooms: 4,
    bathrooms: 2,
    address: '12 chemin des Lilas',
    city: 'Caluire',
    postalCode: '69300',
    description: 'Grande maison familiale avec jardin arboré...',
    features: ['Jardin', 'Garage', 'Piscine'],
    photos: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=400'],
    owner: {
      name: 'Jean Martin',
      phone: '06 23 45 67 89',
      email: 'jean.martin@email.com',
      isRegistered: false
    },
    status: 'pending_staff',
    ownerValidation: {
      status: 'approved',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      comment: 'OK pour la mise en vente'
    },
    staffValidation: {
      status: 'pending'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    ambassadorId: 'A001',
    estimatedCommission: 800,
    marketAnalysis: {
      averagePrice: 410000,
      pricePosition: 'above',
      demandLevel: 'medium',
      estimatedDaysToSell: 60
    }
  }
];
