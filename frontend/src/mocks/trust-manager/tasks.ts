export const trustManagerTasks = [
  {
    id: '1',
    type: 'validation',
    title: 'Validation annonce - Appartement Lyon 6',
    property: 'REF-2024-001',
    priority: 'high',
    status: 'pending',
    createdAt: new Date('2024-01-15T10:00:00'),
    dueDate: new Date('2024-01-15T18:00:00'),
    estimatedDuration: 30,
    cost: 15
  },
  {
    id: '2',
    type: 'quality_control',
    title: 'Contr\u00f4le photos - Maison \u00c9cully',
    property: 'REF-2024-003',
    priority: 'urgent',
    status: 'in_progress',
    createdAt: new Date('2024-01-15T09:00:00'),
    dueDate: new Date('2024-01-15T14:00:00'),
    estimatedDuration: 30,
    cost: 15
  },
  {
    id: '3',
    type: 'lead_qualification',
    title: 'Qualification lead - Jean Martin',
    property: 'REF-2024-002',
    priority: 'medium',
    status: 'pending',
    createdAt: new Date('2024-01-15T11:00:00'),
    dueDate: new Date('2024-01-16T12:00:00'),
    estimatedDuration: 30,
    cost: 15
  },
  {
    id: '4',
    type: 'contract_review',
    title: 'Relecture compromis - Studio Villeurbanne',
    property: 'REF-2024-004',
    priority: 'high',
    status: 'pending',
    createdAt: new Date('2024-01-15T08:00:00'),
    dueDate: new Date('2024-01-15T17:00:00'),
    estimatedDuration: 20,
    cost: 10
  },
  {
    id: '5',
    type: 'notary_coordination',
    title: 'Coordination notaire - Vente Lyon 3',
    property: 'REF-2024-005',
    priority: 'medium',
    status: 'completed',
    createdAt: new Date('2024-01-14T14:00:00'),
    dueDate: new Date('2024-01-15T10:00:00'),
    estimatedDuration: 15,
    cost: 7.5
  }
];
