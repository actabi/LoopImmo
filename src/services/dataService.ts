const useMocks = import.meta.env.VITE_USE_MOCKS !== 'false';

import {
  mockProperties,
  mockUsers,
  mockAmbassadors,
  PRICE_TIERS
} from '../data/mockData';
import {
  mockServiceProviders,
  mockServiceProposals,
  subscriptionFeatures,
  mockSubscriptions,
  subscriptionPlans
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
  mockEnrichedLeads
} from '../mocks';

function apiNotImplemented(name: string): never {
  throw new Error(`API for ${name} not implemented`);
}

export const getProperties = () =>
  useMocks ? mockProperties : apiNotImplemented('getProperties');
export const getUsers = () =>
  useMocks ? mockUsers : apiNotImplemented('getUsers');
export const getAmbassadors = () =>
  useMocks ? mockAmbassadors : apiNotImplemented('getAmbassadors');
export const getPriceTiers = () =>
  useMocks ? PRICE_TIERS : apiNotImplemented('getPriceTiers');
export const getPayments = () =>
  useMocks ? mockPayments : apiNotImplemented('getPayments');
export const getContracts = () =>
  useMocks ? mockContracts : apiNotImplemented('getContracts');
export const getTimelines = () =>
  useMocks ? mockTimelines : apiNotImplemented('getTimelines');
export const getVisits = () =>
  useMocks ? mockVisits : apiNotImplemented('getVisits');
export const getZones = () =>
  useMocks ? mockZones : apiNotImplemented('getZones');
export const getCommissions = () =>
  useMocks ? mockCommissions : apiNotImplemented('getCommissions');
export const getPropertyPhotos = () =>
  useMocks ? mockPropertyPhotos : apiNotImplemented('getPropertyPhotos');
export const getProposals = () =>
  useMocks ? mockProposals : apiNotImplemented('getProposals');
export const getStats = () =>
  useMocks ? mockStats : apiNotImplemented('getStats');
export const getLeads = () =>
  useMocks ? mockLeads : apiNotImplemented('getLeads');
export const getDashboardCommissions = () =>
  useMocks ? mockDashboardCommissions : apiNotImplemented('getDashboardCommissions');
export const getManagedProperties = () =>
  useMocks ? mockManagedProperties : apiNotImplemented('getManagedProperties');
export const getEnrichedLeads = () =>
  useMocks ? mockEnrichedLeads : apiNotImplemented('getEnrichedLeads');
export const getReferrals = () =>
  useMocks ? mockReferrals : apiNotImplemented('getReferrals');
export const getTerritoryProperties = () =>
  useMocks ? mockTerritoryProperties : apiNotImplemented('getTerritoryProperties');
export const getServiceProviders = () =>
  useMocks ? mockServiceProviders : apiNotImplemented('getServiceProviders');
export const getServiceProposals = () =>
  useMocks ? mockServiceProposals : apiNotImplemented('getServiceProposals');
export const getSubscriptionFeatures = () =>
  useMocks ? subscriptionFeatures : apiNotImplemented('getSubscriptionFeatures');
export const getSubscriptions = () =>
  useMocks ? mockSubscriptions : apiNotImplemented('getSubscriptions');
export const getSubscriptionPlans = () =>
  useMocks ? subscriptionPlans : apiNotImplemented('getSubscriptionPlans');
