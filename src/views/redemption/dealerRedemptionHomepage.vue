<template>
    <div id="redemption">
        <top-tabs :topTabsList="topTabsList" @switchTab="switchTab" class="top"></top-tabs>
        <div class="content">
            <ul>
                <li v-for="item in [1,2,3]">
                    <div class="redemption-items">
                        <img v-lazy="selectImg[0]" class="select-img">
                        <p class="dealer">小丽</p>
                        <p class="replyTime">2019-03-23 20:43</p>
                        <p class="redemptionHeadLine">兑奖申请</p>
                        <ul >
                            <li v-for="(applyItem, index) in [1,2,3]">
                                <div class="redemption-box" v-if="index<2">
                                    <span>洋河蓝色经典 梦之蓝M6 52度</span>
                                    <span>X2</span>
                                </div>
                                <div class="redemption-box" v-else :style="{display:isShowMore?'flex':'none'}">
                                    <span>洋河蓝色经典 梦之蓝M6 52度</span>
                                    <span>X2</span>
                                </div>
                            </li>
                            <div class="expand" @click="isShowMoreInfo">{{isShowMore?'收起':'展开更多'}}</div>
                        </ul>
                        <div class="continue" v-if="tabState==1">
                            <div class="triangle"></div>
                            <div class="report">
                                <div class="left">茅台商贸公司回复：</div>
                                <div class="right">2019-03-23 20:40</div>
                            </div>
                            <div class="tips">亲爱的客户，非常抱歉给您带来的不便，您的反馈问题我们会在下次服务中改进。期待您再次光临</div>
                        </div>
                        <p class="state">{{stateList[0]}}</p>
                        <div class="btn-warp">
                            <button class="go-detail" @click="toredemptionDetail()">查看详情</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--经销商可见-->
        <div class="footer">
            <div class="footer-left">
                <img v-lazy="selectImg[0]" class="select-img">
                <span>全选</span>
            </div>
            <button class="handle-btn">移交处理</button>
        </div>

    </div>
</template>
<script>
    import TopTabs from "../../components/topTabs";
    import ic1 from "../../assets/images/icon-check.png";
    import ic2 from "../../assets/images/icon-checked.png";
    import ic3 from "../../assets/images/ic_already_checked.png";

    const selectImg = [ic1, ic2, ic3];
    export default {
        name: 'dealerRedemptionHomepage',
        components: {TopTabs},
        data() {
            return {
                topTabsList: ['待处理', '已处理'],
                stateList: ['待处理', '已处理', '已取消'],
                selectImg: selectImg,
                tabState:0,
                isShowMore:false,

            }
        },
        methods: {

            /**
             * 切换顶部tabs
             * @param state:0-待处理，1-已处理
             */
            switchTab(state) {
                this.tabState=state
            },


            // 是否展示更多信息
            isShowMoreInfo(){
              this.isShowMore = !this.isShowMore
            },


            /**
             * 跳转新增投诉与建议
             * @param id-投诉单id
             */
            addredemptions() {
                this.$router.push({
                    name: "addNewredemption",
                });
            },
            /**
             * 跳转投诉详情
             * @param id-投诉单id
             */
            toredemptionDetail(id) {
                this.$router.push({
                    name: "redemptionDetail",
                    params: {
                        id: id
                    }
                });
            }


        }
    }
</script>

<style lang="stylus">
    #redemption {
        width: 100vw;
        bg(#f6f6f6);
        .top {
            width 100vw;
            position fixed;
            top: 0;
            left 0;
            z-index 34;
        }
        .content {
            margin-top 98px;
            margin-bottom 110px;
            border-top 2px solid #EDEDED
        }
        //列表item
        .redemption-items {
            bg(#fff);
            padding 24px 24px 0 88px;
            position relative;
            mt(20)
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
            .redemption-box{
                display:flex;
                justify-content space-between;
                align-items center
                ft(28);
                c(#666);
                mt(8)

            }
            .expand{
                ft(28);
                c(#0096FF);
                mt(16)
            }

        }
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            h(98);
            lh(98);
            bg(#fff);
            z-index 44;
            display flex;
            justify-content space-between
            align-items center
            padding 0 24px
            img {
                w(40)
                h(40)

            }
            .footer-left {
                display flex;
                align-items center
                justify-content center
            }
            span {
                ml(24)
            }
        }
        .handle-btn {
            w(160)
            h(64)
            lh(64)
            bg(#FF5638)
            border-radius: 8px;
            border: 1px solid rgba(255, 86, 56, 1)
            ft(28)
            c(#fff)
            border: 0
            outline: none

        }
    }

</style>

