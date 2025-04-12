export const AVAILABLE_CURRENCIES = ['USD', 'EUR', 'RUB'] as const
export type Currency = (typeof AVAILABLE_CURRENCIES)[number]

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  RUB: 'Russian Ruble'
}

export const DEFAULT_CURRENCY: Currency = 'USD'

export const API_URL = 'https://status.neuralgeneration.com/api/currency'