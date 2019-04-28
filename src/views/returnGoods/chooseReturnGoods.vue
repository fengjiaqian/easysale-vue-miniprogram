<template>
    <div class="product-wrap">
        <!--头部-->
        <section class="pi-header">
            <m-header :isSearch="true" placeholder="请输入商品名称" @emitEvt="handleChange"></m-header>
        </section>

        <!--内容-->
        <section class="pi-content">
            <scroll
                    class="product-list-scroll"
                    :data="productList"
                    :probeType="3"
                    :pullup="true"
                    @scrollToEnd="loadMoreProducts"
                    ref="productScrollDom">
                <div>
                    <product-normal v-for="(product,index) in productList" :key="product.productSpecificationId+index+product.productName"  :product="product"></product-normal>
                </div>
            </scroll>
        </section>

        <!--底部-->
        <section class="footer" :class="{'achieve':achieve}" @click="confirm">
            <span>确定</span>
        </section>

    </div>
</template>

<script>
    import productNormal from "components/productManage/product-manage-normal.vue";
    import scroll from "components/scroll.vue";
    import { returnProduct } from "api/fetch/returnGoods";
    import bus from "common/Bus";
    import storage from 'common/storage'
    export default {
        data() {
            return {
                productList: [],
                loading: false,
                requestDone: false,
                isEmpty: false,
                totalPage: 0,
                filterParam: {
                    pageNum: 1,
                    pageSize: 20,
                    searchKey: "",
                }, //商品查询参数
                selectedProduct: null,//选中的商品
                achieve: false,
            };
        },
        components: {
            productNormal,
            scroll
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
        },
        methods: {
            //查询产品列表
            queryProducts() {
                this.loading = true;
                this.requestDone = false;
                returnProduct(this.filterParam)
                    .then(res => {
                        if (res.result === "success" && res.data) {
                            this.domShow = true;
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
                        }
                    })
                    .catch(err => {
                        this.loading = false;
                        this.requestDone = true;
                    });
            },
            choose(data){
                this.productList.forEach((item)=>{
                    if(item.id == data.id){
                        item.select = true
                        this.selectedProduct = item
                    }else{
                        item.select = false
                    }
                })
            },
            confirm(){
                storage.set("selectedProduct", this.selectedProduct);
                this.$router.go(-1);
            },
            //搜索关键字查询
            handleChange($event){
                this.filterParam.searchKey = searchKey;
                this.filterParam.pageNum = 1;
                this.productList = [];
            },
            loadMoreProducts() {
                if (this.loading || this.filterParam.pageNum >= this.totalPage) return false;
                this.filterParam.pageNum += 1;
            },
        },
        watch: {
            filterParam: {
                handler(newVal, oldVal) {
                    if (!this.resetFilter) {
                        this.queryProducts();
                    }
                },
                deep: true
            },
            productList(val) {
                if (this.requestDone) {
                    if (!val.length) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }
                }
            },
            selectedProduct(val) {
                if(val.id){
                    this.achieve = true
                }else{
                    this.achieve = false
                }
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import "../exhibit/stylus/exhibit.styl"
</style>


