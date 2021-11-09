import { createRouter, createWebHashHistory } from 'vue-router';
import ListTodo from '@/views/ListTodo.vue';
import FormTodo from '@/views/FormTodo.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ListTodo,
    },
    {
      path: '/form/:id?',
      name: 'Form',
      component: FormTodo,
    },
  ],
});

export default router;
