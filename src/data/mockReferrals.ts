import { AmbassadorReferral } from '../types';

export const mockReferrals: AmbassadorReferral[] = [
  {
    id: 'ref1',
    propertyId: '1',
    propertyTitle: 'Appartement lumineux avec vue sur parc',
    referringAmbassadorId: 'amb1',
    referringAmbassadorName: 'Sophie Martin',
    receivingAmbassadorId: 'amb1',
    sellerId: '1',
    buyerId: 'b1',
    buyerName: 'Thomas Lefevre',
    buyerContact: '06 45 67 89 01',
    buyerEmail: 'thomas.lefevre@email.com',
    status: 'pending',
    type: 'buyer_lead',
    message: "J'ai un client sérieux intéressé par ce bien. Budget validé à 330k€, prêt accordé.",
    commissionSplit: {
      referring: 50,
      receiving: 50
    },
    potentialCommission: 600, // Based on property tier
    createdAt: new Date('2024-03-10T10:00:00'),
    notes: 'Client primo-accédant, recherche T3/T4 dans ce secteur depuis 3 mois'
  },
  {
    id: 'ref2',
    propertyId: '2',
    propertyTitle: 'Maison familiale avec jardin',
    referringAmbassadorId: 'amb1',
    referringAmbassadorName: 'Marc Dubois',
    receivingAmbassadorId: undefined, // Direct to seller
    sellerId: '1',
    buyerId: 'b2',
    buyerName: 'Famille Moreau',
    buyerContact: '06 56 78 90 12',
    buyerEmail: 'moreau.famille@email.com',
    status: 'accepted',
    type: 'buyer_lead',
    message: "Famille avec 3 enfants, vendent leur appartement actuel. Très motivés.",
    commissionSplit: {
      referring: 50,
      receiving: 50
    },
    potentialCommission: 600,
    createdAt: new Date('2024-03-08T14:30:00'),
    acceptedAt: new Date('2024-03-08T16:00:00')
  },
  {
    id: 'ref3',
    propertyId: '3',
    propertyTitle: 'Studio moderne centre-ville',
    referringAmbassadorId: 'amb1',
    referringAmbassadorName: 'Pierre Bernard',
    receivingAmbassadorId: 'amb1',
    sellerId: '1',
    buyerId: 'b3',
    buyerName: 'Julie Chen',
    buyerContact: '06 67 89 01 23',
    buyerEmail: 'julie.chen@email.com',
    status: 'converted',
    type: 'buyer_lead',
    message: "Investisseur cherchant du locatif. Cash disponible.",
    commissionSplit: {
      referring: 50,
      receiving: 50
    },
    potentialCommission: 250,
    createdAt: new Date('2024-02-20T09:00:00'),
    acceptedAt: new Date('2024-02-20T11:00:00'),
    convertedAt: new Date('2024-03-05T15:00:00'),
    notes: 'Offre acceptée à 142k€, signature prévue le 15/03'
  }
];

export const mockTerritoryProperties = [
  {
    id: '10',
    title: 'T3 rénové proche métro',
    price: 295000,
    location: 'Lyon 3ème',
    surface: 68,
    rooms: 3,
    managedBy: 'Sophie Martin',
    ambassadorId: 'amb1',
    allowsReferrals: true,
    photo: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=400'
  },
  {
    id: '11',
    title: 'Appartement familial avec balcon',
    price: 340000,
    location: 'Lyon 3ème',
    surface: 85,
    rooms: 4,
    managedBy: 'Vendeur direct',
    ambassadorId: null,
    allowsReferrals: true,
    photo: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?w=400'
  },
  {
    id: '12',
    title: 'Studio investisseur',
    price: 125000,
    location: 'Lyon 3ème',
    surface: 25,
    rooms: 1,
    managedBy: 'Marc Dubois',
    ambassadorId: 'amb1',
    allowsReferrals: false,
    photo: 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?w=400'
  }
];
