<template>
    <div class="block text-center" style="width: 90%;">
        <h1 style="text-align: center; font-size: xx-large;">
            网站首页
        </h1>
        <el-carousel height="400px" interval=1500 style="border-radius: 15px;">
            <el-carousel-item v-for="item in 4" :key="item">
                <p style="font-size: 50px;">{{ TextContent[item - 1].head }}</p>
                <p style="font-size: 15px;">{{ TextContent[item - 1].content }}</p>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script lang="ts" setup>

const TextContent = [
    {
        head: "Home",
        content: "主页"
    },
    {
        head: "Task Table",
        content: "任务列表"
    },
    {
        head: "Calendar",
        content: "日历"
    },
    {
        head: "Setting",
        content: "设置"
    }
]

</script>

<style scoped>
.el-carousel__item {
    color: #475669;
    opacity: 0.75;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>