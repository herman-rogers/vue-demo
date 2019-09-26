import Vue from 'vue';
import Router from 'vue-router';
import MoviesDashboard from '@/movies/MoviesDashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'movies',
      component: MoviesDashboard,
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('./characters/CharactersDashboard.vue'),
    },
  ],
});
