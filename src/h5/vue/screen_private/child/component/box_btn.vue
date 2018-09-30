<template>
    <h1 class="box-btn" @click="clickHandler">{{text}}</h1>
</template>

<script>
    export default {

        data() {
            return {
                canPress: true
            }
        },

        props: ["text"],

        methods: {
            clickHandler() {
                if (this.canPress) {
                    this.$emit('click')
                    this.canPress = false
                    const timer = setTimeout(() => {
                        this.canPress = true
                        clearTimeout(timer)
                    }, 800)
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .box-btn {
        @include set-h(35px);
        text-align: center;
        border-radius: 4px;
        background: #cd533e;
        color: #f5f5f5;
        @include font-dpr(15px);
        margin: 10px;
    }
</style>