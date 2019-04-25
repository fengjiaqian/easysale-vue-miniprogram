<template>
    <div id="addRedemptionGoods">
        <search-bar @emitEvt="_searchKeyChange" :emit="true"></search-bar>
        <button class="certain-btn">确定</button>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import searchBar from "components/searchBar.vue";
    export default {
        name: '',
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        components: {
            searchBar
        },
        methods:{
            _searchKeyChange(searchKey) {

            },

        }
    }
</script>

<style lang="stylus">
    #addRedemptionGoods{
        width 100%;
        overflow scroll;
        bg(#fff);
        .certain-btn{
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

