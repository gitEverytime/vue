<template>
    <div class="reward-red">
        <div v-if="getIsToAllUser" class="all">
            <div class="line">
                <div class="left">
                    <span class="grab bgd bg-grab"></span>
                    <span>总金额</span>
                </div>

                <div class="right">
                    <input type="number" class="input" placeholder="0.00" v-model="allMoney" ref="input1" maxlength="20">
                    <span>元</span>
                </div>
            </div>
            <div class="desc">当前为拼手气红包</div>

            <div class="line">
                <div class="left">
                    <span>红包个数</span>
                </div>

                <div class="right">
                    <input type="number" class="input" placeholder="填写个数" v-model="allCount" ref="input2" maxlength="20">
                    <span>个</span>
                </div>
            </div>
            <div class="desc">当前发给<span class="name">全场</span>共{{getCount}}人</div>

        </div>

        <div v-if="!getIsToAllUser" class="person">
            <div class="line">
                <div class="left">
                    <span>红包金额</span>
                </div>

                <div class="right">
                    <input type="number" class="input" placeholder="0.00" v-model="personMoney" ref="input3" maxlength="20">
                    <span>元</span>
                </div>
            </div>
            <div class="desc">当前发给<span class="name">{{getToUserName}}</span></div>
        </div>
        <TempInput v-model="note" :placeholder="'恭喜发财，大吉大利!!'" :bgColor="'#3a3139'" class="area"></TempInput>
        <TempButton :text="'微信支付'" @click="weChatPayHandler"></TempButton>
    </div>

</template>

