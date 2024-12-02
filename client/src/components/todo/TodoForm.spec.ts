import { mount } from '@vue/test-utils'
import TodoForm from '@/components/todo/TodoForm.vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('TodoForm.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly for free user', () => {
    const wrapper = mount(TodoForm, {
      props: {
        userRole: 'free',
      },
    })

    expect(wrapper.find('#todo-input').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Add a note (optional)..."]').exists()).toBe(false)
  })

  it('renders note input for paid user', () => {
    const wrapper = mount(TodoForm, {
      props: {
        userRole: 'paid',
      },
    })

    expect(wrapper.find('input[placeholder="Add a note (optional)..."]').exists()).toBe(true)
  })

  // it('emits form submission with todo data', async () => {
  //   const wrapper = mount(TodoForm, {
  //     props: {
  //       userRole: 'free',
  //     },
  //   })

  //   const input = wrapper.find('#todo-input')
  //   await input.setValue('New Todo Item')
  //   await wrapper.find('form').trigger('submit')

  //   expect(wrapper.vm.todo as TodoFormInstance).toBe('')
  // })
})
