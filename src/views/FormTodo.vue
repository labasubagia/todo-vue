<template>
  <form
    class="bg-white rounded-lg divide-y-2 divide-blue-200"
    @submit.prevent="onSubmit"
  >
    <div class="flex justify-between items-center pb-4">
      <button
        type="button"
        class="px-2 text-sm rounded py-1 border-2"
        @click="goBack"
      >
        <ArrowLeftIcon class="w-4 h-4 text-gray-500" />
      </button>
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
        <button type="button" class="btn bg-red-400" @click="goBack">
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ArrowLeftIcon } from '@heroicons/vue/solid';
import { computed, ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { watch } from '@vue/runtime-core';

export default {
  components: {
    ArrowLeftIcon,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const activity = ref('');
    const isDone = ref(false);

    const id = computed(() => route.params.id);
    const todo = computed(() => store.getters['todo/getById'](id.value));
    const formTitle = computed(() => (todo.value ? 'Edit' : 'Add'));

    watch(
      () => todo,
      (todo) => {
        if (!todo.value) return;
        activity.value = todo.value?.activity;
        isDone.value = todo.value?.isDone;
      },
      { immediate: true }
    );

    const onSubmit = () => {
      const action = todo.value ? 'todo/update' : 'todo/add';
      store.commit(action, {
        id: id.value,
        activity: activity.value,
        isDone: isDone.value,
      });
      goBack();
    };

    const goBack = () => {
      clearForm();
      router.replace({ path: '/' });
    };

    const clearForm = () => {
      activity.value = '';
      isDone.value = false;
    };

    return {
      activity,
      isDone,
      id,
      todo,
      formTitle,
      goBack,
      clearForm,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.btn {
  @apply mt-4 py-2 px-4 text-white text-sm font-bold rounded;
}
</style>
