-- Sample data for LoopImmo database

-- Users
INSERT INTO users (id, email, first_name, last_name, roles, phone, created_at) VALUES
  ('1', 'vendeur@test.com', 'Pierre', 'Dupont', ARRAY['seller','ambassador'], '0612345678', '2024-01-01'),
  ('buyer1', 'acheteur@test.com', 'Marie', 'Martin', ARRAY['buyer'], '0687654321', '2024-01-05'),
  ('amb1', 'ambassadeur@test.com', 'Jean', 'Bernard', ARRAY['ambassador'], '0698765432', '2023-12-01'),
  ('amb2', 'ambassadeur2@test.com', 'Sophie', 'Martin', ARRAY['ambassador'], '0698765433', '2023-12-05'),
  ('trust1', 'trust@test.com', 'Alice', 'Trusted', ARRAY['trust_manager'], '0600000000', '2024-01-10');

-- Ambassadors
INSERT INTO ambassadors (id, user_id, zone, commission, total_sales, total_earnings, rating, availability, bio) VALUES
  ('amb1', 'amb1', 'Lyon 6ème', 0.3, 8, 19200, 4.8, 'Disponible 7j/7', 'Ambassadeur passionné du 6ème arrondissement depuis 3 ans.'),
  ('amb2', 'amb2', 'Lyon Ouest', 0.25, 5, 12500, 4.6, 'Disponible en semaine', 'Expert du secteur ouest lyonnais depuis 2 ans.');

INSERT INTO ambassador_specialties (ambassador_id, specialty) VALUES
  ('amb1', 'Appartements'),
  ('amb1', 'Investissement locatif'),
  ('amb2', 'Maisons'),
  ('amb2', 'Familles');

-- Price tiers
INSERT INTO price_tiers (name, min, max, fee, color) VALUES
  ('Starter', 0, 150000, 2500, 'bg-blue-500'),
  ('Essential', 150001, 300000, 4000, 'bg-indigo-500'),
  ('Premium', 300001, 500000, 6000, 'bg-purple-500'),
  ('Elite', 500001, 800000, 8000, 'bg-pink-500'),
  ('Prestige', 800001, 1200000, 10000, 'bg-orange-500'),
  ('Luxury', 1200001, NULL, 12000, 'bg-red-500');

-- Properties
INSERT INTO properties (id, title, description, price, surface, rooms, bedrooms, bathrooms, type, address, city, postal_code, lat, lng, energy_class, ghg_class, status, created_at, updated_at, seller_id, ambassador_id, tier_name, tier_min, tier_max, tier_fee, tier_color) VALUES
  ('1', 'Appartement T3 - Lyon 6ème', 'Magnifique appartement T3 de 75m² situé au cœur du 6ème arrondissement de Lyon.', 320000, 75, 3, 2, 1, 'apartment', '45 rue Vendôme', 'Lyon', '69006', 45.7640, 4.8357, 'C', 'D', 'active', '2024-01-15', '2024-01-15', '1', 'amb1', 'Essential', 150001, 300000, 4000, 'bg-indigo-500'),
  ('2', 'Maison 5 pièces - Écully', 'Belle maison familiale de 120m² avec jardin de 300m².', 650000, 120, 5, 4, 2, 'house', '12 rue des Fleurs', 'Écully', '69130', 45.7719, 4.8901, 'D', 'E', 'active', '2024-01-10', '2024-01-10', '1', 'amb2', 'Elite', 500001, 800000, 8000, 'bg-pink-500');

INSERT INTO property_features (property_id, feature) VALUES
  ('1', 'Balcon'),
  ('1', 'Cave'),
  ('1', 'Parking'),
  ('2', 'Jardin'),
  ('2', 'Garage');

INSERT INTO property_photos (property_id, url) VALUES
  ('1', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('1', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('2', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800');

INSERT INTO visit_slots (id, property_id, visit_date, start_time, end_time, available) VALUES
  ('slot1', '1', '2024-02-20', '10:00', '11:00', TRUE),
  ('slot2', '1', '2024-02-21', '14:00', '15:00', TRUE),
  ('slot4', '2', '2024-02-20', '11:00', '12:00', TRUE);

-- Service providers
INSERT INTO service_providers (id, name, type, description, rating, review_count, price, price_unit, availability, location, distance, verified) VALUES
  ('sp1', 'Studio Photo Pro', 'photographer', 'Spécialiste de la photographie immobilière avec drone', 4.8, 127, 150, 'fixed', 'within_24h', 'Paris 15e', '2.3 km', TRUE),
  ('sp3', 'Diagimmo Expert', 'diagnostician', 'Tous diagnostics immobiliers obligatoires', 4.9, 234, 450, 'fixed', 'within_week', 'Paris', '5.2 km', TRUE);

INSERT INTO provider_specialties (provider_id, specialty) VALUES
  ('sp1', 'Drone'),
  ('sp1', 'Visite virtuelle 360°'),
  ('sp3', 'DPE');

INSERT INTO service_proposals (id, property_id, provider_id, status, proposed_date, message, created_at, custom_price) VALUES
  ('prop1', '1', 'sp1', 'pending', '2024-01-20 10:00', 'Je peux intervenir dès demain pour les photos avec drone inclus', '2024-01-18 14:30', NULL),
  ('prop2', '1', 'sp3', 'accepted', '2024-01-25 14:00', 'Tarif préférentiel pour client LoopImmo', '2024-01-17 09:15', 420);

-- Subscriptions and features
INSERT INTO subscription_features (id, name, description, category) VALUES
  ('f1', 'Alertes personnalisées illimitées', 'Créez autant d\'alertes que vous souhaitez', 'search'),
  ('f4', 'Support prioritaire 7j/7', 'Assistance dédiée par téléphone et chat', 'support');

INSERT INTO subscription_feature_plans (feature_id, plan) VALUES
  ('f1', 'premium'),
  ('f1', 'platinum'),
  ('f4', 'premium'),
  ('f4', 'platinum');

INSERT INTO subscriptions (id, user_id, plan, status, start_date, price, billing_cycle) VALUES
  ('sub1', '1', 'premium', 'active', '2024-01-01', 29, 'monthly');
