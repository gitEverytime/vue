<template>
    <div class="verification-item">
        <div class="must-cover">
            <span v-if="must" class="must">*</span>
        </div>
        <span class="left">{{left}}</span>

        <div class="right">
            <input ref="input" class="input" type="text" :value="value" @input="inputChange" :placeholder="placeholder" maxlength="10">
            <div class="btn-cover" @click="send">
                <span style="width: 10px"></span>
                <span class="btn" :class="canSend ? '' : 'no-send'">{{btn}}</span>
            </div>
        </div>
    </div>

</template>

<script>
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    export default {
        props: ['value', 'must', "left", "placeholder"],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE,
        },

        data() {
            return {
                btn: '发送',
                canSend: true,
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
        },

        methods: {
            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },

            inputChange(e) {
                this.$emit(E_INPUT_CHANGE, e.target.value)
            },

            send() {
                if (!this.canSend) {
                    return
                } else {
                    this.canSend = false
                    let count = 60
                    this.btn = count + 's'
                    let timer = setInterval(() => {
                        count--
                        this.btn = count + 's'
                        if (count === 0) {
                            clearInterval(timer)
                            this.btn = '发送'
                            this.canSend = true
                        }
                    }, 1000)
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../../style/sass/mixin';

    .verification-item {
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
            @include layout-flex-r;

            .input {
                flex: 5;
                padding: 5px;
                color: #8d888f;
                @include font-dpr(14px);
                border: 1px solid #635a66;
                border-radius: 3px;
                @include set-h(25px);
                background: transparent;
                width: 100%;
                position: relative;
                left: -1px;
            }

            .btn-cover {
                flex: 3;
                @include layout-flex-r;

                .btn {
                    flex: 1;
                    border-radius: 4px;
                    background: #cd533e;
                    color: #fff;
                    @include set-h(37px);
                    @include font-dpr(14px);
                    text-align: center;
                }

                .no-send {
                    background: #3b313a;
                    color: #8d888f;
                }
            }
        }
    }
</style>