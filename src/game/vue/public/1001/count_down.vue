<template>
    <div class="count-down">
        <div class="count">{{time}}</div>
    </div>

</template>

<script>
    export default {
        props: [],

        data() {
            return {
                time: 5,

            }
        },

        computed: {},

        mounted() {
            this.timer = setInterval(() => {
                this.time--
                if (this.time === 0) {
                    clearInterval(this.timer)
                    window.location.href = '#/progress'
                }
            }, 1000)
        },

        methods: {}
    }
</script>

<style lang='scss' scoped>
    @import '../../../../style/sass/mixin';

    .count-down {
        @include layout-flex-c-center;
        align-items: center;
        height: 100%;
    }

    .count-down .count {
        font-size: 120px;
        color: #aaa;
        border: 5px solid;
        border-radius: 50%;
        width: 130px;
        height: 130px;
        text-align: center;
    }

</style>