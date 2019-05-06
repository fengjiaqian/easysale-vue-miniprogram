<template>
    <div class="display-detail" v-if="domShow">
        <div class="dd-header">
            <p class="state">陈列状态：<span>{{stateText}}</span></p>
        </div>
        <div class="dd-column">
            <h5>陈列商品</h5>
            <ul class="dap-list">
                <li v-for="product in displayInfo.customerDisplay.items">
                    <img v-lazy="product.productImageUrl" >
                    <div class="product-info-normal">
                        <h5 class="p-name">{{product.productName}}</h5>
                        <div style="flex:1;"></div>
                        <div class="p-price" v-html="$options.filters.normalPrice(product.price, product.priceUnit)"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="dd-column dd-remark">
            <h5>备注</h5>
            <p>{{displayInfo.customerDisplay.remark || `暂无备注~`}}</p>
        </div>
        <div class="dd-column dd-info">
            <h5>陈列信息</h5>
            <ul>
                <li>申请时间：{{displayInfo.customerDisplay.createTime}}</li>
                <li>商贸公司：{{displayInfo.dealer.shopName}}</li>
            </ul>
        </div>
        <div class="bottom-btn" @click="cancelApply" v-if="displayInfo.customerDisplay.state==0">取消陈列</div>
    </div>
</template>

<script>
    import { queryDisplayDetail, cancelDisplayApply } from "api/fetch/display";
    import storage from 'common/storage'
    export default {
        data() {
            return {
                displayInfo: {},//陈列详情
                id: '',//陈列id
                domShow: false,
            };
        },
        components: {

        },
        computed: {
            stateText(){
                let text = ''
                const { state } = this.displayInfo.customerDisplay
                text = state == 0 ? `已申请，待经销商审核` : `已处理`
                return text
            }
        },
        created() {
           this.id = this.$route.query.id;
           this.queryDetail()
        },
        mounted() {},
        methods: {
            //获取陈列详情
            queryDetail(){
                let param = {
                    id: this.id
                }
                queryDisplayDetail(param)
                    .then(res => {
                        if (res.result === "success") {
                            this.displayInfo = res.data
                            this.domShow = true
                        }
                    })
                    .catch(err => {
                        this.$toast(err.message);
                    });
            },
            //取消陈列申请
            cancelApply(){
                let param = {
                    id: this.id
                }
                cancelDisplayApply(param)
                    .then(res => {
                        if (res.result === "success") {
                            this.$toast(`取消成功！`);
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

