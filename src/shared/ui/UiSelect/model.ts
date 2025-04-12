import type { Select } from '@/shared/config/constants'

export interface UiSelectProps {
  modelValue?: string
  options: Select[]
  placeholder?: string
}

export interface UiSelectEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}