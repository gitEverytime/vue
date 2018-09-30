<template>
    <div class="apply-form">
        <div class="panel">
            <Title title="申请成为艺人" @E_LEFT_CLICK="backHandler"/>
            <div class="content">
                <InputItem must="true" type="text" left="真实姓名" placeholder="真实姓名" v-model="realName"
                           style="margin-top: 10px"/>
                <InputItem must="true" type="text" left="你的艺名" placeholder="你的艺名" v-model="actorName"/>
                <SelectItem must="true" left="你的性别" :data="sexData" v-model="sex"></SelectItem>
                <SelectItem must="true" left="所属类别" :data="typeData" v-model="actorType"></SelectItem>
                <InputItem must="true" type="text" left="身份证号" placeholder="请输入正确的身份证号" v-model="idCard"/>
                <InputItem must="true" type="number" left="手机号码" placeholder="请输入正确的手机号码" v-model="phone"/>
                <ZoneItem must="true" left="所在地区" v-model="zone"/>
                <InputItem must="true" left="详细地址" placeholder="请输入详细地址" v-model="address"/>
                <DateItem must="true" left="出生日期" v-model="birthday"></DateItem>
                <AreaItem left="个人简介" placeholder="限制字数200字以内" v-model="resume"></AreaItem>
                <PicItem must="true" left="形象照片" v-model="pics"/>
                <!--<VerificationItem must="true" left=" 验证码" placeholder="请输入手机验证码" v-model="verificationCode"/>-->
                <Button text="下一步" @click.native="nextPage"/>
            </div>
        </div>
    </div>

</template>

<script>
    import Title from "../../component/title.vue"
    import Button from "../../component/button.vue"
    import InputItem from "../../component/form/input_item.vue"
    import SelectItem from "../../component/form/select_item.vue"
    import DateItem from "../../component/form/date_item.vue"
    import AreaItem from "../../component/form/area_item.vue"
    import VerificationItem from "../../component/form/verification_item.vue"
    import PicItem from "../../component/form/pic_item.vue"
    import ZoneItem from "../../component/form/zone_item.vue"
    import REQ from "../../../comm/request"
    import filterXss from "../../../comm/filterXss"

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title, Button, InputItem, SelectItem, DateItem, AreaItem, VerificationItem, PicItem, ZoneItem},

        data() {
            return {
                realName: '',
                actorName: '',
                sex: 1,
                actorType: 1,
                idCard: '',
                phone: '',
                address: '',
                birthday: '',
                resume: '',
                verificationCode: '1111',
                pics: [],
                zone: {
                    province: '',
                    city: '',
                    district: '',
                },

                sexData: [
                    {key: 1, value: 1, name: '男'},
                    {key: 2, value: 2, name: '女'}
                ],

                typeData: [
                    {key: 1, value: 1, name: '歌手'},
                    {key: 2, value: 2, name: '舞蹈'},
                    {key: 3, value: 3, name: '吉他手'},
                    {key: 4, value: 4, name: 'DJ'},
                    {key: 5, value: 5, name: 'MC'},
                    {key: 6, value: 6, name: '贝斯'},
                    {key: 7, value: 7, name: '鼓手'},
                    {key: 8, value: 8, name: 'DMC'},
                    {key: 9, value: 9, name: '主持人'},
                    {key: 10, value: 10, name: '其他'},
                ]
            }
        },

        computed: {},

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            nextPage() {
                let message = this.validateData()
                if (message) {
                    this.$toast.center(message)
                    return
                }

                if (this.$store.getters.getFileIsUploading) {
                    this.$toast.center('请等待图片上传完成！')
                    return
                }

                this.submitData()
            },

            validateData() {
                let message = ''
                let validate = {
                    realName: {
                        msg: '请填写真实姓名',
                        msg1: '姓名为汉字2~8个,英文字母4~16个,不能包含非法字符',
                        reg: /(^[\u4e00-\u9fa5]{2,8}$)|(^[a-zA-Z0-9_]{4,16}$)/
                    },
                    actorName: {
                        msg: '请填写艺名',
                        msg1: '艺名为汉字2~8个,英文字母4~16个,不能包含非法字符',
                        reg:  /(^[\u4e00-\u9fa5]{2,8}$)|(^[a-zA-Z0-9_]{4,16}$)/
                    },
                    idCard: {msg: '请填写身份证号码', msg1: '请正确填写身份证号码', reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/},
                    phone: {msg: '请填写手机号码', msg1: "请正确填写手机号码", reg: /^[1][3,4,5,7,8,9]\d{9}$/},
                    address: {msg: '请填写地址'},
                    birthday: {msg: '请选择出生日期'},
                    pics: {msg: '请至少选择一张形象照片', attr: 'length'},
                    verificationCode: {msg: '请填写验证码', msg1: "验证码为四位数字", reg: /^\d{4}$/},
                }

                Object.keys(validate).some(key => {
                    if (validate[key].attr && !this[key][validate[key].attr]) {
                        message = validate[key].msg
                        return true
                    } else if (!this[key]) {
                        message = validate[key].msg
                        return true
                    } else if (validate[key].reg && !validate[key].reg.test(this[key])) {
                        message = validate[key].msg1
                        return true
                    }
                })
                return message
            },

            submitData() {
                const data = {
                    cid: roomInfo.clientId,
                    realName: filterXss(this.realName),
                    actorName: filterXss(this.actorName),
                    idcard: this.idCard,
                    phone: this.phone,
                    actorType: this.actorType,
                    ac1: this.zone.province,
                    ac2: this.zone.city,
                    ac3: this.zone.district,
                    ac4: filterXss(this.address),
                    birthday: +new Date(this.birthday),
                    resume: filterXss(this.resume),
                    pics: this.pics.join(","),
                }
                REQ.reqActorSysApply(data,
                    () => {
                        this.$router.replace({name: 'ApplySuccess'})
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                    })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .apply-form {
        @include window;

        .panel {
            @include panel;

            .content {
                width: 100%;
                flex: 1;
                overflow-y: auto;
            }
        }
    }
</style>