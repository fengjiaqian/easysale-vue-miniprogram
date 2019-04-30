<template>
    <div class="body">
        <m-header :isFixed="true"></m-header>
        <div class="title-box">
            <p>申请状态：<span class="red-font">审核中</span></p>
        </div>
        <!-- <div class="describe">经销商正在处理您的问题，请耐心等待！</div> -->
        <div class="license-box" v-if="logoImageUrls.length">
            <p class="border-line">营业执照</p>
            <div class="slider-body">
                <slider ref="slider_dom" :loop="logoImageUrls.length>1?true:false">
                    <div class="banner-item" v-for="item in logoImageUrls">
                        <img v-lazy="item" class="img">
                    </div>
                </slider>
            </div>
        </div>
        <div class="license-box" v-if="applyDealerInfo&&applyDealerInfo.name">
            <p class="border-line">个人信息</p>
            <p class="font-30-666 margin-top">姓名：{{applyDealerInfo.name}}</p>
            <p class="font-30-666 line">联系电话：{{applyDealerInfo.phone}}</p>
            <p class="font-30-666 margin-top">{{applyDealerInfo.shopName}}</p>
            <p class="font-30-666 text-warp">{{applyDealerInfo.address}}</p>
        </div>
    </div>
</template>

<script>
    import icBanner from "@/assets/images/ic-banner.png";
    import {findApplyDealerInfo} from "api/fetch/endCustomer";
    import slider from "components/slider.vue";

    export default {
        data() {
            return {
                applyDealerInfo: {},
                logoImageUrls: [],
                icBanner: icBanner
            };
        },
        components: {
            slider
        },
        created() {
            this._findApplyDealerInfo();
        },
        methods: {
            _findApplyDealerInfo() {
                findApplyDealerInfo()
                    .then(res => {
                        if (res.data) {
                            this.applyDealerInfo = res.data;
                            this.logoImageUrls = [...res.data.logoIamgeUrls]
                        }
                    }).catch(err => {});
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .body {
        mt(90);
        width 100%;
        height 100%;
        bg(#f6f6f6)
    }

    .title-box {
        bg(#fff);
        ft(34);
        c(#333);
        fb();
        padding 16px 24px;

    }

    .red-font {
        c(#FF5638)
    }

    .license-box {
        ft(30);
        c(#333);
        margin 24px;
        padding 16px 24px;
        bg(#fff)
    }

    .border-line {
        fb()
        pb(24)
        border-bottom 1px solid #f6f6f6
    }

    .img {
        squ(300)
    }

    .slider-body {
        mt(58)
        pos(relative);
        overflow: hidden;
    }

    .margin-top {
        mt(16)
    }

    .font-30-666 {
        c(#666);
        ft(30);
        padding 8px
    }

    .line {
        pb(16)
        border-bottom 1px solid #f6f6f6
    }

    .text-warp {
        text-overflow-2()
    }
</style>
