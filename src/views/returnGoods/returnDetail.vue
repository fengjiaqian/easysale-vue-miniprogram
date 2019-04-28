<template>
    <div id="returnDetail">
        <m-header :isFixed="true"></m-header>
        <div class="content">
            <div class="status">
                <div class="state-title">退货状态：<span style="color:#FF5638;font-weight:bold;">{{state[customerReturn.state]}}</span>
                </div>
                <div class="descrip" v-if="saleMan.dealingName&&isCustomer">
                    销售人员-{{saleMan.dealingName}}正在处理您的问题，请耐心等待！
                </div>
                <div class="descrip" v-if="saleMan.dealingName&&isDealer&&customerReturn.state==0">
                    已移交销售人员-{{saleMan.dealingName}}
                </div>
                <div class="descrip" v-if="saleMan.dealingName&&isDealer&&customerReturn.state==1">
                    销售人员-{{saleMan.dealingName}}已处理
                </div>
                <div class="continue" v-if="customerReturn.state==1">
                    <div class="triangle"></div>
                    <div class="report">
                        <p class="left">{{dealer.dealerName}}回复：</p>
                        <div class="right">{{customerReturn.replyTime}}</div>
                    </div>
                    <div class="tips">{{customerReturn.replyContent}}</div>
                </div>
            </div>
            <div class="title-box">
                <div class="title ">商品信息</div>
                <div class="font-30-666 company-name " style="padding-top: 0">
                    <ul v-if="customerReturn.items&&customerReturn.items.length>0">
                        <li v-for="(skuItem, index) in customerReturn.items">
                            <div class="goods-box" v-if="index<2">
                                <img class="goods-img" v-lazy="skuItem.productImageUrl">
                                <div class="goods-info">
                                    <p class="goods-name">{{skuItem.productName}}</p>
                                    <div class="goods-price-warp">
                                        <span>{{skuItem.price}}元/{{skuItem.priceUnit}}</span>
                                        <span class="count">X{{skuItem.returnCount}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="goods-box" v-else :style="{display:isShowMore?'flex':'none'}">
                                <img class="goods-img" v-lazy="skuItem.productImageUrl">
                                <div class="goods-info">
                                    <p class="goods-name">{{skuItem.productName}}</p>
                                    <div clas="goods-price-warp">
                                        <span>{{skuItem.price}}元/{{skuItem.priceUnit}}</span>
                                        <span class="count">X{{skuItem.returnCount}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <div class="expand" @click="isShowMoreInfo" v-if="customerReturn.items.length>2">
                            {{isShowMore?'收起':'展开更多'}}
                        </div>
                    </ul>
                </div>
            </div>
            <!--终端可见-->
            <div class="title-box" v-if="!isDealer">
                <div class="title ">{{isCustomer?'商贸公司':'经销商'}}</div>
                <div class="font-30-666 company-name">{{dealer.dealerName}}</div>
            </div>
            <!--经销商可见-->
            <div class="title-box" v-if="!isCustomer">
                <div class="title ">退货原因</div>
                <div class="font-30-666 company-name">{{customerReturn.returnContent}}</div>
            </div>
            <!--经销商可见-->
            <div class="title-box" v-if="!isCustomer">
                <div class="title">客户信息</div>
                <div class="customer-info">
                    <p class="font-30-666 margin-bottom-8">客户姓名：{{customer.customerName}}</p>
                    <p class="font-30-666 margin-bottom-8" style="position: relative">手机号码：{{customer.customerPhone}}
                        <a class="tel" :href="'tel:'+customer.customerPhone"></a></p>
                    <p class="font-30-666 margin-bottom-8">申请时间：{{customer.createTime}}</p>
                    <p class="font-30-666">销售负责人：{{customer.saleName}}</p>
                </div>
            </div>
            <!--终端可见-->
            <div class="title-box" v-if="isCustomer">
                <span class="title">申请时间</span>
                <span class="font-30-666 company-name">{{customerReturn.createTime}}</span>
            </div>
            <div class="title-box">
                <span class="title ">备注</span>
                <span class="font-30-666 company-name">{{customerReturn.remark}}</span>
            </div>
            <!--经销商可见-->
            <div class="title-box" v-if="!isCustomer&&customerReturn.state==0">
                <p class="title">回复</p>
                <textarea class="company-name" id="replay" cols="30" rows="6" placeholder="请输入内容"
                          v-model="replay"></textarea>
            </div>
        </div>
        <button class="cancel-btn" v-if="isCustomer&&customerReturn.state==0" @click="cancelReturn">取消申请</button>
        <!--经销商可见-->
        <div v-if="isDealer&&customerReturn.state==0">
            <!--待处理-->
            <div class="footer">
                <button class="left-btn" @click.stop="handoverProcessing">移交处理</button>
                <button class="right-btn" @click.stop="directProcessing">处理</button>
            </div>
        </div>
        <!--销售人员可见-->
        <div v-if="isSaleMan&&customerReturn.state==0">
            <button class="deal-btn" @click="directProcessing">处理</button>
        </div>
        <saleman-pop :roleList="roleList" :rolePopShow="rolePopShow" title="移交给" @closePop="closePop"
                     @submitQuery="submitQuery"></saleman-pop>
    </div>
</template>

<script>
    import mHeader from "components/header.vue";
    import {returnDetail, updateReturnById, batchUpdateReturn, cancelCustomerReturn} from "api/fetch/returnGoods";
    import {queryStaffList} from "api/fetch/mine";
    import salemanPop from "components/saleman-pop.vue"

    export default {
        name: 'returnDetail',
        data() {
            return {
                state: ['待处理', '已处理', '已取消'],
                judgeCode: 2,
                replay: '',
                customer: {},
                customerReturn: {},
                dealer: {},
                saleMan: {},
                rolePopShow: false,
                roleList: [],
                id: '',
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
        },
        components: {mHeader, salemanPop},
        created: function () {
            this.id = this.$route.params.id;
            this._QueryReturnDetail();
        },

        methods: {

            // 是否展示更多信息
            isShowMoreInfo(id) {
                this.isShowMore = !this.isShowMore;
            },


            /**
             * 加载退货详情
             * @private
             */
            _QueryReturnDetail() {
                returnDetail(this.id).then(res => {
                    if (res.data) {
                        let {customer, customerReturn, dealer, saleMan} = {...res.data};
                        this.customer = {...customer};
                        this.customerReturn = {...customerReturn};
                        this.dealer = {...dealer};
                        this.saleMan = {...saleMan}
                    }
                });
            },

            /**
             * 移交处理
             */

            handoverProcessing() {
                this.rolePopShow = true;
                //查询所有角色
                queryStaffList({}).then(res => {
                    if (res.result === "success") {
                        this.roleList = res.data;
                    }
                });

            },

            closePop() {
                this.rolePopShow = false;
            },


            /**
             * 移交处理
             * @param idealingId
             */
            submitQuery(dealingId) {
                this.closePop();
                let params = {
                    idList: [this.id],
                    dealingId: dealingId,
                };
                batchUpdateReturn(params).then(res => {
                    this.$toast('操作成功');
                    this._QueryReturnDetail()
                });
            },

            /**
             * 处理
             */
            directProcessing() {
                let params = {
                    id: this.id,
                    replyContent: this.replay,
                    state: 1
                };
                updateReturnById(params).then(res => {
                    this.$toast('操作成功');
                    this._QueryReturnDetail()
                });
            },

            /**
             * 取消申请
             */
            cancelReturn() {
                this.$confirm('您确定取消申请吗？')
                    .then(() => {
                        cancelCustomerReturn(this.id).then(res => {
                            this.$toast('操作成功');
                            this._QueryReturnDetail()
                        });
                    })
                    .catch(() => {
                    });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #returnDetail {
        bg(#f6f6f6);
        .content {
            mt(90)
            mb(100);
            overflow: scroll
        }
        .status {
            width: 100%;
            padding: 24px 24px 24px 24px;
            bg(white);

        }
        .state-title {
            c(#333);
            ft(34);
            font-weight: bold;
        }
        .descrip {
            c(#999);
            font-size: 26px;
            lh(36);
            mt(8);
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

        .title-box {
            padding: 24px;
            margin: 24px;
            bg(white);
            display flex;
            flex-direction column
        }

        .title {
            c(#333);
            font-size: 30px;
            font-weight: bold;
        }
        .reason-warp {
            display flex;
            flex-direction column;
        }

        .reason-detail {
            border-bottom: 1PX solid #f6f6f6;
            padding 24px 0;
        }
        .content-warp {
            display flex;
            flex-direction column;
            padding: 24px 0 0

        }
        .company-name {
            border-top: 1PX solid #f6f6f6;
            padding 24px 0 0;
            mt(24)
        }
        .cancel-btn {
            h(98)
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            bg(white);
            text-align: center;
            lh(98);
            c(#FF5638);
            font-size: 32px;
            border: 0;
            outline: none;
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

        .font-30-666 {
            c(#666);
            font-size: 30px;

        }
        .margin-top-24 {
            mt(24)
        }
        .margin-bottom-8 {
            margin-bottom: 8px;
        }
        .customer-info {
            display flex;
            flex-direction column;
            padding 24px 0;
            border-top 1px solid #f6f6f6;
            mt(24)
        }
        textarea:
        :-webkit-input-placeholder {
            color: #BDBDBD !important;
            font-size: 30px;
            text-align: left;
        }
        textarea {
            width: 100%;
            display: inline-block;
            padding: 24px 0 0 0;
            border: none;
            resize: none;
            outline: none;
            font-size: 30px;
            c(#333);
        }
        .expand {
            ft(28);
            c(#0096FF);
            mt(16)
        }
        .goods-box {
            display: flex
            flex-direction row;
            mt(24)
        }
        .goods-img {
            w(120)
            h(120)
            border-radius: 6px
            border none
            outline: none;
        }
        .goods-info {
            display flex;
            flex: 1;
            width 100%
            flex-direction column;
            ml(24)
        }
        .goods-name {
            ft(30);
            c(#333);
        }
        .goods-num {
            ft(26);
            c(#666);
            mt(43)
        }
        .footer {
            position: fixed;
            h(98)
            lh(98);
            width: 100%;
            bottom: 0;
            left: 0;
            bg(white);
            display flex;
            flex-direction row;

        }
        .left-btn {
            width 50%;
            bg(#fff);
            border: 0;
            outline: none;
            c(#FF5638)
            ft(32)
        }
        .right-btn {
            width 50%;
            bg(#FF5638);
            border: 0;
            outline: none;
            c(#fff)
            ft(32)
        }

        .deal-btn {
            h(98)
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            bg(#FF5638);
            text-align: center;
            lh(98);
            c(#fff);
            font-size: 32px;
            border: 0;
            outline: none;
        }
        .goods-price-warp {
            mt(43)
            display: flex;
            align-items center;
            position relative;
            width 100%
        }
        .count {
            display flex;
            position absolute;
            right 0px
        }
        .tel {
            block();
            pos(absolute);
            bottom: 0;
            right: 1px;
            squ(40);
            background: url('../../assets/images/icon-tel.png') no-repeat center;
            background-size: contain;
        }
    }


</style>

