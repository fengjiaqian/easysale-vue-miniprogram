<template>
    <div id="complaint">
        <top-tabs :topTabsList="topTabsList" @switchTab="switchTab" ></top-tabs>


    </div>
</template>

<script>
    import TopTabs from "../../components/topTabs";
    export default {
        name: '',
        components: {TopTabs},
        data() {
            return {
                topTabsList:['待处理','已处理'],
            }
        },

        methods:{

            /**
             * 切换顶部tabs
             * @param state:0-待处理，1-已处理
             */
            switchTab(state){

            }
        }
    }
</script>

<style  lang="stylus">
    #complaint {
        width: 100vw;
        bg(#f6f6f6);

    }

</style>

