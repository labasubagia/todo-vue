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
          oninvalid="this.setCustomValidity('Please fill activity name')"
          onkeyup="this.setCustomValidity('')"
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
    todo() {
      if (!this.id) return null;
      return this.$store.getters['todo/getById'](this.id);
    },
    formTitle() {
      return this.todo ? 'Edit' : 'Add';
    },
  },
  watch: {
    todo: {
      immediate: true,
      handler(val) {
        if (!val) return;
        this.activity = val?.activity;
        this.isDone = val?.isDone;
      },
    },
  },
  methods: {
    onSubmit() {
      const action = this.id ? 'todo/update' : 'todo/add';
      this.$store.commit(action, {
        id: this.id,
        activity: this.activity,
        isDone: this.isDone,
      });
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
