<template>
    <transition name="modal-fade">
        <div class="modal" @click="close" v-show="show">
            <div class="panel" @click.stop>
                <h1 class="content">抱歉~本店暂未开通此功能</h1>
                <h2 class="btn" @click="close">知道了</h2>
            </div>
        </div>
    </transition>

</template>

<script>
    export default {
        props: ["show"],
        methods: {
            close() {
                this.$emit("close")
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

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
                color: #ccc;
                @include font-dpr(14px);
                margin: 20px 0 10px 0;
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