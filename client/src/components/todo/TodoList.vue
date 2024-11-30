<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    const { todoList } = storeToRefs(store)
    const { toggleCompleted, deleteTodo, editTodo, editNote } = store
    const isPaidUser = props.userRole === 'paid'

    const editingTodoId = ref<number | null>(null)
    const editedTodoText = ref('')

    const editingNoteId = ref<number | null>(null)
    const editedNote = ref('')

    const startEditing = (todoId: number, currentDescription: string) => {
      editingTodoId.value = todoId
      editedTodoText.value = currentDescription
    }

    const saveTodoEdit = async (todoId: number) => {
      if (editedTodoText.value.trim()) {
        await editTodo(todoId, editedTodoText.value)
        editingTodoId.value = null
        editedTodoText.value = ''
      }
    }

    const cancelEditing = () => {
      editingTodoId.value = null
      editedTodoText.value = ''
    }

    const startEditingNote = (todoId: number, currentNote: string) => {
      editingNoteId.value = todoId
      editedNote.value = currentNote || ''
    }

    const saveNote = async (todoId: number) => {
      try {
        await editNote(todoId, editedNote.value)
        editingNoteId.value = null
        editedNote.value = ''
      } catch (error) {
        console.error('Failed to save note:', error)
      }
    }

    const cancelEditingNote = () => {
      editingNoteId.value = null
      editedNote.value = ''
    }

    return {
      todoList,
      toggleCompleted,
      deleteTodo,
      editTodo,
      store,
      isPaidUser,
      editingNoteId,
      editedNote,
      startEditingNote,
      saveNote,
      cancelEditingNote,
      editingTodoId,
      editedTodoText,
      startEditing,
      saveTodoEdit,
      cancelEditing,
    }
  },
  mounted() {
    this.store.fetchTodo()
  },
})
</script>

<template>
  <ul id="todo-list" v-for="todo in todoList" :key="todo.id">
    <li class="border-b border-gray-200 py-4">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center space-x-3">
          <input
            v-bind:checked="todo.isCompleted"
            @click.stop="toggleCompleted(todo.id as number)"
            type="checkbox"
            class="w-4 h-4"
          />

          <!-- Todo description (view mode) -->
          <span
            v-if="editingTodoId !== todo.id"
            :class="{ completed: todo.isCompleted }"
            class="text-gray-800"
          >
            {{ todo.description }}
          </span>

          <!-- Todo description (edit mode) -->
          <div v-else class="flex-1">
            <input
              v-model="editedTodoText"
              @keyup.enter="saveTodoEdit(todo.id as number)"
              @keyup.esc="cancelEditing"
              type="text"
              class="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
              ref="editInput"
              @blur="saveTodoEdit(todo.id as number)"
            />
          </div>

          <span class="text-gray-500 text-xs italic">{{
            '(' + new Date(todo.created as Date).toLocaleDateString() + ')'
          }}</span>
        </div>

        <div class="flex space-x-2">
          <button
            class="text-red-500 hover:text-red-700 px-2 py-1 text-sm delete-btn"
            @click="deleteTodo(todo.id as number)"
          >
            Delete
          </button>

          <!-- Edit button -->
          <button
            v-if="editingTodoId !== todo.id"
            @click="startEditing(todo.id as number, todo.description)"
            class="text-blue-500 hover:text-blue-700 px-2 py-1 text-sm edit-btn"
          >
            Edit
          </button>

          <!-- Cancel button (shown while editing) -->
          <button
            v-else
            @click="cancelEditing"
            class="text-gray-500 hover:text-gray-700 px-2 py-1 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Note section for paid users -->
      <div v-if="isPaidUser" class="ml-7">
        <!-- Note viewing mode -->
        <div v-if="editingNoteId !== todo.id" class="bg-gray-50 rounded-lg p-3 mt-2 relative group">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <svg
                class="w-4 h-4 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span class="text-gray-600 text-sm">
                {{ todo.note || 'No note added' }}
              </span>
            </div>
            <button
              @click="startEditingNote(todo.id as number, todo.note as string)"
              class="text-blue-500 hover:text-blue-700 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Edit Note
            </button>
          </div>
        </div>

        <!-- Note editing mode -->
        <div v-else-if="editingNoteId === todo.id" class="bg-gray-50 rounded-lg p-3 mt-2">
          <textarea
            v-model="editedNote"
            class="w-full p-2 border rounded-md text-sm"
            rows="3"
            placeholder="Add a note..."
          ></textarea>
          <div class="flex justify-end space-x-2 mt-2">
            <button
              @click="cancelEditingNote"
              class="text-gray-500 hover:text-gray-700 text-sm px-3 py-1"
            >
              Cancel
            </button>
            <button
              @click="saveNote(todo.id as number)"
              class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
