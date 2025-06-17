export const mockTimelines = [
  {
    propertyId: '1',
    steps: [
      {
        id: '1',
        type: 'mandate',
        title: 'Mandat de vente signé',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        status: 'completed',
        description: 'Mandat exclusif LoopImmo signé pour 3 mois'
      },
      {
        id: '2',
        type: 'visit',
        title: 'Premières visites',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25),
        status: 'completed',
        description: '12 visites organisées'
      },
      {
        id: '3',
        type: 'offer',
        title: 'Offre reçue',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        status: 'completed',
        description: 'Offre de Marie Dubois à 315 000€'
      },
      {
        id: '4',
        type: 'promise',
        title: 'Promesse de vente',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: 'current',
        description: 'En attente de votre signature'
      },
      {
        id: '5',
        type: 'sale',
        title: 'Acte de vente',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
        status: 'pending',
        description: 'Signature prévue chez le notaire'
      }
    ]
  },
  {
    propertyId: '2',
    steps: [
      {
        id: '6',
        type: 'mandate',
        title: 'Mandat de vente signé',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
        status: 'completed',
        description: 'Mandat exclusif LoopImmo signé pour 3 mois'
      },
      {
        id: '7',
        type: 'visit',
        title: 'Visites en cours',
        date: new Date(Date.now()),
        status: 'current',
        description: '8 visites organisées, 3 à venir'
      }
    ]
  }
];
