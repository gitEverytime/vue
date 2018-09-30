<template>
    <div class="home bgd bg-private-bg">
        <div class="penal">
            <Title title="游戏摇一摇" @leftClick="backHandler"/>
            <span class="shake">摇一摇</span>
            <img class="img" :src="getImgSrc">
            <span class="text" style="margin-top: 20px">~准备好现场互动~</span>
            <span class="text">~游戏尽请设置~</span>
            <span class="btn-create" v-on:click="createHandler">创建活动</span>
            <span class="btn-back" v-on:click="backHandler">返回</span>
            <img src="http://log.ibigtop.com/log/1/2" style="width: 1px; height: 1px; position: absolute">
        </div>
    </div>

</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'

    const GameInfo = window.GameInfo

    export default {
        props: [],

        components: {Title},

        data() {
            return {}
        },

        computed: {
            getImgSrc() {
                return REQ.apiStaticDomain + '/static/img/new/shake.gif'
            }
        },

        mounted() {
            //缓存用户列表
            this.$store.commit("storeUserList", {storeId: GameInfo.storeId})
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            createHandler() {
                this.$router.replace({name:'create'})
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .home {
        @include window;
        position: fixed;
        z-index: 99;

        .penal {
            @include game-panel;
            align-items: center;

            .shake {
                color: #FFFFFF;
                @include font-dpr(40px);
                margin-top: 36px;
            }

            .img {
                @include set-width-height(155px,155px);
                margin: 20px 0;
            }

            .text {
                color: #FFFFFF;
                font-size: 15px;
                margin: 5px;
            }

            .btn-create {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 10%;
                text-align: center;
            }

            .btn-back {
                color: #CD533E;
                width: 50%;
                padding: 10px 0;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 5%;
                background: transparent;
                border: 1px solid #CD533E;
                text-align: center;
                margin-bottom: 30px;
            }
        }
    }

</style>