<template>
    <div id="addNewRedemption">
        <m-header :isFixed="true"></m-header>
        <div class="body">
            <div class="goods-box">
                <p class="title" :style="{borderWidth:redemptionGoods.length?'0.5px':'0.25px'}"><i>*</i>兑奖商品</p>
                <div class="good-warp">
                    <div v-if="redemptionGoods.length">
                        <ul>
                            <li v-for="(item,index) in redemptionGoods">
                                <div class="goods-list-box">
                                    <div class="goods-info">
                                        <div class="img-box">
                                            <img :src="item.productImageUrl">
                                        </div>
                                        <div class="info-box">
                                            <p class="goods-name">{{item.productName}}</p>
                                            <p class="goods-name">规格：{{item.specification}}</p>
                                        </div>

                                        <div class="del-btn" @click="delGoods(index)">删除</div>
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
                </div>
            </div>
            <div class="remark-box">
                <p class="title ">备注</p>
                <textarea class="remark-input" id="remark" cols="30" rows="6" placeholder="请输入内容"
                          v-model="remark"></textarea>
            </div>
        </div>
        <button class="submit-btn" :class="{'achieve':canOperate,'isIphoneX':isIphoneX}" @click="submitRedemption">提交</button>
    </div>
</template>

<script>
    import numberPicker from "components/number-picker.vue";
    import storage from 'common/storage';
    import mHeader from "components/header.vue";
    import {saveAward} from "api/fetch/redemption";

    export default {
        name: 'addNewRedemption',
        data() {
            return {
                isIphoneX:this.isIphoneX,
                redemptionGoods: [],
                remark: '',
            }
        },
        components: {
            numberPicker, mHeader
        },
        created(){
            let selectedProduct = storage.get("selectedProduct");
            selectedProduct.forEach(selectItem => {
                selectItem.buyCount = 1;
                selectItem.minBuyNum = 1;
                this.redemptionGoods.push(selectItem)
            });
            storage.remove("selectedProduct");
        },

        computed: {
            canOperate() {
                return this.redemptionGoods.length
            }
        },
        methods: {
            // 删除已添加的兑奖商品
            delGoods(selectIndex) {
                this.redemptionGoods.splice(selectIndex, 1);
            },

            //新建兑奖单
            submitRedemption() {
                if (!this.isValid()) return;
                const currentDealerId = storage.get("currentDealerId", "") || "";
                let items = [];
                for (let item of this.redemptionGoods) {
                    let obj = {
                        productId: item.id,
                        awardCount: item.buyCount,
                    };
                    items.push(obj)
                }
                let params = {
                    dealerId: currentDealerId,
                    items: items,
                    remark: this.remark,
                };
                saveAward(params).then(res => {
                    this.$toast('申请提交成功');
                    this.$router.go(-1)
                }).catch(res => {
                    this.$toast(res.message)
                });
            },

            /**
             * 校验表单
             * @returns {boolean}
             */
            isValid() {
                let errList = [];
                if (!this.redemptionGoods.length) {
                    errList.push({errMsg: '请添加兑奖商品'});
                }
                if (errList.length !== 0) {
                    this.$toast(errList[0].errMsg)
                }
                return errList.length === 0
            },

        }
    }
</script>

<style lang="stylus" scoped>
    #addNewRedemption {
        width 100%;
        height 100%;
        bg(#f6f6f6);
        .body {
            height 100%;
            pt(114)
            pb(110)
            overflow scroll
        }
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
            i{
                c(#E53935)
                ft(32)
            }
        }
        .remark-input {
            padding 24px 0 0;
        }

        .submit-btn {
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            bg(#bdbdbd);
            text-align: center;
            lh(98);
            c(#fff);
            font-size: 32px;
            border: 0;
            outline: none;
        }
        .submit-btn.isIphoneX{
            padding-bottom 34px;}
        .achieve {
            bg(#FF5638)

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

        }
        .dividing-line {
            h(2);
            bg(#EDEDED);
            ml(168)
            mt(24)
        }
        .dividing-line-2 {
            h(2);
            bg(#EDEDED);
        }
        .goods-info {
            position relative;
            display flex;
            flex-direction row;
            padding 24px 0

            img {
                w(120)
                h(120)
            }
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
        .img-box {
            w(120)
            h(120)
            mr(24)
            border-radius: 6px
        }
        .count-box {
            display flex;
            flex-direction row;
            align-items center;
            justify-content flex-end

        }
        .font-30-333 {
            ft(30);
            c(#333)
        }
        .info-box{
            display flex;
            flex-direction column;
            justify-content space-between
        }
    }

</style>

