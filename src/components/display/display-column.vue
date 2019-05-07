<template>
    <div class="display-column">
        <div class="dl-t">
            <div class="dlt-shop">
                <h5>{{display.dealer.dealerName}}</h5>
                <span>{{display.customer.createTime}}</span>
            </div>
            <div class="dlt-product">
                <h5>陈列申请</h5>
                <ul class="product-list">
                    <li v-for="product in display.customerDisplay.items" :key="product.id">
                        {{product.productName}}
                    </li>
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

            };
        },
        components: {

        },
        created() {

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
        },
    };
</script>

<style lang="stylus" scoped>
    @import "./display.styl"
</style>

