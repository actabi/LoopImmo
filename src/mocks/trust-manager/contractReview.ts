export const reviewContracts = [
  {
    id: '1',
    type: 'compromis',
    property: {
      title: 'Appartement T3 - Lyon 6\u00e8me',
      price: 450000,
      reference: 'REF-2024-001'
    },
    buyer: { name: 'Jean Martin', email: 'jean.martin@email.com' },
    seller: { name: 'Marie Dubois', email: 'marie.dubois@email.com' },
    notary: { name: 'Me. Dupont', office: '\u00c9tude Dupont & Associ\u00e9s' },
    dates: { signature: new Date('2024-01-20'), completion: new Date('2024-03-20') },
    status: 'pending_review',
    clauses: [
      { id: '1', type: 'suspensive', title: 'Condition suspensive d\'obtention de pr\u00eat', content: 'L\'acqu\u00e9reur dispose d\'un d\u00e9lai de 45 jours pour obtenir un pr\u00eat de 360 000\u20ac au taux maximum de 4.5%', mandatory: true, verified: true },
      { id: '2', type: 'suspensive', title: 'Condition suspensive de vente du bien actuel', content: 'La vente est conditionn\u00e9e \u00e0 la vente du bien situ\u00e9 au 123 rue Example, Lyon', mandatory: false, verified: true },
      { id: '3', type: 'particular', title: 'Clause de non-concurrence', content: 'Le vendeur s\'engage \u00e0 ne pas exercer d\'activit\u00e9 commerciale similaire dans un rayon de 500m', mandatory: false, verified: false, issues: ['Clause inhabituelle pour un bien r\u00e9sidentiel', 'Dur\u00e9e non pr\u00e9cis\u00e9e'] },
      { id: '4', type: 'standard', title: 'Garantie des vices cach\u00e9s', content: 'Le vendeur garantit l\'acqu\u00e9reur contre les vices cach\u00e9s conform\u00e9ment aux articles 1641 et suivants du Code civil', mandatory: true, verified: true }
    ]
  },
  {
    id: '2',
    type: 'promesse',
    property: {
      title: 'Maison 5 pi\u00e8ces - \u00c9cully',
      price: 680000,
      reference: 'REF-2024-003'
    },
    buyer: { name: 'Sophie Bernard', email: 'sophie.bernard@email.com' },
    seller: { name: 'Pierre Leroy', email: 'pierre.leroy@email.com' },
    notary: { name: 'Me. Martin', office: 'SCP Martin & Partners' },
    dates: { signature: new Date('2024-01-22'), completion: new Date('2024-04-15') },
    status: 'draft',
    clauses: []
  }
];

export const mandatoryClausesList = [
  'Condition suspensive d\'obtention de pr\u00eat',
  'Garantie des vices cach\u00e9s',
  'Servitudes et charges',
  '\u00c9tat hypoth\u00e9caire',
  'Diagnostics techniques obligatoires',
  'Surface Loi Carrez',
  'D\u00e9lai de r\u00e9tractation'
];
