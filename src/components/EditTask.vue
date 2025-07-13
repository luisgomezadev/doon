<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all px-3"
  >
    <div class="bg-black text-white rounded-xl p-6 shadow-xl w-full max-w-lg relative mx-5">
      <h2 class="text-2xl font-semibold mb-4">Editar tarea</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="title">Título</label>
          <input
            id="title"
            type="text"
            v-model="editedTitle"
            class="bg-white/10 w-full rounded-md py-1 px-3 text-white"
            placeholder="Ej: Estudiar para el examen"
            required
          />
        </div>
        <div>
          <label for="description">Descripción</label>
          <textarea
            id="description"
            rows="4"
            v-model="editedDescription"
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
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import type { Task } from '@/services/TaskService'
import { useToast } from 'vue-toastification';

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['close', 'task-updated'])

const toast = useToast()

// Inicia los campos con los valores de la tarea a editar
const editedTitle = ref(props.task.title)
const editedDescription = ref(props.task.description)

// Si el prop cambia, actualiza los valores
watch(
  () => props.task,
  (newTask) => {
    editedTitle.value = newTask.title
    editedDescription.value = newTask.description
  }
)

function handleSubmit() {
  const updatedTask: Task = {
    ...props.task,
    title: editedTitle.value.trim(),
    description: editedDescription.value.trim(),
  }
  emit('task-updated', updatedTask)
  emit('close')
  toast.success('Tarea actualizada')
}
</script>

<style scoped></style>
