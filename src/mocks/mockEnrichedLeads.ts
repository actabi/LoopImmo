export const mockEnrichedLeads = [
  {
    id: 'L001',
    clientName: 'Marie Dubois',
    clientPhone: '06 12 34 56 78',
    clientEmail: 'marie.dubois@email.com',
    propertyType: 'apartment',
    budget: 280000,
    budgetMax: 300000,
    surface: 65,
    rooms: 3,
    location: 'Lyon 3ème',
    matchedProperty: {
      id: '1',
      title: 'T3 Lumineux - Montchat',
      price: 285000,
      address: '45 rue de la République, Lyon 3',
      matchScore: 92
    },
    status: 'new',
    urgency: 'immediate',
    timeline: 'Achat sous 2 mois',
    assignedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    financing: 'loan_approved',
    motivation: 'very_high',
    responseTime: 2,
    notes: 'Couple avec 2 enfants, recherche école à proximité',
    history: []
  },
  {
    id: 'L002',
    clientName: 'Jean Martin',
    clientPhone: '06 23 45 67 89',
    clientEmail: 'jean.martin@email.com',
    propertyType: 'apartment',
    budget: 350000,
    budgetMax: 380000,
    surface: 80,
    rooms: 4,
    location: 'Lyon 6ème',
    matchedProperty: {
      id: '2',
      title: 'T4 Standing - Foch',
      price: 365000,
      address: '12 avenue Foch, Lyon 6',
      matchScore: 88
    },
    status: 'contacted',
    urgency: 'high',
    timeline: 'Achat sous 3 mois',
    assignedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 4),
    nextAction: {
      type: 'visit',
      date: new Date(Date.now() + 1000 * 60 * 60 * 48)
    },
    financing: 'loan_approved',
    motivation: 'high',
    responseTime: 24,
    history: [
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 4),
        action: 'Premier appel',
        result: 'Intéressé, souhaite visiter ce weekend'
      }
    ]
  },
  {
    id: 'L003',
    clientName: 'Sophie Bernard',
    clientPhone: '06 34 56 78 90',
    clientEmail: 'sophie.bernard@email.com',
    propertyType: 'house',
    budget: 450000,
    budgetMax: 500000,
    surface: 120,
    rooms: 5,
    location: 'Caluire',
    matchedProperty: {
      id: '3',
      title: 'Maison familiale avec jardin',
      price: 475000,
      address: '23 rue des Lilas, Caluire',
      matchScore: 85
    },
    status: 'visit_scheduled',
    urgency: 'medium',
    timeline: 'Achat sous 6 mois',
    assignedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24),
    nextAction: {
      type: 'visit',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24)
    },
    financing: 'cash',
    motivation: 'medium',
    responseTime: 72,
    notes: 'Investisseur, recherche rentabilité',
    history: [
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 48),
        action: 'Premier contact SMS',
        result: 'Réponse positive'
      },
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
        action: 'Appel de qualification',
        result: 'Visite programmée samedi 14h'
      }
    ]
  }
];
