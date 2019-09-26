import gql from 'graphql-tag';

const moviesModule = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getMovies() {
      const response = await this.$apollo.query({
        query: gql`
          query getFilms {
            allFilms(orderBy: releaseDate_ASC) {
              title
              episodeId
              releaseDate
            }
          }
        `,
      });
      console.log(response);
    },
  },
};

export default moviesModule;
