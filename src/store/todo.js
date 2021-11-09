import { nanoid } from 'nanoid';

const todoStore = {
  namespaced: true,

  state: () => ({
    list: [],
  }),

  getters: {
    getAllSorted(state) {
      // Sorted by isDone == false
      return state.list.sort((a, b) => a.isDone - b.isDone);
    },
    getById: (state) => (id) => {
      return state.list.find((item) => item.id == id);
    },
  },

  mutations: {
    add(state, { activity, isDone = false }) {
      state.list.push({ id: nanoid(), activity, isDone });
    },
    update(state, { id, activity, isDone }) {
      const index = state.list.findIndex((item) => item.id == id);
      state.list[index] = { ...state.list[index], activity, isDone };
    },
    toggleDone(state, id) {
      const index = state.list.findIndex((item) => item.id == id);
      state.list[index].isDone = !state.list[index].isDone;
    },
    remove(state, id) {
      state.list = state.list.filter((item) => item.id != id);
    },
  },
};

export default todoStore;
