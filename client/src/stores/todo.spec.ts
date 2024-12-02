import { setActivePinia, createPinia } from 'pinia'
import { useTodoListStore } from '@/stores/todo'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}))

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Todo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches todos', async () => {
    const store = useTodoListStore()
    const mockTodos = [
      {
        id: 1,
        description: 'Test Todo',
        isCompleted: false,
        created: new Date(),
        modified: new Date(),
      },
    ]

    mockedAxios.get.mockResolvedValueOnce({ data: mockTodos })

    await store.fetchTodo()
    expect(store.todoList).toEqual(mockTodos)
  })

  it('adds new todo', async () => {
    const store = useTodoListStore()
    mockedAxios.post.mockResolvedValueOnce({})
    mockedAxios.get.mockResolvedValueOnce({ data: [] })

    await store.addTodo({ description: 'New Todo', note: '' })
    expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), {
      description: 'New Todo',
      note: '',
    })
  })

  it('deletes todo', async () => {
    const store = useTodoListStore()
    mockedAxios.delete.mockResolvedValueOnce({})
    mockedAxios.get.mockResolvedValueOnce({ data: [] })

    await store.deleteTodo(1)
    expect(mockedAxios.delete).toHaveBeenCalledWith(expect.any(String))
  })

  it('toggles todo completion', async () => {
    const store = useTodoListStore()
    store.todoList = [
      {
        id: 1,
        description: 'Test Todo',
        isCompleted: false,
        created: new Date(),
        modified: new Date(),
      },
    ]

    mockedAxios.patch.mockResolvedValueOnce({})
    mockedAxios.get.mockResolvedValueOnce({ data: store.todoList })

    await store.toggleCompleted(1)
    expect(mockedAxios.patch).toHaveBeenCalledWith(expect.any(String), { isCompleted: true })
  })
})
