export const mockZones = [
  {
    id: 'Z001',
    name: 'Lyon 3ème - Montchat',
    type: 'primary',
    status: 'active',
    exclusivity: true,
    performance: 87,
    properties: 12,
    leads: 23,
    visits: 18,
    conversions: 4,
    validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90)
  },
  {
    id: 'Z002',
    name: 'Lyon 7ème - Jean Macé',
    type: 'secondary',
    status: 'active',
    exclusivity: false,
    performance: 72,
    properties: 8,
    leads: 15,
    visits: 12,
    conversions: 2
  },
  {
    id: 'Z003',
    name: 'Lyon 2ème - Presqu\'île',
    type: 'premium',
    status: 'locked',
    exclusivity: true,
    performance: 0,
    properties: 25,
    leads: 0,
    visits: 0,
    conversions: 0,
    requirements: ['Niveau Platine requis', '10 ventes minimum', 'Score > 900']
  },
  {
    id: 'Z004',
    name: 'Villeurbanne - Gratte-Ciel',
    type: 'secondary',
    status: 'available',
    exclusivity: false,
    performance: 0,
    properties: 15,
    leads: 0,
    visits: 0,
    conversions: 0
  }
];
