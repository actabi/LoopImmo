import express from 'express';
import * as handlers from './handlers';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Authentication & Users
app.post('/api/auth/login', handlers.login);
app.post('/api/auth/register', handlers.register);
app.post('/api/auth/logout', handlers.logout);
app.post('/api/auth/refresh', handlers.refreshToken);
app.post('/api/auth/forgot-password', handlers.forgotPassword);
app.post('/api/auth/reset-password', handlers.resetPassword);

app.get('/api/users/:id', handlers.getUser);
app.put('/api/users/:id', handlers.updateUser);
app.delete('/api/users/:id', handlers.deleteUser);
app.get('/api/users/:id/properties', handlers.getUserProperties);
app.get('/api/users/:id/saved-searches', handlers.getUserSavedSearches);
app.get('/api/users/:id/favorite-properties', handlers.getUserFavoriteProperties);

// Properties
app.post('/api/properties', handlers.createProperty);
app.put('/api/properties/:id', handlers.updateProperty);
app.delete('/api/properties/:id', handlers.deleteProperty);
app.get('/api/properties/:id/stats', handlers.getPropertyStats);
app.put('/api/properties/:id/status', handlers.changePropertyStatus);
app.get('/api/properties/:id/visit-slots', handlers.getPropertyVisitSlots);
app.post('/api/properties/:id/photos', handlers.addPropertyPhotos);
app.delete('/api/properties/:id/photos/:photoId', handlers.deletePropertyPhoto);
app.post('/api/properties/:id/features', handlers.addPropertyFeatures);
app.delete('/api/properties/:id/features/:feature', handlers.deletePropertyFeature);

// Visits
app.get('/api/visits', handlers.listVisits);
app.get('/api/visits/:id', handlers.getVisit);
app.post('/api/visits', handlers.createVisit);
app.put('/api/visits/:id', handlers.updateVisit);
app.delete('/api/visits/:id', handlers.deleteVisit);
app.put('/api/visits/:id/status', handlers.changeVisitStatus);
app.post('/api/visits/:id/feedback', handlers.addVisitFeedback);
app.get('/api/visit-slots', handlers.listVisitSlots);
app.post('/api/visit-slots', handlers.createVisitSlot);
app.put('/api/visit-slots/:id', handlers.updateVisitSlot);
app.delete('/api/visit-slots/:id', handlers.deleteVisitSlot);
app.put('/api/visit-slots/:id/availability', handlers.changeVisitSlotAvailability);

// Offers
app.get('/api/offers', handlers.listOffers);
app.get('/api/offers/:id', handlers.getOffer);
app.post('/api/offers', handlers.createOffer);
app.put('/api/offers/:id', handlers.updateOffer);
app.delete('/api/offers/:id', handlers.deleteOffer);
app.put('/api/offers/:id/status', handlers.changeOfferStatus);
app.post('/api/offers/:id/counter', handlers.counterOffer);

// Ambassadors & referrals
app.get('/api/ambassadors', handlers.listAmbassadors);
app.get('/api/ambassadors/:id', handlers.getAmbassador);
app.post('/api/ambassadors', handlers.createAmbassador);
app.put('/api/ambassadors/:id', handlers.updateAmbassador);
app.get('/api/ambassadors/:id/properties', handlers.getAmbassadorProperties);
app.get('/api/ambassadors/:id/stats', handlers.getAmbassadorStats);
app.get('/api/ambassadors/:id/commissions', handlers.getAmbassadorCommissions);

app.get('/api/referrals', handlers.listReferrals);
app.get('/api/referrals/:id', handlers.getReferral);
app.post('/api/referrals', handlers.createReferral);
app.put('/api/referrals/:id/status', handlers.changeReferralStatus);
app.put('/api/referrals/:id/accept', handlers.acceptReferral);
app.put('/api/referrals/:id/convert', handlers.convertReferral);
app.post('/api/referrals/:id/notes', handlers.addReferralNotes);

