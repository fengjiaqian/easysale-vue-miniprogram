<template>
    <div id="addNewComplaint">
        <m-header :isFixed="true"></m-header>
        <div class="body">
            <div class="reason">
                <p class="title">投诉原因</p>
                <input type="text" placeholder="请输入投诉原因" v-model="complaintHeadLine">
            </div>
            <div class="description">
                <p class="title">内容描述</p>
                <textarea id="description" cols="30" rows="9" placeholder="请输入投诉内容"
                          v-model="complaintContent"></textarea>
                <p class="count">{{length}}/100</p>
            </div>
            <div class="remark">
                <p class="title">备注</p>
                <textarea id="remark" cols="30" rows="6" placeholder="请输入内容"
                          v-model="remark"></textarea>
            </div>
        </div>

        <button class="submit" :class="{'achieve':canOperate}" @click="addNewComplaint">提交</button>
    </div>
</template>

<script>
    import {saveComplain} from "api/fetch/complaints";
    import storage from "common/storage";
    import mHeader from "components/header.vue";

    export default {
        name: 'addNewComplaint',
        data() {
            return {
                complaintHeadLine: '',
                complaintContent: '',
                remark: '',
                length: 0,

            }
        },
        components: {mHeader},

        watch: {
            complaintContent(val, oval) {
                this.length = val.length;
            }
        },
        computed: {
            canOperate() {
                return this.complaintHeadLine.trim() && this.complaintContent.trim();
            }
        },
        methods: {

            /**
             * 校验表单
             * @returns {boolean}
             */
            isValid() {
                let errList = [];
                if (!this.complaintHeadLine) {
                    errList.push({errMsg: '请填写投诉原因'});
                }
                if (!this.complaintContent) {
                    errList.push({errMsg: '请填写投诉内容'});
                }
                if (errList.length !== 0) {
                    this.$toast(errList[0].errMsg)
                }
                return errList.length === 0
            },

            addNewComplaint() {
                if (!this.isValid()) return;
                const currentDealerId = storage.get("currentDealerId", "") || "";
                let params = {
                    dealerId: currentDealerId,
                    complaintContent: this.complaintContent,
                    complaintHeadLine: this.complaintHeadLine,
                    remark: this.remark,
                };
                saveComplain(params).then(res => {
                    this.$toast('新增成功');
                    this.$router.go(-1)
                }).catch(res => {
                    this.$toast(res.message)
                });
            }

        },
    }
</script>

<style lang="stylus" scoped>
    #addNewComplaint {
        width: 100%;
        height: 100%;
        bg(#f6f6f6);
        .body {
            height 100%;
            pb(118);
            pt(90);
            overflow scroll
        }
        .reason {
            mt(20)
            width: 100%;
            padding 0 24px;
            bg(#fff);
            overflow: hidden;
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

        .title {
            padding 24px 0;
            border-bottom: 1px solid #f6f6f6;
            font-size: 30px;
            c(#333);
            font-weight: bold;
        }

        .description {
            width: 100%;
            height: 480px;
            margin: 24px 0 24px 0;
            padding: 0 24px 0 24px;
            bg(white);
            overflow: hidden;
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
        }

        .remark {
            width: 100%;
            height: 373px;
            margin: 24px 0 24px 0;
            padding: 0 24px 0 24px;
            bg(white);
            overflow: hidden;
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
        }
        .count {
            text-align: right;
            c(#999);
            margin-bottom: 20px;
        }

        .submit {
            position: fixed;
            bottom: 0;
            left: 0;
            border: 0;
            outline: none;
            width: 100%;
            h(98);
            lh(98);
            bg(#BDBDBD)
            font-size: 32px;
            c(#fff);
            text-align: center;

        }
        .achieve {
            bg(#FF5638)

        }

    }


</style>

