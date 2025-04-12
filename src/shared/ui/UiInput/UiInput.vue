<script setup lang="ts">
interface Props {
  modelValue: string | number
  type?: string
  placeholder?: string
  error?: string
}

defineProps<Props>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <input
      :value="modelValue"
      :type="type || 'text'"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500': error }"
    />
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>