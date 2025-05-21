<template>
  <el-container>
    <el-aside>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :value="false">expand</el-radio-button>
        <el-radio-button :value="true">collapse</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <router-link to="/">
          <el-menu-item index="1">
            <el-icon><House /></el-icon>
            <template #title>Home</template>
          </el-menu-item>
        </router-link>
        <router-link to="/table">
          <el-menu-item index="2">
            <el-icon><DataAnalysis /></el-icon>
            <template #title>Task Table</template>
          </el-menu-item>
        </router-link>
        <router-link to="/calendar">
          <el-menu-item index="3">
            <el-icon><Calendar /></el-icon>
            <template #title>Calendar</template>
          </el-menu-item>
        </router-link>
        <router-link to="/setting">
          <el-menu-item index="4">
            <el-icon><Setting /></el-icon>
            <template #title>Setting</template>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
a {
  text-decoration: none;
}
</style>