<script>
    import TempInput from "../../component/box_input_text.vue"
    import TempButton from "../../component/box_btn.vue"
    import CatchControl from "../../../comm/catch_control"
    import REQ from "../../../comm/request"
    import ConstValue from "../../../comm/const_value"
    import MsgType from "../../../comm/msg_type"
    import WeChatPay from "../../../comm/wechat_pay"
    import filterXss from "../../../comm/filterXss"

    const roomInfo = window.RINFO
    const DESCR = roomInfo.storeName + "-打赏"


    export default {
        props: ["tUser", "trole"],

        data() {
            return {
                note: '',
                allMoney: '',
                allCount: '',
                personMoney: '',
            }
        },

        components: {TempInput, TempButton},

        computed: {
            getIsToAllUser() {

                return this.tUser.clientId == 0
            },

            getToUserName() {
                return this.tUser.nickname
            },

            getCount() {
                return CatchControl.getAllUser().length
            }
        },

        mounted() {
            [this.$refs.input1,this.$refs.input2,this.$refs.input3].forEach(item => {
                if (item) {
                    item.onclick = () => {
                        this.$store.commit("storeFootMenuShow", false)
                        setTimeout(() => {
                            item.scrollIntoView(false)
                        }, 600)
                    }
                    item.onblur = () => {
                        this.$store.commit("storeFootMenuShow", true)
                    }
                }
            })
        },

        methods: {
            weChatPayHandler() {
                if (!this.checkData()) return
                // this.addPubChatMessage({oid: '146b3cee3ff14dea9aacf82771dae4e3'})

                const detail = {
                    type: this.getIsToAllUser ? ConstValue.INTERACTION_REDPACKET_ALL : ConstValue.INTERACTION_REDPACKET_ONE,
                    cid: roomInfo.clientId,
                    amount: this.getIsToAllUser ? this.allMoney : this.personMoney,
                    count: this.getIsToAllUser ? this.allCount : 1,
                }
                const data = {
                    ...detail,
                    descr: DESCR,
                    detail: JSON.stringify(detail),
                    storeId: roomInfo.storeId,
                    trole: this.trole,
                }

                if (this.trole == ConstValue.CLIENT_ROLE_ACTOR) data.actorId = this.tUser.actorId

                REQ.reqWeixinPay(data,
                    (response) => {
                        if (response.data.free == 1) {
                            this.addPubChatMessage({iid: response.data.iid})
                        } else {
                            WeChatPay.startPay(response.data)
                                .then(() => {
                                    this.addPubChatMessage({oid: response.data.oid})
                                })
                                .catch((err) => {
                                    this.$logger.error("支付失败", err)
                                })
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                    })
            },

            addPubChatMessage(params) {
                const detail = {
                    count: this.getIsToAllUser ? this.allCount : 1,
                }
                const data = {
                    ...params,
                    ...detail,
                    detail: JSON.stringify(detail),
                    type: this.getIsToAllUser ? ConstValue.INTERACTION_REDPACKET_ALL : ConstValue.INTERACTION_REDPACKET_ONE,
                    cid: roomInfo.clientId,
                    storeId: roomInfo.storeId,
                    cname: roomInfo.nickName,
                    content: filterXss(this.note) || '恭喜发财，大吉大利',
                    sex: roomInfo.sex,
                    pic: ConstValue.REWARD_ICON_RED,
                    headimg: roomInfo.headimg,
                    mediaTitle: "大红包",
                    sId: roomInfo.sId,
                    trole: this.trole,
                    tid: this.tUser.clientId,
                    tname: this.tUser.nickname,
                    theadimg: this.tUser.headimg,
                    descr: DESCR
                }

                if (this.trole == ConstValue.CLIENT_ROLE_ACTOR) data.actorId = this.tUser.actorId

                REQ.reqAddPubChat(data,
                    (response) => {
                        const resData = response.data
                        data.mid = resData.id
                        data.createdAt = resData.createdAt
                        data.favorCount = resData.favorCount
                        data.rid = response.data.rid
                        this.$root.notify.$emit(MsgType.DISPATCH_UP_REWARD, data);
                        this.$root.notify.$emit(MsgType.CLIENT_WIN_CLOSE);

                        if (this.getIsToAllUser) {
                            this.$root.notify.$emit(MsgType.DISPATCH_UP_RED_PACKAGE_PUB, data)
                        } else {
                            this.$root.notify.$emit(MsgType.DISPATCH_UP_RED_PACKAGE_PRI, data)
                        }
                        window.history.back()


                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger(err)
                    })
            },

            checkData() {
                if (!this.tUser.nickname) {
                    this.$toast.center('请选择打赏人')
                    return false
                }

                if (this.getIsToAllUser) {
                    if (!this.allMoney) {
                        this.$toast.center("请填写金额")
                        return false
                    }
                    if (!this.allCount) {
                        this.$toast.center("请填写数量")
                        return false
                    }
                    const minMoney = Number(this.allCount * 0.5).toFixed(2)
                    if (Number(this.allMoney) < minMoney) {
                        this.$toast.center('单个红包金额不可低于0.5元')
                        return false
                    }
                } else {
                    if (!this.personMoney) {
                        this.$toast.center("请填写金额")
                        return false
                    }
                    if (Number(this.personMoney) < 1) {
                        this.$toast.center('单人红包金额不可低于1元')
                        return false
                    }
                }
                return true
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .reward-red {
        @include layout-flex-c;
        background: #322831;

        .all {
            @include layout-flex-c;
        }

        .person {
            @include layout-flex-c;
        }

        .area {
            margin-top: 20px;
        }

        .line {
            background: #3a3139;
            @include layout-flex-r-sb;
            align-items: center;
            @include set-h(38px);
            margin: 20px 10px 5px 10px;
            border-radius: 4px;
            padding: 0 10px;

            .left {
                @include layout-flex-r;
                flex: 1;

                .grab {
                    @include set-width-height(14px, 14px);
                    margin-right: 5px;
                    align-self: center;
                }
            }

            .right {
                @include layout-flex-r;
                justify-content: flex-end;
                align-items: center;
                @include placeholder(#8d888f, 12px);
                flex: 1;

                .input {
                    background: transparent;
                    border-color: transparent;
                    @include font-dpr(12px);
                    text-align: right;
                    color: #8d888f;
                    padding-right: 5px;
                    width: 80%;
                }
            }

            span {
                @include font-dpr(12px);
                color: #dddddd;
            }
        }

        .desc {
            margin-left: 20px;
            color: #8d888f;
            @include font-dpr(11px);

            .name {
                color: #01b695;
            }
        }
    }
</style>