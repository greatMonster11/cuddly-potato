<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TodoForm from '@/components/todo/TodoForm.vue'
import TodoList from '@/components/todo/TodoList.vue'

const route = useRoute()
// Get userRole from URL query parameter, default to empty string if not present
const userRole = computed(() => route.query.userRole?.toString() || '')
</script>

<template>
  <div class="container mx-auto my-10">
    <div class="md:w-1/2 mx-auto">
      <div class="bg-white shadow-md rounded-lg p-6">
        <TodoForm :userRole="userRole" />
        <TodoList :userRole="userRole" />
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
