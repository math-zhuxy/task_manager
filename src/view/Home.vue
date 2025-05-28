<template>
    <div class="home-container">
        <h1 class="home-title">
            <el-icon style="vertical-align: middle; margin-right: 10px;">
                <House />
            </el-icon>
            网站首页
        </h1>
        <el-carousel height="400px" interval="2000" style="border-radius: 20px; box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);">
            <el-carousel-item v-for="item in 4" :key="item">
                <div class="carousel-content">
                    <p class="carousel-head">{{ TextContent[item - 1].head }}</p>
                    <p class="carousel-desc">{{ TextContent[item - 1].content }}</p>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script lang="ts" setup>
import { House } from '@element-plus/icons-vue'

const TextContent = [
    {
        head: "Home",
        content: "网站主页"
    },
    {
        head: "Task Table",
        content: "任务列表，您可以查看、编辑、增删任务"
    },
    {
        head: "Calendar",
        content: "任务日历，将任务列表的任务按照日历的方式呈现，目前demo还有点bug，尽量不要让多个任务在同一个日期中"
    },
    {
        head: "Setting",
        content: "个人简介以及设置，目前页面全是个人简介"
    }
]
</script>

<style scoped>
.home-container {
    width: 90%;
    margin: 40px auto 0 auto;
    padding: 32px 24px 48px 24px;
    border-radius: 24px;
    background: linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
    min-height: 400px;
}

.home-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    color: #3a3a3a;
    margin-bottom: 36px;
    letter-spacing: 2px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.el-carousel {
    background: transparent;
}

.el-carousel__item {
    color: #475669;
    opacity: 0.95;
    margin: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    transition: background 0.5s;
}

.el-carousel__item:nth-child(2n) {
    background: linear-gradient(120deg, #99a9bf 60%, #e0e7ff 100%);
}

.el-carousel__item:nth-child(2n + 1) {
    background: linear-gradient(120deg, #d3dce6 60%, #f0fdfa 100%);
}

.carousel-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
}

.carousel-head {
    font-size: 3rem;
    font-weight: 600;
    color: #22223b;
    margin-bottom: 18px;
    letter-spacing: 1px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.carousel-desc {
    font-size: 1.25rem;
    color: #4a4e69;
    opacity: 0.85;
    margin-bottom: 0;
    max-width: 550px;
}

.el-carousel__indicators--horizontal {
    bottom: 18px;
}

.el-carousel__indicator {
    background: #b4c5e4;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin: 0 6px;
    transition: background 0.3s;
}

.el-carousel__indicator.is-active {
    background: #22223b;
    width: 18px;
    height: 12px;
    border-radius: 8px;
}
</style>