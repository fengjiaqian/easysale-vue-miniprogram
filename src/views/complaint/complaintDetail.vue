<template>
    <div id="complaintDetail">
        <m-header :isFixed="true"></m-header>
        <div class="content">
            <div class="status">
                <div class="state-title">意见状态：<span style="color:#FF5638;font-weight:bold;">{{state[customerComplaint.state]}}</span>
                </div>
                <div class="continue" v-if="customerComplaint.state==1">
                    <div class="triangle"></div>
                    <div class="report">
                        <div class="left">{{dealer.dealerName}}回复：</div>
                        <div class="right">{{customerComplaint.replyTime}}</div>
                    </div>
                    <div class="tips">{{customerComplaint.replyContent||'我们会尽快为您处理'}}</div>
                </div>
            </div>
            <div class="title-box">
                <div class="reason-warp">
                    <span class="title ">意见原因</span>
                    <span class="font-30-666  reason-detail ">{{customerComplaint.complaintHeadLine}}</span>
                </div>
                <div class="content-warp">
                    <span class="title">内容描述</span>
                    <span class="font-30-666 margin-top-24">{{customerComplaint.complaintContent}}</span>
                </div>
            </div>
            <!--终端可见-->
            <div class="title-box">
                <div class="title ">{{userType == 3?'商贸公司':'经销商'}}</div>
                <div class="font-30-666 company-name">{{dealer.dealerName}}</div>
            </div>
            <!--经销商可见-->
            <div class="title-box" v-if="userType != 3">
                <div class="title">客户信息</div>
                <div class="customer-info">
                    <p class="font-30-666 margin-bottom-8">客户姓名：{{customer.customerName}}</p>
                    <p class="font-30-666 margin-bottom-8" style="position: relative">手机号码：{{customer.customerPhone}}
                        <a class="tel" :href="'tel:'+customer.customerPhone"></a></p>
                    <p class="font-30-666 margin-bottom-8">创建时间：{{customer.createTime}}</p>
                    <p class="font-30-666" v-if="customer.saleName">销售负责人：{{customer.saleName}}</p>
                </div>
            </div>
            <div class="title-box" v-if="userType == 3">
                <span class="title">创建时间</span>
                <span class="font-30-666 company-name">{{customerComplaint.createTime}}</span>
            </div>
            <!-- <div class="title-box">
                <span class="title ">备注</span>
                <span class="font-30-666 company-name">{{customerComplaint.remark}}</span>
            </div> -->
            <div class="title-box" v-if="userType != 3&&customerComplaint.state==0">
                <p class="title">回复</p>
                <textarea class="company-name" id="replay" cols="30" rows="6" placeholder="请输入内容"
                          v-model="replay"></textarea>
            </div>
            <div class="title-box" v-if="customerComplaint.imageList && customerComplaint.imageList.length>0">
                <p class="title">相关图片</p>
                <div  class="complaint_img_div">
                    <span  class="complaint_img_box" v-for="(item,index) in customerComplaint.imageList" :key="item.id">
                    <img class="complaint_img" v-preview="item" :src="item" alt="">
                </span>
                </div>
                
            </div>
        </div>
        <button class="cancel-btn" :class="{'isIphoneX':isIphoneX}" v-if="userType == 3&&customerComplaint.state==0" @click="cancelComplaint">撤销意见
        </button>
        <div v-if="userType !=3&&customerComplaint.state==0">
            <button class="deal-btn" @click="directProcessing">处理</button>
        </div>
    </div>
</template>

<script>
    import mHeader from "components/header.vue";
    import {complainDetail, updateCustomerById, batchUpdateComplaint, cancelComplaint} from "api/fetch/complaints";
    import {queryStaffList} from "api/fetch/mine";

    export default {
        name: 'complaintDetail',
        data() {
            return {
                isIphoneX:this.isIphoneX,
                state: ['待处理', '已处理', '已取消'],
                judgeCode: 2,
                replay: '',
                customer: {},
                customerComplaint: {},
                dealer: {},
                saleMan: {},
                id: ''

            }
        },

        components: {mHeader,},
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
                }).catch(() => {
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
                }).catch(res => {
                    this.$toast(res.message)
                });
            },

            /**
             * 撤销投诉
             */
            cancelComplaint() {
                this.$confirm('您确定撤销意见吗？')
                    .then(() => {
                        cancelComplaint(this.id).then(res => {
                            this.$toast('操作成功');
                            this._QueryComplaintDetail()
                        }).catch(() => {
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

        .cancel-btn.isIphoneX{
            padding-bottom 34px;}

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

        .complaint_img_div{
            mt(20)
            display:flex;
            justify-content :space-around;
            border-top: 1PX solid #f6f6f6;
            }

        .complaint_img_box{
            mt(20)
            ml(20)
            width:190px;
            height :190px;
            }

        .complaint_img{
            height :190px;           
            width :190px;
        }
        .complaint_img_box:first-of-type{
            margin-left :0}

    }


</style>

