<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { UiInput } from '@/shared/ui/UiInput'
import { UiSelect } from '@/shared/ui/UiSelect'
import { useCurrencyStore } from '@/app/providers/store'
import { AVAILABLE_CURRENCIES, CURRENCY_LABELS, type Currency } from '@/shared/config/constants'

const store = useCurrencyStore()

const fromAmount = ref('')
const toAmount = ref('')
const fromCurrency = ref<Currency>(store.baseCurrency)
const toCurrency = ref<Currency>('EUR')
const error = ref('')

const currencyOptions = AVAILABLE_CURRENCIES.map(currency => ({
  value: currency,
  label: CURRENCY_LABELS[currency]
}))

const validateAmount = (value: string): boolean => {
  if (!/^\d*\.?\d*$/.test(value)) {
    error.value = 'Please enter a valid number'
    return false
  }
  error.value = ''
  return true
}

watch(fromAmount, (newValue) => {
  if (!validateAmount(newValue)) return
  if (newValue === '') {
    toAmount.value = ''
    return
  }
  const amount = store.convert(Number(newValue), fromCurrency.value, toCurrency.value)
  toAmount.value = amount.toString()
})

watch(toAmount, (newValue) => {
  if (!validateAmount(newValue)) return
  if (newValue === '') {
    fromAmount.value = ''
    return
  }
  const amount = store.convert(Number(newValue), toCurrency.value, fromCurrency.value)
  fromAmount.value = amount.toString()
})

watch([fromCurrency, toCurrency], () => {
  if (fromAmount.value) {
    const amount = store.convert(Number(fromAmount.value), fromCurrency.value, toCurrency.value)
    toAmount.value = amount.toString()
  }
})

watch(() => store.baseCurrency, (newBaseCurrency) => {
  fromCurrency.value = newBaseCurrency
})

onMounted(() => {
  fromCurrency.value = store.baseCurrency
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Currency Converter</h1>
    <div class="max-w-md mx-auto">
      <div class="space-y-4">
        <div class="flex gap-4">
          <UiSelect
            v-model="fromCurrency"
            :options="currencyOptions"
          />
          <UiInput
            v-model="fromAmount"
            type="text"
            placeholder="Enter amount"
            :error="error"
          />
        </div>
        <div class="flex gap-4">
          <UiSelect
            v-model="toCurrency"
            :options="currencyOptions"
          />
          <UiInput
            v-model="toAmount"
            type="text"
            placeholder="Enter amount"
            :error="error"
          />
        </div>
      </div>
    </div>
  </div>
</template>