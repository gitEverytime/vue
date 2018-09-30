<template>
    <div class="right-bar">
        <img class="horn"
             src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526708844176&di=0849a3a385238678b611aa9e05c9f839&imgtype=0&src=http%3A%2F%2Fpic.nipic.com%2F2007-07-10%2F2007710215138694_2.jpg">
        <img class="qr"
             src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526708651929&di=ce1af3e20859a7db9cabec0b64878790&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fapp%2Ficon%2F20151117%2F1447716445342540.jpg">
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

    .right-bar {
        @include layout-flex-c-sb;
        height: 100%;
    }

    .right-bar .horn {
        width: 40px;
        height: 40px;
        margin: 20px 10px;
    }

    .right-bar .qr {
        width: 40px;
        height: 40px;
        margin: 20px 10px;
    }
</style>