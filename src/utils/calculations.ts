import { getPriceTiers } from '../services/dataService';

const PRICE_TIERS = getPriceTiers();

export function calculateFee(price: number) {
  const tier = PRICE_TIERS.find(t => price >= t.min && price <= t.max);
  return tier || PRICE_TIERS[PRICE_TIERS.length - 1];
}

export function calculateSavings(price: number) {
  const tier = calculateFee(price);
  const traditionalFee = price * 0.05; // 5% commission moyenne
  const savings = traditionalFee - tier.fee;
  const savingsPercentage = (savings / traditionalFee) * 100;

  return {
    fee: tier.fee,
    traditionalFee,
    savings,
    savingsPercentage
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}
