import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiInput from './UiInput.vue'

describe('UiInput', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(UiInput)

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('placeholder')).toBe('')
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('renders with custom props', () => {
    const wrapper = mount(UiInput, {
      props: {
        modelValue: 'test',
        placeholder: 'Enter value',
        type: 'text',
        error: 'Error message'
      }
    })

    expect(wrapper.find('input').element.value).toBe('test')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter value')
    expect(wrapper.find('p.text-red-500').text()).toBe('Error message')
  })

  it('emits update:modelValue and input events when input changes', async () => {
    const wrapper = mount(UiInput)

    await wrapper.find('input').setValue('new value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')?.[0]).toEqual(['new value'])
  })

  it('handles number type input correctly', async () => {
    const wrapper = mount(UiInput, {
      props: {
        type: 'number'
      }
    })

    await wrapper.find('input').setValue('123.45')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['123.45'])

    await wrapper.find('input').setValue('123abc')

    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['123'])
  })

  it('prevents non-numeric input for number type', async () => {
    const wrapper = mount(UiInput, {
      props: {
        type: 'number'
      }
    })

    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'a' })

    const event = { preventDefault: vi.fn(), key: 'a' }
    await input.trigger('keydown', event)

    expect(event.preventDefault).toHaveBeenCalled()

    const numericEvent = { preventDefault: vi.fn(), key: '5' }
    await input.trigger('keydown', numericEvent)

    expect(numericEvent.preventDefault).not.toHaveBeenCalled()
  })
})
