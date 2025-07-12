<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-14 pt-60 xl:pt-32 px-4 max-w-7xl mx-auto gap-5"
  >
    <div
      v-for="(task, index) in tasks"
      :key="task.id"
      class="shadow-md rounded-lg p-4 border-4 border-black flex flex-col"
      :class="bgColors[index % bgColors.length]"
    >
      <h3 class="text-xl font-semibold text-gray-800">
        {{ task.title }}
      </h3>
      <p class="text-gray-700 mt-1 flex-1">
        {{ task.description }}
      </p>
      <div class="flex items-center justify-between mt-2">
        <div class="text-sm bg-black/20 flex items-center w-fit py-0.5 px-3 rounded-full">
          · {{ task.completed ? 'Completada' : 'Pendiente' }}
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

const props = defineProps<{ tasks: Task[] }>()
const emit = defineEmits(['update-tasks', 'edit-task'])

function completed(taskId: string) {
  const updatedTask = props.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: true } : task,
  )
  emit('update-tasks', updatedTask)
}

function editTask(task: Task) {
  emit('edit-task', task)
}

const bgColors = [
  'bg-[#97FFB6]',
  'bg-[#B17DFF]',
  'bg-[#7DC2FF]',
  'bg-[#FF7D7D]',
  'bg-[#7DFFDE]',
  'bg-[#7D7DFF]',
  'bg-[#FFFFFF]',
  'bg-[#7DF2FF]',
  'bg-[#B5CFFF]',
  'bg-[#FFE17D]',
  'bg-[#D2FFC0]',
  'bg-[#FCC0FF]',
  'bg-[#FFD3C0]',
  'bg-[#BE94F2]',
  'bg-[#D0EEFF]',
]
</script>

<style scoped></style>
