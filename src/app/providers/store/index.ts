import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Currency } from '@/shared/config/constants'
import { DEFAULT_CURRENCY } from '@/shared/config/constants'
import { currencyApi } from '@/shared/api/currencyApi'

interface CurrencyRates {
  [key: string]: {
    [key: string]: number
  }
}

export const useCurrencyStore = defineStore('currency', () => {
  const baseCurrency = ref<Currency>(DEFAULT_CURRENCY)
  const rates = ref<CurrencyRates>({})

  const setBaseCurrency = (currency: Currency) => {
    baseCurrency.value = currency
  }

  const fetchRates = async () => {
    try {
      rates.value = await currencyApi.getRates()
    } catch (error) {
      console.error('Failed to fetch rates:', error)
    }
  }

  const convert = (amount: number, from: Currency, to: Currency): number => {
    if (!rates.value[from]?.[to]) return 0
    return Number((amount * rates.value[from][to]).toFixed(2))
  }

  return {
    baseCurrency,
    rates,
    setBaseCurrency,
    fetchRates,
    convert
  }
})
