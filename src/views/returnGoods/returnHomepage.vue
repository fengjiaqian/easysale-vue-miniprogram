<template>
    <div id="redemption">
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
               :txt="'暂无相关退货单'" v-if="empty"
               :iconUrl="iconUrl"></empty>
        <div v-if="returnGoodsList.length"
             :class="{'mt-185':isDealer,'mt-110':isSaleMan,'mt-275':isCustomer,'mb':!isSaleMan}"
             style="height: 100%">
            <scroll
                    class="c-list"
                    :data="returnGoodsList"
                    ref="scrollRedemption"
            >
                <div>
                    <list-item v-for="(item,index) in returnGoodsList" :listData="item" :key="index"
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
        <button class="footer-btn" @click="addReturnGoods()" v-if="isCustomer">新建退货单</button>
        <saleman-pop :roleList="roleList" :rolePopShow="rolePopShow" title="移交给" @closePop="closePop"
                     @submitQuery="submitQuery"></saleman-pop>
    </div>
</template>
<script>
    import {returnList, batchUpdateReturn, selectDealReturn} from "api/fetch/returnGoods";
    import {queryStaffList} from "api/fetch/mine";
    import scroll from "components/scroll.vue";
    import empty from "components/empty.vue";
    import mHeader from "components/header.vue";
    import listItem from "./list-item.vue";
    import ic1 from "../../assets/images/icon-check.png";
    import ic2 from "../../assets/images/icon-checked.png";
    import iconUrl from "../../assets/images/empty_icon_1.png";
    import salemanPop from "components/saleman-pop.vue"

    const selectImg = [ic1, ic2];
    export default {
        name: 'returnHomepage',
        components: {scroll, empty, mHeader, listItem, salemanPop},
        data() {
            return {
                stateList: [{
                    title: `待处理`,
                    idx: 0
                }, {
                    title: `已处理`,
                    idx: 1
                }],
                selectImg: selectImg,
                iconUrl: iconUrl,
                tabState: 0,
                isShowMore: false,
                empty: true,
                isAllSelected: false,
                title: '退货管理',
                returnGoodsList: [],
                roleList: [],
                rolePopShow: false,
                activeDealerIdx: 0,
                dealerList: [],
                dealerId: ''

            }
        },
        created() {
            this.title = this.userType == '3' ? '退货列表' : '退货管理';
            if (this.userType == '3') {
                this._QueryDealReturn();
            }
            this._QueryDealReturn()
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
                this.returnGoodsList = [];
                this._QueryReturnList()
            },


            //切换经销商店铺
            switchShop(item, idx) {
                this.activeDealerIdx = idx;
                this.returnGoodsList = [];
                this.dealerId = item.dealerId;
                this._QueryReturnList();
                this._QueryDealReturn()

            },


            // 客户退货的经销商列表
            _QueryDealReturn() {
                selectDealReturn(this.tabState).then(res => {
                    if (res.data) {
                        let resultData = res.data;
                        this.dealerList = [...resultData];
                        this.dealerId = this.dealerList[0].dealerId
                        this._QueryReturnList()
                    }
                }).catch(() => {});

            },


            // 加载列表数据
            _QueryReturnList() {
                let params = {
                    state: this.tabState,
                    dealerId: this.dealerId
                };
                returnList(params).then(res => {
                    if (res.data) {
                        let resultData = res.data;
                        this.empty = !resultData.length;
                        resultData.forEach(item => {
                            item['selected'] = false;
                        });
                        this.returnGoodsList = [...resultData];
                    }
                }).catch(() => {});

            },


            /**
             *单选
             * @param id-退货单id
             */
            selectSingle(id) {
                let listData = this.returnGoodsList;
                listData.forEach(item => {
                    if (item.customerReturn) {
                        let customerReturn = item.customerReturn;
                        if (customerReturn.id == id) {
                            item.selected = !item.selected;
                        }
                    }
                });
                this.isAllSelected = !listData.some(item => !item.selected);
                this.returnGoodsList = [...listData];
            },


            // 全选
            selectAll() {
                this.isAllSelected = !this.isAllSelected;
                let listData = this.returnGoodsList;
                listData.forEach(item => {
                    item.selected = this.isAllSelected
                });
                this.returnGoodsList = [...listData]
            },


            /**
             * 跳转新增退货单
             * @param id-退货单id
             */
            addReturnGoods() {
                this.$router.push({
                    name: "addNewReturnOrder",
                });
            },


            /**
             * 批量移交处理
             */
            handoverProcessing() {
                const selectedComplaints = this.returnGoodsList.filter(item => item.selected);
                if (!selectedComplaints.length) {
                    return this.$toast("请选择退货单");
                }
                this.rolePopShow = true;
                //查询所有角色
                queryStaffList({}).then(res => {
                    if (res.result === "success") {
                        this.roleList = res.data;
                    }
                }).catch(res=>{
                    this.$toast(res.message)

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
                let idList = [];
                const selectedRedemption = this.returnGoodsList.filter(item => item.selected);
                selectedRedemption.forEach(item => {
                    if (item.customerReturn) {
                        idList.push(item.customerReturn.id)
                    }
                });
                let params = {
                    idList: [...idList],
                    dealingId: dealingId,
                };
                batchUpdateReturn(params).then(res => {
                    this.$toast('操作成功');
                    this._QueryReturnList()
                }).catch(res=>{
                    this.$toast(res.message)
                });
            },


        }
    }
</script>

<style lang="stylus" scoped>
    #redemption {
        width: 100vw;
        height: 100vh;
        bg(#f6f6f6);
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
        .mb {
            pb(110)
        }
        .mt-275 {
            pt(275)

        }
        .mt-185 {
            pt(185)
        }
        .mt-110 {
            mt(110)
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
            bg(#FF5638);
            font-size: 32px;
            c(#fff);
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

