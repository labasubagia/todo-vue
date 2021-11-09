<template>
  <div class="bg-blue-50 px-4 py-3 mb-2 rounded flex justify-between">
    <div class="flex items-center cursor-pointer w-full" @click="toggleDone">
      <!-- Name -->
      <span :class="{ 'line-through': isDone }">
        {{ activity }}
      </span>
    </div>

    <!-- Actions -->
    <div class="flex items-center">
      <!-- Edit -->
      <router-link class="mr-2" :to="`/form/${id}`">
        <PencilAltIcon class="w-7 text-yellow-600 cursor-pointer" />
      </router-link>

      <!-- Remove -->
      <TrashIcon class="w-7 text-red-500 cursor-pointer" @click="remove" />
    </div>
  </div>
</template>

<script>
import { PencilAltIcon, TrashIcon } from '@heroicons/vue/outline';
import { useStore } from 'vuex';

export default {
  components: {
    PencilAltIcon,
    TrashIcon,
  },
  props: {
    isDone: Boolean,
    activity: String,
    id: String,
  },
  setup(props) {
    const store = useStore();

    const remove = () => {
      store.commit('todo/remove', props.id);
    };

    const toggleDone = () => {
      store.commit('todo/toggleDone', props.id);
    };

    return { remove, toggleDone };
  },
};
</script>
