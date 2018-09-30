<template>
    <img :src="getSrc" :class="classes">
</template>

<script>
    export default {
        props: ['src', 'classes'],

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
            }
        },

        methods: {
            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            }
        }
    }
</script>

<style lang='scss' scoped>

</style>