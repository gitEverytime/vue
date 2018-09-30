<template>
    <transition name="toast">
        <div class="toast-info" v-show="show">
            <Imag :src="info.headImage" classes="avatar"/>
            <span class="message">{{info.nickname}}：{{info.carteName}}{{info.countChange > 0 ? '+1' : '-1'}}</span>
        </div>
    </transition>


</template>

<script>
    import Imag from "../component/Image.vue"
    export default {
        props: ["show", "info"],

        components: {Imag},

        data() {
            return {}
        },

        computed: {},

        mounted() {
        },

        methods: {}
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../style/sass/mixin';

    .toast-info {
        @include set-height(44px);
        position: fixed;
        left: 10px;
        bottom: 60px;
        z-index: 9999;
        @include layout-flex-r;
        align-items: center;

        .avatar {
            @include set-width-height(44px, 44px);
            border-radius: 50%;
            position: absolute;
            z-index: 9;
        }

        .message {
            @include set-h(29px);
            @include font-dpr(14px);
            color: #eeeeee;
            background: #007C64;
            border-radius: 0 15px 15px 0;
            margin-left: 35px;
            padding-left: 18px;
            padding-right: 15px;
        }
    }

    .toast-enter,
    .toast-leave-active {
        opacity: 0;
    }

    .toast-enter-active,
    .toast-leave-active {
        transition: opacity .5s ease;
    }

</style>