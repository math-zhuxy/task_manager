<template>
  <el-container>
    <el-aside style="margin-left: 1%; margin-right: 5%;" width="auto">
      <el-card style="cursor: pointer; margin-top: 16%; border-radius: 15px;" @click="backToMainPage" shadow="hover">
        <div style="display: flex; align-items: center; margin-left: 1%; gap: 14px; ">
          <el-icon size="30px">
            <Coffee />
          </el-icon>
          <span>Made By ZXY</span>
          <span style="display: flex; align-items: center;">
            <el-tooltip content="更多内容请查看https://github.com/math-zhuxy" placement="right" width="200">
              <el-icon size="25px">
                <Warning />
              </el-icon>
            </el-tooltip>
          </span>
        </div>
      </el-card>
      <br>
      <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
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
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

function backToMainPage() {
  router.push("/")
}

const handleSelect = (index: string) => {
  if (index !== route.path) {
    router.push(index)
  }
}

export interface TaskTableInfo {
  name: string
  priority: "low" | "medium" | "high"
  type: string
  detail: string
  isdone: "not-started" | "in-progress" | "completed"
  date: string
}

export interface TaskCalendarInfo {
  name: string
  priority: "low" | "medium" | "high"
  type: string
  detail: string
  isdone: "not-started" | "in-progress" | "completed"
}

const TaskDataList = ref<TaskTableInfo[]>([
  {
    name: "示例任务",
    priority: "medium",
    type: "任意",
    detail: "展示一个任务有哪些字段",
    isdone: 'not-started',
    date: "2025-05-23"
  },
  {
    name: "示例任务",
    priority: "low",
    type: "Any",
    detail: "展示一个任务有哪些字段",
    isdone: 'in-progress',
    date: "2025-05-24"
  }
])

const TaskDataMap = ref<Map<string, TaskCalendarInfo>>(new Map())
TaskDataMap.value.set("2025-05-23", {
  name: "示例任务",
  priority: "medium",
  type: "任意",
  detail: "展示一个任务有哪些字段",
  isdone: 'not-started'
})

TaskDataMap.value.set("2025-05-24", {
  name: "示例任务",
  priority: "low",
  type: "Any",
  detail: "展示一个任务有哪些字段",
  isdone: 'in-progress'
})

function ChangeOrAddOrDeleteData(
  type: 'ch' | 'add' | 'de',
  index: number,
  data: TaskTableInfo
) {
  const MapData: TaskCalendarInfo = {
    name: data.name,
    priority: data.priority,
    type: data.type,
    detail: data.detail,
    isdone: data.isdone
  }
  switch (type) {
    case 'de':
      const delete_data = TaskDataList.value[index]
      TaskDataMap.value.delete(delete_data.date)
      TaskDataList.value.splice(index, 1)
      return
    case 'add':
      TaskDataList.value.push(data)
      TaskDataMap.value.set(data.date, MapData)
      return
    case 'ch':
      TaskDataMap.value.delete(data.date)
      TaskDataList.value[index] = data
      TaskDataMap.value.set(data.date, MapData)
      return
  }
}

export type ChangeOrAddOrDeleteData = (
  type: 'ch' | 'add' | 'de',
  index?: number,
  data?: TaskTableInfo
) => void;

export interface INFOMATION{
  avatar_url: string,
  user_name: string,
  email_addr: string,
  location: string,
  tags: string[],
  biology: string,
}

const PersonnalInfo = ref<INFOMATION>({
  avatar_url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  user_name: "用户",
  email_addr: "example@qq.com",
  location: "北京",
  tags: ["student", "computer"],
  biology: "大家好，我是用户"
})

export type UpdateProfile = (
  data: INFOMATION
) => void

function UpdateProfile(data: INFOMATION){
  PersonnalInfo.value.avatar_url = data.avatar_url
  PersonnalInfo.value.user_name  = data.user_name
  PersonnalInfo.value.email_addr = data.email_addr
  PersonnalInfo.value.location = data.location
  PersonnalInfo.value.biology = data.biology
}

provide("ChgAddDelData", ChangeOrAddOrDeleteData)
provide("TaskDataList", TaskDataList)
provide("TaskDataMap", TaskDataMap)
provide("PersonalInfo", PersonnalInfo)
provide("UpdateProfile", UpdateProfile)
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 225px;
  min-height: 560px;
}

a {
  text-decoration: none;
}
</style>
