<template>
    <div class="popup-wrap" v-if="rolePopShow">
        <div class="pw-content">
            <h5 class="header">
                <span>{{title}}</span>
                <i @click.stop="closePop"></i>
            </h5>
            <ul class="list">
                <li
                        :class="{'active':selectId== item.id}"
                        v-for="item in roleList"
                        :key="item.id"
                        @click="selectRole(item)"
                >{{item.name}}
                </li>
            </ul>
            <div class="btn" @click.stop="submitQuery">确定</div>
        </div>
        <div class="pop-mask"></div>
    </div>
</template>
<script>
    export default {
        name: 'saleman-pop',
        props:{
            rolePopShow:{
                type: Boolean,
                default: false
            },
            title:{
                type: String,
                default: false
            },
            roleList:{
                type:Array,
                default: false
            }
        },
        data() {
            return {
                selectId:'',
            }
        },
        component: {
            //someComponent
        },

        methods:{

            selectRole(item){
               this.selectId=item.id
            },

            closePop(){

                this.$emit("closePop");
            },

            submitQuery(){
                this.$emit("submitQuery",this.selectId);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    //弹出层
    .popup-wrap{
        .pw-content{
            position absolute
            left 0
            bottom 0
            width 100%
            min-height 60%
            max-height 70%
            overflow-y scroll
            z-index 100
            bg(#fff)
            .header{
                padding 24px
                ft(36)
                c-3()
                font-weight 600
                flex()
                align-items center
                justify-content space-between
                i{
                    w(40)
                    h(40)
                    background-image url(../assets/images/role_icon_2.png)
                    background-size contain
                    background-repeat no-repeat
                    background-position center
                }
            }
            .list{
                ft(30)
                c-3()
                padding 0 24px
                li{
                    padding 24px 0

                }
                .active{
                    border-bottom 1PX solid #FF5638
                    position relative
                    &:before{
                        content ""
                        position absolute
                        right 0
                        top 50%
                        transform translateY(-50%)
                        w(40)
                        h(40)
                        background-image url(../assets/images/role_icon_1.png)
                        background-size contain
                        background-repeat no-repeat
                        background-position center
                    }
                }
            }
            .btn{
                position fixed
                left 0
                bottom 0
                width 100%
                ft(32)
                c(#fff)
                bg(#FF5638)
                lh(98)
                text-c()
            }
        }
        .pop-mask{
            background rgba(0,0,0,0.4)
            position absolute
            left 0
            bottom 0
            width 100%
            height 100%
            z-index 2
        }
    }
</style>

