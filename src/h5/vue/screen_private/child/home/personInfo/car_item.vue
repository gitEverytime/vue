<template>
    <div class="car-item">
        <span class="left">{{left}}</span>
        <div class="right">
            <select @change="selectBrand" ref="brand">
                <option disabled selected>品牌</option>
                <option v-for="(item, key) in data" :value="key">{{item.brand}}</option>
            </select>
            <div style="width: 1px; height: 50px; background: #221821"></div>
            <select @change="selectModel" ref="model" style="padding-left: 5px">
                <option disabled selected value="0">型号</option>
                <option v-for="item in models" :value="item">{{item}}</option>
            </select>
        </div>
    </div>

</template>

<script>
    import carData from '../../../comm/carData'
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    export default {
        props: ['value', "left"],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE,
        },

        data() {
            return {
                data: carData,
                models: [],
            }
        },

        mounted() {
            this.data.forEach((item, key) => {
                if (item.brand === this.value.carBrand) {
                    this.$refs.brand.value = key
                    this.models = this.data[key].models
                    setTimeout(() => {
                        this.$refs.model.value = this.value.carModel
                    })
                }
            })

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

    .car-item {
        @include layout-flex-r;
        background: #322831;
        height: 50px;
        padding: 0 15px;
        align-items: center;

        .left {
            flex: 2;
            color: #8d888f;
            @include font-dpr(15px);
            padding-top: 1px;
        }

        .right {
            flex: 7;
            @include layout-flex;
            align-items: center;

            select {
                width: 50%;
                color: #ccc;
                @include font-dpr(15px);
                border: 0 solid transparent;
                @include set-h(20px);
                background: transparent;
            }
        }
    }
</style>