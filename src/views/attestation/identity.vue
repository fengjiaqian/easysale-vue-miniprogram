<template>
    <div class="identity-wrap pt90">
        <m-header :isFixed="true"></m-header>
        <div class="content">
            <div class="c-title">
                <h4>您的身份是</h4>
                <p>请完善您的身份信息</p>
            </div>
            <ul class="c-list">
                <li v-for="(item,i) in identityList"
                        :key="i"
                        @click="skip(i)">
                    <span :class="item.class"></span>
                    <h5>{{item.title}}</h5>
                    <i></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                identityList: [
                    {
                        title: "我是客户",
                        class: "customer",
                    },{
                        title: "我是员工",
                        class: "staff",
                    },{
                        title: "我是店主",
                        class: "owner",
                    },{
                        title: "我要认证",
                        class: "apply",
                    }
                    ],
            };
        },
        components: {

        },
        computed: {

        },
        created() {

        },
        mounted() {},
        methods: {
            //跳转到认证页面
            skip(i){
                this.$router.push({
                    name: "attestationForm",
                    query: { type: i }
                });
            },
        },
    };
</script>

<style lang="stylus" scoped>
    @import "./stylus/attestation.styl"
</style>

