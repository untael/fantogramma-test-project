<template>
  <div class="table-display">
    <router-link
      :to="{path: '/'}"
    >
      <el-button
        type="primary"
        plain
      >
        Home
      </el-button>
    </router-link>

    <el-button
      type="primary"
      plain
      @click="changeLocale($i18n.locale)"
    >
      Change locale
    </el-button>

    <el-table
      v-loading="loading"
      class="table-display__table"
      :data="table.rows"
    >
      <el-table-column
        v-for="(column, i) in table.columns"
        :key="i"
        :prop="column"
        width="180"
      >
        <template #header>
          <div
            :class="getHeaderClass(column)"
            @click="sortArray(column)"
          >
            {{ $t(column) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import api from '../domain-modules/api'
import Table from '../classes/Table/Table'

@Component({})
export default class TableDisplay extends Vue {
  loading = false
  table: Table = new Table()
  sortingProp = ''
  sortOrder = 'asc'

  sortArray (key: string): void {
    if (this.sortingProp === key) {
      this.table.rows.reverse()
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      this.table.rows.sort((a, b) => a[key].localeCompare(b[key], undefined, {
        numeric: true,
        sensitivity: 'base'
      })
      )
      this.sortOrder = 'asc'
      this.sortingProp = key
    }
  }

  getHeaderClass (key: string): string {
    if (key === this.sortingProp) {
      return this.sortOrder === 'asc' ? 'table-display__table__header--asc' : 'table-display__table__header--desc'
    }
    return ''
  }

  changeLocale (locale: string): void {
    switch (locale) {
      case 'en':
        this.$i18n.locale = 'ru'
        break
      case 'ru':
        this.$i18n.locale = 'en'
        break
    }
  }

  async mounted () {
    this.loading = true
    this.table = await api.tables.get()
    this.loading = false
    this.sortArray('keys')
  }
}
</script>

<style lang="scss">
.table-display {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__table {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50% !important;
    padding: 20px;

    &__header {
      &--asc {
        background-color: rgba(0, 255, 0, 0.2);
      }

      &--desc {
        background-color: rgba(0, 0, 255, 0.2);
      }
    }
  }

  button {
    margin: 10px;
  }
}
</style>
