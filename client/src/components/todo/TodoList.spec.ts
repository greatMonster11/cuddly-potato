import { mount } from '@vue/test-utils'
import TodoList from '@/components/todo/TodoList.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useTodoListStore } from '@/stores/todo'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockTodo = {
  id: 1,
  description: 'Test Todo',
  isCompleted: false,
  note: 'Test Note',
  created: new Date(),
  modified: new Date(),
}

describe('TodoList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders todo items correctly', async () => {
    const store = useTodoListStore()
    store.todoList = [mockTodo]

    const wrapper = mount(TodoList, {
      props: {
        userRole: 'free',
      },
    })

    expect(wrapper.text()).toContain('Test Todo')
  })

  it('shows note section for paid users', async () => {
    const store = useTodoListStore()
    store.todoList = [mockTodo]

    const wrapper = mount(TodoList, {
      props: {
        userRole: 'paid',
      },
    })

    expect(wrapper.text()).toContain('Test Note')
  })

  it('toggles todo completion', async () => {
    const store = useTodoListStore()
    store.todoList = [mockTodo]

    const toggleTodo = vi.spyOn(store, 'toggleCompleted')
    const wrapper = mount(TodoList, {
      props: {
        userRole: 'free',
      },
    })

    await wrapper.find('input[type="checkbox"]').trigger('click')
    expect(toggleTodo).toHaveBeenCalled()
  })

  // it('handles todo editing', async () => {
  //   const wrapper = mount(TodoList, {
  //     props: {
  //       userRole: 'free',
  //     },
  //     data() {
  //       return {
  //         todoList: [mockTodo],
  //       }
  //     },
  //   })

  //   await wrapper.find('.edit-btn').trigger('click')
  //   const input = wrapper.find('input[type="text"]')
  //   await input.setValue('Updated Todo')
  //   await input.trigger('blur')

  //   expect(wrapper.vm.editedTodoText).toBe('')
  // })
})
