<template>
    <div class="display-column">
        <div class="dl-t">
            <div class="dlt-shop">
                <h5>{{display.dealer.dealerName}}</h5>
                <span>{{display.customer.createTime}}</span>
            </div>
            <div class="dlt-product">
                <h5>陈列申请</h5>
                <ul class="product-list" :class="{'list-unfold':isUnfold}">
                    <li v-for="product in display.customerDisplay.items" :key="product.id">
                        {{product.productName}}
                    </li>
                    <div class="growth-btn" @click="growth" v-if="showGrowth">{{this.isUnfold?`收起`:`展开更多`}}</div>
                </ul>
            </div>
        </div>
        <div class="dl-b">
            <span @click="goDetail">查看详情</span>
            <span class="red" @click="cancelApply" v-if="display.customerDisplay.state==0">取消陈列</span>
        </div>
        <div class="dl-state">{{display.customerDisplay.state==0?`已申请`:`已处理`}}</div>
    </div>
</template>

<script>
    import bus from "common/Bus";
    import { cancelDisplayApply } from "api/fetch/display";
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
                    path: "/displayDetail",
                    query: {
                        id: this.display.customerDisplay.id
                    }
                })
            },
            //取消陈列申请
            cancelApply(){
                let param = {
                    id: this.display.customerDisplay.id
                }
                cancelDisplayApply(param)
                    .then(res => {
                        if (res.result === "success") {
                            this.$toast(`取消成功！`);
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

