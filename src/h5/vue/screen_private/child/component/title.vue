<template>
    <div class="title">
        <span v-if="!noLeft" class="back icon icon-arrow-left" @click="leftClickHandler"></span>
        <span>{{title}}</span>
        <span class="right" @click="rightClickHandler">{{right}}</span>
    </div>
</template>

<script>
    const E_LEFT_CLICK = 'E_LEFT_CLICK'
    const E_RIGHT_CLICK = 'E_RIGHT_CLICK'

    export default {
        props: ["title", "left", "right", "noLeft"],
        methods: {
            leftClickHandler() {
                this.$emit(E_LEFT_CLICK)
            },
            rightClickHandler() {
                this.$emit(E_RIGHT_CLICK)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .title {
        @include layout-flex-r-center;
        background: rgba(0, 124, 100, 0.9);
        @include set-h(49px);
        @include font-dpr(16px);
        width: 100%;
        color: #f5f5f5;
        align-items: center;
        position: relative;
    }

    .title .back {
        position: absolute;
        left: 10px;
    }

    .title .right {
        position: absolute;
        right: 10px;
        @include font-dpr(14px);
        color: #ddd;
        min-width: 15px;
        min-height: 15px;
    }
</style>