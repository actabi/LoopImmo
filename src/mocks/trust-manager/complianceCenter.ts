export const legalUpdatesData = [
  {
    id: 1,
    title: 'Mise \u00e0 jour Loi Climat et R\u00e9silience',
    date: new Date(2024, 0, 15),
    type: 'law',
    impact: 'high',
    summary: 'Interdiction de location des passoires thermiques (classe G) \u00e0 partir de 2025'
  },
  {
    id: 2,
    title: 'Nouvelle r\u00e9glementation DPE',
    date: new Date(2024, 0, 10),
    type: 'regulation',
    impact: 'medium',
    summary: 'Modification du calcul pour les petites surfaces'
  },
  {
    id: 3,
    title: '\u00c9volution des diagnostics amiante',
    date: new Date(2023, 11, 20),
    type: 'diagnostic',
    impact: 'low',
    summary: 'Extension de la liste des mat\u00e9riaux \u00e0 contr\u00f4ler'
  }
];

export const complianceChecklistData = [
  { category: 'Mentions obligatoires', items: [
      'Surface Carrez (si copropri\u00e9t\u00e9)',
      'DPE avec classes \u00e9nergie et GES',
      'Montant des charges de copropri\u00e9t\u00e9',
      'Nombre de lots dans la copropri\u00e9t\u00e9',
      'Proc\u00e9dures en cours (si applicable)',
      'Taxe fonci\u00e8re',
      'Zone de risques naturels'
    ]},
  { category: 'Diagnostics techniques', items: [
      'DPE (< 10 ans)',
      'Amiante (avant 01/07/1997)',
      'Plomb (avant 01/01/1949)',
      'Termites (selon zone)',
      '\u00c9tat des risques (ERP)',
      '\u00c9lectricit\u00e9 (> 15 ans)',
      'Gaz (> 15 ans)',
      'Assainissement non collectif'
    ]},
  { category: 'Documents contractuels', items: [
      'Mandat de vente conforme',
      'Compromis avec clauses suspensives',
      'Attestation de superficie',
      '\u00c9tat dat\u00e9 (si copropri\u00e9t\u00e9)',
      'R\u00e8glement de copropri\u00e9t\u00e9',
      'PV des 3 derni\u00e8res AG'
    ]}
];

export const complianceResources = [
  { title: 'Guide Loi Hoguet 2024', type: 'pdf', size: '2.3 MB' },
  { title: 'Mod\u00e8les de compromis', type: 'zip', size: '1.5 MB' },
  { title: 'Check-list validation annonce', type: 'pdf', size: '450 KB' },
  { title: 'Formation conformit\u00e9 l\u00e9gale', type: 'video', size: '45 min' }
];
