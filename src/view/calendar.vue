<template>
  <el-calendar ref="calendar">
    <template #header="{ date }">
      <span style="font-size: 40px;">Task Calendar</span>
      <span style="font-size: 30px;">{{ date }}</span>
      <el-button-group>
        <el-button size="large" @click="selectDate('prev-month')">
          Previous Month
        </el-button>
        <el-button size="large" @click="selectDate('today')">
          Today
        </el-button>
        <el-button size="large" @click="selectDate('next-month')">
          Next Month
        </el-button>
      </el-button-group>
    </template>
    <template #date-cell="{ data }">
      <div @click="showTaskDetail(data.day)" style="cursor: pointer;">
        <span>{{ data.day.split('-')[2] }}</span>
        <div v-if="infoMap[data.day]" :style="infoMap[data.day].isdone ? {
          backgroundColor: 'lightblue', color: 'white', fontSize: '12px'
        } : {
          color: 'red', fontSize: '12px'
        }">
          {{ infoMap[data.day].name }}
          <br>
          {{ infoMap[data.day].priority }}
          <br>
          {{ infoMap[data.day].type }}
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { CalendarDateType, CalendarInstance } from 'element-plus'

const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

interface TaskInfo {
  name: string
  priority: string
  type: string
  detail: string
  isdone: boolean
}

const infoMap: Record<string, TaskInfo> = {
  '2025-05-21': { name: '任务A', priority: '高', type: '开发', detail: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', isdone: false },
  '2025-05-25': { name: '会议', priority: '低', type: '讨论', detail: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', isdone: false },
  '2025-05-30': { name: '截止', priority: '高', type: '提交', detail: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', isdone: true }
}
const showTaskDetail = (date: string) => {
  const info = infoMap[date]
  if (!info) {
    return
  }
  ElMessageBox.alert(
    `<b>任务名称：</b>${info.name}<br>
     <b>优先级：</b>${info.priority}<br>
     <b>类型：</b>${info.type}<br>
     <b>日期：</b>${date}<br>
     <b>细节：</b>${info.detail}<br>
     <b>完成度：</b>${info.isdone ? "已完成" : "未完成"}`,
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定'
    }
  )
}

</script>