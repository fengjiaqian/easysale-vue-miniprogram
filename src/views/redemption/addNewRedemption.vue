<template>
    <div id="addNewRedemption">
        <div class="goods-box">
            <p class="title">兑奖商品</p>
            <div class="good-warp">
                <p v-if="!redemptionGoods.length" class="add-tip" @click="toAddRedemptionGoods()">+添加兑奖商品</p>
            </div>
        </div>
        <div class="remark-box">
            <p class="title">备注</p>
            <textarea class="remark-input" id="remark" cols="30" rows="6" placeholder="请输入内容"
                      v-model="remark"></textarea>
        </div>
        <button class="submit-btn">提交</button>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: 'addNewRedemption',
        data() {
            return {
                redemptionGoods: [],
                remark:''
            }
        },
        component: {
            //someComponent
        },

        methods:{
            //跳转到添加兑奖商品
            toAddRedemptionGoods(){
                this.$router.push({
                    name: "addRedemptionGoods",
                });
            }
        }
    }
</script>

<style lang="stylus">
    #addNewRedemption {
        width 100%;
        height 100%;
        bg(#f6f6f6);
        .goods-box, .remark-box {
            margin 24px;
            padding 24px 24px 32px;
            bg(#fff);

        }
        .add-tip {
            mt(32);
            c(#FF5638);
            ft(28);
            text-align center

        }
        .title {
            padding-bottom 24px;
            c(#333);
            ft(30);
            fb()
            border-bottom 1px solid #EDEDED
        }
        .remark-input {
            padding 24px 0 0;
        }

        .submit-btn {
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
        textarea::-webkit-input-placeholder {
            color: #BDBDBD !important;
            font-size: 30px;
            text-align: left;
        }
        textarea {
            width: 100%;
            display: inline-block;
            padding: 24px 0 0 0;
            border: none;
            resize: none;
            outline: none;
            font-size: 30px;
            c(#333);
        }

    }

</style>

