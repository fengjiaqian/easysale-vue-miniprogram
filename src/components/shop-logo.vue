<template>
    <div id="shop-logo">
        <canvas id="sLogo" :width="realWidth" height="334" style="clear:both;margin-left:12px;height:168px;"></canvas>
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
                default:168
            }
        },
        created() {
            this.config = this.shopInfo;
        },
        computed:{
            realWidth: function () {
                return (this.width - 24) * 2
            }
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
                let {shopName, phone, instruction, address, description} = config;
                if (!instruction) {
                  instruction = description;
                }
                const _canvas = document.getElementById("sLogo");
                const ctx = _canvas.getContext("2d");
                var img=new Image();

                img.src = this.logoImg;
                img.onload = function(){
                    ctx.drawImage(img,0,0,(that.width - 24) * 2,that.height * 2);
                    ctx.font = "48px '字体','字体','微软雅黑','宋体'"
                    ctx.textBaseline = 'middle';
                    shopName && ctx.fillText(shopName,24,60)
                    ctx.font = "24px '字体','宋体'"
                    ctx.fillStyle='#666666'
                    address && ctx.fillText(address,74,130)
                    ctx.font = "24px '字体','Verdana'"
                    if (phone) {
                        const formatPhone = phone.substr(0,3) + " " + phone.substr(3,4) + " " + phone.substr(7)
                        ctx.fillText(formatPhone,74,176)
                    }

                    ctx.font = "26px '字体','字体','微软雅黑','宋体'"
                    if (instruction) {
                        if (instruction.length > 20) {
                            const des1 = instruction.substr(0, 20);
                            ctx.fillText(des1, 128,256);
                            let des2 = instruction.substr(20,40);
                            if (instruction.length > 40) {
                                des2 = instruction.substr(20, 38) + "..."
                            }
                            ctx.fillText(des2, 128, 296);
                        } else {
                            ctx.fillText(instruction, 124,270);
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