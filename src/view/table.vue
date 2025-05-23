<template>
  <el-container style="border: 3px solid black; padding: 15px 50px; border-radius: 25px; margin-top: 8%;">
    <el-header style="text-align: center;">
      <h1>DDL 任务汇总</h1>
    </el-header>
    <el-main>
      <el-table 
      :data="sortedData" 
      style="width: 100%" 
      height= "300"
      @cell-click="highlightColumn"
      size="large"
      >
        <el-table-column fixed prop="date" label="Date" width="150" :sortable="true" :sort-method="dateSortMethod"
          :sort-orders="['ascending', 'descending', null]" :sort-by="['date']" :order="sortOrder"
          @header-click="toggleSort" />
        <el-table-column prop="name" label="Name" width="120" :class-name="getColumnClass('name')" />
        <el-table-column prop="state" label="State" width="120" :class-name="getColumnClass('state')" />
        <el-table-column prop="city" label="City" width="120" :class-name="getColumnClass('city')" />
        <el-table-column prop="address" label="Address" width="400" :class-name="getColumnClass('address')" />
        <el-table-column prop="zip" label="Zip" width="120" :class-name="getColumnClass('zip')" />
        <el-table-column prop="tag" label="Tag" width="120" :class-name="getColumnClass('tag')" />
        <el-table-column fixed="right" label="操作" min-width="200">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="onEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button link type="primary" size="large" @click="onClickDeleteBtn(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-button type="primary" style="margin: 16px 0;" @click="onAddRowData">
        新增
      </el-button>
    </el-footer>
  </el-container>
  <el-dialog
    v-model="dialogVisible"
    title="Warning"
    width="500"
  >
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
  <el-dialog v-model="editDialogVisible" title="Edit Row" width="30%">
    <el-form :model="editForm">
      <el-form-item label="Date">
        <el-input v-model="editForm.date" />
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="editForm.name" />
      </el-form-item>
      <el-form-item label="State">
        <el-input v-model="editForm.state" />
      </el-form-item>
      <el-form-item label="City">
        <el-input v-model="editForm.city" />
      </el-form-item>
      <el-form-item label="Address">
        <el-input v-model="editForm.address" />
      </el-form-item>
      <el-form-item label="Zip">
        <el-input v-model="editForm.zip" />
      </el-form-item>
      <el-form-item label="Tag">
        <el-input v-model="editForm.tag" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="saveEdit">Save</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { ElNotification } from 'element-plus'
const dialogVisible = ref(false)

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }
])

const sortOrder = ref<'ascending' | 'descending' | null>(null)
const sortedData = computed(() => {
  if (!sortOrder.value) return tableData.value
  return [...tableData.value].sort((a, b) => {
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
const editForm = reactive({
  date: '',
  name: '',
  state: '',
  city: '',
  address: '',
  zip: '',
  tag: ''
})
let editIndex = -1
let deleteIndex = -1
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
    date: '',
    name: '',
    state: '',
    city: '',
    address: '',
    zip: '',
    tag: ''
  })
  editIndex = -1
  editDialogVisible.value = true
}

function deleteRowData() {
  dialogVisible.value = false
  tableData.value.splice(deleteIndex, 1)
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
      title: 'Notice',
      message: "日期格式不正确",
      type: 'error',
      duration: 1000
    })
    editDialogVisible.value = false
    return
  }
  if (editIndex !== -1) {
    tableData.value[editIndex] = { ...editForm }
  } else {
    tableData.value.push({ ...editForm })
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
  // tableData.value.splice(index, 1)
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