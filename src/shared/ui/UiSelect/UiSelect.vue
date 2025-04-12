<script setup lang="ts">
import type { UiSelectProps, UiSelectEmits } from './model'

withDefaults(defineProps<UiSelectProps>(), {
  placeholder: 'Select an option'
})

defineEmits<UiSelectEmits>()
</script>

<template>
  <select
    :value="modelValue"
    class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
