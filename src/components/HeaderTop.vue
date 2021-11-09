<template>
  <div
    class="
      bg-blue-400
      text-center
      flex
      justify-center
      font-bold
      items-center
      h-14
      w-full
    "
  >
    <p class="text-white text-xl">Todo {{ page }}</p>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';

export default {
  props: {
    message: String,
  },
  setup(props) {
    const page = computed(() => (props.message ? `| ${props.message}` : ''));
    return { page };
  },
};
</script>
