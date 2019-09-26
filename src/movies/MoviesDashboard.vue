<template>
  <div>
    <Table
      v-bind:dataSource="allFilms"
      v-bind:columns="columns"
      :rowKey="record => record.episodeId"
      v-bind:loading="loading()"
    >
      <span slot="releaseDate" slot-scope="releaseDate">
        {{ createDate(releaseDate) }}
      </span>
    </Table>
  </div>
</template>

<script>
import Table from 'ant-design-vue/lib/table';
import gql from 'graphql-tag';

export default {
  name: 'MoviesDashboard',
  components: { Table },
  apollo: {
    allFilms: gql`
      query getFilms {
        allFilms(orderBy: releaseDate_ASC) {
          title
          episodeId
          releaseDate
        }
      }
    `,
  },
  methods: {
    loading() {
      return this.allFilms.length <= 0;
    },
    createDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    },
  },
  data() {
    return {
      allFilms: [],
      columns: [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Episode',
          dataIndex: 'episodeId',
          key: 'episodeId',
        },
        {
          title: 'Release Date',
          dataIndex: 'releaseDate',
          key: 'releaseDate',
          scopedSlots: { customRender: 'releaseDate' },
        },
      ],
    };
  },
};
</script>

<style scoped></style>
