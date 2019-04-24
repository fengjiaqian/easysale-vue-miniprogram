<template>
    <div class="top-bar">
        <el-tabs v-model="activeName" @tab-click="switchTab($event)" :stretch="true">
            <el-tab-pane :label="topTabsList[0]" name="leftTab"></el-tab-pane>
            <el-tab-pane :label="topTabsList[1]" name="rightTab"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: 'top-tabs',
        props: {
            topTabsList:{
                type:Array,
                default: false
            }

        },
        data() {
            return {
                state: 0,
                activeName:'leftTab'
            }
        },
        component: {
            //someComponent
        },
        methods: {
            switchTab($event) {
                if ($event.name == 'leftTab') {
                    this.state = 0;
                }else{
                    this.state = 1;
                }
                this.$emit("switchTab", this.state);

            }
        }
    }
</script>

<style >

    .el-tabs__active-bar {
        height: 6px !important;
        width: 45px !important;
        margin-left: 160px;
        background: #E53935 !important;

    }

    .el-tabs__item {
        font-size: 28px !important;
        color: #666 !important;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 45px;
    }

    .el-tabs__item.is-active {
        font-size: 34px !important;
        color: #333 !important;
    }

    .el-tabs__nav {
        color: #E53935 !important;
        height: 90px;
    }

    .top-bar {
        background: #fff;
        height: 98px;
    }


</style>

