<template>
  <div
    class="
      flex
      justify-center
      items-center
      font-main
      text-gray-700
      bg-blue-50
      h-screen
      w-screen
    "
  >
    <div
      class="
        w-full
        h-screen
        sm:h-auto sm:w-6/12
        md:w-3/12
        bg-white
        rounded-md
        overflow-hidden
        shadow-lg
      "
    >
      <HeaderTop :message="viewName" />
      <div class="p-4 mt-2">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTop from '@/components/HeaderTop.vue';
export default {
  components: {
    HeaderTop,
  },
  computed: {
    viewName() {
      return this.$route.name;
    },
  },
};
</script>
