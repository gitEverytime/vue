<template>
    <div class="title">
        <span class="back icon icon-arrow-left" @click="leftClickHandler"></span>
        <span>{{title}}</span>
        <span class="right">
            <span v-if="refresh" class="ico icon icon-10-17" @click="refreshClick"></span>
            <span v-if="history" class="ico icon icon-10-18" @click="historyClick"></span>
        </span>
    </div>
</template>

<script>
    export default {
        props: ["title", "refresh", "history"],
        methods: {
            leftClickHandler() {
                this.$emit('leftClick')
            },

            refreshClick() {
                this.$emit('refreshClick')
            },

            historyClick() {
                this.$router.push({name: 'HistoryOrder'})
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .title {
        @include layout-flex-r-center;
        background: rgba(0, 124, 100, 0.9);
        @include set-h(49px);
        @include font-dpr(16px);
        width: 100%;
        color: #f5f5f5;
        align-items: center;
        position: relative;

        .back {
            position: absolute;
            left: 10px;
        }

        .right {
            position: absolute;
            right: 0;
            @include layout-flex-r;

            .ico {
                margin-right: 15px;
            }
        }

    }
</style>