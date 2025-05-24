<template>
  <el-container style="border: 2px solid lightgray; padding: 15px 3px; margin-top: 4%; max-width: 90%;">
    <el-header style="text-align: center; margin-bottom: 2%;">
      <h1 style="font-size: xx-large;">DDL 任务汇总</h1>
    </el-header>
    <el-main>
      <el-table :data="sortedData" style="width: 100%; font-size: medium;" height="400" @cell-click="highlightColumn"
        size="large">
        <el-table-column fixed prop="date" label="日期" width="150" :sortable="true" :sort-method="dateSortMethod"
          :sort-orders="['ascending', 'descending', null]" :sort-by="['date']" :order="sortOrder"
          @header-click="toggleSort" />
        <el-table-column prop="name" label="名称" width="160" :class-name="getColumnClass('name')" />
        <el-table-column prop="priority" label="优先级" width="120" :class-name="getColumnClass('priority')" />
        <el-table-column prop="type" label="种类" width="120" :class-name="getColumnClass('type')" />
        <el-table-column prop="detail" label="具体细节" width="400" :class-name="getColumnClass('detail')" />
        <el-table-column prop="isdone" label="完成度" width="160" :class-name="getColumnClass('isdone')" />
        <el-table-column fixed="right" label="操作" min-width="200">
          <template #default="scope">
            <el-button link type="primary" style="font-size: medium;" @click="onEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button link type="primary" style="font-size: medium;" @click="onClickDeleteBtn(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-button type="primary" style="font-size: large; padding: 20px 15px; border-radius: 10px;"
        @click="onAddRowData">
        新增任务
      </el-button>
    </el-footer>
  </el-container>
  <el-dialog v-model="dialogVisible" title="Warning" width="500">
    <span>你确认要删除这一行数据吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteRowData">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="editDialogVisible" title="数据编辑" width="30%">
    <el-form :model="editForm">
      <el-form-item label="日期">
        <el-input v-model="editForm.date" placeholder="E.G: 2025-01-01" suffix-icon="Calendar"/>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="editForm.name" maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item label="优先级">
        <el-select v-model="editForm.priority">
          <el-option label="低" value="low" />
          <el-option label="中" value="medium" />
          <el-option label="高" value="high" />
        </el-select>
      </el-form-item>
      <el-form-item label="种类">
        <el-input v-model="editForm.type" maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item label="任务细节">
        <el-input v-model="editForm.detail" clearable />
      </el-form-item>
      <el-form-item label="完成度">
        <el-select v-model="editForm.isdone">
          <el-option label="已完成" value="completed" />
          <el-option label="正在做" value="in-progress" />
          <el-option label="未完成" value="not-started" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="saveEdit">Save</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, inject, type Ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { ChangeOrAddOrDeleteData, TaskTableInfo } from '../App.vue'

const dialogVisible = ref(false)

const tableData = inject<Ref<TaskTableInfo[]>>("TaskDataList")

const sortOrder = ref<'ascending' | 'descending' | null>(null)
const sortedData = computed(() => {
  if (!sortOrder.value) return tableData?.value ?? []
  const data = [...(tableData?.value ?? [])]
  return data.sort((a, b) => {
    const d1 = new Date(a.date).getTime()
    const d2 = new Date(b.date).getTime()
    return sortOrder.value === 'ascending' ? d1 - d2 : d2 - d1
  })
})

function toggleSort() {
  if (sortOrder.value === 'ascending') sortOrder.value = 'descending'
  else if (sortOrder.value === 'descending') sortOrder.value = null
  else sortOrder.value = 'ascending'
}

function dateSortMethod(a: any, b: any) {
  return new Date(a.date).getTime() - new Date(b.date).getTime()
}

const editDialogVisible = ref(false)
const editForm = reactive<TaskTableInfo>({
  name: '',
  priority: 'medium',
  type: '',
  detail: '',
  isdone: 'not-started',
  date: ''
})

let editIndex = -1
let deleteIndex = -1

const ChgAddDelData = inject<ChangeOrAddOrDeleteData>("ChgAddDelData")

function isValidDateFormat(dateString: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  const formatted = date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, '0') + "-" +
    String(date.getDate()).padStart(2, '0');
  return formatted === dateString;
}

function onEdit(index: number, row: any) {
  Object.assign(editForm, row)
  editIndex = index
  editDialogVisible.value = true
}


function onAddRowData() {
  Object.assign(editForm, {
    name: '',
    priority: 'medium',
    type: '',
    detail: '',
    isdone: 'not-started',
    date: ''
  })
  editIndex = -1
  editDialogVisible.value = true
}

function deleteRowData() {
  dialogVisible.value = false
  if (ChgAddDelData) {
    ChgAddDelData('de', deleteIndex, editForm)
  }
  ElNotification({
    title: 'Success',
    message: '成功删除一行数据',
    type: 'success',
    duration: 1000
  })
}

function saveEdit() {
  if (!isValidDateFormat(editForm.date)) {
    ElNotification({
      title: 'Error',
      message: "日期格式不正确",
      type: 'error',
      duration: 1000
    })
    editDialogVisible.value = false
    return
  }
  if (editForm.detail.length === 0 || editForm.name.length === 0 || editForm.detail.length === 0) {
    ElNotification({
      title: 'Error',
      message: "请将任务内容补充完整",
      type: 'error',
      duration: 1000
    })
    editDialogVisible.value = false
    return
  }
  let task_type: 'ch' | 'add' | 'de' = "ch"
  if (editIndex == -1) {
    task_type = "add"
  }
  if (ChgAddDelData) {
    ChgAddDelData(task_type, editIndex, editForm)
  }
  editDialogVisible.value = false
  ElNotification({
    title: 'Success',
    message: '保存成功',
    type: 'success',
    duration: 1000
  })
}

function onClickDeleteBtn(index: number) {
  dialogVisible.value = true
  deleteIndex = index
}

const highlightedColumn = ref<string | null>(null)
function highlightColumn(column: any) {
  highlightedColumn.value = column.property
}

function getColumnClass(prop: string) {
  return highlightedColumn.value === prop ? 'highlighted-column' : ''
}

</script>

<style scoped>
.highlighted-column {
  background-color: #e0f7fa !important;
}
</style>