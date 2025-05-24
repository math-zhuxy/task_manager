<template>
  <el-descriptions title="简介" direction="vertical" border size="large" style="margin-top: 20px; max-width: 90%;">
    <el-descriptions-item :rowspan="2" :width="140" label="Photo" align="center">
      <el-avatar :size="120" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-descriptions-item>
    <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
    <el-descriptions-item label="Email Address">235934429@qq.com</el-descriptions-item>
    <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="medium">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address">
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>
  <br>
  <el-progress type="dashboard" :percentage="80" stroke-width="10">
    <template #default="{ percentage }">
      <span class="percentage-value">{{ percentage }}%</span>
      <span class="percentage-label">已完成</span>
    </template>
  </el-progress>
</template>
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