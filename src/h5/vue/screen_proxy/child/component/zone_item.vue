<template>
    <div class="zone-item">
        <div class="must-cover">
            <span v-if="must" class="must">*</span>
        </div>
        <span class="left">{{left}}</span>
        <div class="right">
            <select @change="selectProvince" class="input" :value="province" ref="province">
                <option v-for="(item, key) in provinceData" :value="key">{{item.label}}</option>
            </select>
            <span style="width: 5px"/>
            <select @change="selectCity" class="input" :value="city">
                <option v-for="(item, key) in cityData" :value="key">{{item.label}}</option>
            </select>
            <span style="width: 5px"/>
            <select @change="selectDistrict" class="input" :value="district">
                <option v-for="(item, key) in districtData" :value="key">{{item.label}}</option>
            </select>

        </div>
    </div>

</template>

<script>
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    import {regionData} from 'element-china-area-data'

    export default {
        props: ['value', 'must', "left", "placeholder", "type"],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE
        },

        data() {
            return {
                provinceData: [],
                cityData: [],
                districtData: [],
                province: 0,
                city: 0,
                district: 0,
            }
        },

        mounted() {
            this.initData()
        },

        methods: {
            initData() {
                this.provinceData = regionData
                this.cityData = this.provinceData[0].children
                this.districtData = this.cityData[0].children
                this.value.province = this.provinceData[0].value
                this.value.city = this.cityData[0].value
                this.value.district = this.districtData[0].value
                this.$emit(E_INPUT_CHANGE, this.value)
            },

            selectProvince(e) {
                const key = e.target.value
                this.province = key
                this.city = 0
                this.district = 0
                this.cityData = this.provinceData[key].children
                this.districtData = this.cityData[0].children
                this.value.province = this.provinceData[key].value
                this.value.city = this.cityData[0].value
                this.value.district = this.districtData[0].value
                this.$emit(E_INPUT_CHANGE, this.value)
            },

            selectCity(e) {
                const key = e.target.value
                this.city = key
                this.district = 0
                this.districtData = this.cityData[key].children
                this.value.city = this.cityData[key].value
                this.value.district = this.districtData[0].value
                this.$emit(E_INPUT_CHANGE, this.value)
            },

            selectDistrict(e) {
                const key = e.target.value
                this.district = key
                this.value.district = this.districtData[key].value
                this.$emit(E_INPUT_CHANGE, this.value)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../style/sass/mixin';

    .zone-item {
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

            .input {
                flex: 1;
                width: 100%;
                padding: 5px;
                color: #8d888f;
                @include font-dpr(14px);
                border: 1px solid #635a66;
                border-radius: 3px;
                @include set-h(37px);
                background: transparent;
            }
        }
    }
</style>