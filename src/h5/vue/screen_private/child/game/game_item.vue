<template>
    <div class="game-item" v-on:click="clickItem">
        <img :src="icon" class="img">
        <span class="name">{{name}}</span>
    </div>
</template>

<script>

    const E_CLICK_ITEM = "E_CLICK_ITEM"

    export default {
        props: ["name", "icon", "gameIndex"],

        data() {
            return {}
        },

        methods: {
            clickItem() {
                this.$emit(E_CLICK_ITEM, this.gameIndex)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .game-item {
        @include layout-flex-c;
        align-items: center;
        padding: 10px 0;
    }

    .game-item .img {
        width: 44px;
        height: 44px;
    }

    .game-item .name {
        color: #999;
        width: 85%;
        text-align: center;
        margin-top: 5px;
    }
</style>
