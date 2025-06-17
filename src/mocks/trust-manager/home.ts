export const dashboardStats = {
  pendingTasks: 12,
  completedToday: 8,
  urgentTasks: 3,
  averageTime: 25,
  monthlyProcessed: 156,
  complianceRate: 98.5,
  estimatedCost: 2340
};

export const dashboardTaskBreakdown = [
  { type: 'Validation initiale', count: 4, icon: 'FileCheck', color: 'blue', avgTime: 30, cost: 15 },
  { type: 'Contr\u00f4le qualit\u00e9', count: 3, icon: 'Camera', color: 'green', avgTime: 30, cost: 15 },
  { type: 'Qualification leads', count: 2, icon: 'Users', color: 'purple', avgTime: 30, cost: 15 },
  { type: 'Relecture compromis', count: 2, icon: 'FileText', color: 'orange', avgTime: 20, cost: 10 },
  { type: 'Coordination notaire', count: 1, icon: 'Archive', color: 'indigo', avgTime: 15, cost: 7.5 }
];

export const dashboardRecentAlerts = [
  { id: 1, type: 'urgent', message: 'DPE manquant - Appartement Lyon 6', property: 'REF-2024-001' },
  { id: 2, type: 'warning', message: 'Photos non conformes - Maison \u00c9cully', property: 'REF-2024-003' },
  { id: 3, type: 'info', message: 'Nouveau lead \u00e0 qualifier - Jean Martin', property: 'REF-2024-002' }
];
