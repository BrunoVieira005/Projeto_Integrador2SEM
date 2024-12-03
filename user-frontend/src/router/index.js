import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue'; 
import Dashboard from '../views/Dashboard.vue'; 
import Details from '@/views/Details.vue'; // Importando a nova página de detalhes
import Newest from '@/views/Newest.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/newest',
    name: 'Newest',
    component: Newest,
    meta: { requiresAuth: true },
  },
  {
    path: '/livro/:id', // Rota para detalhes do livro, com ID como parâmetro
    name: 'Details',
    component: Details,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)', // Usando a nova sintaxe para rotas coringa
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Proteção das rotas
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
