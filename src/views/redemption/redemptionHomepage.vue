<template>
    <div id="redemption">
        <m-header :isFixed="true" :tit="title"></m-header>
        <section class="top-bar ">
            <span v-for="(item,index) in stateList" :class="{'active': tabState == item.idx}"
                  @click="switchTab(item.idx)">{{item.title}}</span>
        </section>
        <!--经销商店铺列表-->
        <section class="dealer-list-wrap" v-if="tabState!=2&&userType == 3&&dealerList.length>0">
            <span :class="{'active':activeshopIdx==idx}" v-for="(item,idx) in dealerList"
                  @click="switchShop(item,idx)">{{item.dealerName}}</span>
        </section>
        <!--空页面-->
        <empty style="margin-top: 100px"
               :txt="tabState==2?'暂无可申请的兑奖商品':'暂无相关兑奖单'" v-if="empty"
               :iconUrl="iconUrl"></empty>
        <!--兑奖商品列表-->
        <search-bar v-if="tabState==2" class="pi-header" :emit="true" placeHolder="请输入商品名称"
                    @emitEvt="handleChange"></search-bar>
        <div v-if="tabState==2&&productList.length" :class="{'mt-185':userType != 3,'mt-275':userType == 3,'mb':userType == 3}"
             style="height: 100%;background-color: #fff">
            <scroll
                    class="c-list"
                    :data="productList"
                    ref="scrollRedemption"
                    :pullup="true"
                    @scrollToEnd="loadMoreProducts"
            >
                <div style="background-color: #fff">
                    <product-normal v-for="(product,index) in productList"
                                    :key="product.productSpecificationId+index+product.productName"
                                    :product="product"
                                    :source="'redemption'"
                    ></product-normal>
                </div>
            </scroll>
        </div>
        <!--兑奖单列表-->
        <div v-if="redemptionList.length" :class="{'mt-185':userType != 3,'mt-275':userType == 3,'mb':userType == 3}"
             style="overflow: scroll">
            <list-item v-for="(item,index) in redemptionList" :listData="item" :key="index"
                       :tabState="tabState" @directProcessing="directProcessing"
                       @cancelRedemption="cancelRedemption"></list-item>
        </div>
        <!--底部按钮-->
        <div class="footer" v-if="userType == 3&&tabState==2&&!empty">
            <div class="footer-left">
                <img :src="isAllSelected?selectImg[1]:selectImg[0]" class="select-img" @click="selectAll">
                <span>{{isAllSelected?'取消全选':'全选'}}</span>
            </div>
            <button class="handle-btn " :class="{'achieve':selectedProduct.length}" @click="addRedemption">
                {{'申请兑奖('+selectedProduct.length+')'}}
            </button>
        </div>
    </div>
