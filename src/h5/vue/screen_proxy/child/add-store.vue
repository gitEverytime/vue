<template>
    <div class="add-store">
        <div class="panel">
            <Title title="开设商户"/>
            <div class="content">
                <SubTitle title="设置基本信息"></SubTitle>
                <InputItem :must="true" left="店面名称" type="text" maxlength="30" v-model="sname"/>
                <SelectItem must="true" left="店面类型" :data="typeData" v-model="storeType"></SelectItem>
                <ZoneItem must="true" left="所在地区" v-model="zone"/>
                <InputItem :must="true" left="详细地址" type="text" maxlength="30" v-model="address"/>
                <InputItem :must="true" left="手机号码" type="number" maxlength="11" v-model="phone"/>
                <InputItem :must="true" left="boss姓名" type="text" maxlength="10" v-model="bossName"/>
                <InputItem :must="true" :disabled="true" left="登录密码" type="text" maxlength="10" v-model="password"/>
                <SubTitle title="设置分成"></SubTitle>
                <div class="line">
                    <span class="left">霸屏（平台方）</span>
                    <el-input-number v-model="bpSysScale" :precision="2" :step="0.01" :max="1" :min="0" size="mini"/>
                </div>
                <div class="line">
                    <span class="left">霸屏（商户方）</span>
                    <el-input-number v-model="bpStoreScale" :precision="2" :step="0.01" :max="1" :min="0" size="mini"/>
                </div>
                <div class="line">
                    <span class="left">霸麦（平台方）</span>
                    <el-input-number v-model="bmSysScale" :precision="2" :step="0.01" :max="1" :min="0" size="mini"/>
                </div>
                <div class="line">
                    <span class="left">霸麦（商户方）</span>
                    <el-input-number v-model="bmStoreScale" :precision="2" :step="0.01" :max="1" :min="0" size="mini"/>
                </div>
                <div class="line">
                    <span class="left">点播（平台方）</span>
                    <el-input-number v-model="dbSysScale" :precision="2" :step="0.01" :max="1" :min="0" size="mini"/>
                </div>
                <div class="line">
                    <span class="left">点播（商户方）</span>
                    <el-input-number v-model="dbStoreScale" :precision="2" :step="0.01" :max="1" :min="0" size="mini"/>
                </div>
                <div class="line">
                    <span class="left">实物（平台方）</span>
                    <el-input-number v-model="swSysScale" :precision="2" :step="0.01" :max="1" :min="0" size="mini"/>
                </div>
                <div class="line">
                    <span class="left">实物（商户方）</span>
                    <el-input-number v-model="swStoreScale" :precision="2" :step="0.01" :max="1" :min="0" size="mini"
                                     :disabled="true"/>
                </div>
                <SubTitle title="开通功能"></SubTitle>
                <div class="switch-line">
                    <div class="switch-content">
                        <span class="name">点餐</span>
                        <el-switch
                                v-model="isFood"
                                active-color="#01b695"
                                inactive-color="#635a66"
                                active-value="1"
                                inactive-value="0">
                        </el-switch>
                    </div>
                    <div class="switch-content">
                        <span class="name">互动</span>
                        <el-switch
                                v-model="isInt"
                                active-color="#01b695"
                                inactive-color="#635a66"
                                active-value="1"
                                inactive-value="0">
                        </el-switch>
                    </div>
                </div>
                <Button text="添加" @click="addHandler"/>
            </div>
        </div>
    </div>

</template>

