const useMocks = import.meta.env.VITE_USE_MOCKS !== 'false';

import {
  mockProperties,
  mockUsers,
  mockAmbassadors,
  PRICE_TIERS,
} from '../data/mockData';
import {
  mockServiceProviders,
  mockServiceProposals,
  subscriptionFeatures,
  mockSubscriptions,
  subscriptionPlans,
} from '../data/mockServiceProviders';
import { mockReferrals, mockTerritoryProperties } from '../data/mockReferrals';
import {
  mockPayments,
  mockContracts,
  mockTimelines,
  mockVisits,
  mockZones,
  mockCommissions,
  mockPropertyPhotos,
  mockProposals,
  mockStats,
  mockLeads,
  mockDashboardCommissions,
  mockManagedProperties,
  mockEnrichedLeads,
} from '../mocks';

function apiNotImplemented(name: string): never {
  throw new Error(`API for ${name} not implemented`);
}

const createMockService = <T>(data: T, name: string) => () =>
  useMocks ? data : apiNotImplemented(name);

export const getProperties = createMockService(mockProperties, 'getProperties');
export const getUsers = createMockService(mockUsers, 'getUsers');
export const getAmbassadors = createMockService(
  mockAmbassadors,
  'getAmbassadors',
);
export const getPriceTiers = createMockService(PRICE_TIERS, 'getPriceTiers');
export const getPayments = createMockService(mockPayments, 'getPayments');
export const getContracts = createMockService(mockContracts, 'getContracts');
export const getTimelines = createMockService(mockTimelines, 'getTimelines');
export const getVisits = createMockService(mockVisits, 'getVisits');
export const getZones = createMockService(mockZones, 'getZones');
export const getCommissions = createMockService(
  mockCommissions,
  'getCommissions',
);
export const getPropertyPhotos = createMockService(
  mockPropertyPhotos,
  'getPropertyPhotos',
);
export const getProposals = createMockService(mockProposals, 'getProposals');
export const getStats = createMockService(mockStats, 'getStats');
export const getLeads = createMockService(mockLeads, 'getLeads');
export const getDashboardCommissions = createMockService(
  mockDashboardCommissions,
  'getDashboardCommissions',
);
export const getManagedProperties = createMockService(
  mockManagedProperties,
  'getManagedProperties',
);
export const getEnrichedLeads = createMockService(
  mockEnrichedLeads,
  'getEnrichedLeads',
);
export const getReferrals = createMockService(mockReferrals, 'getReferrals');
export const getTerritoryProperties = createMockService(
  mockTerritoryProperties,
  'getTerritoryProperties',
);
export const getServiceProviders = createMockService(
  mockServiceProviders,
  'getServiceProviders',
);
export const getServiceProposals = createMockService(
  mockServiceProposals,
  'getServiceProposals',
);
export const getSubscriptionFeatures = createMockService(
  subscriptionFeatures,
  'getSubscriptionFeatures',
);
export const getSubscriptions = createMockService(
  mockSubscriptions,
  'getSubscriptions',
);
export const getSubscriptionPlans = createMockService(
  subscriptionPlans,
  'getSubscriptionPlans',
);
