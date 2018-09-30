<template>
    <div class="bottom-bar">
        <div class="title">&copy;big2018-2020 毕果科技</div>
    </div>
</template>

<script>
    export default {
        props: [],

        data() {
            return {}
        },

        computed: {},

        mounted() {
        },

        methods: {}
    }
</script>

<style lang='scss' scoped>
    @import '../../../../style/sass/mixin';

    .bottom-bar {
        @include layout-flex-r-center;
        width: 100%;
    }

    .bottom-bar .title {
        margin: 5px;
        color: #aaa;
        @include font-dpr(10px)
    }

</style>