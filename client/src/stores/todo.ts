import { defineStore } from 'pinia'
import axios from 'axios'

export interface ToDoItem {
  id?: number
  description: string
  isCompleted: boolean
  note?: string
  created?: Date
  modified?: Date
}

// const url = 'http://localhost:3000'
const url = 'http://20.198.218.49:5000' // should use env var for more security!

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [] as ToDoItem[],
  }),
  getters: {
    getTodoList(state) {
      return state.todoList
    },
  },
  actions: {
    async addTodo({ description, note = '' }: { description: string; note: string }) {
      try {
        await axios
          .post(`${url}/todo`, {
            description,
            note,
          })
          .then(async () => {
            await this.fetchTodo()
          })
      } catch (error) {
        alert('Failed at creating Todo')
        console.error(error)
      }
    },
    async deleteTodo(itemID: number) {
      try {
        await axios.delete(`${url}/todo/${itemID}`)
        await this.fetchTodo()
      } catch (error) {
        alert('Failed at creating Todo')
        console.error(error)
      }
    },
    async editTodo(itemId: number, editedTodo: string) {
      try {
        await axios.patch(`${url}/todo/${itemId}`, {
          description: editedTodo,
        })
        await this.fetchTodo()
      } catch (error) {
        alert('Failed to update descipription')
        console.error(error)
      }
    },
    async editNote(itemId: number, editedNote: string) {
      try {
        await axios.patch(`${url}/todo/${itemId}`, {
          note: editedNote,
        })
        await this.fetchTodo()
      } catch (error) {
        alert('Failed to update note')
        console.error(error)
      }
    },
    async toggleCompleted(idToFind: number) {
      const todo = this.todoList.find((obj) => obj.id === idToFind)
      if (todo) {
        try {
          await axios
            .patch(`${url}/todo/${idToFind}`, {
              isCompleted: !todo.isCompleted,
            })
            .then(() => {
              todo.isCompleted = !todo?.isCompleted
              Promise.resolve()
            })
            .then(async () => {
              await this.fetchTodo()
            })
        } catch (error) {
          todo.isCompleted = todo?.isCompleted
          alert('Failed to update todo')
          console.error(error)
        }
      }
    },
    async fetchTodo() {
      try {
        const data = await axios.get(`${url}/todo`)
        this.todoList = data.data
      } catch (error) {
        alert(error)
        console.error(error)
      }
    },
  },
})
