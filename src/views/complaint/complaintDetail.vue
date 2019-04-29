<template>
    <div id="complaintDetail">
        <m-header :isFixed="true"></m-header>
        <div class="content">
            <div class="status">
                <div class="state-title">投诉状态：<span style="color:#FF5638;font-weight:bold;">{{state[customerComplaint.state]}}</span>
                </div>
                <div class="descrip" v-if="saleMan.dealingName&&isCustomer">
                    销售人员-{{saleMan.dealingName}}正在处理您的问题，请耐心等待！
                </div>
                <div class="descrip" v-if="saleMan.dealingName&&isDealer&&customerComplaint.state==0">
                    已移交销售人员-{{saleMan.dealingName}}
                </div>
                <div class="descrip" v-if="saleMan.dealingName&&isDealer&&customerComplaint.state==1">
                    销售人员-{{saleMan.dealingName}}已处理
                </div>
                <div class="continue" v-if="customerComplaint.state==1">
                    <div class="triangle"></div>
                    <div class="report">
                        <div class="left">{{dealer.dealerName}}回复：</div>
                        <div class="right">{{customerComplaint.replyTime}}</div>
                    </div>
                    <div class="tips">{{customerComplaint.replyContent}}</div>
                </div>
            </div>
            <div class="title-box">
                <div class="reason-warp">
                    <span class="title ">投诉原因</span>
                    <span class="font-30-666  reason-detail ">{{customerComplaint.complaintHeadLine}}</span>
                </div>
                <div class="content-warp">
                    <span class="title">内容描述</span>
                    <span class="font-30-666 margin-top-24">{{customerComplaint.complaintContent}}</span>
                </div>
            </div>
            <!--终端可见-->
            <div class="title-box" v-if="!isDealer">
                <div class="title ">{{isCustomer?'商贸公司':'经销商'}}</div>
                <div class="font-30-666 company-name">{{dealer.dealerName}}</div>
            </div>
            <!--经销商可见-->
            <div class="title-box" v-if="!isCustomer">
                <div class="title">客户信息</div>
                <div class="customer-info">
                    <p class="font-30-666 margin-bottom-8">客户姓名：{{customer.customerName}}</p>
                    <p class="font-30-666 margin-bottom-8" style="position: relative">手机号码：{{customer.customerPhone}}
                        <a class="tel" :href="'tel:'+customer.customerPhone"></a></p>
                    <p class="font-30-666 margin-bottom-8">投诉时间：{{customer.createTime}}</p>
                    <p class="font-30-666">销售负责人：{{customer.saleName}}</p>
                </div>
            </div>
            <!--终端可见-->
            <div class="title-box" v-if="isCustomer">
                <span class="title">投诉时间</span>
                <span class="font-30-666 company-name">{{customerComplaint.createTime}}</span>
            </div>
            <div class="title-box">
                <span class="title ">备注</span>
                <span class="font-30-666 company-name">{{customerComplaint.remark}}</span>
            </div>
            <!--经销商可见-->
            <div class="title-box" v-if="!isCustomer&&customerComplaint.state==0">
                <p class="title">回复</p>
                <textarea class="company-name" id="replay" cols="30" rows="6" placeholder="请输入内容"
                          v-model="replay"></textarea>
            </div>
        </div>
        <button class="cancel-btn" v-if="isCustomer&&customerComplaint.state==0" @click="cancelComplaint">撤销投诉</button>
        <!--经销商可见-->
        <div v-if="isDealer&&customerComplaint.state==0">
            <!--待处理-->
            <div class="footer">
                <button class="left-btn" @click.stop="handoverProcessing">移交处理</button>
                <button class="right-btn" @click.stop="directProcessing">处理</button>
            </div>
        </div>
        <!--销售人员可见-->
        <div v-if="isSaleMan&&customerComplaint.state==0">
            <button class="deal-btn" @click="directProcessing">处理</button>
        </div>
        <saleman-pop :roleList="roleList" :rolePopShow="rolePopShow" title="移交给" @closePop="closePop"
                     @submitQuery="submitQuery"></saleman-pop>
    </div>
</template>

<script>
    import mHeader from "components/header.vue";
    import {complainDetail, updateCustomerById, batchUpdateComplaint, cancelComplaint} from "api/fetch/complaints";
    import {queryStaffList} from "api/fetch/mine";
    import salemanPop from "components/saleman-pop.vue"

    export default {
        name: 'complaintDetail',
        data() {
            return {
                state: ['待处理', '已处理', '已取消'],
                judgeCode: 2,
                replay: '',
                customer: {},
                customerComplaint: {},
                dealer: {},
                saleMan: {},
                rolePopShow: false,
                roleList: [],
                id: ''

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
            this._QueryComplaintDetail();
        },

        methods: {

            /**
             * 加载投诉详情
             * @private
             */
            _QueryComplaintDetail() {
                complainDetail(this.id).then(res => {
                    if (res.data) {
                        let {customer, customerComplaint, dealer, saleMan} = {...res.data};
                        this.customer = {...customer};
                        this.customerComplaint = {...customerComplaint};
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
                batchUpdateComplaint(params).then(res => {
                    this.$toast('操作成功');
                    this._QueryComplaintDetail()
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
                updateCustomerById(params).then(res => {
                    this.$toast('操作成功');
                    this._QueryComplaintDetail()
                });
            },

            /**
             * 撤销投诉
             */
            cancelComplaint() {
                this.$confirm('您确定撤销投诉吗？')
                    .then(() => {
                        cancelComplaint(this.id).then(res => {
                            this.$toast('操作成功');
                            this._QueryComplaintDetail()
                        });
                    })
                    .catch(() => {
                    });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #complaintDetail {
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
            ft(26);
            c(#666);
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

