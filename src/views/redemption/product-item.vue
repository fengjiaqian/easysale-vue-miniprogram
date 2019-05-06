<template>
    <div class="product-wrap">
        <!--头部-->
        <section class="pi-header">
            <m-header :isSearch="true" placeholder="请输入商品名称" @emitEvt="handleChange"></m-header>
        </section>
        <empty v-if="isEmpty" txt="暂无商品数据~" :iconUrl="avatarUrl" class="empty"></empty>
        <!--内容-->
        <section class="pi-content"  v-if="productList.length">
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
    export default {
        name: '',
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        component: {
            //someComponent
        }
    }
</script>

<style scoped>

</style>

