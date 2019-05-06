<template>
    <div class="redemption-items" v-if="listData.customerAward" :style="{paddingLeft:'12px'}">
        <p class="dealer">{{ isCustomer?listData.dealer.dealerName: listData.customer.customerName}}</p>
        <p class="replyTime">{{listData.customerAward.createTime}}</p>
        <p class="redemptionHeadLine">兑奖申请</p>
        <ul v-if="listData.customerAward.items.length>0">
            <li v-for="(skuItem, index) in listData.customerAward.items">
                <div class="redemption-box" v-if="index<2">
                    <span>{{skuItem.productName}}</span>
                    <span>X{{skuItem.awardCount}}</span>
                </div>
                <div class="redemption-box" v-else :style="{display:isShowMore?'flex':'none'}">
                    <span>{{skuItem.productName}}</span>
                    <span>X{{skuItem.awardCount}}</span>
                </div>
            </li>
            <div class="expand" @click="isShowMoreInfo()" v-if="listData.customerAward.items.length>2">{{isShowMore?'收起':'展开更多'}}</div>
        </ul>
        <div class="continue" v-if="tabState==1">
            <div class="triangle"></div>
            <div class="report">
                <div class="left">{{listData.dealer.dealerName}}回复：</div>
                <div class="right">{{listData.customerAward.replyTime}}</div>
            </div>
            <div class="tips">{{listData.customerAward.replyContent}}</div>
        </div>
        <p class="state">{{stateList[0]}}</p>
        <div class="btn-warp">
            <button class="go-detail" @click="toRedemptionDetail(listData.customerAward.id)">查看详情</button>
            <button v-if="!isCustomer&&tabState==0" class="handle-btn" @click.stop="directProcessing(listData.customerAward.id)">处理</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'list-item',
        props: {
            listData: {
                type: Object,
                default: () => ({
                    customerAward: {},
                    dealer: {},
                    saleMan: {},
                    customer: {}
                })
            },
            tabState: {
                type: Number,
                default: false
            }
        },
        data() {
            return {
                stateList: ['待处理', '已处理', '已取消'],
                isShowMore: false,
            }
        },
        computed: {
            isDealer() {
                return this.userType == '1'
            },
            isSaleMan() {
                return this.userType == '2'
            },
            isCustomer() {
                return this.userType == '3'
            },
            isNull() {
                return JSON.stringify(this.listData.saleMan) == "{}"
            }
        },
        component: {
            //someComponent
        },
        methods: {
            // 是否展示更多信息
            isShowMoreInfo(id) {
                this.isShowMore = !this.isShowMore;
            },


            directProcessing(id) {
                this.$emit("directProcessing", id);
            },

            /**
             * 跳转兑奖详情
             * @param id-兑奖单id
             */
            toRedemptionDetail(id) {
                this.$router.push({
                    name: "redemptionDetail",
                    params: {
                        id: id
                    }
                });
            },

        },

    }
</script>

<style scoped lang="stylus">
    //列表item
    .redemption-items {
        bg(#fff);
        padding 24px 24px 0 88px;
        position relative;
        mt(20)

    }

    .dealer {
        c(#333);
        ft(28);
    }

    .replyTime {
        c(#999);
        ft(24);
    }

    .redemptionHeadLine {
        c(#333);
        ft(32);
        fb();
        mt(20)

    }

    .redemptionContent {
        c(#666);
        ft(28);
        mt(6);
        text-overflow-1()
    }

    .replyContent {
        c(#FF5638);
        ft(28);
        mt(16);
        text-overflow-1()
    }

    .state {
        position absolute;
        c(#FF5638);
        ft(26);
        top: 24px;
        right 24px;

    }

    .btn-warp {
        position: relative
        border-top 1px solid #F6F6F6;
        mt(24);
        display: flex;
        align-items center;
        justify-content flex-end
    }

    .go-detail {
        c(#333);
        ft(28);
        padding 12px 24px;
        border: 2px solid #DDDDDD;
        outline: none;
        border-radius: 8px;
        bg(#fff);
        margin: 16px 0

    }
    .handle-btn {
        c(#fff);
        ft(28);
        padding 12px 52px;
        bg(#FF5638)
        border: 2px solid #FF5638;
        outline: none;
        border-radius: 8px;
        margin: 16px 0;
        ml(24)
    }

    .select-img {
        position absolute
        w(40)
        h(40)
        top: 40px;
        left 24px;

    }

    .continue {
        bg(#f6f6f6);
        mt(24);
        border-radius: 10px;
        padding: 24px;
        position: relative;
    }

    .report {
        overflow: hidden;
        margin-bottom: 16px;
    }

    .left {
        float: left;
        c(#FF5638)
        font-size: 26px;
        height: 34px;
    }

    .right {
        float: right;
        c(#999)
        font-size: 26px;
        height: 34px;
        lh(34);
    }

    .tips {
        c(#666);
    }

    .triangle {
        width: 0;
        height: 0;
        border-bottom: 22px solid #f6f6f6;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
        position: absolute;
        top: -22px;
        left: 50px;
    }

    .redemption-box {
        display: flex;
        justify-content space-between;
        align-items center
        ft(28);
        c(#666);
        mt(8)

    }

    .expand {
        ft(28);
        c(#0096FF);
        mt(16)
    }
    .saleMan {
        c(#999);
        ft(28)
    }

</style>

