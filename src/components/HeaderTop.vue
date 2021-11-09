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
export default {
  props: {
    message: String,
  },
  computed: {
    page() {
      return this.message ? `| ${this.message}` : null;
    },
  },
};
</script>
