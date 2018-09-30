<template>
    <div></div>
</template>

<script>
    export default {
        computed: {
            getImageList() {
                const images = this.$store.getters.getPreviewImages
                const data = []
                images.forEach(item => {
                    if (item.slice(-4).toLowerCase() === "webp" && this.isIphone()) {
                        data.push(item.slice(0, -5))
                    } else {
                        data.push(item)
                    }
                })
                return data
            },

            getCurrIndex() {
                return this.$store.getters.getPreviewImageIndex
            }
        },

        mounted() {
            this.$root.notify.$on("ShowImagePreview", () => {
                WeixinJSBridge.invoke('imagePreview',{
                    current: this.getImageList[this.getCurrIndex],
                    urls: this.getImageList
                })
            })
        },

        methods: {
            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

</style>