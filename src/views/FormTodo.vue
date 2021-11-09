<template>
  <form
    class="bg-white rounded-lg divide-y-2 divide-blue-200"
    @submit.prevent="onSubmit"
  >
    <div class="flex justify-between items-center pb-4">
      <router-link to="/" class="px-2 text-sm rounded py-1 border-2">
        <ArrowLeftIcon class="w-4 h-4 text-gray-500" />
      </router-link>
      <p class="text-center w-full font-bold">{{ formTitle }} Todo</p>
    </div>

    <div>
      <div class="mt-4">
        <label class="text-sm" for="activity">Activity</label>
        <input
          id="activity"
          v-model="activity"
          class="
            rounded
            w-full
            p-3
            mt-1
            focus:outline-none
            border
            text-sm
            focus:border-blue-400
          "
          type="text"
          placeholder="e.g Cooking"
          required
        />
      </div>

      <div class="mt-4">
        <label>
          <input id="isDone" v-model="isDone" type="checkbox" />
          Done
        </label>
      </div>

      <div class="flex justify-center mt-2 mb-5">
        <button class="btn bg-green-400 mr-4">Save</button>
        <button type="button" class="btn bg-red-400" @click="goBack()">
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ArrowLeftIcon } from '@heroicons/vue/solid';
import { addTodo, updateTodo, getTodoById } from '@/store/todo';
export default {
  components: { ArrowLeftIcon },
  data() {
    return {
      activity: '',
      isDone: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    formTitle() {
      return this.id ? 'Edit' : 'Add';
    },
  },
  mounted() {
    this.loadTodo();
  },
  methods: {
    loadTodo() {
      if (!this.id) return;
      const todo = getTodoById(this.id);
      this.activity = todo.activity;
      this.isDone = todo.isDone;
    },
    onSubmit() {
      const payload = { activity: this.activity, isDone: this.isDone };
      if (this.id) {
        updateTodo(this.id, payload);
      } else {
        addTodo(payload);
      }
      this.goBack();
    },
    goBack() {
      this.clearForm();
      this.$router.replace({ path: '/' });
    },
    clearForm() {
      this.activity = '';
      this.isDone = false;
    },
  },
};
</script>

<style scoped>
.btn {
  @apply mt-4 py-2 px-4 text-white text-sm font-bold rounded;
}
</style>
