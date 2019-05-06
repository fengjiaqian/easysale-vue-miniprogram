<template>
    <div class="display-detail" v-if="domShow">
        <div class="dd-header">
            <p class="state">陈列状态：<span>{{stateText}}</span></p>
            <div class="reply-box" v-if="displayInfo.customerDisplay.state!=0&&displayInfo.customerDisplay.replyContent">
                <div class="rb-t">
                    <span class="red">经销商回复：</span>
                    <span>{{displayInfo.customerDisplay.replyTime}}</span>
                </div>
                <div class="rb-b">{{displayInfo.customerDisplay.replyContent}}</div>
            </div>
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
        <div class="dd-column dd-info">
            <h5>客户信息</h5>
            <ul>
                <li>客户姓名：{{displayInfo.customer.customerName}}</li>
                <li>手机号码：{{displayInfo.customer.customerPhone}}</li>
                <li>申请时间：{{displayInfo.customer.createTime}}</li>
                <li>消失负责人：{{displayInfo.customer.saleName}}</li>
            </ul>
        </div>
        <div class="dd-column dd-remark" v-if="displayInfo.customerDisplay.state==0">
            <h5>回复</h5>
            <textarea v-model="replyContent" cols="30" rows="6" placeholder="请输入回复内容"></textarea>
        </div>
        <div class="bottom-btn deal" @click="_dealApply" v-if="displayInfo.customerDisplay.state==0">处理</div>
    </div>
</template>

<script>
    import { queryDisplayDetail, dealApply } from "api/fetch/display";
    import storage from 'common/storage'
    export default {
        data() {
            return {
                displayInfo: {},//陈列详情
                id: '',//陈列id
                domShow: false,
                replyContent: '',//回复内容
            };
        },
        components: {

        },
        computed: {
            stateText(){
                let text = ''
                const { state } = this.displayInfo.customerDisplay
                text = state == 0 ? `待处理` : `已处理`
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
            //处理申请
            _dealApply(){
                let param = {
                    id: this.id,
                    replyContent: this.replyContent,
                    state: 1
                }
                dealApply(param)
                    .then(res => {
                        if (res.result === "success") {
                            this.$toast(`处理成功！`);
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

