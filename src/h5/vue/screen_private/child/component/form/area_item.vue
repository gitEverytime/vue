<template>
    <div class="area-item">
        <div class="must-cover">
            <span v-if="must" class="must">*</span>
        </div>
        <span class="left">{{left}}</span>
        <div class="right">
            <textarea ref="input" class="input" :value="value" @input="inputChange" :placeholder="placeholder"
                      maxlength="200"/>
        </div>
    </div>

</template>

<script>
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    export default {
        props: ['value', 'must', "left", "placeholder"],

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
    @import '../../../../../../style/sass/mixin';

    .area-item {
        margin: 0 20px;
        @include set-height(100px);
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
            margin-bottom: 55px;
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
                @include set-height(75px);
                background: transparent;
                resize: none;
            }
        }
    }
</style>