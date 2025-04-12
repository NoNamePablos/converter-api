import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiSelect from './UiSelect.vue'
import type { Select } from '@/shared/config/constants'

describe('UiSelect', () => {
  const options: Select[] = [
    { value: 'USD', label: 'US Dollar' },
    { value: 'EUR', label: 'Euro' },
    { value: 'RUB', label: 'Russian Ruble' }
  ]

  it('renders properly with options', () => {
    const wrapper = mount(UiSelect, {
      props: {
        options,
        modelValue: 'USD'
      }
    })

    expect(wrapper.findAll('option').length).toBe(3)

    expect(wrapper.find('select').element.value).toBe('USD')
  })

  it('emits update:modelValue event when selection changes', async () => {
    const wrapper = mount(UiSelect, {
      props: {
        options,
        modelValue: 'USD'
      }
    })

    await wrapper.find('select').setValue('EUR')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['EUR'])
  })

  it('displays correct labels for options', () => {
    const wrapper = mount(UiSelect, {
      props: {
        options,
        modelValue: 'USD'
      }
    })

    const optionElements = wrapper.findAll('option')

    expect(optionElements[0].text()).toBe('US Dollar')
    expect(optionElements[1].text()).toBe('Euro')
    expect(optionElements[2].text()).toBe('Russian Ruble')
  })
})
