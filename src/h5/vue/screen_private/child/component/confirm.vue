<template>
    <transition name="modal-fade">
        <div class="confirm" @click="close" v-show="show">
            <div class="panel" @click.stop>
                <span class="ico icon" :class="getIcon"></span>
                <span class="close icon icon-close-on" @click="close"></span>
                <h1 class="content" v-for="item in content">{{item}}</h1>
                <div class="btn-cover">
                    <h2 class="cancel" @click="close">{{cancelText}}</h2>
                    <h2 class="btn" @click="confirm">{{confirmText}}</h2>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
    export default {
        props: ["type", "content", "confirmText", "cancelText", "show"],

        data() {
            return {}
        },

        computed: {
            getIcon() {
                const icons = {
                    music: 'icon-modal-music',
                }
                return icons[this.type]
            }
        },

        methods: {
            close() {
                this.$emit("close")
            },

            confirm() {
                this.$emit("confirm", this.type)
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .confirm {
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

            .ico {
                margin-bottom: 15px;
            }

            .close {
                position: absolute;
                top: 10px;
                right: 10px;
            }

            .content {
                @include font-dpr(14px);
                color: #ccc;
                line-height: 25px;
                text-align: center;
            }

            .btn-cover {
                @include layout-flex-r-sb;
                margin: 25px 0 10px 0;
                width: 84%;

                .cancel {
                    @include set-h(31px);
                    text-align: center;
                    border-radius: 4px;
                    border:1px solid #cd533e;
                    color: #cd533e;
                    @include font-dpr(14px);
                    width: 45%;
                }

                .btn {
                    @include set-h(33px);
                    text-align: center;
                    border-radius: 4px;
                    background: #cd533e;
                    color: #f5f5f5;
                    @include font-dpr(14px);
                    width: 45%;
                }
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