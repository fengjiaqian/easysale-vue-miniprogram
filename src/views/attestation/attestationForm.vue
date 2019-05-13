<template>
    <div class="att-wrap pt90">
        <m-header :isFixed="true"></m-header>
        <section>
            <!--客户-->
            <div class="content" v-if="type==0">
                <div class="c-header">
                    <div>
                        <h5>填写资料</h5>
                        <p>请填写您的详细资料</p>
                    </div>
                    <i class="icon-customer"></i>
                </div>
                <ul class="c-form">
                    <li>
                        <span>您的姓名</span>
                        <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
                    </li>
                    <li>
                        <span>手机号码</span>
                        <input v-model="formParam.phone" @input="limitPhone" type="tel" placeholder="请输入手机号码">
                    </li>
                    <li>
                        <span>店铺名称</span>
                        <input v-model="formParam.shopName" maxlength="20" type="text" placeholder="请输入店铺名称">
                    </li>
                    <li>
                        <span>店铺地址</span>
                        <textarea v-model="formParam.address" maxlength="50" cols="30" rows="2" placeholder="请输入店铺地址"></textarea>
                        <i @click="obtainAddress" class="position"></i>
                    </li>
                </ul>
            </div>
            <!--员工-->
            <div class="content" v-if="type==1">
                <div class="c-header">
                    <div>
                        <h5>填写资料</h5>
                        <p>请填写您的详细资料</p>
                    </div>
                    <i class="icon-staff"></i>
                </div>
                <ul class="c-form">
                    <li>
                        <span>您的姓名</span>
                        <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
                    </li>
                    <li>
                        <span>手机号码</span>
                        <input v-model="formParam.phone" @input="limitPhone" type="tel" placeholder="请输入手机号码">
                    </li>
                    <li>
                        <span>身份证号</span>
                        <input v-model="formParam.cardId" @input="limitPhone" type="tel" placeholder="请输入身份证号">
                    </li>
                    <li>
                        <span>家庭住址</span>
                        <textarea v-model="formParam.address" maxlength="50" cols="30" rows="2" placeholder="请输入家庭住址"></textarea>
                        <i @click="obtainAddress" class="position"></i>
                    </li>
                    <li>
                        <span>入职日期</span>
                        <el-date-picker
                                class="date-pick-wrap"
                                v-model="formParam.hireDate"
                                type="date"
                                placeholder="请选择入职日期">
                        </el-date-picker>
                        <i class="extension"></i>
                    </li>
                </ul>
            </div>
            <!--店主-->
            <div class="content" v-if="type==2">
                <div class="c-header">
                    <div>
                        <h5>店主认证</h5>
                        <p>店主认证需要上传您的营业执照</p>
                    </div>
                    <i class="icon-owner"></i>
                </div>
                <ul class="c-form">
                    <li>
                        <span>您的姓名</span>
                        <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
                    </li>
                    <li>
                        <span>手机号码</span>
                        <input v-model="formParam.phone" @input="limitPhone" type="tel" placeholder="请输入手机号码">
                    </li>
                </ul>
                <div class="upload-viewer">
                    <h5>上传营业执照</h5>
                    <div class="upload-area">
                        <!-- <m-upload @file-success="onFileSuccess" @file-removed="onFileRemoved"/> -->
                        <cube-upload
                                ref="upload"
                                v-model="files"
                                :action="uploadImgUrl"
                                :process-file="processFile"
                                @files-added="addedHandler"
                                @file-error="errHandler"
                        >
                            <div class="clear-fix">
                                <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
                                <cube-upload-btn :multiple="false">
                                    <div>
                                        <i></i>
                                        <p style="color:#bdbdbd;font-size: 14px">添加营业执照</p>
                                    </div>
                                </cube-upload-btn>
                            </div>
                        </cube-upload>
                    </div>
                </div>
            </div>
            <!--开店申请-->
            <div class="content" v-if="type==3">
                <div class="c-header">
                    <div>
                        <h5>店铺资料</h5>
                        <p>请填写您公司的详细资料</p>
                    </div>
                    <i class="icon-apply"></i>
                </div>
                <ul class="c-form">
                    <li>
                        <span>您的姓名</span>
                        <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
                    </li>
                    <li>
                        <span>手机号码</span>
                        <input v-model="formParam.phone" @input="limitPhone" type="tel" placeholder="请输入手机号码">
                    </li>
                    <li>
                        <span>店铺名称</span>
                        <input v-model="formParam.shopName" maxlength="20" type="text" placeholder="请输入店铺名称">
                    </li>
                    <li>
                        <span>店铺地址</span>
                        <textarea v-model="formParam.address" maxlength="50" cols="30" rows="2" placeholder="请输入店铺地址"></textarea>
                        <i @click="obtainAddress" class="position"></i>
                    </li>
                </ul>
                <div class="upload-viewer">
                    <h5>上传营业执照</h5>
                    <div class="upload-area">
                        <!-- <m-upload @file-success="onFileSuccess" @file-removed="onFileRemoved"/> -->
                        <cube-upload
                                ref="upload"
                                v-model="files"
                                :action="uploadImgUrl"
                                :process-file="processFile"
                                @files-added="addedHandler"
                                @file-error="errHandler"
                        >
                            <div class="clear-fix">
                                <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
                                <cube-upload-btn :multiple="false">
                                    <div>
                                        <i></i>
                                        <p style="color:#bdbdbd;font-size: 14px">添加营业执照</p>
                                    </div>
                                </cube-upload-btn>
                            </div>
                        </cube-upload>
                    </div>
                </div>
            </div>

            <!--提交按钮-->
            <div class="bottom-btn" :class="{'achieve':achieve}">提交</div>
        </section>
    </div>
</template>

<script>
    import { evokeWxLocation } from "common/location";
    export default {
        data() {
            return {
                type: 0,//认证类型：0:客户；1:员工；2:店主；3:开店申请；
                formParam: {
                    name: '',
                    phone: '',
                    shopName: '',
                    address: '',
                    hireDate: '',
                    cardId: '',
                },//提交参数
            };
        },
        components: {

        },
        computed: {
            achieve(){
                const {name,phone,shopName,address} = this.formParam
                return name&&phone&&shopName&&address
            },
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                let passData = to.query.passData ? to.query.passData : null;
                if (passData) {
                    passData = JSON.parse(passData);
                    Object.assign(vm.formParam, passData.pageData);
                    vm.formParam.address = passData.addressData.address;
                }
            });
        },
        created() {
            this.type = this.$route.query.type || 0
        },
        mounted() {},
        methods: {
            limitPhone(e) {
                this.formParam.phone = e.target.value.slice(0, 11);
            },
            limitCardId(e){
                this.formParam.cardId = e.target.value.slice(0,18);
            },
            //去定位地址
            obtainAddress() {
                let recordData = {
                    path: this.$route.path,
                    pageData: this.formParam
                };
                evokeWxLocation(recordData);
            }
        },
    };
</script>

<style lang="stylus" scoped>
    @import "./stylus/attestation.styl"
</style>

