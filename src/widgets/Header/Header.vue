<script setup lang="ts">
import { UiSelect } from '@/shared/ui/UiSelect'
import { AVAILABLE_CURRENCIES, CURRENCY_LABELS } from '@/shared/config/constants'
import { useCurrencyStore } from '@/app/providers/store'
import { computed } from 'vue'

const store = useCurrencyStore()

const currencyOptions = computed(() =>
  AVAILABLE_CURRENCIES.map((currency) => ({
    value: currency,
    label: CURRENCY_LABELS[currency]
  }))
)
</script>

<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex gap-4">
        <router-link to="/" class="text-blue-600 hover:text-blue-800"> Home </router-link>
        <router-link to="/convert" class="text-blue-600 hover:text-blue-800"> Convert </router-link>
      </div>
      <UiSelect v-model="store.baseCurrency" :options="currencyOptions" />
    </nav>
  </header>
</template>
