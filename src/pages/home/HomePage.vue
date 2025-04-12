<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCurrencyStore } from '@/app/providers/store'
import { AVAILABLE_CURRENCIES, type Currency } from '@/shared/config/constants'
import { storeToRefs } from 'pinia'

const store = useCurrencyStore()
const { baseCurrency } = storeToRefs(store)
const { fetchRates, convert } = store

fetchRates()

const rates = computed(() =>
  AVAILABLE_CURRENCIES.filter((currency) => currency !== baseCurrency.value).map((currency) => ({
    currency,
    rate: convert(1, currency, baseCurrency.value as Currency)
  }))
)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Current Exchange Rates</h1>
    <div class="grid gap-4">
      <div
        v-for="{ currency, rate } in rates"
        :key="currency"
        class="p-4 bg-white rounded-lg shadow"
      >
        <p class="text-lg">1 {{ currency }} = {{ rate }} {{ store.baseCurrency }}</p>
      </div>
    </div>
  </div>
</template>
