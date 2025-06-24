-- Supprime toutes les tables avec leurs dépendances
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Accorder tous les droits sur le schéma à adminBolt
GRANT ALL PRIVILEGES ON SCHEMA public TO "adminBolt";
GRANT CREATE ON SCHEMA public TO "adminBolt";

-- PostgreSQL database schema for LoopImmo
-- Creates core tables for the application

CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  roles TEXT[] NOT NULL,
  phone VARCHAR,
  avatar VARCHAR,
  referral_code VARCHAR NOT NULL UNIQUE,
  referred_by VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ambassadors (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR NOT NULL REFERENCES users(id),
  zone VARCHAR,
  commission NUMERIC,
  total_sales INTEGER,
  total_earnings NUMERIC,
  rating NUMERIC,
  availability VARCHAR,
  bio TEXT
);

CREATE TABLE ambassador_specialties (
  ambassador_id VARCHAR REFERENCES ambassadors(id) ON DELETE CASCADE,
  specialty VARCHAR NOT NULL,
  PRIMARY KEY (ambassador_id, specialty)
);

CREATE TABLE properties (
  id VARCHAR PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  surface NUMERIC,
  rooms INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  type VARCHAR NOT NULL,
  address VARCHAR,
  city VARCHAR,
  postal_code VARCHAR,
  lat NUMERIC,
  lng NUMERIC,
  energy_class CHAR(1),
  ghg_class CHAR(1),
  status VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  seller_id VARCHAR REFERENCES users(id),
  ambassador_id VARCHAR REFERENCES ambassadors(id),
  tier_name VARCHAR,
  tier_min NUMERIC,
  tier_max NUMERIC,
  tier_fee NUMERIC,
  tier_color VARCHAR
);

CREATE TABLE property_features (
  property_id VARCHAR REFERENCES properties(id) ON DELETE CASCADE,
  feature VARCHAR NOT NULL,
  PRIMARY KEY (property_id, feature)
);

CREATE TABLE property_photos (
  property_id VARCHAR REFERENCES properties(id) ON DELETE CASCADE,
  url VARCHAR NOT NULL,
  PRIMARY KEY (property_id, url)
);

CREATE TABLE visit_slots (
  id VARCHAR PRIMARY KEY,
  property_id VARCHAR REFERENCES properties(id) ON DELETE CASCADE,
  visit_date DATE,
  start_time TIME,
  end_time TIME,
  available BOOLEAN
);

CREATE TABLE visits (
  id VARCHAR PRIMARY KEY,
  property_id VARCHAR REFERENCES properties(id),
  buyer_id VARCHAR REFERENCES users(id),
  visit_date DATE,
  visit_time TIME,
  status VARCHAR,
  notes TEXT,
  rating NUMERIC,
  comment TEXT
);

CREATE TABLE offers (
  id VARCHAR PRIMARY KEY,
  property_id VARCHAR REFERENCES properties(id),
  buyer_id VARCHAR REFERENCES users(id),
  amount NUMERIC,
  status VARCHAR,
  message TEXT,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);

CREATE TABLE referrals (
  id VARCHAR PRIMARY KEY,
  property_id VARCHAR REFERENCES properties(id),
  property_title VARCHAR,
  referring_ambassador_id VARCHAR REFERENCES ambassadors(id),
  receiving_ambassador_id VARCHAR REFERENCES ambassadors(id),
  seller_id VARCHAR REFERENCES users(id),
  buyer_id VARCHAR REFERENCES users(id),
  buyer_name VARCHAR,
  buyer_contact VARCHAR,
  buyer_email VARCHAR,
  status VARCHAR,
  type VARCHAR,
  message TEXT,
  referring_split INTEGER,
  receiving_split INTEGER,
  potential_commission NUMERIC,
  created_at TIMESTAMP,
  accepted_at TIMESTAMP,
  converted_at TIMESTAMP,
  notes TEXT
);

CREATE TABLE service_providers (
  id VARCHAR PRIMARY KEY,
  name VARCHAR,
  type VARCHAR,
  description TEXT,
  rating NUMERIC,
  review_count INTEGER,
  price NUMERIC,
  price_unit VARCHAR,
  availability VARCHAR,
  location VARCHAR,
  distance VARCHAR,
  verified BOOLEAN
);

CREATE TABLE provider_specialties (
  provider_id VARCHAR REFERENCES service_providers(id) ON DELETE CASCADE,
  specialty VARCHAR NOT NULL,
  PRIMARY KEY (provider_id, specialty)
);

CREATE TABLE provider_certifications (
  provider_id VARCHAR REFERENCES service_providers(id) ON DELETE CASCADE,
  certification VARCHAR NOT NULL,
  PRIMARY KEY (provider_id, certification)
);

CREATE TABLE provider_portfolio (
  provider_id VARCHAR REFERENCES service_providers(id) ON DELETE CASCADE,
  url VARCHAR NOT NULL,
  PRIMARY KEY (provider_id, url)
);

CREATE TABLE service_proposals (
  id VARCHAR PRIMARY KEY,
  property_id VARCHAR REFERENCES properties(id),
  provider_id VARCHAR REFERENCES service_providers(id),
  status VARCHAR,
  proposed_date TIMESTAMP,
  message TEXT,
  created_at TIMESTAMP,
  custom_price NUMERIC
);

CREATE TABLE price_tiers (
  name VARCHAR PRIMARY KEY,
  min NUMERIC,
  max NUMERIC,
  fee NUMERIC,
  color VARCHAR
);

CREATE TABLE subscription_features (
  id VARCHAR PRIMARY KEY,
  name VARCHAR,
  description TEXT,
  category VARCHAR
);

CREATE TABLE subscription_feature_plans (
  feature_id VARCHAR REFERENCES subscription_features(id) ON DELETE CASCADE,
  plan VARCHAR NOT NULL,
  PRIMARY KEY (feature_id, plan)
);

CREATE TABLE subscriptions (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id),
  plan VARCHAR,
  status VARCHAR,
  start_date DATE,
  price NUMERIC,
  billing_cycle VARCHAR
);

-- ACCORDER TOUTES LES PERMISSIONS À adminBolt SUR TOUTES LES TABLES EXISTANTES
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "adminBolt";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "adminBolt";
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO "adminBolt";

-- ACCORDER LES PERMISSIONS SUR LES FUTURES TABLES ET SÉQUENCES
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO "adminBolt";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO "adminBolt";

-- PERMISSIONS SUPPLÉMENTAIRES POUR LA GESTION DES FONCTIONS ET TYPES
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO "adminBolt";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON TYPES TO "adminBolt";

-- S'assurer que adminBolt peut se connecter à la base de données
GRANT CONNECT ON DATABASE "LoopImmo" TO "adminBolt";

-- Optionnel : Donner le rôle de création de base de données (si nécessaire)
-- ALTER USER "adminBolt" CREATEDB;