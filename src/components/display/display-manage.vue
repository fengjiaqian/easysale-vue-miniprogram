<template>
    <div class="manage-display-column">
        <div class="dc-t">
            <div class="dct-cus">
                <h5>{{display.customer.customerName}}</h5>
                <span>{{display.customer.createTime}}</span>
            </div>
            <div class="dct-target">
                <h5>陈列申请</h5>
                <ul class="product-list">
                    <li v-for="product in display.customerDisplay.items" :key="product.id">
                        {{product.productName}}
                    </li>
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
        },
    };
</script>

<style lang="stylus" scoped>
    @import "./display.styl"
</style>

