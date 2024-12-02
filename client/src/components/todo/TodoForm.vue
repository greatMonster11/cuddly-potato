<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useTodoListStore } from '@/stores/todo'

export default defineComponent({
  props: {
    userRole: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isPaidUser = props.userRole === 'paid'
    const todo = ref('')
    const note = ref('')
    // store
    const store = useTodoListStore()

    function addItemAndClear() {
      if (todo.value.length === 0) {
        return
      }
      // invokes function in the store:
      store.addTodo({ description: todo.value, note: isPaidUser ? note.value : '' })

      // fallback
      todo.value = ''
      note.value = ''
    }

    return { isPaidUser, todo, note, addItemAndClear, store }
  },
})
</script>

<template>
  <form id="todo-form" @submit.prevent="addItemAndClear">
    <div class="flex mb-1">
      <input
        class="w-full px-4 py-2 mr-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
        id="todo-input"
        required
        v-model="todo"
        placeholder="Add new task..?"
        type="text"
      />
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add
      </button>
    </div>
    <div class="flex mb-4">
      <br />
      <input
        v-if="isPaidUser"
        class="w-full px-4 py-2 mr-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
        id="todo-input"
        v-model="note"
        placeholder="Add a note (optional)..."
        type="text"
      />
    </div>
  </form>
</template>
