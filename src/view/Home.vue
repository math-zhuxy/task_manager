<template>
    <div class="block text-center" style="width: 70%;">
        <h1 style="text-align: center; font-size: xx-large;">
            网站首页
        </h1>
        <el-carousel height="400px" interval=1500 style="border-radius: 15px;">
            <el-carousel-item v-for="item in 4" :key="item">
                <h1 class="small justify-center">hhhh{{ item }}</h1>
                <p style="text-align: center;">nihao</p>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped>
.el-carousel__item {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
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