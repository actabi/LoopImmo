export const mockLeads = [
  {
    id: '1',
    name: 'Sophie Martin',
    type: 'seller',
    status: 'new',
    value: 450000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    property: 'Maison 5 pièces',
    phone: '06 12 34 56 78',
    email: 'sophie.martin@email.com',
    notes: 'Souhaite vendre rapidement, déménagement professionnel'
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    type: 'buyer',
    status: 'contacted',
    value: 320000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    property: 'Recherche T3/T4',
    phone: '06 23 45 67 89',
    email: 'thomas.dubois@email.com'
  },
  {
    id: '3',
    name: 'Marie Leroy',
    type: 'seller',
    status: 'qualified',
    value: 280000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    property: 'Appartement T3',
    phone: '06 34 56 78 90',
    email: 'marie.leroy@email.com'
  }
];
