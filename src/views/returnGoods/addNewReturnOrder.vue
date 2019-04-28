<template>
    <div id="addNewReturnOrder">
        <m-header :isFixed="true"></m-header>
        <div class="content">
            <div class="reason-box">
                <p class="title">投诉原因</p>
                <input type="text" placeholder="请输入退货原因" v-model="reason" >
            </div>
            <div class="goods-box">
                <p class="title" :style="{borderWidth:returnGoods.length?'0.5px':'0.25px'}">退货商品</p>
                <div class="good-warp">
                    <div v-if="returnGoods.length">
                        <ul>
                            <li v-for="(item,index) in returnGoods">
                                <div class="goods-list-box">
                                    <div class="goods-info">
                                        <div class="img-box">
                                            <img v-lazy="item.productImageUrl">
                                        </div>
                                        <p class="goods-name">{{item.productName}}</p>
                                        <div class="del-btn" @click="delGoods(index)">删除</div>
                                    </div>
                                    <div class="count-box">
                                        <span class="font-30-333">退货数量：</span>
                                        <number-picker :product="item"></number-picker>
                                    </div>
                                    <p class="dividing-line" v-show="index<(returnGoods.length-1)"></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <p class="add-tip"
                       :style="{marginTop:returnGoods.length?'12px':'0',borderWidth:returnGoods.length?'0.5px':'0.01px'}"
                       @click="toAddReturnGoods()">+添加退货商品</p>
                </div>
            </div>
            <div class="remark-box">
                <p class="title ">备注</p>
                <textarea class="remark-input" id="remark" cols="30" rows="6" placeholder="请输入内容"
                          v-model="remark"></textarea>
            </div>
        </div>

        <button class="submit-btn" @click="submitReturnOrder">提交</button>
    </div>
</template>

<script>
    import numberPicker from "components/number-picker.vue";
    import mHeader from "components/header.vue";
    import storage from 'common/storage';
    import {saveCustomerReturn} from "api/fetch/returnGoods";
    export default {
        name: 'addNewReturnOrder',
        data() {
            return {
              returnGoods: [
                ],
                remark: '',
                reason: ''
            }
        },
        components: {
            numberPicker,mHeader
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.name == 'chooseProductList') {
                    let selectedProduct = storage.get("selectedProduct", "");
                    selectedProduct.buyCount=1
                    vm.returnGoods.push(selectedProduct)
                } else {
                    storage.remove("selectedProduct");
                }
            })
        },

        methods: {
            //跳转到添加兑奖商品
            toAddReturnGoods() {
                this.$router.push({ path: "/chooseReturnGoods" });
            },
            // 删除已添加的兑奖商品
            delGoods(selectIndex){
                this.returnGoods.splice(selectIndex, 1);
            },

            //新建兑奖单
            submitReturnOrder(){
                if (!this.isValid()) return;
                const currentDealerId = storage.get("currentDealerId", "") || "";
                let items=[];
                for(let item of this.returnGoods){
                    let obj={
                        productId:item.id,
                        awardCount:item.buyCount,
                    }
                    items.push(obj)
                }
                let params={
                    dealerId:currentDealerId,
                    items:items,
                    remark:this.remark,
                };
                saveCustomerReturn(params).then(res => {
                    this.$toast('新增成功');
                    this.$router.go(-1)
                });
            },

            /**
             * 校验表单
             * @returns {boolean}
             */
            isValid(){
                let errList = [];
                if(!this.reason){
                    errList.push({errMsg: '请填写投诉原因'});
                }
                if (!this.returnGoods.length) {
                    errList.push({errMsg: '请添加退货商品'});
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
    #addNewReturnOrder {
        width 100%;
        height 100%;
        bg(#f6f6f6);
        overflow scroll;
        mt(90)
        .content {
            overflow scroll
            mb(100)
        }
        .reason-box, .goods-box, .remark-box {
            margin 24px;
            padding 24px 24px 32px;
            bg(#fff);

        }
        .reason-box{
            input{
                width 100%;
                display flex;
                flex 1;
            }
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
        input:
        :-webkit-input-placeholder {
            color: #BDBDBD !important;
            font-size: 30px;
            text-align: left;
        }
        input {
            display: inline-block;
            outline: none;
            margin 24px 0;
            font-size: 30px;
            c(#333)
        }

    }

</style>

