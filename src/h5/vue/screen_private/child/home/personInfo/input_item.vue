<template>
    <div class="input-item">
        <span class="left">{{left}}</span>
        <div class="right">
            <div ref="input" class="input" @input="inputChange" contenteditable="true"></div>
        </div>
    </div>

</template>

<script>
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    export default {
        props: ['value', "left"],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE,
        },

        data() {
            return {
                init: false
            }
        },

        watch: {
            value() {
                if (!this.init) {
                    let input = this.$refs.input
                    input.innerText = this.value
                    this.init = true
                }
            }
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

            let timer = setTimeout(() => {
                this.init = true
                clearTimeout(timer)
            }, 1000)
        },

        methods: {
            inputChange(e) {
                this.$emit(E_INPUT_CHANGE, e.target.innerText.trim())
            },

            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../../style/sass/mixin';

    .input-item {
        @include layout-flex-r;
        background: #322831;
        padding: 15px;
        margin-bottom: 1px;

        .left {
            flex: 2;
            color: #8d888f;
            @include font-dpr(15px);
        }

        .right {
            flex: 7;
            @include layout-flex;

            .input {
                flex: 1;
                color: #ccc;
                @include font-dpr(15px);
                border: 0 solid transparent;
                background: transparent;
                width: 100%;
                overflow-y: visible;
                word-wrap: break-word;
                word-break: break-all;
            }
        }
    }
</style>