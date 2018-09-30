<template>
    <div class="order-table">
        <div class="panel">
            <Title title="霸桌" @E_LEFT_CLICK="backHandler" style="position: absolute"/>
            <div class="content">
                <div class="top bgd bg-vip-bg">
                    <span class="store">{{getStoreName}}</span>
                </div>
                <InputLine :must="true" left="请选择预留时间" v-model="time" type="datetime-local"/>
                <InputLine :must="true" left="请填写预定人数" v-model="count" type="number"/>
                <InputLine :must="true" left="预留的手机号码" v-model="phone" type="number"/>
                <InputLine :must="true" left="请问您怎么称呼" v-model="name" type="text"/>
                <InputLine :must="false" left="预定的备注信息" v-model="remark" type="text"/>
                <Button text="预定" @click.native="orderConfirm"/>
            </div>
        </div>
    </div>

</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../../comm/request'
    import InputLine from './child/input-line.vue'
    import Button from '../component/button.vue'
    import filterXss from '../../comm/filterXss'
    import DateFormat from '../../comm/date_format'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title, InputLine, Button},

        data() {
            return {
                time: '',
                count: '',
                phone: '',
                name: '',
                remark: '',
                id: '',
            }
        },

        computed: {
            getStoreName() {
                return roomInfo.storeName
            }
        },

        mounted() {
            this.getOrderInfo()
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            orderConfirm() {
                if (this.validateData()) {
                    this.$toast.center(this.validateData())
                    return
                }
                const params = {
                    book: {
                        custId: roomInfo.clientId,
                        storeId: roomInfo.storeId,
                        bookTime: +new Date(this.time),
                        dinerCount: this.count,
                        custName: filterXss(this.name),
                        custPhone: this.phone,
                        comment: filterXss(this.remark),
                    }
                }

                if (this.id) params.book.id = this.id

                !this.id && REQ.reqDiningOrderTable(params,
                    () => {
                        this.$toast.center('预定成功')
                        this.backHandler()
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )

                this.id && REQ.reqDiningOrderUpdateInfo(params,
                    () => {
                        this.$toast.center('修改预定信息成功')
                        this.backHandler()
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getOrderInfo() {
                const params = {
                    book: {
                        custId: roomInfo.clientId,
                        storeId: roomInfo.storeId,
                    }
                }
                REQ.reqDiningOrderGetInfo(params,
                    (res) => {
                        if (res.data.rows.length) {
                            const info = res.data.rows[0]
                            this.time = DateFormat.YMDTHMS(info.bookTime)
                            this.phone = info.custPhone
                            this.count = info.dinerCount
                            this.name = info.custName
                            this.remark = info.comment
                            this.id = info.id
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            validateData() {
                let message = ''
                let validate = {
                    time: {msg: '请选择预留时间'},
                    count: {msg: '请填写预定人数'},
                    phone: {msg: '请填写预留手机号码', msg1: "请正确填写手机号码", reg: /^[1][3,4,5,7,8,9]\d{9}$/},
                    name: {msg: '请填写您的称呼'},
                }

                Object.keys(validate).some(key => {
                    if (!this[key]) {
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
    @import './../../../../../style/sass/mixin.scss';

    .order-table {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;

                .top {
                    width: 100%;
                    @include set-height(155px);
                    @include layout-flex-r-center;
                    align-items: flex-end;

                    .store {
                        margin-bottom: 45px;
                        color: #F5F5F5;
                        @include font-dpr(16px);
                    }
                }

            }
        }
    }
</style>