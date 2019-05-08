<template>
    <div class="display-apply pt90">
        <m-header :isFixed="true"></m-header>
        <div class="da-product">
            <h5>陈列商品</h5>
            <ul class="dap-list">
                <li v-for="product in productList">
                    <img v-lazy="product.productImageUrl" >
                    <div class="product-info-normal">
                        <h5 class="p-name">{{product.productName}}</h5>
                        <div style="flex:1;"></div>
                        <div class="p-price" v-html="$options.filters.normalPrice(product.price, product.priceUnit)"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="da-remark">
            <h5>备注</h5>
            <textarea v-model="param.remark" cols="30" rows="6" placeholder="请输入内容"></textarea>
        </div>
        <div class="da-confirm" @click="confirm">提交</div>
    </div>
</template>

<script>
    import { displayApply } from "api/fetch/display";
    import storage from 'common/storage'
    export default {
        data() {
            return {
                productList: [],
                param: {
                    remark: '',
                    items: []
                },
            };
        },
        components: {

        },
        computed: {

        },
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                if(from.name == 'displayList'){
                    vm.productList = storage.get("selectedProduct", "");
                }else{
                    storage.remove("selectedProduct");
                }
            })
        },
        beforeRouteLeave (to, from, next) {
            next()
        },
        created() {

        },
        mounted() {},
        methods: {
            //提交申请
            confirm(){
                this.productList.forEach((item)=>{
                    this.param.items.push({productId:item.id})
                })
                displayApply(this.param)
                    .then(res => {
                        if (res.result === "success") {
                            this.$toast("申请提交成功！");
                            this.$router.go(-1)
                        }
                    })
                    .catch(err => {
                        this.$toast(err.message);
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

