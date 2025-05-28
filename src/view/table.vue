<template>
  <el-container class="main-container">
    <el-header class="header">
      <h1 class="title">DDL 任务汇总</h1>
    </el-header>
    <el-main>
      <el-table
        :data="sortedData"
        class="custom-table"
        height="400"
        @cell-click="highlightColumn"
        size="large"
        border
        stripe
        highlight-current-row
      >
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150"
          :sortable="true"
          :sort-method="dateSortMethod"
          :sort-orders="['ascending', 'descending', null]"
          :sort-by="['date']"
          :order="sortOrder"
          @header-click="toggleSort"
        />
        <el-table-column prop="name" label="名称" width="160" :class-name="getColumnClass('name')" />
        <el-table-column prop="priority" label="优先级" width="120" :class-name="getColumnClass('priority')" />
        <el-table-column prop="type" label="种类" width="120" :class-name="getColumnClass('type')" />
        <el-table-column prop="detail" label="具体细节" width="400" :class-name="getColumnClass('detail')" />
        <el-table-column prop="isdone" label="完成度" width="160" :class-name="getColumnClass('isdone')" />
        <el-table-column fixed="right" label="操作" min-width="200">
          <template #default="scope">
            <el-button
              link
              type="primary"
              class="action-btn"
              @click="onEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              link
              type="danger"
              class="action-btn"
              @click="onClickDeleteBtn(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="footer">
      <el-button
        type="primary"
        class="add-btn"
        @click="onAddRowData"
      >
        新增任务
      </el-button>
    </el-footer>
  </el-container>
  <el-dialog v-model="dialogVisible" title="删除确认" width="400" class="custom-dialog">
    <span>你确认要删除这一行数据吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteRowData">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="editDialogVisible" title="数据编辑" width="30%" class="custom-dialog">
    <el-form :model="editForm" label-width="80px">
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
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="saveEdit">保存</el-button>
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
    duration: 1500
  })
}

function saveEdit() {
  if (!isValidDateFormat(editForm.date)) {
    ElNotification({
      title: 'Error',
      message: "日期格式不正确",
      type: 'error',
      duration: 1500
    })
    editDialogVisible.value = false
    return
  }
  if (editForm.detail.length === 0 || editForm.name.length === 0 || editForm.detail.length === 0) {
    ElNotification({
      title: 'Error',
      message: "请将任务内容补充完整",
      type: 'error',
      duration: 1500
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
    duration: 1500
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
.main-container {
  border: 2px solid #e0e0e0;
  border-radius: 18px;
  padding: 18px 8px 8px 8px;
  margin-top: 3%;
  max-width: 92%;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(135deg, #f8fafc 60%, #c7e1f4 100%);
  box-shadow: 0 6px 32px 0 rgba(60, 120, 200, 0.10);
  transition: box-shadow 0.3s;
}

.main-container:hover {
  box-shadow: 0 10px 40px 0 rgba(60, 120, 200, 0.18);
}

.header {
  text-align: center;
  margin-bottom: 2%;
  background: none;
  padding-bottom: 0;
}

.title {
  font-size: 2.3rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #1976d2;
  margin: 0;
  text-shadow: 0 2px 8px #e3f2fd;
}

.custom-table {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(33, 150, 243, 0.07);
  font-size: 1.08rem;
  transition: box-shadow 0.2s;
}

.custom-table .el-table__header th {
  background: linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%);
  color: #1976d2;
  font-weight: 600;
  font-size: 1.06rem;
  border-bottom: 2px solid #90caf9;
}

.custom-table .el-table__row:hover td {
  background: #e3f2fd !important;
  transition: background 0.2s;
}

.action-btn {
  font-size: 1rem;
  margin-right: 8px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.action-btn[type="primary"]:hover {
  background: #e3f2fd;
  color: #1976d2;
}

.action-btn[type="danger"]:hover {
  background: #ffebee;
  color: #d32f2f;
}

.add-btn {
  font-size: 1.15rem;
  padding: 18px 32px;
  border-radius: 12px;
  background: linear-gradient(90deg, #1976d2 60%, #64b5f6 100%);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 10px 0 rgba(33, 150, 243, 0.10);
  border: none;
  transition: background 0.2s, box-shadow 0.2s;
}

.add-btn:hover {
  background: linear-gradient(90deg, #1565c0 60%, #42a5f5 100%);
  box-shadow: 0 4px 18px 0 rgba(33, 150, 243, 0.18);
}

.footer {
  text-align: center;
  margin-top: 18px;
  background: none;
}

.custom-dialog {
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 rgba(33, 150, 243, 0.13);
  padding: 0 8px;
}

.custom-dialog .el-dialog__header {
  background: linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%);
  border-radius: 16px 16px 0 0;
  color: #1976d2;
  font-weight: 600;
  font-size: 1.15rem;
}

.custom-dialog .el-dialog__footer {
  background: #f5fafd;
  border-radius: 0 0 16px 16px;
}

.dialog-footer {
  text-align: right;
}

.highlighted-column {
  background-color: #e0f7fa !important;
  transition: background 0.2s;
}

.el-form-item__label {
  color: #1976d2;
  font-weight: 500;
}

.el-input__inner, .el-select .el-input__inner {
  border-radius: 8px;
  border: 1px solid #90caf9;
  background: #f8fafc;
  transition: border 0.2s;
}

.el-input__inner:focus, .el-select .el-input__inner:focus {
  border-color: #1976d2;
  background: #fff;
}

.el-select-dropdown__item.selected {
  background: #e3f2fd !important;
  color: #1976d2 !important;
}
</style>