<script>
    import Title from './component/title.vue'
    import InputItem from './component/input_item.vue'
    import Button from './component/button.vue'
    import SelectItem from './component/select_item.vue'
    import ZoneItem from './component/zone_item.vue'
    import SubTitle from './component/sub_title.vue'
    import REQ from '../common/request'
    import base64 from '../common/base64'

    export default {
        props: [],

        components: {Title, InputItem, Button, SelectItem, ZoneItem, SubTitle},

        data() {
            return {
                sname: '',
                storeType: 1,
                zone: {
                    province: '',
                    city: '',
                    district: '',
                },
                address: '',
                phone: '',
                bossName: '',
                password: 'bg123456',
                bpSysScale: 0.15,
                bpStoreScale: 0.85,
                bmSysScale: 0.15,
                bmStoreScale: 0.85,
                dbSysScale: 0.15,
                dbStoreScale: 0.85,
                swSysScale: 0.1,
                swStoreScale: 1,
                isFood: 0,
                isInt: 0,

                typeData: [
                    {key: 1, value: 1, name: '酒吧'},
                    {key: 2, value: 2, name: '餐吧'},
                    {key: 3, value: 3, name: 'KTV'},
                    {key: 4, value: 4, name: '慢摇'},
                    {key: 5, value: 5, name: '火锅'},
                    {key: 6, value: 6, name: '小吃'},
                    {key: 7, value: 7, name: '面馆'},
                    {key: 8, value: 8, name: '商超'},
                    {key: 9, value: 9, name: '婚庆'},
                ],
            }
        },

        computed: {},

        watch: {
            bpSysScale() {
                this.bpStoreScale = 1 - this.bpSysScale
            },
            bpStoreScale() {
                this.bpSysScale = 1 - this.bpStoreScale
            },
            bmSysScale() {
                this.bmStoreScale = 1 - this.bmSysScale
            },
            bmStoreScale() {
                this.bmSysScale = 1 - this.bmStoreScale
            },
            dbSysScale() {
                this.dbStoreScale = 1 - this.dbSysScale
            },
            dbStoreScale() {
                this.dbSysScale = 1 - this.dbStoreScale
            }
        },

        mounted() {
        },

        methods: {
            addHandler() {
                if (this.validateData()) {
                    this.$toast.center(this.validateData())
                    return
                }
                const params = {
                    sname: this.sname,
                    storeType: this.storeType,
                    phone: this.phone,
                    ac1: this.zone.province,
                    ac2: this.zone.city,
                    ac3: this.zone.district,
                    ac4: this.address,
                    bossName: this.bossName,
                    pwd: base64.encode(this.password),
                    isFood: this.isFood,
                    isInt: this.isInt,
                    bpSysScale: this.bpSysScale,
                    bpStoreScale: this.bpStoreScale,
                    bmSysScale: this.bmSysScale,
                    bmStoreScale: this.bmStoreScale,
                    dbSysScale: this.dbSysScale,
                    dbStoreScale: this.dbStoreScale,
                    swSysScale: this.swSysScale,
                    swStoreScale: this.swStoreScale,
                }

                console.log(JSON.stringify(params, null, 3))

                REQ.addStore(params,
                    () => {
                        this.$toast.center('添加成功！')
                        this.$router.back()
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
                    sname: {msg: '请填写店面名称'},
                    address: {msg: '请填写详细地址'},
                    phone: {msg: '请填写手机号码', msg1: "请正确填写手机号码", reg: /^[1][3,4,5,7,8,9]\d{9}$/},
                    bossName: {msg: '请填写boss姓名'},
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

    .add-store {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;
                padding-bottom: 10px;

                .line {
                    margin: 0 20px;
                    @include set-height(50px);
                    @include layout-flex-r-sb;
                    align-items: center;

                    .left {
                        color: #8d888f;
                        @include font-dpr(14px);
                        margin-left: 5px;
                    }
                }

                .switch-line {
                    margin: 0 20px;
                    @include set-height(50px);
                    @include layout-flex-r-sa;
                    align-items: center;

                    .switch-content {
                        @include layout-flex-r-sb;
                        align-items: center;

                        .name {
                            color: #8d888f;
                            @include font-dpr(14px);
                            margin: 0 5px;
                        }
                    }
                }
            }
        }
    }
</style>