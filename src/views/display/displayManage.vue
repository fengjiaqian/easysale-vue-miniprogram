<template>
    <div class="display-manage">
        <m-header :isFixed="true"></m-header>
        <section class="header">
            <div class="top-bar">
                <span v-for="(item,index) in stateList" :class="{'active': activeIdx == index}" @click="switchBar(index)">{{item.title}}</span>
            </div>
        </section>
        <section class="content">
            <display-manage
                    v-for="item in displayList"
                    :display="item"
                    :key="item.customerDisplay.id"
            ></display-manage>
        </section>
        <empty v-if="isEmpty" txt="暂无陈列数据~" :iconUrl="avatarUrl"></empty>
    </div>
</template>

<script>
    import avatarUrl from "@/assets/images/empty_icon_1.png";
    import { queryDisplays } from "api/fetch/display";
    import displayManage from "components/display/display-manage";
    import bus from "common/Bus";
    import empty from "components/empty.vue";
    import storage from "common/storage";
    export default {
        data() {
            return {
                activeIdx: 0,//选中的状态
                stateList: [{
                    title: `待处理`,
                    idx: 0
                },{
                    title: `已处理`,
                    idx: 1
                }],//陈列管理状态
                displayList: [],//陈列列表
                param: {
                    state: 0
                },//待处理，已处理的查询条件
                requestDone: false,
                avatarUrl,
            };
        },
        components: {
            displayManage,
            empty
        },
        computed: {
            isEmpty(){
                if(this.requestDone){
                    return !this.displayList.length
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                if(from.name == 'detailManage'){
                    vm.activeIdx = storage.get("leaveIdx", "")
                    vm.param.state = vm.activeIdx
                }else{
                    storage.remove("leaveIdx");
                }
            })
        },
        beforeRouteLeave (to, from, next) {
            storage.set("leaveIdx", this.activeIdx);
            next()
        },
        created() {
            this.queryList()
        },
        mounted() {
            bus.$off("updateList")
            bus.$on("updateList", (id) => {
                this.displayList = this.displayList.filter((item)=>{
                    return item.customerDisplay.id != id
                })
            });
        },
        methods: {
            //切换状态栏
            switchBar(idx){
                if(idx == this.activeIdx) return false
                this.activeIdx = idx
                this.param.state = idx
                this.displayList = []
                this.queryList()
            },
            //查询列表
            queryList(){
                this.requestDone = false
                queryDisplays(this.param)
                    .then(res => {
                        if (res.result === "success") {
                            this.displayList = res.data
                            this.requestDone = true
                        }
                    })
                    .catch(err => {
                        this.$toast(err.message);
                        this.requestDone = true
                    });
            },
        },
        watch: {

        }
    };
</script>

<style lang="stylus" scoped>
    @import "./stylus/display.styl"
</style>

