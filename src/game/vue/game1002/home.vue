<template>
    <div class="home bgd bg-private-bg">
        <div class="panel">
            <Title title="幸运抽奖" @leftClick="backHandler"/>
            <span class="name">幸运大抽奖</span>
            <img :src="getImgSrc" class="image">
            <span class="text">~准备好现场互动~</span>
            <span class="btn-create" v-on:click="createHandler">创建活动</span>
            <span class="btn-back" v-on:click="backHandler">返回</span>
            <img src="http://log.ibigtop.com/log/1/2" style="width: 1px; height: 1px; position: absolute">
        </div>
    </div>

</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'

    export default {
        props: [],

        components: {Title},

        data() {
            return {}
        },

        computed: {
            getImgSrc() {
                return REQ.apiStaticDomain + '/static/img/new/turntable.gif'
            }
        },

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },
            createHandler() {
                this.$router.replace({name: 'Create'})
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .home {
        @include window;
        z-index: 99;

        .panel {
            @include game-panel;
            align-items: center;

            .name {
                color: white;
                @include font-dpr(30px);
                margin-top: 10%;
            }

            .image {
                @include set-width-height(180px, 180px)
                margin-top: 10%;
            }

            .text {
                @include font-dpr(15px);
                color: #8d888f;
                margin-top: 10%;
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
            }
        }
    }

</style>