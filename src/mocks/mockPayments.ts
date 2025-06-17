export const mockPayments = [
  {
    id: '1',
    propertyId: '1',
    type: 'fee',
    description: 'Forfait LoopImmo - Acompte',
    amount: 2495,
    status: 'completed',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    method: 'Carte bancaire',
    invoice: 'INV-2024-001'
  },
  {
    id: '2',
    propertyId: '1',
    type: 'boost',
    description: 'Boost Premium - 14 jours',
    amount: 99,
    status: 'completed',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    method: 'Prélèvement SEPA',
    invoice: 'INV-2024-002'
  },
  {
    id: '3',
    propertyId: '2',
    type: 'fee',
    description: 'Forfait LoopImmo - Acompte',
    amount: 2495,
    status: 'completed',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    method: 'Carte bancaire',
    invoice: 'INV-2024-003'
  },
  {
    id: '4',
    propertyId: '1',
    type: 'fee',
    description: 'Forfait LoopImmo - Solde à la vente',
    amount: 2495,
    status: 'scheduled',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45)
  },
  {
    id: '5',
    propertyId: '3',
    type: 'service',
    description: 'Photos professionnelles HD',
    amount: 149,
    status: 'pending',
    date: new Date(),
    method: 'En attente'
  }
];
