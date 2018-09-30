<template>
    <div class="play bgd bg-private-bg">
        <div class="panel">
            <Title title="真心话大冒险" @leftClick="backHandler"/>
            <Imag :src="getTurnTable" classes="turnTable" />
            <img :src="getArrow" class="arrow" ref="arrow" >
            <div class="btn-cover">
                <span class="btn" v-show="showStart" @click="startGame">开始游戏</span>
                <span class="btn" v-show="showMenu" @click="goToPage(1)">真心话</span>
                <span class="btn" v-show="showMenu" @click="goToPage(2)">大冒险</span>
            </div>
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
            return {
                showStart: true,
                showMenu: false,
            }
        },

        computed: {
            getTurnTable() {
                return REQ.apiStaticDomain + '/static/img/new/zhuanpan.gif.webp'
            },

            getArrow() {
                return REQ.apiStaticDomain + '/static/img/new/zhizhen.png'
            },
        },

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            startGame() {
                this.showStart = false
                const arrow = this.$refs.arrow
                let deg = 0
                let speed = 5
                const timer1 = setInterval(() => {
                    deg += 4
                    arrow.style.transform = `rotate(${deg}deg)`
                }, speed)

                const randomTime = Math.random() * 1080 + 1440
                const timer2 = setTimeout(() => {
                    clearInterval(timer1)
                    clearTimeout(timer2)
                    this.showMenu = true
                }, randomTime)
            },

            goToPage(type) {
                if (type === 1) {
                    this.$router.replace({name: 'Heart'})
                } else {
                    this.$router.replace({name: 'Adventure'})
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .play {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;
            position: relative;

            .turnTable {
                @include set-width-height(240px, 240px);
                position: absolute;
                top: 15%;
                z-index: 0;
            }

            .arrow {
                @include set-width-height(240px, 240px);
                position: absolute;
                top: 15%;
                z-index: 1;
            }

            .btn-cover {
                position: absolute;
                bottom: 40px;
                @include layout-flex-c;
                align-items: center;
                width: 100%;

                .btn {
                    color: #F5F5F5;
                    background: #CD533E;
                    padding: 10px 0;
                    width: 50%;
                    font-size: 15px;
                    border-radius: 5px;
                    text-align: center;
                    margin: 10px 0;
                }
            }
        }
    }

</style>