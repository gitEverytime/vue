<template>
    <div class="register">
        <div class="panel">
            <TempTitle :title="'果宝注册'" @E_LEFT_CLICK="backHandler"/>
            <div class="content">
                <InputItem :left="'手机号码'" :must="true" type="number" v-model="phone" :placeholder="'手机号码不公开'" class="first"/>
                <InputItem :left="'微信账号'" :must="true" v-model="wechat" :placeholder="'微信账号'"/>
                <InputItem :left="'喜欢菜品'" :must="false" v-model="favorFood" :placeholder="'多个菜品用逗号隔开'"/>
                <InputItem :left="'喜欢酒水'" :must="false" v-model="favorDrink" :placeholder="'多个酒水用逗号隔开'"/>
                <InputItem :left="'我的爱好'" :must="false" v-model="hobby" :placeholder="'多个爱好用逗号隔开'"/>
                <RadioItem :left="'有无座驾'" v-model="hasCar"/>
                <CarItem :left="'座驾信息'" v-model="carInfo" :disabled="this.hasCar == '0'"></CarItem>
                <InputItem :left="'喜欢品牌'" :must="false" v-model="favorBrand" :placeholder="'多个品牌用逗号隔开'"/>
                <AreaItem :left="'置顶铭言'" :must="false" v-model="motto" :placeholder="mottoPlaceholder"/>
                <TempBtn text="确认提交" @click.native="submitHandler" class="btn"></TempBtn>
            </div>
        </div>
    </div>
</template>

<script>
    import TempTitle from '../../component/title.vue'
    import InputItem from '../../component/form/input_item.vue'
    import RadioItem from '../../component/form/radio_item.vue'
    import CarItem from '../../component/form/car_item.vue'
    import AreaItem from '../../component/form/area_item.vue'
    import REQ from '../../../comm/request'
    import TempBtn from '../../component/button.vue'
    import filterXss from '../../../comm/filterXss'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {TempTitle, InputItem, RadioItem, CarItem, AreaItem, TempBtn},
        data() {
            return {
                phone: '',
                wechat: '',
                favorFood: '',
                favorDrink: '',
                hobby: '',
                hasCar: '1',
                carInfo: {
                    carBrand: '',
                    carModel: '',
                },
                favorBrand: '',
                motto: '',
                mottoPlaceholder: '个性签名，请填写符合国家法律规定的信息，并且内容积极向上，否则会被永久封号。'
            }
        },

        computed: {},

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            submitHandler() {
                let message = this.validateData()
                if (message) {
                    this.$toast.center(message)
                    return
                }
                const data = {
                    cid: roomInfo.clientId,
                    phone: this.phone,
                    wechat: filterXss(this.wechat.trim()),
                    favorFood: filterXss(this.favorFood),
                    favorDrink: filterXss(this.favorDrink),
                    hobby: filterXss(this.hobby),
                    hasCar: this.hasCar,
                    carBrand: this.carInfo.carBrand,
                    carModel: this.carInfo.carModel,
                    favorBrand: filterXss(this.favorBrand),
                    motto: filterXss(this.motto)
                }
                REQ.reqClientRegister(data,
                    (response) => {
                        console.log("用户注册", response)
                        this.$toast.center('注册成功')
                        this.$router.replace({
                            name: 'home',
                            params: {index: 1}
                        })
                    },
                    (complete) => {
                    },
                    (err) => {
                        console.error(err)
                    })
            },

            validateData() {
                let message = ''
                let validate = {
                    phone: {msg: '请填写手机号码', msg1: "请正确填写手机号码", reg: /^[1][3,4,5,7,8,9]\d{9}$/},
                    wechat: {msg: '微信号码不能为空'},
                }
                Object.keys(validate).some(key => {
                    if (validate[key].attr && !this[key][validate[key].attr]) {
                        message = validate[key].msg
                        return true
                    } else if (!this[key].trim()) {
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
    @import '../../../../../../style/sass/mixin';

    .register {
        @include window;

        .panel {
            @include panel;

            .content {
                width: 100%;
                flex: 1;
                overflow-y: auto;

                .first {
                    margin-top: 20px;
                }
            }
        }
    }

</style>