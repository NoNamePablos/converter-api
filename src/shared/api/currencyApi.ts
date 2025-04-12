import axios from 'axios'
import { API_URL } from '../config/constants'
import type { Currency } from '../config/constants'

export interface CurrencyRates {
  [key: string]: number
}

interface RawRates {
  [key: string]: number
}

const formatCurrencyPair = (from: Currency, to: Currency): string => 
  `${from.toLowerCase()}-${to.toLowerCase()}`

export const currencyApi = {
  async getRates(): Promise<CurrencyRates> {
    const { data } = await axios.get<RawRates>(API_URL)
    
    // Convert the raw rates into a normalized format
    const normalizedRates: CurrencyRates = {}
    
    // For each currency pair in the response
    Object.entries(data).forEach(([pair, rate]) => {
      const [from, to] = pair.split('-').map(c => c.toUpperCase() as Currency)
      normalizedRates[from] = normalizedRates[from] || {}
      normalizedRates[to] = normalizedRates[to] || {}
      
      // Store the direct rate
      if (!normalizedRates[from][to]) {
        normalizedRates[from][to] = rate
      }
      
      // Store the inverse rate
      if (!normalizedRates[to][from]) {
        normalizedRates[to][from] = 1 / rate
      }
    })
    
    return normalizedRates
  }
}