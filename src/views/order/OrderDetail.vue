<template>
    <div id="orderDetail" v-if="order.orderState">
        <m-header :isFixed="true"></m-header>
        <div class="state">
            订单状态：
            <strong class="c-theme">{{order.orderState | orderState}}</strong>
        </div>
        <div class="continue" v-if="(order.orderState==2||order.orderState==3)">
            <div class="triangle"></div>
            <div class="bg">
                <div class="report">
                    <div class="left">{{order.dealerName}}回复：</div>
                    <div class="right">{{order.updateTime}}</div>
                </div>
                <div class="tips">{{order.auditRemark||(order.orderState==2?'我们会尽快为您处理':'抱歉，暂时无法为您提供服务')}}</div>
            </div>

        </div>
        <div class="order-detail-area product-Info">
            <h5>商品信息</h5>
            <order-products v-if="products.length" :products="products"></order-products>
            <!--  -->
            <div class="order-detail-amount">
                <div class="order-price" v-if="order.reduceAmount">
                    <span>原价：&yen;{{order.payableAmount | priceToFixed}}</span>
                    <span>优惠：&yen;{{order.reduceAmount | priceToFixed}}</span>
                </div>
                <div class="fz30">
                    实付：
                    <span class="c-theme">&yen;{{order.orderAmount | priceToFixed}}</span>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="order-detail-area">
            <h5>收货人信息</h5>
            <div class="info-display pre">
                <p>客户姓名：{{order.customer.name}}</p>
                <p>手机号码：{{order.customer.phone}}</p>
                <a class="tel" :href="'tel:'+order.customer.phone"></a>
            </div>
            <div class="info-display">
                <p>店铺名称：{{order.customer.customerShopName}}</p>
                <p>收货地址：{{order.customer.address}}</p>
            </div>
        </div>
        <!-- 经销商角色展示下单人 -->
        <div class="order-detail-area">
            <h5>订单信息</h5>
            <div class="info-display">
                <p v-if="userType!=3">下单人：{{order.createUserName}}</p>
                <p v-if="userType==3">下单店铺：{{order.dealerName}}</p>
                <p>下单时间：{{order.createTime}}</p>
                <p v-if="order.orderRemark">备注：{{order.orderRemark}}</p>
            </div>
        </div>
        <!-- 备注 -->
        <div class="order-detail-area" v-if="order.canRefuse">
            <h5>
                备注
                <span class="c-9 fz28">(若拒绝，则必须填写拒绝原因)</span>
            </h5>
            <div class="info-display">
        <textarea
                class="remark-txt"
                name="remark"
                id="remark"
                cols="50"
                rows="4"
                placeholder="请输入内容"
                v-model="reason"
        ></textarea>
            </div>
        </div>
        <!--  -->
        <div class="bottom-wrap" :class="{'isIphoneX':isIphoneX}" v-if="order.canRefuse">
            <a href="javascript:;" class="btn" @click="_operate(3,order.id)">拒绝</a>
            <a href="javascript:;" class="btn" @click="_operate(2,order.id)">同意</a>
        </div>
        <div class="bottom-wrap" :class="{'isIphoneX':isIphoneX}" v-if="order.canCancel">
            <a href="javascript:;" class="btn" @click="_operate(5,order.id)" style="width:100%">取消申请</a>
        </div>
    </div>
</template>

<script>
    /**
     * 1.标题不同
     * 2.操作项不同
     */
    import {UpdateOrder, QueryOrders} from "api/fetch/order";
    import {
        orderOperate,
        pullProductsFromOrder,
        transformOrderList
    } from "./orderOperate";
    import orderProducts from "components/order-products.vue";

    export default {
        name: "order-detail",
        data() {
            return {
                order: {},
                products: [],
                reason: "",
                isIphoneX:this.isIphoneX
            };
        },
        components: {
            orderProducts
        },
        created() {
            this._QueryOrders();
        },
        mounted() {
        },
        methods: {
            _QueryOrders() {
                const {orderId} = this.$route.params;
                QueryOrders({
                    id: orderId
                })
                    .then(res => {
                        const orders = transformOrderList(res.data.dataList);
                        orders.length && (this.order = orders[0]);
                        this.products = pullProductsFromOrder(this.order);
                    })
                    .catch(err => {
                        this.$toast(err.message);
                    });
            },
            //封装到operate
            _operate(state, orderId) {
                const options = {
                    state,
                    orderId,
                    audit_remark: this.reason
                };
                orderOperate.call(this, options, this._QueryOrders.bind(this));
            }
        },

    };
</script>

<style lang='stylus' scoped>

    #orderDetail {
        pt(90);
        pb(98);
    }

    .remark-txt {
        width: 100%;
        padding: 12px;
        ft(28);
        c(#999);
        line-height: 1.2;
        b1(#ededed);
    }

    .bottom-wrap {
        pos(fixed);
        width: 100%;
        bottom: 0;
        border-top: 1PX solid #EDEDED;
        bg(#fff);
        z-index: 100;
    }

    .bottom-wrap.isIphoneX{
        padding-bottom 34px;
    }

    .btn {
        inline();
        width: 50%;
        h(98);
        lh(98);
        c($color-theme);
        text-c();
        ft(32);

        &:nth-of-type(2) {
            bg($color-theme);
            c(#fff);
        }
    }

    .info-display {
        padding: 20px 0;

        p {
            lh(50);
            c(#666);
            ft(30);
        }

        .tel {
            block();
            pos(absolute);
            bottom: 25px;
            right: 32px;
            squ(40);
            background: url('../../assets/images/icon-tel.png') no-repeat center;
            background-size: contain;
        }
    }

    .order-detail-area {
        margin: 20px 16px;
        padding: 0 24px;
        bg(#fff);

        h5 {
            lh(90);
            ft(30);
            border-bottom: 1PX solid #EDEDED;
        }

        .info-display {
            &:nth-of-type(2) {
                border-top: 1PX solid #EDEDED;
            }
        }
    }

    .product-Info {
        .order-detail-amount {
            pt(16);
            pb(16);
            lh(42);
            ft(30);
            c(#333);
            text-align: right;
            border-top: 1PX solid #EDEDED;

            .order-price {
                ft(26);
                c(#666);

                span:nth-of-type(2) {
                    ml(24);
                }
            }
        }
    }

    .state {
        bg(#fff);
        pl(24);
        h(32 + 46);
        lh(32 + 46);
        ft(34);
        fb();

        > strong {
            ft(34);
        }
    }

    .continue {
        bg(#fff);
        pt(24);
        padding 16px 24px
        border-radius: 10px;
        position: relative;
        .report {
            overflow: hidden;
            margin-bottom: 16px;
        }
        .bg {
            min-height 74px
            bg(#f6f6f6)
            padding 16px 24px
            border-radius: 10px
        }

        .left {
            float: left;
            c(#FF5638)
            font-size: 26px;
            height: 34px;
        }

        .right {
            float: right;
            c(#999)
            font-size: 26px;
            height: 34px;
            lh(34);
        }

        .tips {
            c(#666);
            ft(26);
            word-wrap break-word
        }
        .triangle {
            width: 0;
            height: 0;
            border-bottom: 22px solid #f6f6f6;
            border-left: 16px solid transparent;
            border-right: 16px solid transparent;
            position: absolute;
            top: 0;
            left: 50px;
        }
    }


</style>
