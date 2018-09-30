<template>
    <transition name="modal-fade">
        <div class="modal" @click="close" v-show="show">
            <div class="panel" @click.stop>
                <span class="close icon icon-close-on" @click="close"></span>
                <h1 class="content">选择支付方式</h1>
                <div class="line" @click="selectPayWay(2)">
                    <span class="icon" :class="payWay === 2 ? 'icon-11-3' : 'icon-11-4' "></span>
                    <span class="text" :class="{'active': payWay === 2}">前台支付</span>
                </div>
                <div class="line" @click="selectPayWay(1)">
                    <span class="icon" :class="payWay === 1 ? 'icon-11-3' : 'icon-11-4' "></span>
                    <span class="text" :class="{'active': payWay === 1}">微信支付</span>
                </div>
                <h2 class="btn" @click="confirm">确认</h2>
            </div>
        </div>
    </transition>

</template>

<script>
    import REQ from '../../../comm/request'

    const roomInfo = window.RINFO

    export default {
        props: ["show"],

        data() {
            return {
                payWay: 1, // 1：微信支付 2：前台支付
            }
        },

        computed: {},

        mounted() {
        },

        methods: {
            close() {
                this.$emit("close")
            },

            selectPayWay(way) {
                this.payWay = way
            },

            confirm() {
                this.$emit("confirm", this.payWay)
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

            .close {
                position: absolute;
                top: 10px;
                right: 10px;
            }

            .content {
                @include font-dpr(15px);
                color: #01b695;
                line-height: 25px;
                text-align: center;
            }

            .line {
                @include layout-flex-r-center;
                align-items: center;
                margin-top: 25px;

                .text {
                    color: #8D888F;
                    margin-left: 5px;
                    @include font-dpr(15px);
                }

                .active {
                    color: #01b695;
                }
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