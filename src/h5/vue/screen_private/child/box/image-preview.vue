<template>
    <transition name="modal-fade">
        <div class="modal" @click="close" v-show="show" ref="modal">
            <Imag v-for="(item, index) in getImageList" classes="img animated fadeIn" v-if="index == getCurrIndex"
                  :src="item" :key="Date.now() * Math.random()"/>
            <span class="count">{{getCurrIndex + 1}}/{{getImageList.length}}</span>
        </div>
    </transition>

</template>

<script>
    import Imag from '../component/Image.vue'
    import Hammer from 'hammerjs'

    export default {
        props: ["show"],

        components: {Imag},

        computed: {
            getImageList() {
                return this.$store.getters.getPreviewImages
            },

            getCurrIndex() {
                return this.$store.getters.getPreviewImageIndex
            }
        },

        mounted() {
            this.addSwipeListener()
        },

        methods: {
            close() {
                this.$emit("close")
            },

            addSwipeListener() {
                const modal = this.$refs.modal
                let hammer = new Hammer(modal)
                hammer.on("swipe", (e) => {
                    if (e.direction === Hammer.DIRECTION_LEFT) {
                        if (this.getCurrIndex === this.getImageList.length - 1) {
                            this.$store.commit('storePreviewImageIndex', 0)
                        } else {
                            this.$store.commit('storePreviewImageIndex', this.getCurrIndex + 1)
                        }
                    } else if (e.direction === Hammer.DIRECTION_RIGHT) {
                        if (this.getCurrIndex === 0) {
                            this.$store.commit('storePreviewImageIndex', this.getImageList.length - 1)
                        } else {
                            this.$store.commit('storePreviewImageIndex', this.getCurrIndex - 1)
                        }
                    }
                })
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .modal {
        @include layout-flex-c-center;
        align-items: center;
        position: fixed;
        z-index: 9000;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;

        .img {
            max-width: 100%;
            max-height: 100%;
            min-width: 50%;
            min-height: 50%;
        }

        .count {
            @include font-dpr(18px);
            color: #F5F5F5;
            text-shadow: (0 0 5px #000);
            width: 100%;
            text-align: center;
            position: absolute;
            bottom: 20px;
        }

        .animated {
            -webkit-animation-duration: 0.5s;
            animation-duration: 0.5s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }

        @-webkit-keyframes fadeIn {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        .fadeIn {
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
        }
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .2s ease
    }

</style>