// Service providers
app.get('/api/service-providers', handlers.listServiceProviders);
app.get('/api/service-providers/:id', handlers.getServiceProvider);
app.post('/api/service-providers', handlers.createServiceProvider);
app.put('/api/service-providers/:id', handlers.updateServiceProvider);
app.delete('/api/service-providers/:id', handlers.deleteServiceProvider);
app.get('/api/service-providers/:id/portfolio', handlers.getServiceProviderPortfolio);
app.get('/api/service-proposals', handlers.listServiceProposals);
app.get('/api/service-proposals/:id', handlers.getServiceProposal);
app.post('/api/service-proposals', handlers.createServiceProposal);
app.put('/api/service-proposals/:id/status', handlers.changeServiceProposalStatus);
app.put('/api/service-proposals/:id', handlers.updateServiceProposal);

// Subscriptions
app.get('/api/subscriptions', handlers.listSubscriptions);
app.get('/api/subscriptions/:userId', handlers.getUserSubscription);
app.post('/api/subscriptions', handlers.createSubscription);
app.put('/api/subscriptions/:id', handlers.updateSubscription);
app.delete('/api/subscriptions/:id', handlers.deleteSubscription);
app.put('/api/subscriptions/:id/status', handlers.changeSubscriptionStatus);
app.get('/api/subscription-features', handlers.listSubscriptionFeatures);
app.get('/api/subscription-features/plans/:plan', handlers.getSubscriptionPlanFeatures);

// Saved searches & favorites
app.get('/api/saved-searches', handlers.listSavedSearches);
app.post('/api/saved-searches', handlers.createSavedSearch);
app.put('/api/saved-searches/:id', handlers.updateSavedSearch);
app.delete('/api/saved-searches/:id', handlers.deleteSavedSearch);
app.put('/api/saved-searches/:id/alert', handlers.toggleSavedSearchAlert);
app.get('/api/favorites', handlers.listFavorites);
app.post('/api/favorites', handlers.addFavorite);
app.delete('/api/favorites/:propertyId', handlers.removeFavorite);

// Analytics
app.get('/api/analytics/properties/:id', handlers.analyticsProperty);
app.get('/api/analytics/ambassador/:id', handlers.analyticsAmbassador);
app.get('/api/analytics/seller/:id', handlers.analyticsSeller);
app.get('/api/analytics/market', handlers.analyticsMarket);
app.get('/api/analytics/price-tiers', handlers.analyticsPriceTiers);

// Messages & notifications
app.get('/api/messages', handlers.listMessages);
app.get('/api/messages/:id', handlers.getMessage);
app.post('/api/messages', handlers.sendMessage);
app.put('/api/messages/:id/read', handlers.markMessageRead);
app.delete('/api/messages/:id', handlers.deleteMessage);
app.get('/api/notifications', handlers.listNotifications);
app.put('/api/notifications/:id/read', handlers.markNotificationRead);
app.put('/api/notifications/read-all', handlers.markAllNotificationsRead);
app.delete('/api/notifications/:id', handlers.deleteNotification);

// Payments & commissions
app.get('/api/payments', handlers.listPayments);
app.get('/api/payments/:id', handlers.getPayment);
app.post('/api/payments', handlers.createPayment);
app.put('/api/payments/:id/status', handlers.updatePaymentStatus);
app.get('/api/commissions', handlers.listCommissions);
app.get('/api/commissions/:id', handlers.getCommission);
app.put('/api/commissions/:id/validate', handlers.validateCommission);
app.put('/api/commissions/:id/pay', handlers.payCommission);

// Configuration
app.get('/api/price-tiers', handlers.listPriceTiers);
app.post('/api/price-tiers', handlers.createPriceTier);
app.put('/api/price-tiers/:name', handlers.updatePriceTier);
app.delete('/api/price-tiers/:name', handlers.deletePriceTier);
app.get('/api/system/config', handlers.getSystemConfig);
app.put('/api/system/config', handlers.updateSystemConfig);
app.get('/api/system/stats', handlers.getSystemStats);


app.get('/api/users', handlers.listUsers);
app.get('/api/properties', handlers.listProperties);
app.get('/api/properties/:id', handlers.getProperty);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
