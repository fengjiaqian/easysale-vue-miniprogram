<template>
    <div id="shop-logo">
        <canvas id="sLogo" width="414" height="151" style="clear:both;margin-left:12px;"></canvas>
    </div>
</template>

<script>

    export default {
        name: "shop-logo",
        data() {
            return {
                logoImg: require('assets/images/logo_template.png'),
                config:{},
                descLen:20
            }
        },
        props:{
            shopInfo:{
                type:Object,
                required:true
            },
            width: {
                type:Number,
                default:375
            },
            height: {
                type:Number,
                default:151
            }
        },
        created() {
            this.config = this.shopInfo;
        },

        watch: {
            shopInfo(val) {
                this.config = val;
            },

            config:{
                handler(newVal) {
                    this.createLogo(newVal)
                },
                deep: true
            }
        },
        methods:{
            createLogo(config) {
                if (!Object.keys(config).length) {
                    return;
                }
                const that = this;
                const {shopName, phone, description,address} = config
                const _canvas = document.getElementById("sLogo");
                const ctx = _canvas.getContext("2d");
                var img=new Image();

                img.src = this.logoImg;
                img.onload = function(){
                    ctx.drawImage(img,0,0,that.width - 24,that.height);
                    ctx.font = "bold 24px '字体','字体','微软雅黑','宋体'"
                    ctx.textBaseline = 'middle';
                    shopName && ctx.fillText(shopName,12,30)
                    ctx.font = "bold 12px '字体','宋体'"
                    ctx.fillStyle='#666666'
                    address && ctx.fillText(address,37,58)
                    ctx.font = "bold 12px '字体','Verdana'"
                    if (phone) {
                        const formatPhone = phone.substr(0,3) + " " + phone.substr(3,4) + " " + phone.substr(7)
                        ctx.fillText(formatPhone,37,80)
                    }
                    ctx.font = "bold 13px '字体','字体','微软雅黑','宋体'"
                    if (description) {
                        if (description.length > 20) {
                            const des1 = description.substr(0, 20);
                            ctx.fillText(des1, 62,115);
                            let des2 = description.substr(20,40);
                            if (description.length > 40) {
                                des2 = description.substr(20, 38) + "..."
                            }
                            ctx.fillText(des2, 62, 135);
                        } else {
                            ctx.fillText(description, 62,125);
                        }

                    }

                }


            }
        }
    }
</script>

<style scoped>
    #shop-logo {
        background: #fff;
    }

</style>