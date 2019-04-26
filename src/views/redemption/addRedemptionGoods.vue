<template>
    <div id="addRedemptionGoods">
        <search-bar :isFixed="true" :isSearch="true" placeholder="请输入商品名称" :searchKey="searchKey"
                    @emitEvt="_searchKeyChange"></search-bar>
        <scroll class="product-list-scroll"
                :data="productList"
                :probeType="3"
                :pullup="true"
                @scrollToEnd="loadMoreProducts"
                ref="productScrollDom"
        >
            <ul>
                <li v-for="(item, index) in productList">
                    <div class="goods-box">
                        <img v-lazy="selectImg[0]" class="select-img">
                        <img class="goods-img">
                        <p class="goods-name">洋河蓝色经典 梦之蓝M6 52度</p>
                    </div>
                </li>
            </ul>
        </scroll>
        <button class="certain-btn">确定</button>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import searchBar from "components/header.vue";
    import scroll from "components/scroll.vue";
    import ic1 from "../../assets/images/icon-check.png";
    import ic2 from "../../assets/images/icon-checked.png";
    const selectImg = [ic1, ic2,];
    export default {
        name: '',
        data() {
            return {
                searchKey: '',
                productList: [1, 2, 3],
                selectImg: selectImg
            }
        },
        components: {
            searchBar,
            scroll
        },
        methods: {
            _searchKeyChange(searchKey) {
                this.searchKey = searchKey
            },

            loadMoreProducts() {

            }

        }
    }
</script>

<style lang="stylus">
    #addRedemptionGoods {
        width 100%;
        height 100%
        overflow scroll;
        bg(#fff);
        .product-list-scroll {
            mt(98);
            mb(98)
        }
        .goods-box {
            display flex
            flex-direction row;
            margin:24px;
            .goods-img{
                w(120);
                h(120);
                bg(#f6f6f6)
                border-radius:6px;
                margin 0 24px;

            }
            .goods-name{
                c(#333);
                ft(30);

            }


        }
        .select-img {
            w(40)
            h(40)
            mt(40)
        }
        .certain-btn {
            h(98)
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            bg(#FF5638);
            text-align: center;
            lh(98);
            c(#fff);
            font-size: 32px;
            border: 0;
            outline: none;
        }

    }

</style>

