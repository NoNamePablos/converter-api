import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCurrencyStore } from './index'
import { currencyApi } from '@/shared/api/currencyApi'

vi.mock('@/shared/api/currencyApi', () => ({
  currencyApi: {
    getRates: vi.fn()
  }
}))

describe('Currency Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('initializes with default values', () => {
    const store = useCurrencyStore()

    expect(store.baseCurrency).toBe('USD')
    expect(store.rates).toEqual({})
  })

  it('sets base currency correctly', () => {
    const store = useCurrencyStore()

    store.setBaseCurrency('EUR')

    expect(store.baseCurrency).toBe('EUR')
  })

  it('fetches rates from API', async () => {
    const mockRates = {
      USD: {
        EUR: 0.85,
        RUB: 75.5
      },
      EUR: {
        USD: 1.18,
        RUB: 89.2
      },
      RUB: {
        USD: 0.013,
        EUR: 0.011
      }
    }

    vi.mocked(currencyApi.getRates).mockResolvedValue(mockRates)

    const store = useCurrencyStore()
    await store.fetchRates()

    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)
    expect(store.rates).toEqual(mockRates)
  })

  it('converts currency correctly', () => {
    const store = useCurrencyStore()

    store.rates = {
      USD: {
        EUR: 0.85,
        RUB: 75.5
      },
      EUR: {
        USD: 1.18,
        RUB: 89.2
      },
      RUB: {
        USD: 0.013,
        EUR: 0.011
      }
    }

    const result = store.convert(100, 'USD', 'EUR')

    expect(result).toBe(85)
  })

  it('returns 0 when conversion rate is not available', () => {
    const store = useCurrencyStore()

    store.rates = {}

    const result = store.convert(100, 'USD', 'EUR')

    expect(result).toBe(0)
  })
})
