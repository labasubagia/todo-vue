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
        :on-remove="remove"
        :on-toggle-done="toggleTodo"
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
import { getAllTodo, toggleIsDone, removeTodo } from '@/store/todo';
import TodoItem from '@/components/TodoItem.vue';

export default {
  components: {
    PlusCircleIcon,
    TodoItem,
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
