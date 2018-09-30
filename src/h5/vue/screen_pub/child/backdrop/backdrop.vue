<template>
    <div class="backdrop">
        <div
                v-if="type === 'color'"
                class="color-content"
        >
            <div class=""
                 v-for="(item,index) in newArray"
                 :style="{background: item}"
                 v-show="index === key"
            >

            </div>
        </div>

        <div v-if="type === 'picture'" class="img-content">
            <img
                    v-for="(item,index) in newArray"
                    :src="item ? item : imgSrc"
                    v-show="index === key"
            >
        </div>

        <div v-if="type === 'video'" class="video-content">
            <video
                    v-for="(item,index) in newArray"
                    :src="item ? item : videoSrc" autoplay
                    loop
                    preload="auto"
                    v-show="index === key"
                    muted
            ></video>

        </div>
    </div>

</template>

<script>
    export default {
        props: ["type", "bg"],

        data() {
            return {
                videoSrc: '',
                imgSrc: '',
                bgColor: '#000',
                newArray:[],
                key: 0
            }
        },

        watch: {
            bg() {
                if (!this.type || !this.bg) return
                this.formatData()
            }
        },

        computed: {},

        mounted() {
        },

        methods: {
            formatData() {
                let vm = this;
                const length = Object.keys(vm.bg).filter(item => item.startsWith('val')).length;
                if (!length) return;
                for (let i=1; i<=4; i++){
                    if(vm.bg[`val${i}`] && vm.bg[`val${i}`]!==""){
                        vm.newArray.push(vm.bg[`val${i}`]);
                    }
                }
                let j = 0;
                // //循环轮播
                vm.timer = setInterval(() => {
                    j++;
                    if (j === vm.newArray.length) j = 0;
                    vm.key = j
                }, 1000 * vm.bg.time)
            },
        },

        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .backdrop {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right:0;
        bottom: 0;
        z-index: -99;
        background-color: #000000;
        .color-content {
            width: 100%;
            height: 100%;
            div{
                width: 100%;
                height: 100%;
                /*background-color: #000000;*/
            }
        }

        .img-content {
            width: 100%;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: 100%;
            }
        }

        .video-content {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
            video {
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }
    }
</style>