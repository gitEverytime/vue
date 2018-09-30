<template>
    <div class="select-item">
        <div class="must-cover">
            <span v-if="must" class="must">*</span>
        </div>
        <span class="left">{{left}}</span>
        <div class="right">
            <select @change="selectValue" class="input">
                <option v-for="item in data" :key="item.key" :value="item.value">{{item.name}}</option>
            </select>
        </div>
    </div>

</template>

<script>
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    export default {
        props: ['value', 'must', "left", "data"],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE
        },

        methods: {
            selectValue(e) {
                this.$emit(E_INPUT_CHANGE, e.target.value)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../style/sass/mixin';

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

            .input {
                flex: 1;
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