<template>
    <div class="display-wrap pt90">
        <m-header :isFixed="true"></m-header>
        <section class="header">
            <div class="top-bar">
                <span v-for="(item,index) in stateList" :class="{'active': activeIdx == index}" @click="switchBar(index)">{{item.title}}</span>
            </div>
            <div class="h-search-bar" v-if="activeIdx==0">
                <input v-model="searchKey" placeholder="请输入商品名称" @change="handleChange($event)">
            </div>
            <!--经销商店铺列表-->
            <div class="dealer-list-wrap" v-if="activeIdx!=0&&shopList.length">
              <span :class="{'active':activeShopId==item.shopId}"
                    v-for="(item,idx) in shopList"
                    @click="switchShop(item,idx)"
              >{{item.shopName}}</span>
            </div>
        </section>

        <section class="content" v-if="activeIdx==0">
            <scroll
                    class="product-list-scroll"
                    :data="productList"
                    :probeType="3"
                    :pullup="true"
                    @scrollToEnd="loadMoreProducts"
                    ref="productScrollDom">
                <div>
                    <product-normal
                            v-for="(product,index) in productList"
                            :key="product.productSpecificationId+index+product.productName"
                            :product="product"
                            :source="'display'"
                    ></product-normal>
                </div>
            </scroll>
        </section>

        <!--陈列列表栏-->
        <section class="display-content" v-else>
            <display-column
                    v-for="item in displayList"
                    :display="item"
                    :key="item.customerDisplay.id"
            ></display-column>
        </section>

        <section class="footer" v-if="activeIdx==0">
            <div class="f-all" @click="selectAll">
                <i :class="{'selected':allSelected}"></i>
                <span>全选</span>
            </div>
            <div class="f-apply" :class="{'achieve':achieve}" @click="apply">
                申请陈列<span v-if="achieve">({{selectedProduct.length}})</span>
            </div>
        </section>
        <empty v-if="isEmpty&&activeIdx==0" txt="暂无商品数据~" :iconUrl="avatarUrl"></empty>
    </div>
</template>

<script>
    import avatarUrl from "@/assets/images/empty_icon_1.png";
    import productNormal from "components/productManage/product-manage-normal.vue";
    import displayColumn from "components/display/display-column";
    import scroll from "components/scroll.vue";
    import { queryDisplayProduct, queryDisplays, queryDealerShops } from "api/fetch/display";
    import bus from "common/Bus";
    import empty from "components/empty.vue";
    import storage from 'common/storage'
    export default {
        data() {
            return {
                activeIdx: 0,//选中的状态
                stateList: [{
                    title: `可申请`,
                    idx: 0
                },{
                    title: `已申请`,
                    idx: 1
                },{
                    title: `已通过`,
                    idx: 2
                }],//陈列情况状态
                searchKey: '',
                selectedProduct: [],//勾选中的商品列表
                productList: [],//商品列表
                loading: false,
                requestDone: false,
                totalPage: 0,
                filterParam: {
                    pageNum: 1,
                    pageSize: 20,
                    searchKey: "",
                    displayState: 1
                }, //商品查询参数
                allSelected: false,//是否全选
                avatarUrl,
                param: {
                    state: 0
                },//已申请，已通过的查询条件
                shopList: [],//店铺列表
                displayList: [],//陈列列表
                activeShopId: '',//选中的店铺id
            };
        },
        components: {
            productNormal,
            scroll,
            empty,
            displayColumn
        },
        computed: {
            achieve() {
                const selectedProduct = this.selectedProduct
                return selectedProduct.length
            },
            isEmpty(){
                if(this.requestDone){
                    return !this.productList.length
                }
            }
        },
        created() {
            storage.remove("selectedProduct");
            this.queryProducts()
        },
        mounted() {
            bus.$off("selectProduct")
            bus.$on("selectProduct", (data) => {
                this.choose(data)
            });
            bus.$off("updateList")
            bus.$on("updateList", (id) => {
                this.displayList = this.displayList.filter((item)=>{
                    return item.customerDisplay.id != id
                })
            });
        },
        methods: {
            //切换tab栏
            switchBar(idx){
                if(idx == this.activeIdx) return false
                this.activeIdx = idx
                switch (idx) {
                    case 0:
                        this.queryProducts()
                        break;
                    case 1:
                    case 2:
                        this.switchDisplay(idx)
                        break;
                    default:
                        break;
                }
            },
            switchDisplay(idx){
                this.productList = []
                this.filterParam.searchKey = ''
                this.filterParam.pageNum = 1
                this.param.state = idx == 1 ? 0 : 1
                this.queryShops()
            },
            //获取产品列表
            queryProducts(){
                this.loading = true;
                this.requestDone = false;
                queryDisplayProduct(this.filterParam)
                    .then(res => {
                        if (res.result === "success" && res.data) {
                            this.domShow = true;
                            if(res.data.dataList){
                                const { dataList = [], pager } = res.data;
                                const { currentPage, totalPage } = pager;
                                if (currentPage == 1) {
                                    this.totalPage = totalPage;
                                }
                                dataList.forEach(item => {
                                    item.select = false;
                                });
                                this.productList = this.productList.concat(dataList);
                                this.loading = false;
                                this.requestDone = true;
                            }else{
                                this.totalPage=1;
                                this.productList=[]
                            }

                        }
                    })
                    .catch(err => {
                        this.loading = false;
                        this.requestDone = true;
                    });
            },
            //加载更多
            loadMoreProducts() {
                if (this.loading || this.filterParam.pageNum >= this.totalPage) return false;
                this.filterParam.pageNum += 1;
            },
            //勾选商品
            choose(data){
                this.selectedProduct = []
                this.productList.forEach((item)=>{
                    if(item.id == data.id) item.select = !item.select
                    if(item.select) this.selectedProduct.push(item)
                })
            },
            //全选
            selectAll(){
                let allSelected = this.allSelected
                this.productList.forEach((item)=>{
                    item.select = !allSelected
                })
                this.selectedProduct = allSelected ? [] : this.productList
                this.allSelected = !allSelected
            },
            handleChange(event) {
                this.filterParam.searchKey = event.currentTarget.value;
                this.selectedProduct = []
                this.productList = []
            },
            //申请陈列
            apply(){
                storage.set("selectedProduct", this.selectedProduct);
                this.$router.push({ path: "/displayApply" });
            },
            //获取经销商店铺列表
            queryShops(){
                queryDealerShops(this.param)
                    .then(res => {
                        if (res.result === "success") {
                            this.shopList = res.data
                            this.activeShopId = this.shopList[0].shopId || ''
                            if(this.shopList.length) this.queryShopDisplays()
                        }
                    })
                    .catch(err => {
                        this.$toast(err.message);
                    });
            },
            ////获取经销商店铺对应的陈列列表
            queryShopDisplays(){
                let param = {
                    state: this.param.state,
                    dealerId: this.activeShopId
                }
                queryDisplays(param)
                    .then(res => {
                        if (res.result === "success") {
                            this.displayList = res.data
                        }
                    })
                    .catch(err => {
                        this.$toast(err.message);
                    });
            },
            //切换经销商店铺
            switchShop(item,idx){
                if(this.activeShopId == item.shopId) return
                this.activeShopId = item.shopId
                this.queryShopDisplays()
            },
        },
        watch: {
            filterParam: {
                handler(newVal, oldVal) {
                    if(this.activeIdx == 0){
                        this.queryProducts();
                    }
                },
                deep: true
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import "./stylus/display.styl"
</style>

