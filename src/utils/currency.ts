import { Currency } from '../types';

export const BDT_TO_USD_RATE = 0.0084; // ~120 BDT per USD

export function formatPrice(priceInBdt: number, currency: Currency = 'BDT'): string {
  if (currency === 'USD') {
    const usd = priceInBdt * BDT_TO_USD_RATE;
    return `$${usd.toFixed(2)}`;
  }
  return `৳${priceInBdt.toLocaleString('en-IN')}`;
}
