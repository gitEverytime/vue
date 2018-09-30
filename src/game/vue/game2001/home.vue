<template>
    <div class="home bgd bg-private-bg">
        <div class="panel">
            <Title title="真心话大冒险" @leftClick="backHandler"/>
            <Imag :src="getImgSrc" classes="image"/>
            <span class="rule">游戏规则</span>
            <span class="text">游戏开始后会出现轮盘，把手机平放在桌子上，点击开始, 指针停在谁的位置，谁选择真心话或大冒险。</span>
            <span class="text">完成真心话或大冒险后，点击完成，则顺时针下一个人。过题仅且有一次机会，用完必须答题或接受惩罚。</span>
            <span class="btn-create" v-on:click="createHandler">准备开始</span>
        </div>
    </div>

</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'
    import Imag from '../component/Image.vue'

    export default {
        props: [],

        components: {Title, Imag},

        data() {
            return {}
        },

        computed: {
            getImgSrc() {
                return REQ.apiStaticDomain + '/static/img/new/realheart.png.webp'
            },
        },

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            createHandler() {
                this.$router.replace({name: 'Play'})
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

            .image {
                @include set-width-height(180px, 180px);
               margin: 30px 0;
            }

            .rule {
                color: #CDCDCD;
                @include font-dpr(16px);
                font-weight: bold;
                margin-bottom: 20px;
            }

            .text {
                @include font-dpr(15px);
                color: #8d888f;
                padding: 0 30px;
                text-indent: 20px;
            }

            .btn-create {
                color: #F5F5F5;
                background: #CD533E;
                padding: 10px 0;
                width: 50%;
                font-size: 15px;
                border-radius: 5px;
                margin-top: 30px;
                text-align: center;
            }
        }
    }

</style>