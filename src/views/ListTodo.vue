<template>
  <div class="flex justify-between items-center">
    <h1 class="font-bold">List of Todo</h1>
    <router-link to="/form" class="p-1 bg-green-400 rounded">
      <PlusCircleIcon class="w-8 text-white" />
    </router-link>
  </div>

  <div class="mt-4">
    <div v-if="todoList.length">
      <TodoItem
        v-for="{ id, activity, isDone } in todoList"
        :id="id"
        :key="id"
        :activity="activity"
        :is-done="isDone"
      />
    </div>
    <div
      v-else
      class="px-8 py-16 flex justify-center items-center rounded-lg bg-gray-50"
    >
      <h1 class="text-xl font-bold text-gray-300">Todo is Empty</h1>
    </div>
  </div>
</template>

<script>
import { PlusCircleIcon } from '@heroicons/vue/solid';
import TodoItem from '@/components/TodoItem.vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  components: {
    PlusCircleIcon,
    TodoItem,
  },
  setup() {
    const store = useStore();
    const todoList = computed(() => store.getters['todo/getAllSorted']);
    return { todoList };
  },
};
</script>
