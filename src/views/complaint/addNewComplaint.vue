<template>
    <div id="addNewComplaint">
        <div class="reason">
            <p class="title">投诉原因</p>
            <input type="text" placeholder="请输入投诉原因" v-model="reason">
        </div>
        <div class="description">
            <p class="title">内容描述</p>
            <textarea id="description" cols="30" rows="9" placeholder="请输入投诉内容"
                      v-model="description"></textarea>
            <p class="count"><span id="textCount">0</span>/100</p>
        </div>
        <div class="remark">
            <p class="title">备注</p>
            <textarea id="remark" cols="30" rows="6" placeholder="请输入内容"
                      v-model="remark"></textarea>
        </div>
        <button class="submit">提交</button>
    </div>
</template>

<script>
    export default {
        name: 'addNewComplaint',
        data() {
            return {
                reason: '',
                description: '',
                remark: '',

            }
        },
        computed: {},
        components: {},
        beforeCreate: function () {

        },
        created: function () {

        },

        mounted() {
            window.onload = function () {
                //获取文本内容和长度函数
                function txtCount(el) {
                    let val = el.value;
                    let eLen = val.length;
                    return eLen;
                }

                let el = document.getElementById('description');
                el.addEventListener('input', function () {
                    let len = txtCount(this);
                    document.getElementById('textCount').innerHTML = len;
                });
                el.addEventListener('propertychange', function () {//兼容IE
                    let len = txtCount(this);
                    document.getElementById('textCount').innerHTML = len;
                });


            }
        },
        methods: {},
        watch: {}
    }
</script>

<style lang="stylus" scoped>
    #addNewComplaint {
        width: 100%;
        bg(#f6f6f6);
        margin-bottom 118px;
        padding: 20px 16px;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        .reason {
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
            bg(#FF5638)
            font-size: 32px;
            c(#fff);
            text-align: center;

        }

    }


</style>

