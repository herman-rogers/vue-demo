<template>
  <Table
    v-bind:dataSource="allPersons"
    v-bind:columns="columns"
    :rowKey="record => record.id"
    v-bind:loading="loading()"
  >
    <div
      slot="filterDropdown"
      slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      class="custom-filter-dropdown"
    >
      <Input
        v-ant-ref="c => (searchInput = c)"
        :placeholder="`Search ${column.dataIndex}`"
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
        style="width: 188px; margin-bottom: 8px; display: block;"
      />
      <Button
        type="primary"
        @click="() => handleSearch(selectedKeys, confirm)"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
      >
        Search
      </Button>
      <Button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">
        Reset
      </Button>
    </div>
    <Icon
      slot="filterIcon"
      slot-scope="filtered"
      type="search"
      :style="{ color: filtered ? '#108ee9' : undefined }"
    />
    <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>{{ text || 'Unknown' }}</template>
    </template>
    <span slot="gender" slot-scope="gender">
      {{ gender.toLowerCase() }}
    </span>
    <div class="tag-container" slot="films" slot-scope="films">
      <Tag v-for="film in films" color="blue" :key="film.id">{{ film.title }}</Tag>
    </div>
  </Table>
</template>

<script>
import Table from 'ant-design-vue/lib/table';
import Tag from 'ant-design-vue/lib/tag';
import Icon from 'ant-design-vue/lib/icon';
import Button from 'ant-design-vue/lib/button';
import Input from 'ant-design-vue/lib/input';
import gql from 'graphql-tag';

export default {
  name: 'CharactersDashboard',
  components: { Table, Tag, Button, Input, Icon },
  apollo: {
    allPersons: gql`
      query getPeople {
        allPersons {
          name
          id
          birthYear
          gender
          homeworld {
            id
            name
          }
          films {
            id
            episodeId
            title
          }
        }
      }
    `,
  },
  methods: {
    loading() {
      return this.allPersons.length <= 0;
    },
    handleSearch(selectedKeys, confirm) {
      confirm();
      this.searchText = selectedKeys[0];
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
  },
  data() {
    return {
      searchText: '',
      searchInput: null,
      allPersons: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
          scopedSlots: { customRender: 'gender' },
        },
        {
          title: 'Home World',
          dataIndex: 'homeworld.name',
          key: 'homeworld.name',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) => {
            const { homeworld } = record;
            if (!homeworld) {
              return false;
            }
            return homeworld.name.toLowerCase().includes(value.toLowerCase());
          },
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: 'Films',
          dataIndex: 'films',
          key: 'films',
          scopedSlots: { customRender: 'films' },
        },
      ],
    };
  },
};
</script>

<style scoped>
.tag-container {
  display: flex;
  flex-direction: column;
  max-width: 15%;
}

.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
