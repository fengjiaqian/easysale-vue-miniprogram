<template>
    <div class="product-add-wrap pt90">
        <m-header :isFixed="true"></m-header>
        <div class="product-edit-content">
            <ul class="add-column">
                <li>
                    <span>商品名称：</span>
                    <input v-model="productModal.productName" type="text" maxlength="50" placeholder="请输入商品名称">
                </li>
                <li>
                    <span>商品品牌：</span>
                    <input v-model="productModal.brandName" unselectable="on" type="text" maxlength="30"
                           placeholder="请输入商品品牌">
                </li>
                <li>
                    <span>商品价格：</span>
                    <input v-model="productModal.price" type="number" class="price" placeholder="请输入商品价格">
                    <i>元</i>
                </li>
                <li>
                    <span>价格单位：</span>
                    <template v-if="!productModal.quantity">
                        <input v-model="productModal.priceUnit" type="text" maxlength="10" placeholder="请输入价格单位，如瓶、件">
                    </template>
                    <template v-else>
                        <span :class="unitCls(productModal.unitName)" @click="()=> selectUnit({unitName:productModal.unitName})">{{productModal.unitName}}</span>
                        <span :class="unitCls(productModal.packageName)" @click="()=> selectUnit({packageName:productModal.packageName})">{{productModal.packageName}}</span>
                        <input v-model="productModal.priceUnit" type="hidden" maxlength="10">
                    </template>
                </li>
                <li>
                    <span>备注：</span>
                    <input v-model="productModal.remark" type="text" maxlength="16" placeholder="请输入备注">
                </li>
            </ul>
            <div class="upload-pic-wrap">
                <span>商品图片</span>
                <upload-file :img-list="stagImgList" :limit-num="limitUploadNum" ref="uploadFile"></upload-file>
            </div>
            <div class="product-introduce">
                <span>商品介绍：</span>
                <textarea v-model="productModal.description" maxlength="180" rows="4" placeholder="请输入介绍文字"></textarea>
            </div>
            <div class="set-property">
                <h5>设置商品属性</h5>
                <ul class="option-list">
                    <li>
                        <span>可退货</span>
                        <i @click="switchOption('return')" :class="{'open':productModal.returnState}"></i>
                    </li>
                    <li>
                        <span>可兑奖</span>
                        <i @click="switchOption('award')" :class="{'open':productModal.awardState}"></i>
                    </li>
                    <li>
                        <span>可陈列</span>
                        <i @click="switchOption('display')" :class="{'open':productModal.displayState}"></i>
                    </li>
                </ul>
                <div class="reward-column" v-if="productModal.displayState">
                    <span>陈列奖励：</span>
                    <textarea v-model="productModal.displayAward" cols="30" rows="3" placeholder="请输入陈列奖励"></textarea>
                </div>
            </div>
        </div>
        <div class="confirm" :class="{'achieve':achieve}" @click="verify">确认</div>
    </div>
</template>

<script>
    import {editProduct} from "api/fetch/mine";
    import storage from "common/storage";
    import {compress} from "common/util";
    import uploadFile from "components/upload-file";
    import bus from "common/Bus";

    export default {
        data() {
            return {
                productModal: {
                    id: '',//商品id
                    brandName: '',//品牌
                    productName: '',//商品名称
                    price: '',//商品价格
                    productImageUrl: '',//商品图片地址
                    description: '',//商品介绍
                    priceUnit: '',//价格单位
                    productType: '',//商品类型
                    specification: '',//产品规格
                    remark: '',//价格备注
                    effectiveDate: null,//生效时间
                    returnState: 0,//退换
                    awardState: 0,//兑奖
                    displayState: 0,//陈列
                    displayAward: '',//陈列奖励（选填）
                },
                productType: 0, //产品类型 0=酒批 1=经销商
                limitUploadNum: 1,//上传图片的限制张数
                stagImgList: [],//暂存的图片数组
                achieve: false,//能否保存
                setOptions: [
                    {title: `可退货`, switch: 0},
                    {title: `可兑奖`, switch: 0},
                    {title: `可陈列`, switch: 0},
                ],//商品属性设置项
            };
        },
        components: {
            uploadFile
        },
        computed: {},
        mounted() {
            bus.$off("uploadImgUrls")
            bus.$on("uploadImgUrls", (data) => {
                this.productModal.productImageUrl = data[0] || ''
                this.saveAdd()
            });
        },
        created() {
            let productInfo = JSON.parse(localStorage.getItem('productInfo'))
            Object.assign(this.productModal, productInfo)
            this.productType = productInfo.productType
            this.stagImgList = [productInfo.productImageUrl]
            //酒批产品只能修改价格
            if (this.stagImgList.length == this.limitUploadNum) {
                this.$nextTick(() => {
                    document.querySelector('.el-upload--picture-card').setAttribute('style', 'display:none;')
                });
            }
        },
        methods: {
            //验证添加商品所需字段
            verify() {
                if (!this.achieve) return;
                const fileLength = this.$refs.uploadFile.fileList.length
                if (fileLength) {
                    //上传图片
                    this.$refs.uploadFile.submitFile()
                    return;
                } else {
                    this.saveAdd()
                }
            },
            selectUnit(unit){
                this.productModal.priceUnit = unit['unitName'] || unit['packageName'];
                this.handleUnitChange(unit);
            },
            handleUnitChange(unit) {
                const quantity = this.productModal.quantity || 1;
                if (unit.unitName) {
                    this.productModal.price = Math.round(Number(this.productModal.price) / Number(quantity))
                } else {
                    this.productModal.price = Math.round(Number(this.productModal.price) * Number(quantity))
                }
            },
            unitCls(unit) {
                return this.productModal.priceUnit === unit ? 'checked' : 'uncheck'
            },
            saveAdd() {
                if (this.productModal.displayState == 0) {
                    this.productModal.displayAward = ''
                }
                editProduct(this.productModal).then(res => {
                    if (res.result === "success") {
                        //商品添加成功后回到商品详情
                        this.$router.go(-1)
                    }
                });
            },
            //切换商品设置
            switchOption(type) {
                const {returnState, awardState, displayState} = this.productModal
                switch (type) {
                    case `return`:
                        this.productModal.returnState = returnState == 1 ? 0 : 1
                        break;
                    case `award`:
                        this.productModal.awardState = awardState == 1 ? 0 : 1
                        break;
                    case `display`:
                        this.productModal.displayState = displayState == 1 ? 0 : 1
                        break;
                    default :
                        break;
                }
            },
        },
        watch: {
            productModal: {
                handler(newVal, oldVal) {
                    const {productName, brandName, price, priceUnit, specification} = newVal
                    if (productName && brandName && price && priceUnit && specification) {
                        this.achieve = true
                    } else {
                        this.achieve = false
                    }
                },
                deep: true
            },
        }
    };
</script>

<style lang="stylus" scoped>
    @import "stylus/productManage.styl"

    li > span.checked {
        mw(110)
        h(56)
        lh(56)
        text-c()
        vm()
        flex-center()
        mr(20)
        radius(4)
        bg(#FFEEEB)
        b1(#FF5638)
    }

    li > span.uncheck {
        mw(110)
        h(56)
        lh(56)
        text-c()
        vm()
        flex-center()
        mr(20)
        radius(4)
        bg(#F6F6F6)
    }
</style>