</template>
<script>
    import {awardList, selectDealAward, afterProductList, updateAwardById, cancelAward} from "api/fetch/redemption";
    import {queryStaffList} from "api/fetch/mine";
    import scroll from "components/scroll.vue";
    import empty from "components/empty.vue";
    import mHeader from "components/header.vue";
    import listItem from "./list-item.vue";
    import ic1 from "../../assets/images/icon-check.png";
    import ic2 from "../../assets/images/icon-checked.png";
    import iconUrl from "../../assets/images/empty_icon_1.png";
    import searchBar from "components/searchBar.vue"
    import storage from 'common/storage';
    import productNormal from "components/productManage/product-manage-normal.vue";
    import bus from "common/Bus";

    const selectImg = [ic1, ic2];
    export default {
        name: 'clientRedemptionHomepage',
        components: {scroll, empty, mHeader, listItem, searchBar, productNormal},
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
                title: '兑奖管理',
                redemptionList: [],
                roleList: [],
                rolePopShow: false,
                activeshopIdx: 0,
                dealerList: [],
                shopId: '',
                // 分页
                productList: [],
                loading: false,
                totalPage: 0,
                selectedProduct: [],//选中的商品
                length: 0,
            }
        },
        created() {
            this.title = this.userType == '3' ? '兑奖列表' : '兑奖管理';
            if (this.userType == '3') {
                this.stateList = [{
                    title: `可申请`,
                    idx: 2
                }, {
                    title: `已申请`,
                    idx: 0
                }, {
                    title: `已回复`,
                    idx: 1
                }];
                this.tabState = 2;
                this.filterParam = {
                    pageNum: 1,
                    pageSize: 20,
                    searchKey: "",
                    awardState: 1,
                }; //商品查询参数

                this.afterProductList(this.filterParam);


            } else {
                this._QueryAwardList();
            }

        },
        mounted() {
            bus.$off("selectProduct");
            bus.$on("selectProduct", (data) => {
                this.selectSingle(data)
            });
        },
        methods: {

            /**
             * 切换顶部tabs
             * @param state:0-待处理，1-已处理
             */
            switchTab(state) {
                this.tabState = state;
                this.redemptionList = [];
                if (state == 2) {
                    this.refreshProducts();
                } else {
                    if (this.userType == '3') {
                        this._QueryDealAward();
                    } else {
                        this._QueryAwardList();
                    }
                }

            },

            //切换经销商店铺
            switchShop(item, idx) {
                this.activeshopIdx = idx;
                this.redemptionList = [];
                this.shopId = item.shopId;
                this._QueryAwardList();
            },

            //搜索
            handleChange(searchWord) {
                this.filterParam.searchKey = searchWord;
                this.refreshProducts();
            },

            // 客户兑奖过的经销商列表
            _QueryDealAward() {
                selectDealAward(this.tabState).then(res => {
                    if (res.data) {
                        let resultData = res.data;
                        this.empty = !resultData.length;
                        this.dealerList = [...resultData];
                        this.shopId = this.dealerList[0].shopId;
                        this._QueryAwardList();
                    }
                });

            },


            // 加载列表数据
            _QueryAwardList() {
                let params = {
                    state: this.tabState,
                    dealerId: this.shopId
                };
                awardList(params).then(res => {
                    if (res.data) {
                        let resultData = res.data;
                        this.empty = !resultData.length;
                        this.redemptionList = [...resultData];
                    }
                });

            },


            // 可兑奖的商品列表
            afterProductList(params) {
                this.loading = true;
                afterProductList(params)
                    .then(res => {
                        if (res.result === "success" && res.data) {
                            if (res.data.dataList) {
                                this.domShow = true;
                                const {dataList = [], pager} = res.data;
                                const {currentPage, totalPage} = pager;
                                if (currentPage == 1) {
                                    this.totalPage = totalPage;
                                }
                                this.empty = !dataList.length;
                                dataList.forEach(item => {
                                    item.select = false;
                                });
                                this.productList = this.productList.concat(dataList);
                                this.loading = false;
                            } else {
                                this.totalPage = 1;
                                this.productList = []

                            }

                        }
                    })
                    .catch(err => {
                        this.loading = false;
                        this.productList = []
                    });


            },

            //加载更多
            loadMoreProducts() {
                if (this.loading || this.filterParam.pageNum >= this.totalPage) return false;
                this.filterParam.pageNum += 1;
                this.afterProductList(this.filterParam);
            },

            // 下拉刷新
            refreshProducts() {
                this.filterParam.pageNum = 1;
                this.productList = [];
                this.afterProductList(this.filterParam);
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
                updateAwardById(params).then(res => {
                    this.$toast('操作成功');
                    this.redemptionList = [];
                    this._QueryAwardList();
                }).catch(res => {
                    this.$toast(res.message)
                });
            },


            /**
             *单选兑奖商品
             * @param product
             */
            selectSingle(product) {
                product.select = !product.select;
                this.isAllSelected = !this.productList.some(item => !item.select);
                this.pullSelected()
            },


            // 全选兑奖商品
            selectAll() {
                this.isAllSelected = !this.isAllSelected;
                this.productList.forEach(item => {
                    item.select = this.isAllSelected
                });
                this.pullSelected()

            },


            pullSelected() {
                this.selectedProduct = this.productList.filter(item => item.select);
                storage.set("selectedProduct", this.selectedProduct);
            },


            /**
             * 跳转新增兑奖单
             */
            addRedemption() {
                if (this.selectedProduct.length == 0) return false;
                this.$router.push({
                    name: "addNewRedemption",
                });
            },
            /**
             * 取消兑奖
             */
            cancelRedemption(id) {
                this.$confirm('您确定取消兑奖吗？')
                    .then(() => {
                        cancelAward(id).then(res => {
                            this.$toast('操作成功');
                            this.redemptionList = [];
                            this._QueryAwardList();
                        });
                    })
                    .catch(() => {
                    });

            }

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
            pl(24)
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
            w(224)
            h(98)
            lh(98)
            bg(#bdbdbd)
            ft(32)
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
        .pi-header {
            position fixed;
            border-bottom 1PX solid #EDEDED
            top: 185px;
            left 0
            width 100%
            bg(#fff)
            z-index 1
        }
        .achieve {
            bg(#FF5638)

        }
    }

</style>

