<template>
  <div class="flex justify-between items-center">
    <h1 class="font-bold">List of Todo</h1>
    <router-link to="/form" class="p-1 bg-green-400 rounded">
      <PlusCircleIcon class="w-8 text-white" />
    </router-link>
  </div>

  <div class="mt-4">
    <ul v-if="todoList.length">
      <li
        v-for="(todo, i) in todoList"
        :key="i"
        class="bg-blue-50 px-4 py-3 mb-2 rounded flex justify-between"
      >
        <div
          class="flex items-center cursor-pointer w-full"
          @click="toggleTodo(todo.id)"
        >
          <span :class="{ 'line-through': todo.isDone }">
            {{ todo.activity }}
          </span>
        </div>

        <div class="flex items-center">
          <!-- Edit -->
          <router-link class="mr-2" :to="`/form/${todo.id}`">
            <PencilAltIcon class="w-7 text-yellow-600 cursor-pointer" />
          </router-link>

          <!-- Remove -->
          <TrashIcon
            class="w-7 text-red-500 cursor-pointer"
            @click="remove(todo.id)"
          />
        </div>
      </li>
    </ul>
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
import { PencilAltIcon, TrashIcon } from '@heroicons/vue/outline';
import { getAllTodo, toggleIsDone, removeTodo } from '@/store/todo';

export default {
  components: {
    PlusCircleIcon,
    PencilAltIcon,
    TrashIcon,
  },
  data() {
    return {
      todoList: getAllTodo(),
    };
  },
  mounted() {
    this.loadTodoList();
  },
  methods: {
    loadTodoList() {
      this.todoList = getAllTodo();
      this.$forceUpdate();
    },
    toggleTodo(id) {
      toggleIsDone(id);
      this.loadTodoList();
    },
    remove(id) {
      removeTodo(id);
      this.loadTodoList();
    },
  },
};
</script>
