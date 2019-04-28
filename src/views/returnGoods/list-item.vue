<template>
    <div class="return-items" v-if="listData.customerReturn" :style="{paddingLeft:tabState==0&&isDealer?'44px':'12px'}">
        <img v-if="tabState==0&&isDealer" :src="listData.selected?selectImg[1]:selectImg[0]" class="select-img"
             @click.stop="selectSingle(listData.customerReturn.id)">
        <p class="dealer">{{ isCustomer?listData.dealer.dealerName: listData.customer.customerName}}</p>
        <p class="replyTime">{{listData.customerReturn.createTime}}</p>
        <p class="returnHeadLine">{{listData.customerReturn.returnContent}}</p>
        <ul v-if="listData.customerReturn.items.length>0">
            <li v-for="(skuItem, index) in listData.customerReturn.items">
                <div class="return-box" v-if="index<2">
                    <span>{{skuItem.productName}}</span>
                    <span>X{{skuItem.returnCount}}</span>
                </div>
                <div class="return-box" v-else :style="{display:isShowMore?'flex':'none'}">
                    <span>{{skuItem.productName}}</span>
                    <span>X{{skuItem.returnCount}}</span>
                </div>
            </li>
            <div class="expand" @click="isShowMoreInfo()" v-if="listData.customerReturn.items.length>2">{{isShowMore?'收起':'展开更多'}}</div>
        </ul>
        <div class="continue" v-if="tabState==1">
            <div class="triangle"></div>
            <div class="report">
                <div class="left">{{listData.dealer.dealerName}}回复：</div>
                <div class="right">{{listData.customerReturn.replyTime}}</div>
            </div>
            <div class="tips">{{listData.customerReturn.replyContent}}</div>
        </div>
        <p class="state">{{stateList[0]}}</p>
        <div class="btn-warp" :style="{justifyContent:isNull||isCustomer? 'flex-end':'space-between'}">
            <p v-if="listData.saleMan.dealingName&&tabState==1&&!isCustomer" class="saleMan">
                销售人员-{{listData.saleMan.dealingName}}已处理</p>
            <p v-if="listData.saleMan.dealingName&&tabState==0&&!isCustomer" class="saleMan">
                已移交销售人员-{{listData.saleMan.dealingName}}</p>
            <button class="go-detail" @click="toReturnDetail(listData.customerReturn.id)">查看详情</button>
        </div>
    </div>
</template>

<script>
    import ic1 from "../../assets/images/icon-check.png";
    import ic2 from "../../assets/images/icon-checked.png";
    const selectImg = [ic1, ic2];
    export default {
        name: 'list-item',
        props: {
            listData: {
                type: Object,
                default: () => ({
                    customerReturn: {},
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
                selectImg: selectImg,
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
                return JSON.stringify( ) == "{}"
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

            selectSingle(id) {
                this.$emit("selectSingle", id);
            },


            /**
             * 跳转退货详情
             * @param id-投诉单id
             */
            toReturnDetail(id) {
                this.$router.push({
                    name: "returnDetail",
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
    .return-items {
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

    .returnHeadLine {
        c(#333);
        ft(32);
        fb();
        mt(20)

    }

    .returnContent {
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
        position: relative border-top 1px solid #F6F6F6;
        mt(24);
        display: flex;
        align-items center;
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
        ft(26)
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

    .return-box {
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


