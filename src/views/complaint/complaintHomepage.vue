<template>
    <div id="complaint">
        <m-header :isFixed="true" :tit="title"></m-header>
        <section class="top-bar ">
            <span v-for="(item,index) in stateList" :class="{'active': tabState == index}" @click="switchTab(index)">{{item.title}}</span>
        </section>
        <!--经销商店铺列表-->
        <div class="dealer-list-wrap" v-if="userType == 3&&dealerList.length>0">
            <span :class="{'active':activeshopIdx==idx}" v-for="(item,idx) in dealerList"
                  @click="switchShop(item,idx)">{{item.shopName}}</span>
        </div>
        <empty style="margin-top: 100px"
               :txt="'暂无相关意见单'" v-if="empty"
               :iconUrl="iconUrl"></empty>
        <div :class="{'mt-185':userType != 3,'mt-275':userType == 3,'mb':userType == 3}"
             style="height: 100%" v-if="complaintsList.length">
            <scroll
                    class="c-list"
                    :data="complaintsList"
                    ref="scrollComplaints"
            >
                <div>
                    <list-item v-for="(item,index) in complaintsList" :listData="item" :key="index"
                               :tabState="tabState" @directProcessing="directProcessing" @cancelComplaint="cancelComplaint"></list-item>
                </div>

            </scroll>
        </div>
        <button class="footer-btn" :class="{'isIphoneX':isIphoneX}" @click="addComplaints()" v-if="userType == 3">我要提意见</button>
    </div>
</template>
<script>
    import {complaintList, selectDealComplaint, updateCustomerById,cancelComplaint} from "api/fetch/complaints";
    import {queryStaffList} from "api/fetch/mine";
    import scroll from "components/scroll.vue";
    import listItem from "./list-item.vue";
    import empty from "components/empty.vue";
    import mHeader from "components/header.vue";
    import iconUrl from "../../assets/images/empty_icon_1.png"

    export default {
        name: 'complaintHomepage',
        components: {listItem, empty, mHeader, scroll},
        data() {
            return {
                isIphoneX:this.isIphoneX,
                stateList: [{
                    title: `待处理`,
                    idx: 0
                }, {
                    title: `已处理`,
                    idx: 1
                }],
                tabState: 0,
                complaintsList: [],
                empty: true,
                isAllSelected: false,
                iconUrl: iconUrl,
                title: '意见管理',
                dealerList: [],
                activeshopIdx: 0,//默认选中的经销商
                shopId: ''
            }
        },
        created() {
            this.title = this.userType == '3' ? '意见列表' : '意见管理';
            if (this.userType == '3') {
                this._QueryDealComplaint();
            } else {
                this._QueryComplaintList();
            }
        },
        methods: {

            /**
             * 切换顶部tabs
             * @param state:0-待处理，1-已处理
             */
            switchTab(state) {
                this.tabState = state;
                this.complaintsList = [];
                if (this.userType == '3') {
                    this._QueryDealComplaint();
                } else {
                    this._QueryComplaintList();
                }
            },

            //切换经销商店铺
            switchShop(item, idx) {
                this.activeshopIdx = idx;
                this.complaintsList = [];
                this.shopId = item.shopId;
                this._QueryComplaintList();

            },

            // 客户投诉过的经销商列表
            _QueryDealComplaint() {
                selectDealComplaint(this.tabState).then(res => {
                    if (res.data) {
                        let resultData = res.data;
                        this.empty = !resultData.length;
                        this.dealerList = [...resultData];
                        this.shopId = this.dealerList[0].shopId;
                        this._QueryComplaintList()

                    }
                }).catch(() => {
                });

            },

            // 加载列表数据
            _QueryComplaintList() {
                let params = {
                    state: this.tabState,
                    dealerId: this.shopId,
                    pageNum: 1,
                    pageSize: 10
                };
                complaintList(params).then(res => {
                    if (res.data) {
                        let resultData = res.data;
                        this.empty = !resultData.length;
                        resultData.forEach(item => {
                            item['selected'] = false;
                        });
                        this.complaintsList = [...resultData];
                    }
                }).catch(() => {
                });

            },


            /**
             * 跳转新增投诉与建议
             */
            addComplaints() {
                this.$router.push({
                    name: "addNewComplaint",
                });
            },

            /**
             * 处理
             */
            directProcessing(id) {
                let params = {
                    id: id,
                    replyContent: '',
                    state: 1
                };
                updateCustomerById(params).then(res => {
                    this.$toast('操作成功');
                    this.complaintsList = [];
                    this._QueryComplaintList();
                }).catch(res => {
                    this.$toast(res.message)
                });
            },


            /**
             * 跳转新增投诉与建议
             * @param id-投诉单id
             */
            addComplaints() {
                this.$router.push({
                    name: "addNewComplaint",
                });
            },

            /**
             * 撤销投诉
             */
            cancelComplaint(id) {
                this.$confirm('您确定撤销意见吗？')
                    .then(() => {
                        cancelComplaint(id).then(res => {
                            this.$toast('操作成功');
                            this.complaintsList = [];
                            this._QueryComplaintList();
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
    #complaint {
        width: 100vw;
        height: 100vh;
        bg(#f6f6f6);
        .top {
            width 100vw;
            position fixed;
            top: 90px;
            left 0;
            z-index 34;
        }

        .top-bar {
            bg(#fff)
            border-bottom 1PX solid #EDEDED
            flex-center()
            width 100%
            h(98)
            box-sizing border-box
            position fixed
            left 0
            top 90px
            z-index 2
            span {
                width 50%
                text-c()
                lh(98)
                c-6()
                ft(28)
            }
            .active {
                font-weight 600
                ft(34)
                c-3()
                position relative
                &:before {
                    content ""
                    position absolute
                    left 50%
                    bottom 0
                    transform translateX(-50%)
                    w(40)
                    h(6)
                    bg(#FF5638)
                }
            }
        }
        .content {
            margin-top 275px;
        }
        .mt-275 {
            pt(275)

        }
        .mt-185 {
            pt(185)
        }
        .mt-110 {
            pt(110)
        }
        .mb {
            padding-bottom 110px
        }
        .c-list {
            height: 100%;
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
            span {
                ml(24)
            }
        }
        .footer-left {
            display flex;
            align-items center
            justify-content center
            c(#333)
            ft(30)
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
        .select-img {
            w(40)
            h(40)
            top: 40px;
            left 24px;

        }

        .footer-btn {
            position: fixed;
            bottom: 0;
            left: 0;
            border: 0;
            outline: none;
            width: 100%;
            lh(98);
            bg(#FF5638)
            font-size: 32px;
            c(#fff);
            text-align: center;
            z-index 44
        }
        .footer-btn.isIphoneX{
            padding-bottom 34px;}
        .dealer-list-wrap {
            position fixed
            top 185px
            left 0
            width 100%
            flex()
            align-content center
            flex-wrap nowrap
            padding 16px 24px
            z-index 10
            bg(#fff)
            border-top 1px solid #EDEDED
            border-bottom 1PX solid #EDEDED
            overflow-x scroll
            overflow-y hidden
            span {
                min-width 150px
                bg(#F6F6F6)
                lh(60)
                padding 0 20px
                ft(26)
                c-6()
                border-radius 8px
                mr(20)
                max-width 220px
                text-overflow-1()
                &:last-child {
                    margin-right 0
                }
                &.active {
                    bg(#FFEEEB)
                    c(#FF5638)
                }
            }
        }
    }

</style>

