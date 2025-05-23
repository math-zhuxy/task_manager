<template>
  <el-container>
    <el-aside>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :value="false">expand</el-radio-button>
        <el-radio-button :value="true">collapse</el-radio-button>
      </el-radio-group>
      <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose" @select="handleSelect">
        <el-menu-item index="/">
          <el-icon>
            <House />
          </el-icon>
          <template #title>Home</template>
        </el-menu-item>
        <el-menu-item index="/table">
          <el-icon>
            <DataAnalysis />
          </el-icon>
          <template #title>Task Table</template>
        </el-menu-item>
        <el-menu-item index="/calendar">
          <el-icon>
            <Calendar />
          </el-icon>
          <template #title>Calendar</template>
        </el-menu-item>
        <el-menu-item index="/setting">
          <el-icon>
            <Setting />
          </el-icon>
          <template #title>Setting</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <router-view />
  </el-container>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isCollapse = ref(true)
const router = useRouter()
const route = useRoute()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleSelect = (index: string) => {
  if (index !== route.path) {
    router.push(index)
  }
}

interface TaskTableInfo {
  name: string
  priority: "low" | "medium" | "high"
  type: string
  detail: string
  isdone: boolean
  date: string
}

interface TaskCalendarInfo {
  name: string
  priority: "low" | "medium" | "high"
  type: string
  detail: string
  isdone: boolean
}

const TaskDataList = ref<TaskTableInfo[]>([
  {
    name: "示例任务",
    priority: "low",
    type: "任意",
    detail: "展示一个任务有哪些字段",
    isdone: false,
    date: "2025-07-23"
  }
])

const TaskDataMap = ref<Map<string, TaskCalendarInfo>>(new Map())
TaskDataMap.value.set("2025-07-23", {
  name: "示例任务",
  priority: "low",
  type: "任意",
  detail: "展示一个任务有哪些字段",
  isdone: false
})

provide("TaskDataList", TaskDataList)
provide("TaskDataMap", TaskDataMap)
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
