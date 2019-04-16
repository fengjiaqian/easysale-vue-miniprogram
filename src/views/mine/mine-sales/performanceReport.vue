


<template>
    <div>
        <!-- 销售人员   业绩报表   performanceReport -->
          <div class="top-bar">
            <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">今日</span>
            <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">7天</span>
            <span :class="{'active': activeIdx == 2}" @click="switchBar(2)">30天</span>
            <span :class="{'active': activeIdx == 3}" @click="switchBar(3)">总计</span>
        </div>

        <!-- statistical里面有大概的页面 -->
    </div>
</template>
