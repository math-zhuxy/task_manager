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
      <div @click="showTaskDetail(data.day)" :style="infoMap?.get(data.day)?.isdone === 'not-started'
        ? { color: 'red', backgroundColor: 'lightblue' }
        : {}
        ">
        <span>{{ data.day.split('-')[2] }}</span>
        <div v-if="infoMap?.get(data.day)" style="font-size: 12px; cursor: pointer;">
          {{ infoMap.get(data.day)?.name }}
          <br>
          {{ TranslateInfoCN(infoMap.get(data.day)?.priority, 'priority') }}
          <br>
          {{ infoMap.get(data.day)?.type }}
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script lang="ts" setup>
import { ref, inject, type Ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { CalendarDateType, CalendarInstance } from 'element-plus'

const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

interface TaskCalendarInfo {
  name: string
  priority: "low" | "medium" | "high"
  type: string
  detail: string
  isdone: "not-started" | "in-progress" | "completed"
}

const infoMap = inject<Ref<Map<string, TaskCalendarInfo>>>("TaskDataMap")
const showTaskDetail = (date: string) => {
  const info = infoMap?.value.get(date)
  if (!info) {
    return
  }
  ElMessageBox.alert(
    `<b>任务名称：</b>${info.name}<br>
     <b>优先级：</b>${TranslateInfoCN(info.priority, 'priority')}<br>
     <b>类型：</b>${info.type}<br>
     <b>日期：</b>${date}<br>
     <b>细节：</b>${info.detail}<br>
     <b>完成度：</b>${TranslateInfoCN(info.isdone, 'isdone')}`,
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定'
    }
  )
}

function TranslateInfoCN(text: string | undefined, type: 'isdone' | 'priority') {
  if (type === 'priority') {
    switch (text) {
      case 'low':
        return "低"
      case 'medium':
        return "中"
      case 'high':
        return "高"
    }
  }
  else if (type === 'isdone') {
    switch (text) {
      case 'not-started':
        return "未开始"
      case 'in-progress':
        return "正在做"
      case 'completed':
        return "已完成"
    }
  }
}

</script>