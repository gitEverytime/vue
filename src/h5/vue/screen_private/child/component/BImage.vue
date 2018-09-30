<template>
    <div class="b-image" :style="getBackground">

    </div>
</template>

<script>
    export default {
        props: ["src"],

        data() {
            return {}
        },

        computed: {
            getSrc() {
                if (!this.src) {
                    return ''
                }
                if (this.src.slice(-4).toLowerCase() !== "webp"){
                    return this.src
                } else if (this.isIphone()) {
                    return this.src.slice(0, -5)
                } else {
                    return this.src
                }
            },

            getBackground() {
                return {
                    backgroundImage: `url(${this.getSrc})`,
                    backgroundSize: 'cover',
                    backgroundPositionY: '30%',
                    backgroundPositionX: '30%',
                }
            }
        },

        mounted() {
        },

        methods: {
            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .b-image {

    }
</style>