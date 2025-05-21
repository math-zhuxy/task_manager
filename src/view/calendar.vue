<template>
  <el-calendar ref="calendar">
    <template #header="{ date }">
      <span>Custom header content</span>
      <span style="font-size: 30px;">{{ date }}</span>
      <el-button-group>
        <el-button size="30" @click="selectDate('prev-month')">
          Previous Month
        </el-button>
        <el-button size="30" @click="selectDate('today')">
          Today
        </el-button>
        <el-button size="30" @click="selectDate('next-month')">
          Next Month
        </el-button>
      </el-button-group>
    </template>
  </el-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CalendarDateType, CalendarInstance } from 'element-plus'

const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
</script>