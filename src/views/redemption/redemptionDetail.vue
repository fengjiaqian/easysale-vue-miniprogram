<template>
    <div id="complaintDetail">
        <div class="content">
            <div class="status">
                <div class="state-title">兑奖状态：<span style="color:#FF5638;font-weight:bold;">待处理</span></div>
                <div v-if="isCustomer">
                    <div class="descrip" v-if="judgeCode==1">销售人员-小黑正在处理您的问题，请耐心等待！</div>
                    <div class="continue" v-if="judgeCode==2">
                        <div class="triangle"></div>
                        <div class="report">
                            <div class="left">茅台商贸公司回复：</div>
                            <div class="right">2019-03-23 20:40</div>
                        </div>
                        <div class="tips">亲爱的客户，非常抱歉给您带来的不便，您的反馈问题我们会在下次服务中改进。期待您再次光临</div>
                    </div>
                </div>

            </div>
            <div class="title-box">
                <div class="title ">兑奖商品</div>
                <div class="font-30-666 company-name " style="padding-top: 0">
                    <ul>
                        <li v-for="(applyItem, index) in [1,2,3]">
                            <div class="goods-box" v-if="index<2">
                                <img class="goods-img">
                                <div class="goods-info">
                                    <p class="goods-name">洋河蓝色经典 梦之蓝M6 52度</p>
                                    <p class="goods-num">兑奖数量：2</p>
                                </div>
                            </div>
                            <div class="goods-box" v-else :style="{display:isShowMore?'flex':'none'}">
                                <img class="goods-img">
                                <div class="goods-info">
                                    <p class="goods-name">洋河蓝色经典 梦之蓝M6 52度</p>
                                    <p class="goods-num">兑奖数量：2</p>
                                </div>
                            </div>
                        </li>
                        <div class="expand" @click="isShowMoreInfo">{{isShowMore?'收起':'展开更多'}}</div>
                    </ul>
                </div>
            </div>
            <!--终端可见-->
            <div class="title-box" v-if="isCustomer">
                <div class="title ">商贸公司</div>
                <div class="font-30-666 company-name">茅台商贸公司</div>
            </div>
            <!--销售人员可见-->
            <div class="title-box" v-if="isSaler">
                <div class="title ">经销商</div>
                <div class="font-30-666 company-name">茅台商贸公司</div>
            </div>
            <!--经销商可见-->
            <div class="title-box" v-if="!isCustomer">
                <div class="title">客户信息</div>
                <div class="customer-info">
                    <span class="font-30-666 margin-bottom-8">客户姓名：老王</span>
                    <span class="font-30-666 margin-bottom-8">手机号码：134 2348 2334</span>
                    <span class="font-30-666 margin-bottom-8">投诉时间：2019-03-23 15:3</span>
                    <span class="font-30-666">销售负责人：小李</span>
                </div>
            </div>
            <!--终端可见-->
            <div class="title-box" v-if="isCustomer">
                <span class="title">申请时间</span>
                <span class="font-30-666 company-name">2019-03-23 15:32</span>
            </div>
            <div class="title-box">
                <span class="title ">备注</span>
                <span class="font-30-666 company-name">质量不好。货送来的时候好多都是破损的</span>
            </div>
            <!--经销商可见-->
            <div class="title-box" v-if="!isCustomer">
                <p class="title">回复</p>
                <textarea class="company-name" id="replay" cols="30" rows="6" placeholder="请输入内容"
                          v-model="replay"></textarea>
            </div>
        </div>
        <!--终端可见-->
        <button class="cancel-btn" v-if="isCustomer">取消兑奖</button>
        <!--经销商可见-->
        <div v-if="isDealer">
            <!--待处理-->
            <div class="footer" >
                <button class="left-btn" >移交处理</button>
                <button class="right-btn" >处理</button>
            </div>
            <div class="footer" style="display: none">
                <button class="left-btn" >拒绝</button>
                <button class="right-btn" >同意</button>
            </div>
        </div>
        <!--销售人员可见-->
        <div v-if="isSaler">
            <button class="deal-btn" >处理</button>
            <button class="deal-btn" style="display: none">重新处理</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'redemptionDetail',
        data() {
            return {
                judgeCode: 2,
                replay: '',
                isShowMore: false,

            }
        },
        computed: {
            isCustomer() {
                return this.userType == '3'
            },
            isDealer() {
                return this.userType == '1'
            },
            isSaler() {
                return this.userType == '2'
            }
        },
        components: {},
        beforeCreate: function () {

        },
        created: function () {

        },
        beforeDestory() {
        },
        destoryed() {
        },
        mounted() {

        },
        methods: {
            // 是否展示更多信息
            isShowMoreInfo() {
                this.isShowMore = !this.isShowMore
            },

        },
        watch: {

        }
    }
</script>

<style lang="stylus" scoped>
    #complaintDetail {
        bg(#f6f6f6);
        .content {
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

        .deal-btn{
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

    }


</style>

