export const notaryFilesData = [
  {
    id: '1',
    property: { title: 'Appartement T3 - Lyon 6\u00e8me', price: 450000, reference: 'REF-2024-001' },
    buyer: 'Jean Martin',
    seller: 'Marie Dubois',
    notary: {
      name: 'Me. Dupont',
      office: '\u00c9tude Dupont & Associ\u00e9s',
      email: 'contact@dupont-notaires.fr',
      phone: '04 78 12 34 56'
    },
    status: 'sent',
    dates: {
      compromis: new Date('2024-01-20'),
      acteDefinitif: new Date('2024-03-20'),
      created: new Date('2024-01-15'),
      lastUpdate: new Date('2024-01-16')
    },
    documents: [
      { name: 'Compromis sign\u00e9', status: 'validated', required: true, uploadedAt: new Date('2024-01-20') },
      { name: 'Pi\u00e8ces d\'identit\u00e9', status: 'validated', required: true, uploadedAt: new Date('2024-01-18') },
      { name: 'Titre de propri\u00e9t\u00e9', status: 'received', required: true, uploadedAt: new Date('2024-01-19') },
      { name: 'Diagnostics techniques', status: 'validated', required: true, uploadedAt: new Date('2024-01-17') },
      { name: '\u00c9tat hypoth\u00e9caire', status: 'pending', required: true },
      { name: 'Certificat d\'urbanisme', status: 'pending', required: false }
    ],
    fundingStatus: { totalAmount: 450000, received: 90000, distributed: false }
  },
  {
    id: '2',
    property: { title: 'Maison 5 pi\u00e8ces - \u00c9cully', price: 680000, reference: 'REF-2024-003' },
    buyer: 'Sophie Bernard',
    seller: 'Pierre Leroy',
    notary: {
      name: 'Me. Martin',
      office: 'SCP Martin & Partners',
      email: 'etude@martin-notaires.fr',
      phone: '04 78 98 76 54'
    },
    status: 'preparing',
    dates: {
      compromis: new Date('2024-01-22'),
      acteDefinitif: new Date('2024-04-15'),
      created: new Date('2024-01-16'),
      lastUpdate: new Date('2024-01-16')
    },
    documents: [
      { name: 'Compromis sign\u00e9', status: 'pending', required: true },
      { name: 'Pi\u00e8ces d\'identit\u00e9', status: 'received', required: true, uploadedAt: new Date('2024-01-16') },
      { name: 'Titre de propri\u00e9t\u00e9', status: 'pending', required: true },
      { name: 'Diagnostics techniques', status: 'pending', required: true },
      { name: '\u00c9tat hypoth\u00e9caire', status: 'pending', required: true },
      { name: 'Certificat d\'urbanisme', status: 'pending', required: false }
    ],
    fundingStatus: { totalAmount: 680000, received: 0, distributed: false }
  }
];
