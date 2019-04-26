<template>
    <div id="complaintDetail">
        <div class="content">
            <div class="status">
                <div class="state-title">投诉状态：<span style="color:#FF5638;font-weight:bold;">待处理</span></div>
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
            <div class="title-box">
                <div class="reason-warp">
                    <span class="title ">投诉原因</span>
                    <span class="font-30-666  reason-detail ">销售人员态度不好!</span>
                </div>
                <div class="content-warp">
                    <span class="title">内容描述</span>
                    <span class="font-30-666 margin-top-24">销售人员态度不好销售人员态度不好销售人员态度不好销售人员态度不好</span>
                </div>
            </div>
            <!--终端可见-->
            <div class="title-box">
                <div class="title ">商贸公司</div>
                <div class="font-30-666 company-name">茅台商贸公司</div>
            </div>
            <!--经销商可见-->
            <div class="title-box">
                <div class="title">客户信息</div>
                <div class="customer-info">
                    <span class="font-30-666 margin-bottom-8">客户姓名：老王</span>
                    <span class="font-30-666 margin-bottom-8">手机号码：134 2348 2334</span>
                    <span class="font-30-666 margin-bottom-8">投诉时间：2019-03-23 15:3</span>
                    <span class="font-30-666">销售负责人：小李</span>
                </div>
            </div>
            <!--终端可见-->
            <div class="title-box">
                <span class="title">投诉时间</span>
                <span class="font-30-666 company-name">2019-03-23 15:32</span>
            </div>
            <div class="title-box">
                <span class="title ">备注</span>
                <span class="font-30-666 company-name">质量不好。货送来的时候好多都是破损的</span>
            </div>
            <!--经销商可见-->
            <div class="title-box">
                <p class="title">回复</p>
                <textarea class="company-name"   id="replay" cols="30" rows="6" placeholder="请输入内容"
                          v-model="replay"></textarea>
            </div>
        </div>
        <button class="cancel-btn" v-if="judgeCode==2">撤销投诉</button>
    </div>
</template>

<script>
    export default {
        name: 'complaintDetail',
        data() {
            return {
                judgeCode: 2,
            }
        },
        computed: {},
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
        methods: {},
        watch: {}
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

    }


</style>

