<template>
  <div class="home">
    <router-link
      v-for="(module,i) in modules"
      :key="i"
      :to="{path: module.path}"
    >
      <el-button
        type="primary"
        plain
      >
        {{ module.name }}
      </el-button>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
  modules: Array<any> = [
    { name: 'Таблица', path: 'table' },
    { name: 'Холст', path: 'canvas' }
  ]
}
</script>

<style lang="scss">
.home {
  button {
    margin: 5px;
  }
}
</style>
