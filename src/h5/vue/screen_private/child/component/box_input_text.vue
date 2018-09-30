<template>
    <div class="box-input-text"  :style="{background: bgColor}">
        <textarea class="area" :value="value" maxlength="50" :placeholder="placeholder" ref="input"
                  @input="textChange" rows="2"></textarea>
    </div>

</template>

<script>
    import MsgType from '../../comm/msg_type'

    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'

    export default {
        props: ["value", "placeholder", "bgColor"],

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
                    this.$store.commit("storeFootMenuShow", false)
                    if (!this.isIphone()) {
                        setTimeout(() => {
                            input.scrollIntoView(false)
                        }, 600)
                    }
                }
                input.onblur = () => {
                    this.$store.commit("storeFootMenuShow", true)
                }
            },

            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .box-input-text {
        @include layout-flex-r-center;
        align-items: center;
        background: #251a24;
        margin: 0 10px;
        border-radius: 4px;
        border: 1px solid #322831;
        @include placeholder(#8d888f, 14px);
        height: 52px;

        .area {
            flex: 1;
            resize: none;
            background: transparent;
            @include font-dpr(14px);
            color: #8d888f;
            border-color: transparent;
            padding: 8px;
            line-height: 20px;
        }
    }
</style>
