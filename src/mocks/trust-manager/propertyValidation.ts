export const pendingValidationProperties = [
  {
    id: '1',
    title: 'Appartement T3 - Lyon 6\u00e8me',
    reference: 'REF-2024-001',
    price: 450000,
    surface: 75,
    seller: 'Marie Dubois',
    submittedAt: new Date('2024-01-15T10:00:00'),
    priority: 'high'
  },
  {
    id: '2',
    title: 'Maison 5 pi\u00e8ces - \u00c9cully',
    reference: 'REF-2024-003',
    price: 680000,
    surface: 120,
    seller: 'Jean Martin',
    submittedAt: new Date('2024-01-15T09:00:00'),
    priority: 'normal'
  }
];

export const validationChecklistData = [
  {
    id: 'legal',
    label: 'Mentions l\u00e9gales obligatoires',
    status: 'valid',
    required: true,
    details: 'Surface Carrez, charges, taxe fonci\u00e8re'
  },
  {
    id: 'carrez',
    label: 'Surface Loi Carrez',
    status: 'valid',
    required: true,
    details: '75 m\u00b2 certifi\u00e9s'
  },
  {
    id: 'dpe',
    label: 'DPE (Diagnostic Performance \u00c9nerg\u00e9tique)',
    status: 'invalid',
    required: true,
    details: 'Document manquant ou expir\u00e9'
  },
  {
    id: 'charges',
    label: 'Montant des charges',
    status: 'valid',
    required: true,
    details: '250\u20ac/mois incluant chauffage'
  },
  {
    id: 'alur',
    label: 'Conformit\u00e9 Loi ALUR',
    status: 'pending',
    required: true,
    details: 'V\u00e9rification en cours'
  },
  {
    id: 'photos',
    label: 'Photos conformes',
    status: 'valid',
    required: true,
    details: '12 photos HD, toutes pi\u00e8ces repr\u00e9sent\u00e9es'
  },
  {
    id: 'description',
    label: 'Description compl\u00e8te',
    status: 'valid',
    required: true,
    details: 'Description d\u00e9taill\u00e9e et attractive'
  },
  {
    id: 'diagnostics',
    label: 'Diagnostics obligatoires',
    status: 'invalid',
    required: true,
    details: 'Amiante et plomb manquants'
  }
];

export const validationPropertyDetails = {
  type: 'Appartement',
  surface: 75,
  rooms: 3,
  bedrooms: 2,
  floor: 3,
  elevator: true,
  parking: true,
  heating: 'Collectif',
  construction: 1975,
  charges: 250,
  taxeFonciere: 1200,
  copropriete: {
    lots: 45,
    chargesAnnuelles: 3000,
    syndicName: 'Cabinet Immobilier Lyon'
  }
};
