<template>
    <div class="radio-item">
        <div class="must-cover">
            <span v-if="must" class="must">*</span>
        </div>
        <span class="left">{{left}}</span>
        <div class="right">
            <div>
                <input type="radio" id="yes" name="has" :value="1" checked @change="valueChange">
                <label for="yes">有</label>
            </div>

            <div class="right-radio">
                <input type="radio" id="no" name="has" :value="0" @change="valueChange">
                <label for="no">无</label>
            </div>
        </div>
    </div>
</template>

<script>
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    export default {
        props: ['value', "left", "must"],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE
        },

        methods: {
            valueChange(e) {
                this.$emit(E_INPUT_CHANGE, e.target.value)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../../style/sass/mixin';

    .radio-item {
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
            color: #8d888f;
            @include font-dpr(14px);
            align-items: center;

            .right-radio {
                margin-left: 20%;
            }

            input[type="radio"] + label::before {
                content: "\A0";
                display: inline-block;
                width: 6px;
                height: 6px;
                margin-right: 5px;
                border-radius: 50%;
                border: 1px solid #8d888f;
                padding: 3px;
                margin-bottom: 2px;
                vertical-align: middle;
            }

            input[type="radio"]:checked + label::before {
                background-color: #CD533E;
                background-clip: content-box;
                padding: 3px;
                border: 1px solid #CD533E;
            }

            input[type="radio"] {
                display: none;
            }
        }
    }
</style>