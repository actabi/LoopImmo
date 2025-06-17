export const qualificationLeads = [
  {
    id: '1',
    name: 'Jean Martin',
    email: 'jean.martin@email.com',
    phone: '06 12 34 56 78',
    propertyInterest: {
      id: 'REF-2024-001',
      title: 'Appartement T3 - Lyon 6\u00e8me',
      price: 450000,
      location: 'Lyon 6\u00e8me'
    },
    budget: { min: 400000, max: 500000 },
    financing: {
      type: 'loan',
      loanAmount: 360000,
      downPayment: 90000,
      preApproved: true,
      bank: 'Cr\u00e9dit Agricole'
    },
    documents: {
      identity: true,
      incomeProof: true,
      loanSimulation: true,
      downPaymentProof: false
    },
    score: 85,
    status: 'pending',
    createdAt: new Date('2024-01-15T10:00:00')
  },
  {
    id: '2',
    name: 'Sophie Bernard',
    email: 'sophie.bernard@email.com',
    phone: '06 98 76 54 32',
    propertyInterest: {
      id: 'REF-2024-003',
      title: 'Maison 5 pi\u00e8ces - \u00c9cully',
      price: 680000,
      location: '\u00c9cully'
    },
    budget: { min: 600000, max: 700000 },
    financing: {
      type: 'mixed',
      loanAmount: 400000,
      downPayment: 280000,
      preApproved: false
    },
    documents: {
      identity: true,
      incomeProof: false,
      loanSimulation: false,
      downPaymentProof: true
    },
    score: 65,
    status: 'pending',
    createdAt: new Date('2024-01-15T11:00:00')
  }
];
