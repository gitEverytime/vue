<template>
    <transition name="modal-fade">
        <div class="modal" v-show="show">
            <div class="panel" @click.stop>
                <h1 class="content">抽奖中</h1>
                <img :src="getImage">
                <h2 class="btn" @click="confirm">停止</h2>
            </div>
        </div>
    </transition>

</template>

<script>
    import REQ from "../common/request"
    export default {
        props: ["show"],

        data() {
            return {}
        },

        computed: {
            getImage() {
                return REQ.apiStaticDomain + '/static/img/public/game/award-head.gif'
            }
        },

        methods: {
            confirm() {
                this.$emit("confirm")
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .modal {
        @include layout-flex-c-center;
        align-items: center;
        position: fixed;
        z-index: 9000;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;

        .panel {
            @include layout-flex-c;
            align-items: center;
            width: 75%;
            border-radius: 5px;
            background: #3b313a;
            padding: 15px 0;
            position: relative;
            margin-bottom: 20%;
            @include box-shadow(0 0 15px #000);

            .content {
                @include font-dpr(14px);
                color: #ccc;
                line-height: 25px;
                text-align: center;
            }

            .btn {
                @include set-h(33px);
                text-align: center;
                border-radius: 4px;
                background: #cd533e;
                color: #f5f5f5;
                @include font-dpr(14px);
                margin: 25px 0 10px 0;
                width: 46%;
            }

            img {
                @include set-width-height(60px, 60px);
                margin: 10px 0;
            }
        }
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease
    }

</style>