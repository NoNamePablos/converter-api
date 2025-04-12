<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { UiInput } from '@/shared/ui/UiInput'
import { UiSelect } from '@/shared/ui/UiSelect'
import { useCurrencyStore } from '@/app/providers/store'
import {
  AVAILABLE_CURRENCIES,
  CURRENCY_LABELS,
  type Currency,
  Select
} from '@/shared/config/constants'
import { storeToRefs } from 'pinia'

const store = useCurrencyStore()

const { baseCurrency } = storeToRefs(store)

const { convert } = store

const fromAmount = ref<string>('')
const toAmount = ref<string>('')
const fromCurrency = ref<Currency>(baseCurrency.value)
const toCurrency = ref<Currency>('EUR')
const error = ref<string>('')

const currencyOptions: Select[] = AVAILABLE_CURRENCIES.map((currency) => ({
  value: currency,
  label: CURRENCY_LABELS[currency]
}))

/*TODO: add validate lib vuelidate etc*/
const validateAmount = (value: string): boolean => {
  if (!/^\d*\.?\d*$/.test(value)) {
    error.value = 'Please enter a valid number'
    return false
  }
  error.value = ''
  return true
}

const handleFromAmountInput = (value: string): void => {
  if (!validateAmount(value)) return

  if (value === '') {
    toAmount.value = ''
    return
  }

  const amount = convert(Number(value), fromCurrency.value, toCurrency.value)
  toAmount.value = amount.toString()
}

const handleToAmountInput = (value: string): void => {
  if (!validateAmount(value)) return

  if (value === '') {
    fromAmount.value = ''
    return
  }

  const amount = convert(Number(value), toCurrency.value, fromCurrency.value)
  fromAmount.value = amount.toString()
}

const handleCurrencyChange = (): void => {
  if (fromAmount.value) {
    handleFromAmountInput(fromAmount.value)
  }
}

watch([fromCurrency, toCurrency], handleCurrencyChange)

watch(
  () => baseCurrency.value,
  (newBaseCurrency) => {
    fromCurrency.value = newBaseCurrency
    fromAmount.value = ''
    toAmount.value = ''
  }
)

onMounted(() => {
  fromCurrency.value = baseCurrency.value
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Currency Converter</h1>
    <div class="max-w-md mx-auto">
      <div class="space-y-4">
        <div class="flex gap-4">
          <UiSelect v-model="fromCurrency" :options="currencyOptions" />
          <UiInput
            :model-value="fromAmount"
            type="number"
            placeholder="Enter amount"
            :error="error"
            @input="handleFromAmountInput"
          />
        </div>
        <div class="flex gap-4">
          <UiSelect v-model="toCurrency" :options="currencyOptions" />
          <UiInput
            :model-value="toAmount"
            type="number"
            placeholder="Enter amount"
            :error="error"
            @input="handleToAmountInput"
          />
        </div>
      </div>
    </div>
  </div>
</template>
