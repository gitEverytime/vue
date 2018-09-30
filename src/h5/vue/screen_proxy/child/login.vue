<template>
    <div class="login">
        <div class="panel">
            <Title title="登录毕果"/>
            <div class="content">
                <InputItem style="margin-top: 50px" left="手机号码" type="number" v-model="phone" placeholder="输入手机号"
                           :must="false" :maxlength="20"/>
                <InputItem style="margin-top: 15px" left="登录密码" type="password" v-model="password" placeholder="输入密码"
                           :must="false" :maxlength="20"/>
                <Button style="margin-top: 20px" text="登录" @click="loginHandler"/>
            </div>
        </div>
    </div>

</template>

<script>
    import Title from './component/title.vue'
    import InputItem from './component/input_item.vue'
    import Button from './component/button.vue'
    import REQ from '../common/request'
    import base64 from '../common/base64'

    export default {
        props: [],

        components: {Title, InputItem, Button},

        data() {
            return {
                phone: '',
                password: ''
            }
        },

        computed: {},

        mounted() {
        },

        methods: {
            loginHandler() {
                let message = this.validateData()
                if (message) {
                    this.$toast.center(message)
                    return
                }
                const params = {
                    phone: this.phone,
                    pwd: base64.encode(this.password),
                }
                REQ.proxyLogin(params,
                    (res) => {
                        const data = res.data
                        if (data.status == 1 && (data.applyType == 200 || data.applyType == 201)) {
                            this.$router.replace({name: 'storeList'})
                        } else {
                            this.$toast.center('身份不符，无法登录')
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                    }
                )
            },

            validateData() {
                let message = ''
                let validate = {
                    phone: {msg: '请填写手机号码', msg1: "请正确填写手机号码", reg: /^[1][3,4,5,7,8,9]\d{9}$/},
                    password: {msg: '请填写密码', msg1: "密码为6~20位字母数字组合", reg: /^[a-zA-Z]([a-zA-Z0-9]{5,19})$/},
                }
                Object.keys(validate).some(key => {
                    if (!this[key].trim()) {
                        message = validate[key].msg
                        return true
                    } else if (validate[key].reg && !validate[key].reg.test(this[key])) {
                        message = validate[key].msg1
                        return true
                    }
                })
                return message
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../style/sass/mixin.scss';

    .login {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;
            }
        }
    }
</style>