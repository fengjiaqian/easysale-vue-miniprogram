<template>
    <div id="complaint">
        <m-header :isFixed="true" :tit="title"></m-header>
        <section class="top-bar " v-if="!isSaleMan">
            <span v-for="(item,index) in stateList" :class="{'active': tabState == index}" @click="switchTab(index)">{{item.title}}</span>
        </section>
        <!--经销商店铺列表-->
        <section class="dealer-list-wrap" v-if="isCustomer&&dealerList.length>0">
            <span :class="{'active':activeDealerIdx==idx}" v-for="(item,idx) in dealerList"
                  @click="switchShop(item,idx)">{{item.dealerName}}</span>
        </section>
        <empty :class="{'mt-185':isDealer,'mt-110':isSaleMan,'mt-275':isCustomer,'mb':!isSaleMan}"
               :txt="'暂无相关投诉单'" v-if="empty"
               :iconUrl="iconUrl"></empty>
        <div   :class="{'mt-185':isDealer,'mt-110':isSaleMan,'mt-275':isCustomer,'mb':!isSaleMan}"
             style="height: 100%"   v-if="complaintsList.length">
            <scroll
                    class="c-list"
                    :data="complaintsList"
                    ref="scrollComplaints"
            >
                <div>
                    <list-item v-for="(item,index) in complaintsList" :listData="item" :key="index"
                               :tabState="tabState" @selectSingle="selectSingle"></list-item>
                </div>

            </scroll>
        </div>
        <!--经销商可见-->
        <div class="footer" v-if="isDealer&&tabState==0&&!empty">
            <div class="footer-left">
                <img :src="isAllSelected?selectImg[1]:selectImg[0]" class="select-img" @click.stop="selectAll">
                <span>{{isAllSelected?'取消全选':'全选'}}</span>
            </div>
            <button class="handle-btn" @click.stop="handoverProcessing">移交处理</button>
        </div>
        <button class="footer-btn" @click="addComplaints()" v-if="isCustomer">新建投诉单</button>
        <saleman-pop :roleList="roleList" :rolePopShow="rolePopShow" title="移交给" @closePop="closePop"
                     @submitQuery="submitQuery"></saleman-pop>
    </div>
</template>
<script>
    import {complaintList, batchUpdateComplaint, selectDealComplaint} from "api/fetch/complaints";
    import {queryStaffList} from "api/fetch/mine";
    import scroll from "components/scroll.vue";
    import listItem from "./list-item.vue";
    import empty from "components/empty.vue";
    import mHeader from "components/header.vue";
    import salemanPop from "components/saleman-pop.vue"
    import ic1 from "../../assets/images/icon-check.png";
    import ic2 from "../../assets/images/icon-checked.png";
    import iconUrl from "../../assets/images/empty_icon_1.png"

    const selectImg = [ic1, ic2];
    export default {
        name: 'complaintHomepage',
        components: {listItem, empty, mHeader, scroll, salemanPop},
        data() {
            return {
                stateList: [{
                    title: `待处理`,
                    idx: 0
                }, {
                    title: `已处理`,
                    idx: 1
                }],
                tabState: 0,
                complaintsList: [],
                selectImg: selectImg,
                empty: true,
                isAllSelected: false,
                roleList: [],
                rolePopShow: false,
                iconUrl: iconUrl,
                title: '投诉管理',
                dealerList: [],
                activeDealerIdx: 0,//默认选中的经销商
            }
        },
        created() {
            this.title = this.userType == '3' ? '投诉列表' : '投诉管理';
            if (this.userType == '3') {
                this._QueryDealComplaint();
            }
            this._QueryComplaintList();

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
        methods: {

            /**
             * 切换顶部tabs
             * @param state:0-待处理，1-已处理
             */
            switchTab(state) {
                this.tabState = state;
                this.complaintsList = [];
                this._QueryComplaintList()
            },

            //切换经销商店铺
            switchShop(item, idx) {
                this.activeDealerIdx = idx;
                this.complaintsList = [];
                this.dealerId = item.dealerId;
                this._QueryComplaintList();
                this._QueryDealComplaint()

            },

            // 客户投诉过的经销商列表
            _QueryDealComplaint() {
                selectDealComplaint(this.tabState).then(res => {
                    if (res.data) {
                        let resultData = res.data;
                        this.dealerList = [...resultData];
                        this.dealerId = this.dealerList[0].dealerId
                    }
                }).catch(() => {});

            },

            // 加载列表数据
            _QueryComplaintList() {
                let params = {
                    state: this.tabState,
                    dealerId: this.dealerId
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
                }).catch(() => {});

            },



            /**
             *单选
             * @param id-投诉单id
             */
            selectSingle(id) {
                let listData = this.complaintsList;
                listData.forEach(item => {
                    if (item.customerComplaint) {
                        let customerComplaint = item.customerComplaint;
                        if (customerComplaint.id == id) {
                            item.selected = !item.selected;
                        }
                    }
                });
                this.isAllSelected = !listData.some(item => !item.selected);
                this.complaintsList = [...listData];

            },


            // 全选
            selectAll() {
                this.isAllSelected = !this.isAllSelected;
                let listData = this.complaintsList;
                listData.forEach(item => {
                    item.selected = this.isAllSelected
                });
                this.complaintsList = [...listData]
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
             * 批量移交处理
             */
            handoverProcessing() {
                const selectedComplaints = this.complaintsList.filter(item => item.selected);
                if (!selectedComplaints.length) {
                    return this.$toast("请选择投诉单");
                }
                this.rolePopShow = true;
                //查询所有角色
                queryStaffList({}).then(res => {
                    if (res.result === "success") {
                        this.roleList = res.data;
                    }
                }).catch(() => {});
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
                let idList = [];
                const selectedComplaints = this.complaintsList.filter(item => item.selected);
                selectedComplaints.forEach(item => {
                    if (item.customerComplaint) {
                        idList.push(item.customerComplaint.id)
                    }
                });
                let params = {
                    idList: [...idList],
                    dealingId: dealingId,
                };
                batchUpdateComplaint(params).then(res => {
                    this.$toast('操作成功');
                    this._QueryComplaintList()
                }).catch(res=>{
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
            h(98);
            lh(98);
            bg(#fff)
            font-size: 32px;
            c(#FF5638);
            text-align: center;
            z-index 44
        }
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
            span {
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

