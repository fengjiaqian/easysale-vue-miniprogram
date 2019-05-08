<template>
    <div id="redemption">
        <m-header :isFixed="true" :tit="title"></m-header>
        <section class="top-bar ">
            <span v-for="(item,index) in stateList" :class="{'active': tabState == item.idx}"
                  @click="switchTab(item.idx)">{{item.title}}</span>
        </section>
        <!--经销商店铺列表-->
        <section class="dealer-list-wrap" v-if="userType == 3&&dealerList.length>0">
            <span :class="{'active':activeshopIdx==idx}" v-for="(item,idx) in dealerList"
                  @click="switchShop(item,idx)">{{item.dealerName}}</span>
        </section>
        <!--空页面-->
        <empty :class="{'mt-185':userType != 3,'mt-275':userType == 3,'mb':userType == 3}"
               style="height: 100%;overflow: hidden"
               :txt="tabState==2?'暂无可申请的退货商品':'暂无相关退货单'" v-if="empty"
               :iconUrl="iconUrl"></empty>
        <!--退货商品列表-->
        <div v-if="tabState==2"
             :class="{'mt-185':userType != 3,'mt-275':userType == 3,'mb':userType == 3}"
             style="height: 100%;background-color: #fff">
            <search-bar class="pi-header" :emit="true" placeHolder="请输入商品名称"
                        @emitEvt="handleChange"></search-bar>
            <scroll
                    v-if="productList.length"
                    class="c-list"
                    :data="productList"
                    ref="scrollReturn"
                    :pullup="true"
                    @scrollToEnd="loadMoreProducts"
            >
                <div style="background-color: #fff">
                    <product-normal v-for="(product,index) in productList"
                                    :key="product.productSpecificationId+index+product.productName"
                                    :product="product"
                                    :source="'return'"
                    ></product-normal>
                </div>
            </scroll>
        </div>
        <!--兑奖单列表-->
        <div v-if="returnGoodsList.length" :class="{'mt-185':userType != 3,'mt-275':userType == 3,'mb':userType == 3}"
             style="overflow: scroll">
            <list-item v-for="(item,index) in returnGoodsList" :listData="item" :key="index"
                       :tabState="tabState" @directProcessing="directProcessing"
                       @cancelReturn="cancelReturn"></list-item>
        </div>
        <!--底部按钮-->
        <div class="footer" v-if="userType == 3&&tabState==2&&!empty">
            <div class="footer-left">
                <img :src="isAllSelected?selectImg[1]:selectImg[0]" class="select-img" @click.stop="selectAll">
                <span>{{isAllSelected?'取消全选':'全选'}}</span>
            </div>
            <button class="handle-btn" :class="{'achieve':selectedProduct.length}" @click="addReturnGoods">
                {{'申请退货('+selectedProduct.length+')'}}
            </button>
        </div>
    </div>
</template>
<script>
    import {returnList, selectDealReturn, updateReturnById, cancelCustomerReturn} from "api/fetch/returnGoods";
    import {afterProductList} from "api/fetch/redemption";
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
        name: 'returnHomepage',
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
                title: '退货管理',
                returnGoodsList: [],
                activeshopIdx: 0,
                dealerList: [],
                shopId: '',
                // 分页
                productList: [],
                loading: false,
                totalPage: 0,

                selectedProduct: [],//选中的商品

            }
        },
        created() {
            this.title = this.userType == '3' ? '退货列表' : '退货管理';
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
                    returnState: 1,
                }, //商品查询参数
                    this.afterProductList(this.filterParam);

            } else {
                this._QueryReturnList();
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
                this.returnGoodsList = [];
                if (state == 2) {
                    this.refreshProducts()
                } else {

                    if (this.userType == '3') {
                        this._QueryDealReturn()
                    } else {
                        this._QueryReturnList();
                    }
                }
            },


            //切换经销商店铺
            switchShop(item, idx) {
                this.activeshopIdx = idx;
                this.returnGoodsList = [];
                this.shopId = item.shopId;
                this._QueryReturnList();
            },


            //搜索
            handleChange(searchWord) {
                this.filterParam.searchKey = searchWord;
                this.refreshProducts()

            },

            // 客户退货的经销商列表
            _QueryDealReturn() {
                selectDealReturn(this.tabState).then(res => {
                    if (res.data) {
                        let resultData = res.data;
                        this.empty = !resultData.length;
                        this.dealerList = [...resultData];
                        this.shopId = this.dealerList[0].shopId;
                        this._QueryReturnList()
                    }
                }).catch(() => {
                });

            },


            // 加载列表数据
            _QueryReturnList() {
                let params = {
                    state: this.tabState,
                    dealerId: this.shopId
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
                }).catch(() => {
                });

            },

            // 可退货的商品列表
            afterProductList(params) {
                this.loading = true;
                afterProductList(params)
                    .then(res => {
                        if (res.result === "success" && res.data) {
                            if (res.data.dataList) {
                                this.domShow = true;
                                const {dataList = [], pager} = res.data;
                                this.empty = !dataList.length;
                                const {currentPage, totalPage} = pager;
                                if (currentPage == 1) {
                                    this.totalPage = totalPage;
                                }
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
             *单选兑奖商品
             * @param data
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
                this.selectedProduct = this.productList.filter(item => item.select)
                storage.set("selectedProduct", this.selectedProduct);

            },


            /**
             * 跳转新增退货单
             */
            addReturnGoods() {
                if (this.selectedProduct.length == 0) return false;
                this.$router.push({
                    name: "addNewReturnOrder",
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
                updateReturnById(params).then(res => {
                    this.$toast('操作成功');
                    this.returnGoodsList = [];
                    this._QueryReturnList();
                }).catch(res => {
                    this.$toast(res.message)
                });
            },
            /**
             * 取消申请
             */
            cancelReturn(id) {
                this.$confirm('您确定取消申请吗？')
                    .then(() => {
                        cancelCustomerReturn(id).then(res => {
                            this.$toast('操作成功');
                            this.returnGoodsList = [];
                            this._QueryReturnList();
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

