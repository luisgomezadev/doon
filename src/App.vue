<template>
  <AppNavbar @open-form="openForm" @set-filter="handleFilterChange" />
  <main class="h-screen w-full">
    <!-- Modal para crear tarea -->
    <FormTask
      v-if="showForm"
      @close="closeForm"
      @task-added="loadTasks"
    />
    <!-- Modal para editar tarea -->
    <EditTask
      v-if="editingTask"
      :task="editingTask"
      @close="editingTask = null"
      @task-updated="handleTaskUpdated"
    />
    <ListTasks
      :tasks="filteredTasks"
      @update-tasks="handleUpdateTasks"
      @edit-task="openEditTask"
    />
  </main>
</template>

<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import FormTask from './components/FormTask.vue'
import ListTasks from './components/ListTasks.vue'
import EditTask from './components/EditTask.vue'
import { ref, onMounted, computed } from 'vue'
import { getTasks, saveTasks } from '@/services/TaskService'
import type { Task } from '@/services/TaskService'

const showForm = ref(false)
const editingTask = ref<Task | null>(null)
const tasks = ref<Task[]>([])
const filter = ref<'all' | 'pending' | 'completed'>('all')

const openForm = () => (showForm.value = true)
const closeForm = () => (showForm.value = false)

const loadTasks = () => {
  tasks.value = getTasks()
}

function handleFilterChange(value: 'all' | 'pending' | 'completed') {
  filter.value = value
}

const filteredTasks = computed(() => {
  if (filter.value === 'all') return tasks.value
  if (filter.value === 'pending') return tasks.value.filter((t) => !t.completed)
  if (filter.value === 'completed') return tasks.value.filter((t) => t.completed)
  return tasks.value
})

function handleUpdateTasks(updatedTasks: Task[]) {
  tasks.value = updatedTasks
  saveTasks(updatedTasks)
}

function handleTaskUpdated(updatedTask: Task) {
  tasks.value = tasks.value.map((t) =>
    t.id === updatedTask.id ? updatedTask : t
  )
  saveTasks(tasks.value)
}

function openEditTask(task: Task) {
  editingTask.value = task
}

onMounted(loadTasks)
</script>

<style scoped>
</style>
