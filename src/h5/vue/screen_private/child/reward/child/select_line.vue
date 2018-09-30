<template>
    <div class="select-line">
        <div class="select-cover">
            <span class="number">选择数量</span>
            <select class="select" v-on:change="setSelectValue">
                <option v-for="item in 20" :value="item" class="option">{{item}}</option>
            </select>
        </div>
        <div class="sum">
            总计：
            <div class="price">{{getAllMoney}}</div>
            元
        </div>
    </div>

</template>

<script>
    export default {
        props: ["allMoney"],

        data() {
            return {
                selectValue: '1'
            }
        },

        computed: {
            getAllMoney() {
                return Number(this.allMoney).toFixed(2)
            }
        },

        mounted() {
        },

        methods: {
            setSelectValue(e) {
                this.$emit("E_SELECT_VALUE", e.target.value)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .select-line {
        @include layout-flex-r-sb;
        align-items: center;
        height: 40px;
        margin-top: 5px;
    }

    .select-line .select-cover {
        @include layout-flex-r;
        align-items: center;
        width: 100%;
        padding-left: 10px;
    }

    .select-line .select-cover .number {
        margin-right: 10px;
        color: #8d888f;
        @include font-dpr(14px);
    }

    .select-line .select-cover .select {
        height: 25px;
        width: 40%;
        border-radius: 4px;
        border-color: #322831;
        color: #8d888f;
        @include font-dpr(14px);
        background: transparent;

        .option {
            background: transparent;
        }
    }

    .select-line .sum {
        @include layout-flex-r;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        color: #8d888f;
        padding-right: 10px;
        @include font-dpr(13px);
    }

    .select-line .sum .price {
        color: #d8d854;
    }
</style>