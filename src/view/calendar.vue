<template>
  <el-calendar ref="calendar" class="custom-calendar">
    <template #header="{ date }">
      <div class="calendar-header">
        <span class="calendar-title">Task Calendar</span>
        <span class="calendar-date">{{ date }}</span>
        <el-button-group class="calendar-btn-group">
          <el-button size="large" @click="selectDate('prev-month')" class="calendar-btn">
            Previous Month
          </el-button>
          <el-button size="large" @click="selectDate('today')" class="calendar-btn">
            Today
          </el-button>
          <el-button size="large" @click="selectDate('next-month')" class="calendar-btn">
            Next Month
          </el-button>
        </el-button-group>
      </div>
    </template>
    <template #date-cell="{ data }">
      <div
        @click="showTaskDetail(data.day)"
        class="date-cell"
        :class="{
          'date-not-started': infoMap?.get(data.day)?.isdone === 'not-started',
          'date-has-task': infoMap?.get(data.day)
        }"
      >
        <span class="date-number">{{ data.day.split('-')[2] }}</span>
        <div v-if="infoMap?.get(data.day)" class="task-info">
          {{ infoMap.get(data.day)?.name }}
          <br>
          优先级：{{ TranslateInfoCN(infoMap.get(data.day)?.priority, 'priority') }}
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script lang="ts" setup>
import { ref, inject, type Ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import type { TaskCalendarInfo } from '../App.vue'

const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
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

<style scoped>
.custom-calendar {
  margin-top: 0%;
  max-width: 90%;
  border: 2px solid #e0e7ef;
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  box-shadow: 0 4px 18px 0 rgba(31, 38, 135, 0.08);
  padding: 8px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
  background: #f4f7fa;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.04);
}

.calendar-title {
  font-size: 40px;
  font-weight: 700;
  color: #3a3a3a;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.calendar-date {
  font-size: 30px;
  color: #4a4e69;
  margin: 0 18px;
  font-weight: 500;
}

.calendar-btn-group {
  display: flex;
  gap: 18px;
}

.calendar-btn {
  background: #e0e7ff;
  color: #22223b;
  border: none;
  border-radius: 8px !important;
  font-weight: 600;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.05);
}
.calendar-btn:hover {
  background: #b4c5e4;
  color: #22223b;
}

.date-cell {
  border-radius: 10px;
  padding: 4px 4px;
  transition: background 0.2s, box-shadow 0.2s;
  cursor: pointer;
  text-align: left;
  position: relative;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid transparent;
  box-shadow: 0 1px 4px rgba(31, 38, 135, 0.04);
}
.date-cell:hover {
  background: #f0fdfa;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.08);
}
.date-has-task {
  border: 1.5px solid #b4c5e4;
  background: #f0fdfa;
}
.date-not-started {
  background: linear-gradient(120deg, #f9fafb 60%, #bde0fe 100%);
  color: #d7263d !important;
  border: 1.5px solid #d7263d;
}
.date-number {
  font-weight: 600;
  color: #22223b;
  display: inline-block;
}
.task-info {
  color: #4a4e69;
  font-size: 12px;
}
</style>