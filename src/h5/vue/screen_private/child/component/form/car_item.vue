<template>
    <div class="select-item">
        <div class="must-cover">
        </div>
        <span class="left">{{left}}</span>
        <div class="right">
            <select @change="selectBrand" :disabled="disabled">
                <option disabled selected>品牌</option>
                <option v-for="(item, key) in data" :value="key">{{item.brand}}</option>
            </select>
            <select @change="selectModel" :disabled="disabled" ref="model" class="right-option">
                <option disabled selected value="0">型号</option>
                <option v-for="item in models" :value="item">{{item}}</option>
            </select>
        </div>
    </div>

</template>

<script>
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    import carData from '../../../comm/carData'

    export default {
        props: ['value', "left", "disabled"],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE
        },

        data() {
            return {
                data: carData,
                models: [],
            }
        },

        mounted() {

        },

        methods: {
            selectBrand(e) {
                this.$refs.model.value = '0'
                this.models = this.data[e.target.value].models
                this.value.carBrand = this.data[e.target.value].brand
                this.value.carModel = ''
                this.$emit(E_INPUT_CHANGE, this.value)
            },

            selectModel(e) {
                this.value.carModel = e.target.value
                this.$emit(E_INPUT_CHANGE, this.value)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../../style/sass/mixin';

    .select-item {
        margin: 0 20px;
        @include set-height(50px);
        @include placeholder(#635c66, 14px);
        @include layout-flex-r;
        align-items: center;

        .must-cover {
            width: 10px;

            .must {
                color: #d8d854;
                @include font-dpr(16px);
            }
        }

        .left {
            flex: 2;
            color: #8d888f;
            @include font-dpr(14px);
        }

        .right {
            flex: 7;
            @include layout-flex;

            select {
                width: 50%;
                padding: 5px;
                color: #8d888f;
                @include font-dpr(14px);
                border: 1px solid #635a66;
                border-radius: 3px;
                @include set-h(37px);
                background: transparent;
            }

            .right-option {
                margin-left: 10px;
            }
        }
    }
</style>