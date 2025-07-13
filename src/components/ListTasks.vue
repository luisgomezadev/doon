<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-14 pt-60 xl:pt-32 px-4 max-w-7xl mx-auto gap-5"
  >
    <div
      v-for="(task, index) in tasks"
      :key="task.id"
      class="shadow-md rounded-xl p-4 border-2 border-black flex flex-col"
      :style="{ backgroundColor: colors[index % colors.length] }"
    >
      <h3 class="text-xl font-semibold text-gray-800">
        {{ task.title }}
      </h3>
      <p class="text-gray-700 mt-1 flex-1">
        {{ task.description }}
      </p>
      <div class="flex items-center justify-between mt-2">
        <div class="text-sm bg-black/80 flex items-center w-fit py-0.5 px-3 rounded-full">
          <span class="flex items-center gap-1" :style="{ color: colors[index % colors.length] }"
            ><svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="15px"
              width="15px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path>
            </svg>
            {{ task.completed ? 'Completada' : 'Pendiente' }}</span
          >
        </div>
        <div class="flex gap-2">
          <button
            v-if="!task.completed"
            @click="completed(task.id)"
            class="text-black border-2 border-black font-semibold rounded-full py-1 px-3 hover:bg-black/10 hover:text-black transition-colors duration-300"
          >
            Completar
          </button>
          <button
            v-if="!task.completed"
            @click="editTask(task)"
            class="text-black border-2 border-black font-semibold rounded-full py-1 px-3 hover:bg-black/10 hover:text-black transition-colors duration-300"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/services/TaskService'
import { useToast } from 'vue-toastification'


const toast = useToast()

const props = defineProps<{ tasks: Task[] }>()
const emit = defineEmits(['update-tasks', 'edit-task'])

function completed(taskId: string) {
  const updatedTask = props.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: true } : task,
  )
  emit('update-tasks', updatedTask)
  toast.success('Tarea completada')
}

function editTask(task: Task) {
  emit('edit-task', task)
}

const colors = [
  '#97FFB6',
  '#B17DFF',
  '#7DC2FF',
  '#FF7D7D',
  '#7DFFDE',
  '#7D7DFF',
  '#FFFFFF',
  '#7DF2FF',
  '#B5CFFF',
  '#FFE17D',
  '#D2FFC0',
  '#FCC0FF',
  '#FFD3C0',
  '#BE94F2',
  '#D0EEFF',
]
</script>

<style scoped></style>
