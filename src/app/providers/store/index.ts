import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Currency } from '@/shared/config/constants'
import { DEFAULT_CURRENCY } from '@/shared/config/constants'
import type { CurrencyRates } from '@/shared/api/currencyApi'
import { currencyApi } from '@/shared/api/currencyApi'

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