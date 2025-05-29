<template>
  <div style="margin-top: 20px; max-width: 90%; padding: 10px; border-radius: 10px; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);">
    <h1 style="text-align: center;">简介</h1>
    <el-descriptions direction="vertical" border size="large">
      <el-descriptions-item :rowspan="2" :width="140" label="头像" align="center">
        <el-avatar :size="120" :src="PersonalInfo?.avatar_url" />
      </el-descriptions-item>
      <el-descriptions-item label="用户名">{{ PersonalInfo?.user_name }}</el-descriptions-item>
      <el-descriptions-item label="邮箱地址">{{ PersonalInfo?.email_addr }}</el-descriptions-item>
      <el-descriptions-item label="所在地">{{ PersonalInfo?.location }}</el-descriptions-item>
      <el-descriptions-item label="标签">
        <div style="display: flex; gap: 10px; align-items: center;">
          <div v-for="tag in PersonalInfo?.tags">
            <el-tag size="medium">{{ tag }}</el-tag>
          </div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="编辑">
        <el-button type="info" icon="Edit" round @click="onAddRowData">
          编辑个人信息
        </el-button>
      </el-descriptions-item>
      <el-descriptions-item label="个人简介">
        {{ PersonalInfo?.biology }}
      </el-descriptions-item>
    </el-descriptions>
    <div
      style="display: flex; text-align: center; gap: 50px; justify-content: center; max-width: 90%; ">
      <div>
        <p>已完成任务比例：</p>
        <el-progress type="dashboard" :percentage="DonePercentage" stroke-width="10" color="#2ECC71">
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">已完成</span>
          </template>
        </el-progress>
      </div>
      <div>
        <p>正在做任务比例：</p>
        <el-progress type="dashboard" :percentage="InProgressPercentage" stroke-width="10" color="#3498DB">
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">正在做</span>
          </template>
        </el-progress>
      </div>
      <div>
        <p>未完成任务比例：</p>
        <el-progress type="dashboard" :percentage="100 - DonePercentage - InProgressPercentage" stroke-width="10"
          color="#FF4757">
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">未完成</span>
          </template>
        </el-progress>
      </div>
    </div>
  </div>
  <br>
  <el-dialog v-model="editDialogVisible" title="个人信息编辑" width="30%">
    <el-form :model="editForm">
      <el-form-item label="用户名">
        <el-input v-model="editForm.user_name" maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item label="邮箱地址">
        <el-input v-model="editForm.email_addr" />
      </el-form-item>
      <el-form-item label="头像地址">
        <el-input v-model="editForm.avatar_url" clearable />
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="editForm.biology" maxlength="25" show-word-limit clearable />
      </el-form-item>
      <el-form-item label="所在地">
        <el-input v-model="editForm.location" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="saveEdit">Save</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { inject, type Ref, ref, reactive, onMounted } from 'vue';
import type { INFOMATION, UpdateProfile, TaskTableInfo } from '../App.vue';
import { ElNotification } from 'element-plus'

const DonePercentage = ref(0)
const InProgressPercentage = ref(0)

onMounted(() => {
  const tableData = inject<Ref<TaskTableInfo[]>>("TaskDataList")
  let total_length = 0
  let done_length = 0
  let in_progress_length = 0
  if (tableData) {
    total_length = tableData.value.length
    for (let i = 0; i < total_length; i++) {
      if (tableData.value[i].isdone === 'completed') {
        done_length++
      }
      else if (tableData.value[i].isdone === 'in-progress') {
        in_progress_length++
      }
    }
  }
  if (total_length === 0) {
    DonePercentage.value = 0
    return
  }
  DonePercentage.value = Math.floor(done_length * 100 / total_length)
  InProgressPercentage.value = Math.floor(in_progress_length * 100 / total_length)
})

const PersonalInfo = inject<Ref<INFOMATION>>("PersonalInfo")

const UpdateProfile = inject<UpdateProfile>("UpdateProfile")

const editDialogVisible = ref(false)

const editForm = reactive<INFOMATION>(
  {
    avatar_url: "",
    user_name: "",
    email_addr: "",
    location: "",
    tags: ["student"],
    biology: ""
  }
)

function onAddRowData() {
  if (PersonalInfo) {
    editForm.avatar_url = PersonalInfo.value.avatar_url
    editForm.user_name = PersonalInfo.value.user_name
    editForm.email_addr = PersonalInfo.value.email_addr
    editForm.location = PersonalInfo.value.location
    editForm.biology = PersonalInfo.value.biology
  }
  else {
    editForm.avatar_url = ""
    editForm.user_name = ""
    editForm.email_addr = ""
    editForm.location = ""
    editForm.biology = ""
  }
  editDialogVisible.value = true
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidAvatorLink(str: string): boolean{
  return /^(https?:\/\/)/.test(str);
}

function saveEdit() {
  editDialogVisible.value = false
  if (!isValidEmail(editForm.email_addr)) {
    ElNotification({
      title: 'Error',
      message: '邮箱格式错误',
      type: 'error',
      duration: 1500
    })
    return
  }
  if (!isValidAvatorLink(editForm.avatar_url)) {
    ElNotification({
      title: 'Error',
      message: '链接应该以http或https开头',
      type: 'error',
      duration: 1500
    })
    return
  }
  if (UpdateProfile) {
    UpdateProfile(editForm)
    ElNotification({
      title: 'Success',
      message: '修改个人信息成功',
      type: 'success',
      duration: 1500
    })
  }
}

</script>
<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 14px;
}
</style>