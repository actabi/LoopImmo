export const qualityProperties = [
  {
    id: '1',
    title: 'Maison 5 pi\u00e8ces - \u00c9cully',
    reference: 'REF-2024-003',
    submittedBy: 'Jean Martin',
    submittedAt: new Date('2024-01-15T09:00:00'),
    totalItems: 18,
    pendingItems: 5
  },
  {
    id: '2',
    title: 'Appartement T2 - Lyon 3',
    reference: 'REF-2024-004',
    submittedBy: 'Sophie Bernard',
    submittedAt: new Date('2024-01-15T11:00:00'),
    totalItems: 12,
    pendingItems: 3
  }
];

export const qualityItemsData = [
  { id: 'photo-1', type: 'photo', name: 'Salon principal', status: 'approved', url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'photo-2', type: 'photo', name: 'Cuisine \u00e9quip\u00e9e', status: 'pending', url: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'photo-3', type: 'photo', name: 'Chambre principale', status: 'rejected', issues: ['Photo trop sombre', 'Pi\u00e8ce non rang\u00e9e'], url: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'photo-4', type: 'photo', name: 'Salle de bain', status: 'pending', url: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'photo-5', type: 'photo', name: 'Vue ext\u00e9rieure', status: 'approved', url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'diag-1', type: 'diagnostic', name: 'DPE - Diagnostic Performance \u00c9nerg\u00e9tique', status: 'approved', date: new Date('2023-12-15') },
  { id: 'diag-2', type: 'diagnostic', name: 'Diagnostic Amiante', status: 'pending', date: new Date('2023-11-20') },
  { id: 'diag-3', type: 'diagnostic', name: 'Diagnostic Plomb', status: 'rejected', issues: ['Document expir\u00e9', 'Signature manquante'], date: new Date('2020-06-10') },
  { id: 'diag-4', type: 'diagnostic', name: '\u00c9tat des risques et pollutions', status: 'pending', date: new Date('2024-01-10') }
];

export const photoGuidelines = [
  'Photos en haute r\u00e9solution (min. 1920x1080)',
  '\u00c9clairage naturel privil\u00e9gi\u00e9',
  'Pi\u00e8ces rang\u00e9es et propres',
  'Angles larges pour montrer l\u00b9espace',
  'Pas de personnes visibles',
  'Pas de reflets dans les miroirs',
  'Photos r\u00e9centes (moins de 3 mois)'
];

export const diagnosticRequirements = [
  'Documents dat\u00e9s de moins de 6 mois',
  'Signature et cachet du diagnostiqueur',
  'Num\u00e9ro de certification visible',
  'Toutes les pages du rapport',
  'Format PDF lisible',
  'Conformit\u00e9 aux normes en vigueur'
];
