import { createStore } from 'vuex';
import todoStore from '@/store/todo';

const store = createStore({
  modules: {
    todo: todoStore,
  },
});

export default store;
