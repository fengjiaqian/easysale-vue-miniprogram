<template>
    <div class="complaint-items" :style="{paddingLeft:'12px'}"
         v-if="listData.customerComplaint">
        <p class="dealer">{{userType == 3?listData.dealer.dealerName: listData.customer.customerName}}</p>
        <p class="replyTime">{{listData.customerComplaint.createTime}}</p>
        <p class="complaintHeadLine">{{listData.customerComplaint.complaintHeadLine}}</p>
        <p class="complaintContent">{{listData.customerComplaint.complaintContent}}</p>
        <div class="continue" v-if="tabState==1">
            <div class="triangle"></div>
            <div class="report">
                <div class="left" v-if="listData.dealer">{{listData.dealer.dealerName}}回复：</div>
                <div class="right">{{listData.customerComplaint.replyTime}}</div>
            </div>
            <div class="tips">{{listData.customerComplaint.replyContent||'我们会尽快为您处理'}}</div>
        </div>
        <p class="state">{{stateList[listData.customerComplaint.state]}}</p>
        <div class="btn-warp">
            <button class="go-detail" @click.stop="toComplaintDetail(listData.customerComplaint.id)">查看详情</button>
            <button v-if="userType != 3&&tabState==0" class="handle-btn"
                    @click.stop="directProcessing(listData.customerComplaint.id)">处理
            </button>
            <button v-if="userType == 3&&tabState==0" class="cancel-btn"
                    @click.stop="cancelComplaint(listData.customerComplaint.id)">撤销意见
            </button>
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
                    customerComplaint: {},
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
            }
        },
        computed: {
            isNull() {
                return JSON.stringify(this.listData.saleMan) == "{}"
            }
        },

        component: {
            //someComponent
        },
        methods: {
            /**
             * 跳转投诉详情
             * @param id-投诉单id
             */
            toComplaintDetail(id) {
                this.$router.push({
                    name: "complaintDetail",
                    params: {
                        id: id
                    }
                });
            },
            directProcessing(id) {
                this.$emit("directProcessing", id);
            },
            cancelComplaint(id){
                this.$emit("cancelComplaint", id);
            }
        }
    }
</script>

<style scoped lang="stylus">
    // 列表item
    .complaint-items {
        bg(#fff);
        padding 24px 24px 0 88px;
        position relative;
        mb(20)
    }

    .dealer {
        c(#333);
        ft(28);
    }

    .replyTime {
        c(#999);
        ft(24);
    }

    .complaintHeadLine {
        c(#333);
        ft(32);
        fb();
        mt(20)

    }

    .complaintContent {
        c(#666);
        ft(28);
        mt(6);
        text-overflow-1()
    }

    .red-tip {
        c(#FF5638);
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
        justify-content: flex-end
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

    .saleMan {
        c(#999);
        ft(28)
    }
    .cancel-btn {
        c(#FF5638);
        ft(28);
        padding 12px 24px;
        bg(#fff);
        border: 2px solid #DDDDDD;
        outline: none;
        border-radius: 8px;
        margin: 16px 0;
        ml(24)
    }
</style>

