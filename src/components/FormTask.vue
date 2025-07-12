<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all px-3"
  >
    <div class="bg-black text-white rounded-xl p-6 shadow-xl w-full max-w-lg relative mx-5">
      <h2 class="text-2xl font-semibold mb-4">Nueva tarea</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="title">Título</label>
          <input
            id="title"
            v-model="title"
            type="text"
            class="bg-white/10 w-full rounded-md py-1 px-3 text-white"
            placeholder="Ej: Estudiar para el examen"
            required
          />
        </div>
        <div>
          <label for="description">Descripción</label>
          <textarea
            id="description"
            v-model="description"
            rows="4"
            class="bg-white/10 w-full rounded-md py-1 px-3 text-white"
            placeholder="Ej: Estudiar para el examen de sistemas del día viernes"
          ></textarea>
        </div>
        <div class="flex items-center gap-4 mt-4 w-full">
          <button
            type="button"
            @click="emit('close')"
            class="flex-1 text-base rounded-full bg-black border-4 border-white py-1 px-3 font-semibold hover:bg-white/10 transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="flex-1 text-base rounded-full text-black bg-white border-4 border-white py-1 px-3 font-semibold hover:bg-white/90 hover:border-white/70 transition-all duration-300"
          >
            Guardar tarea
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { addTask } from '@/services/TaskService'
import type { Task } from '@/services/TaskService'

const emit = defineEmits(['close', 'task-added'])

const title = ref('')
const description = ref('')

function handleSubmit() {
  if (!title.value.trim()) return

  const newTask: Task = {
    id: crypto.randomUUID(),
    title: title.value.trim(),
    description: description.value.trim(),
    completed: false,
  }

  addTask(newTask)
  emit('task-added')
  emit('close')

  title.value = ''
  description.value = ''
}

</script>
