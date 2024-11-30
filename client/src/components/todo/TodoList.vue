<script lang="ts">
import { defineComponent } from 'vue'
import { useTodoListStore } from '@/stores/todo'
import { storeToRefs } from 'pinia'

export default defineComponent({
  props: {
    userRole: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useTodoListStore()
    // storeToRefs lets todoList keep reactivity:
    const { todoList } = storeToRefs(store)
    // destructuring action method doesn't require using storeToRefs:
    const { toggleCompleted, deleteTodo, editTodo } = store
    const isPaidUser = props.userRole === 'paid'

    return { todoList, toggleCompleted, deleteTodo, editTodo, store, isPaidUser }
  },
  mounted() {
    this.store.fetchTodo()
  },
})
</script>

<template>
  <ul id="todo-list" v-for="todo in todoList" :key="todo.id">
    <li class="border-b border-gray-200 flex items-center justify-between py-4">
      <label class="flex items-center">
        <input
          v-bind:checked="todo.isCompleted"
          @click.stop="toggleCompleted(todo.id as number)"
          type="checkbox"
          class="mr-2"
        />
        <span :class="{ completed: todo.isCompleted }">{{ todo.description }}</span>
        <span class="text-gray-500 text-xs italic">{{
          '(' + new Date(todo.created as Date).toLocaleDateString() + ')'
        }}</span>
        <span class="text-right" v-if="isPaidUser">{{ todo.note }}</span>
      </label>
      <div>
        <button
          class="text-red-500 hover:text-red-700 mr-2 delete-btn"
          @click="deleteTodo(todo.id as number)"
        >
          Delete
        </button>
        <button
          @click.stop="editTodo(todo.id as number)"
          class="text-blue-500 hover:text-blue-700 edit-btn"
        >
          Edit
        </button>
        <br />
      </div>
    </li>
  </ul>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
