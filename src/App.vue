<template>
  <AppNavbar @open-form="openForm" @set-filter="handleFilterChange" />
  <main class="h-screen w-full">
    <FormTask v-if="showForm" @close="closeForm" @task-added="loadTasks" />
    <ListTasks :tasks="filteredTasks" @update-tasks="handleUpdateTasks" />
  </main>
</template>

<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import FormTask from './components/FormTask.vue'
import ListTasks from './components/ListTasks.vue'
import { ref, onMounted, computed } from 'vue'
import { getTasks, saveTasks } from '@/services/TaskService'
import type { Task } from '@/services/TaskService'

const showForm = ref(false)
const tasks = ref<Task[]>([])
const filter = ref<'all' | 'pending' | 'completed'>('all')

const openForm = () => (showForm.value = true)
const closeForm = () => (showForm.value = false)

const loadTasks = () => {
  tasks.value = getTasks()
}

const handleFilterChange = (value: 'all' | 'pending' | 'completed') => {
  filter.value = value
}

const filteredTasks = computed(() => {
  if (filter.value === 'all') return tasks.value
  if (filter.value === 'pending') return tasks.value.filter(t => !t.completed)
  if (filter.value === 'completed') return tasks.value.filter(t => t.completed)
  return tasks.value
})

const handleUpdateTasks = (updatedTasks: Task[]) => {
  tasks.value = updatedTasks
  saveTasks(updatedTasks)
}

onMounted(loadTasks)
</script>

<style scoped>
main {
  
}
</style>
