export const mockDashboardCommissions = [
  {
    id: '1',
    propertyTitle: 'Appartement T4 - Lyon 6e',
    sellerName: 'Jean Dupont',
    salePrice: 380000,
    commission: 2400,
    status: 'paid',
    saleDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    paymentDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
  },
  {
    id: '2',
    propertyTitle: 'Maison 5 pièces - Villeurbanne',
    sellerName: 'Claire Bernard',
    salePrice: 520000,
    commission: 2400,
    status: 'validated',
    saleDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
  },
  {
    id: '3',
    propertyTitle: 'Studio - Lyon 2e',
    sellerName: 'Pierre Martin',
    salePrice: 185000,
    commission: 2400,
    status: 'pending',
    saleDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
  }
];
