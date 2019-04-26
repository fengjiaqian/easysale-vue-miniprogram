<template>
    <div id="redemption">
        <top-tabs :topTabsList="topTabsList" @switchTab="switchTab" class="top"></top-tabs>
        <div class="content">
            <cube-scroll-nav
                    :current="current"
                    :speed="300"
                    @change="changeHandler"
                    @sticky-change="stickyChangeHandler">
                <cube-scroll-nav-panel
                        v-for="item in testData.data"
                        :key="item.dealer"
                        :label="item.dealer">
                    <ul>
                        <li v-for="redemption in item.customerredemption">
                            <div class="redemption-items">
                                <p class="dealer">{{item.dealer}}</p>
                                <p class="replyTime">{{redemption.replyTime}}</p>
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
                                <p class="state">{{stateList[redemption.state]}}</p>
                                <div class="btn-warp">
                                    <button class="go-detail" @click="toReturnDetail(redemption.id)">查看详情</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </div>
        <button class="footer" @click="addNewReturnOrder()">新建退货单</button>
    </div>
</template>
<script>
    import TopTabs from "../../components/topTabs";

    export default {
        name: 'clientReturnHomepage',
        components: {TopTabs},
        data() {
            return {
                topTabsList: ['待处理', '已处理'],
                stateList: ['待处理', '已处理', '已取消'],
                current: 0,
                isShowMore:false,

            }
        },
        computed: {
            testData() {
                let arr = [];
                for (let i = 0; i < 10; i++) {
                    let obj = {
                        "dealer": "热销榜" + i,
                        "customerredemption": [
                            {

                                "replyTime": "2019-03-23 20:43",
                                "redemptionHeadLine": "销售人员态度不好",
                                "redemptionContent": '我在这里下了一个单，销售人员态度非常不好',
                                "replyContent": '茅台商贸公司已经把您的退货转交给销售人员',
                                "state": i,
                            },
                        ]
                    };
                    arr.push(obj)
                }

                return {
                    'data': arr
                }
            },


        },

        methods: {

            changeHandler(label) {

                console.log('changed to:', label)
            },
            stickyChangeHandler(current) {
                console.log('sticky-change', current)
            },

            /**
             * 切换顶部tabs
             * @param state:0-待处理，1-已处理
             */
            switchTab(state) {

            },

            // 是否展示更多信息
            isShowMoreInfo(){
                this.isShowMore = !this.isShowMore
            },

            /**
             * 跳转新增退货单
             * @param
             */
            addNewReturnOrder() {
                this.$router.push({
                    name: "addNewReturnOrder",
                });
            },
            /**
             * 跳转兑奖详情
             * @param id-投诉单id
             */
            toReturnDetail(id) {
                this.$router.push({
                    name: "returnDetail",
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

        .cube-scroll-nav-bar-items {
            bg(#fff);

        }
        .cube-scroll-nav-bar-item {
            c(#666);
            ft(26);
            padding 10px 16px;
            bg(#f6f6f6)
            margin 16px 24px;
        }
        .cube-scroll-nav-bar-item_active {
            c(#FF5638);
            ft(26);
            padding 10px 16px;
            bg(#FFEEEB)
            margin 16px 24px;
        }
        .cube-scroll-nav-panel-title {
            c(#333);
            ft(34);
            fb();
            flex-center();
            bg(#fff);
            padding 30px 0
        }

        .cube-scroll-nav-panel {

        }

        //列表item
        .redemption-items {
            bg(#fff);
            padding 0 24px;
            position relative;
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
            border: 0;
            outline: none;
            width: 100%;
            h(98);
            lh(98);
            bg(#fff)
            font-size: 32px;
            c(#FF5638);
            text-align: center;
            z-index 44
        }
    }

</style>


