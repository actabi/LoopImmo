export const mockManagedProperties = [
  {
    id: '1',
    title: 'Appartement 3 pièces lumineux',
    address: '15 rue de la Paix, Lyon 7e',
    price: 320000,
    surface: 65,
    rooms: 3,
    status: 'active',
    owner: {
      name: 'Marie Dubois',
      phone: '06 12 34 56 78',
      email: 'marie.dubois@email.com',
      connected: true
    },
    photos: 12,
    visits: {
      scheduled: 3,
      completed: 5
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: '2',
    title: 'Studio moderne centre-ville',
    address: '8 place Bellecour, Lyon 2e',
    price: 185000,
    surface: 28,
    rooms: 1,
    status: 'draft',
    owner: {
      name: 'Pierre Martin',
      phone: '06 23 45 67 89',
      email: 'pierre.martin@email.com',
      connected: false
    },
    photos: 0,
    visits: {
      scheduled: 0,
      completed: 0
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  }
];
