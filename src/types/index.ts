export type UserRole = 'buyer' | 'seller' | 'ambassador';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  phone?: string;
  avatar?: string;
  createdAt: Date;
  properties?: string[];
  savedSearches?: SavedSearch[];
  favoriteProperties?: string[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  type: 'apartment' | 'house' | 'studio' | 'land' | 'commercial';
  location: {
    address: string;
    city: string;
    postalCode: string;
    lat: number;
    lng: number;
  };
  features: string[];
  photos: string[];
  virtualTourUrl?: string;
  energyClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  ghgClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  status: 'active' | 'draft' | 'sold' | 'under_offer';
  createdAt: Date;
  updatedAt: Date;
  sellerId: string;
  ambassadorId?: string;
  views: number;
  favorites: number;
  tier: {
    name: string;
    min: number;
    max: number;
    fee: number;
    color: string;
  };
  availableVisitSlots: VisitSlot[];
}

export interface VisitSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Visit {
  id: string;
  propertyId: string;
  buyerId: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export interface Offer {
  id: string;
  propertyId: string;
  buyerId: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  message?: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface SavedSearch {
  id: string;
  name: string;
  criteria: {
    type?: string[];
    minPrice?: number;
    maxPrice?: number;
    minSurface?: number;
    maxSurface?: number;
    minRooms?: number;
    maxRooms?: number;
    cities?: string[];
    features?: string[];
  };
  alertEnabled: boolean;
  createdAt: Date;
}

export interface Ambassador {
  id: string;
  userId: string;
  zone: string;
  commission: number;
  totalSales: number;
  totalEarnings: number;
  rating: number;
  specialties: string[];
  availability: string;
  bio: string;
  verifiedProperties: string[];
  completedVisits: number;
  activeProperties: number;
}

export interface PropertyStats {
  views: number;
  favorites: number;
  visits: number;
  offers: number;
  weeklyViewsChange: number;
  newOffers: number;
}

export interface AmbassadorReferral {
  id: string;
  propertyId: string;
  propertyTitle: string;
  referringAmbassadorId: string;
  referringAmbassadorName: string;
  receivingAmbassadorId?: string;
  sellerId: string;
  buyerId: string;
  buyerName: string;
  buyerContact: string;
  buyerEmail: string;
  status: 'pending' | 'accepted' | 'rejected' | 'converted';
  type: 'buyer_lead';
  message?: string;
  commissionSplit: {
    referring: number;
    receiving: number;
  };
  potentialCommission: number;
  createdAt: Date;
  acceptedAt?: Date;
  convertedAt?: Date;
  notes?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  type:
    | 'photographer'
    | 'diagnostician'
    | 'home_stager'
    | 'financial_advisor'
    | 'notary'
    | 'lawyer'
    | 'contractor';
  description: string;
  rating: number;
  reviewCount: number;
  price: number;
  priceUnit: 'fixed' | 'hourly' | 'percentage';
  availability: 'immediate' | 'within_24h' | 'within_week';
  specialties: string[];
  certifications: string[];
  location?: string;
  distance?: string;
  portfolio?: string[];
  verified: boolean;
}

export interface ServiceProposal {
  id: string;
  propertyId: string;
  providerId: string;
  provider: ServiceProvider;
  status: 'pending' | 'accepted' | 'rejected';
  proposedDate: Date;
  message: string;
  createdAt: Date;
  customPrice?: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: string;
  startDate: Date;
  features: string[];
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'one-time';
}

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  plans: string[];
  category: 'search' | 'support' | 'analytics' | 'priority' | 'tools';
}
