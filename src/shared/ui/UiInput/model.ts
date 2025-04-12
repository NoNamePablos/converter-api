export interface UiInputProps {
  modelValue?: string | number
  placeholder?: string
  type?: 'text' | 'number'
  error?: string
}

export interface UiInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'input', value: string): void
}