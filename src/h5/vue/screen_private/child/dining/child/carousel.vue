<template>
    <div class="carousel" ref="carousel">
        <Imag v-for="item in data" :src="item.src" v-if="currIndex === item.key" :key="item.key"/>
        <div class="point-line">
            <span v-for="n in data.length" class="point" :class="{'active' : n === currIndex}"
                  @click="selectIndex(n)">●</span>
        </div>
    </div>
</template>

<script>
    import Hammer from "hammerjs"
    import Imag from "../../component/Image.vue"

    export default {
        props: ['data'],

        components: {Imag},

        data() {
            return {
                currIndex: 1,
            }
        },

        computed: {},

        mounted() {
            this.addTimer()
            this.addSwipeListener()
        },

        beforeDestroy() {
            clearInterval(this.timer)
        },

        methods: {
            selectIndex(n) {
                this.currIndex = n
            },

            addTimer() {
                this.timer = setInterval(() => {
                    this.currIndex++
                    if (this.currIndex > this.data.length) {
                        this.currIndex = 1
                    }
                }, 3000)
            },

            addSwipeListener() {
                const carousel = this.$refs.carousel
                let hammer = new Hammer(carousel)
                hammer.on("swipe", (e) => {
                    if (e.direction === Hammer.DIRECTION_LEFT) {
                        if (this.currIndex === this.data.length) {
                            return
                        }
                        this.selectIndex(this.currIndex + 1)
                    } else if (e.direction === Hammer.DIRECTION_RIGHT) {
                        if (this.currIndex === 1) {
                            return
                        }
                        this.selectIndex(this.currIndex - 1)
                    }
                    return
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../../style/sass/mixin';

    .carousel {
        margin: 10px;
        @include set-height(150px);
        position: relative;

        img {
            width: 100%;
            height: 100%;
        }

        .point-line {
            width: 100%;
            @include layout-flex-r-center;
            align-items: center;
            position: absolute;
            bottom: 5px;

            .point {
                color: #EEEEEE;
                @include font-dpr(15px);
                text-align: center;
                margin: 0 5px;
            }

            .active {
                color: #01B695;
            }
        }
    }
</style>