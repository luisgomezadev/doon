<template>
  <div>
    <nav class="p-4 fixed w-full shadow-lg shadow-gray-500 bg-gray-200/10 backdrop-blur-xl xl:bg-transparent xl:backdrop-blur-none xl:shadow-none">
      <div class="relative container mx-auto flex flex-col xl:flex-row justify-between items-center gap-y-4">
        <div class="text-black font-semibold text-2xl border-b-2 border-black xl:border-none w-full xl:w-fit text-center">DOON</div>

        <div
          class="xl:absolute xl:left-1/2 transform xl:-translate-x-1/2 bg-black border border-gray-300 rounded-full px-4 py-2 flex items-center space-x-2 max-w-lg w-full"
        >
          <input
            type="text"
            placeholder="Buscar tareas..."
            class="bg-white/20 outline-none text-white rounded-full px-3 py-1 flex-grow"
          />
          <button
            @click.prevent="emit('open-form')"
            class="text-white border-2 border-white font-semibold rounded-full py-1 px-3 hover:bg-white hover:text-black transition-colors duration-300"
          >
            Nueva tarea
          </button>
        </div>

        <div class="space-x-4 text-xl">
          <div
            class="bg-black border-4 border-black overflow-hidden rounded-full flex items-center"
          >
            <button
              @click="setFilter('all')"
              :class="filter === 'all' ? 'bg-white text-black' : 'bg-black text-white hover:opacity-50'"
              class="px-3 py-1 rounded-full transition-all"
            >
              Todas
            </button>
            <button
              @click="setFilter('pending')"
              :class="filter === 'pending' ? 'bg-white text-black' : 'bg-black text-white hover:opacity-50'"
              class="px-3 py-1 rounded-full transition-all"
            >
              Pendientes
            </button>
            <button
              @click="setFilter('completed')"
              :class="filter === 'completed' ? 'bg-white text-black' : 'bg-black text-white hover:opacity-50'"
              class="px-3 py-1 rounded-full transition-all"
            >
              Completadas
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['open-form', 'set-filter']);
const filter = ref('all');

function setFilter(value: string) {
  filter.value = value;
  emit('set-filter', value);
}
</script>
