<template>
    <div class="manage-display-column">
        <div class="dc-t">
            <div class="dct-cus">
                <h5>{{display.customer.customerName}}</h5>
                <span>{{display.customer.createTime}}</span>
            </div>
            <div class="dct-target">
                <h5>陈列申请</h5>
                <ul class="product-list" :class="{'list-unfold':isUnfold}">
                    <li v-for="product in display.customerDisplay.items" :key="product.id">
                        {{product.productName}}
                    </li>
                    <div class="growth-btn" @click="growth" v-if="showGrowth">{{this.isUnfold?`收起`:`展开更多`}}</div>
                </ul>
            </div>
        </div>
        <div class="dc-b">
            <span @click="goDetail">查看详情</span>
            <span class="red" @click="_dealApply" v-if="display.customerDisplay.state==0">处理</span>
        </div>
        <div class="dc-state">{{display.customerDisplay.state==0?`待处理`:`已处理`}}</div>
    </div>
</template>

<script>
    import bus from "common/Bus";
    import { cancelDisplayApply,dealApply } from "api/fetch/display";
    export default {
        props: {
            display: {
                type: Object,
                default: {}
            },
        },
        data() {
            return {
                showGrowth: false,//显示收缩栏
                isUnfold: false,//是否展开
            };
        },
        components: {

        },
        created() {
            this.showGrowth = this.display.customerDisplay.items.length > 2 ? true : false
        },
        mounted() {},
        methods: {
            //查看陈列详情
            goDetail(){
                this.$router.push({
                    path: "/detailManage",
                    query: {
                        id: this.display.customerDisplay.id
                    }
                })
            },
            //处理申请
            _dealApply(){
                let param = {
                    id: this.display.customerDisplay.id,
                    replyContent: '',
                    state: 1
                }
                dealApply(param)
                    .then(res => {
                        if (res.result === "success") {
                            this.$toast(`处理成功！`);
                            bus.$emit("updateList", this.display.customerDisplay.id);
                        }
                    })
                    .catch(err => {
                        this.$toast(err.message);
                    });
            },
            //陈列列表项展开收缩
            growth(){
                this.isUnfold = !this.isUnfold
            },
        },
    };
</script>

<style lang="stylus" scoped>
    @import "./display.styl"
</style>

