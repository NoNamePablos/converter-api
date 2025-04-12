<script setup lang="ts">
import { computed } from 'vue'
import type { UiInputProps, UiInputEmits } from './model'

const props = withDefaults(defineProps<UiInputProps>(), {
  placeholder: '',
  type: 'text',
  error: ''
})

const emit = defineEmits<UiInputEmits>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  
  if (props.type === 'number') {
    const value = target.value
    const sanitizedValue = value.replace(/[^0-9.]/g, '')
    
    const parts = sanitizedValue.split('.')
    const formattedValue = parts.length > 2 
      ? `${parts[0]}.${parts.slice(1).join('')}`
      : sanitizedValue


    emit('update:modelValue', formattedValue)
    emit('input',formattedValue)
  }
  else {
    emit('update:modelValue', target.value)
    emit('input',target.value)
  }
}

const preventNonNumericInput = (event: KeyboardEvent) => {
  if (props.type !== 'number') return
  
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', '.', 'ArrowLeft', 'ArrowRight']
  
  if (/^\d$/.test(event.key)) {
    return
  }
  
  if (allowedKeys.includes(event.key)) {
    if (event.key === '.' && (event.target as HTMLInputElement).value.includes('.')) {
      event.preventDefault()
    }
    return
  }
  
  event.preventDefault()
}
</script>

<template>
  <div class="w-full">
    <input
      :value="inputValue"
      @input="handleInput"
      @keydown="preventNonNumericInput"
      :type="type === 'number' ? 'text' : type" 
      :placeholder="placeholder"
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500': error }"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>