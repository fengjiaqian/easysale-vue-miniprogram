<template>
    <div id="addNewRedemption">
        <div class="goods-box">
            <p class="title" :style="{borderWidth:redemptionGoods.length?'0.5px':'0.25px'}">兑奖商品</p>
            <!--<div class="dividing-line-2" v-if="redemptionGoods.length"></div>-->
            <div class="good-warp">
                <div v-if="redemptionGoods.length">
                    <ul>
                        <li v-for="(item,index) in redemptionGoods">
                            <div class="goods-list-box">
                                <div class="goods-info">
                                    <div class="img-box">
                                        <img>
                                    </div>
                                    <p class="goods-name">洋河蓝色经典 梦之蓝M6 52度梦之蓝M6 52度梦之蓝M6 52度</p>
                                    <div class="del-btn">删除</div>
                                </div>
                                <div class="count-box">
                                    <span class="font-30-333">兑奖数量：</span>
                                    <number-picker :product="item"></number-picker>
                                </div>
                                <p class="dividing-line" v-show="index<(redemptionGoods.length-1)"></p>
                            </div>
                        </li>
                    </ul>
                </div>
                <p class="add-tip" :style="{marginTop:redemptionGoods.length?'12px':'0',borderWidth:redemptionGoods.length?'0.5px':'0.01px'}" @click="toAddRedemptionGoods()">+添加兑奖商品</p>
            </div>
        </div>
        <div class="remark-box">
            <p class="title ">备注</p>
            <textarea class="remark-input" id="remark" cols="30" rows="6" placeholder="请输入内容"
                      v-model="remark"></textarea>
        </div>
        <button class="submit-btn">提交</button>
    </div>
</template>

<script>
    import numberPicker from "components/number-picker.vue";

    export default {
        name: 'addNewRedemption',
        data() {
            return {
                redemptionGoods: [
                    {
                        buyCount: 1,
                    },
                    {
                        buyCount: 2,
                    },
                    {
                        buyCount: 2,
                    }
                ],
                remark: ''
            }
        },
        components: {
            numberPicker
        },

        methods: {
            //跳转到添加兑奖商品
            toAddRedemptionGoods() {
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
            pt(32);
            c(#FF5638);
            ft(28);
            text-align center
            border-top 1px solid #EDEDED

        }
        .title {
            padding-bottom 24px;
            c(#333);
            ft(30);
            fb();
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
        textarea:
        :-webkit-input-placeholder {
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
        .goods-list-box {
            display flex;
            flex-direction column;
            .goods-info {
                position relative;
                display flex;
                flex-direction row;
                padding 24px 0
                .img-box {
                    w(120)
                    h(120)
                    mr(24)
                    border-radius: 6px
                }
                 img {
                    w(120)
                    h(120)

                }
                .goods-name {
                    c(#333);
                    ft(30);
                    text-overflow-2();
                    mr(149)
                }
                .del-btn {
                    position absolute;
                    right 0;
                    w(80);
                    h(40);
                    lh(40)
                    border-radius: 16px;
                    border: 2px solid rgba(221, 221, 221, 1);
                    c(#999);
                    font-size 22px;
                    text-align center
                }
            }
            .count-box{
                display flex;
                flex-direction row;
                align-items center;
                justify-content flex-end
                .font-30-333{
                    ft(30);
                    c(#333)
                }
            }
            .dividing-line{
                h(2);
                bg(#EDEDED);
                ml(168)
                mt(24)
            }
            .dividing-line-2{
                h(2);
                bg(#EDEDED);
            }
        }

    }

</style>

