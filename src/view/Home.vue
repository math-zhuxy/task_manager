<template>
    <el-badge :value="12" class="item">
        <el-button>comments</el-button>
    </el-badge>
    <el-badge :value="3" class="item">
        <el-button>replies</el-button>
    </el-badge>
    <el-badge :value="1" class="item" type="primary">
        <el-button>comments</el-button>
    </el-badge>
    <el-badge :value="2" class="item" type="warning">
        <el-button>replies</el-button>
    </el-badge>
    <el-badge :value="1" class="item" color="green">
        <el-button>custom background</el-button>
    </el-badge>
    <el-button plain @click="dialogVisible = true">
        Click to open the Dialog
    </el-button>

    <el-dialog v-model="dialogVisible" title="Tips" width="500">
        <span>This is a message</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>
<style scoped>
.item {
    margin-top: 10px;
    margin-right: 40px;
}
</style>