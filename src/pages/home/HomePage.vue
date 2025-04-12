<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCurrencyStore } from '@/app/providers/store'
import { AVAILABLE_CURRENCIES, type Currency } from '@/shared/config/constants'

const store = useCurrencyStore()

const rates = computed(() => 
  AVAILABLE_CURRENCIES
    .filter(currency => currency !== store.baseCurrency)
    .map(currency => ({
      currency,
      rate: store.convert(1, currency, store.baseCurrency as Currency)
    }))
)

onMounted(() => {
  store.fetchRates()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Current Exchange Rates</h1>
    <div class="grid gap-4">
      <div v-for="{ currency, rate } in rates" :key="currency" class="p-4 bg-white rounded-lg shadow">
        <p class="text-lg">
          1 {{ currency }} = {{ rate }} {{ store.baseCurrency }}
        </p>
      </div>
    </div>
  </div>
</template>