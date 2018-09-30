<template>
    <div class="input-line">
        <span class="must">{{must ? '*' : ''}}</span>
        <span class="text">{{left}}</span>
        <input class="input" :type="type" @input="textChange" ref="input" maxlength="50" :value="value">
    </div>
</template>

<script>
    const E_INPUT_CHANGE = "E_INPUT_CHANGE"
    export default {
        props: ["left", "type", "must", "value"],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE
        },

        mounted() {
            this.addInputListener()
        },

        methods: {
            textChange(e) {
                this.$emit(E_INPUT_CHANGE, e.target.value)
            },

            addInputListener() {
                let input = this.$refs.input
                input.onclick = () => {
                    setTimeout(() => {
                        input.scrollIntoView(false)
                    }, 600)
                }
            }
        },
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .input-line {
        @include layout-flex-r;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        align-items: center;

        .must {
            @include font-dpr(14px);
            color: #8d888f;
            width: 10px;
        }

        .text {
            @include font-dpr(14px);
            color: #8d888f;
            margin-right: 5px;
        }

        .input {
            flex: 1;
            width: 100%;
            @include set-height(36px);
            background: transparent;
            border-radius: 4px;
            color: #8D888F;
            @include font-dpr(14px);
            padding: 0 10px;
            border: 1px solid #635A66;
        }
    }
</style>