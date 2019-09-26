import Vue from 'vue';
import Vuex from 'vuex';
import moviesModules from './movies/moviesModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // app: appModule,
    movies: moviesModules,
  },
});
