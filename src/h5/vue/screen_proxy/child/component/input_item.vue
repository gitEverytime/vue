<template>
    <div class="input-item">
        <div class="must-cover">
            <span v-if="must" class="must">*</span>
        </div>
        <span class="left">{{left}}</span>
        <div class="right">
            <input ref="input" class="input" :type="type" :value="value" @input="inputChange" :placeholder="placeholder"
                   :maxlength="maxlength" :disabled="disabled">
        </div>
    </div>

</template>

<script>
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    export default {
        props: ['value', 'must', "left", "placeholder", "type", "maxlength", 'disabled'],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE
        },

        mounted() {
            if (!this.isIphone()) {
                let input = this.$refs.input
                input.onclick = () => {
                    setTimeout(() => {
                        input.scrollIntoView(false)
                    }, 600)
                }
            }
        },

        methods: {
            inputChange(e) {
                this.$emit(E_INPUT_CHANGE, e.target.value)
            },

            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../style/sass/mixin';

    .input-item {
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
                @include set-h(25px);
                background: transparent;
            }
        }
    }
</style>