<template>
    <div class="reward-gift">
        <div class="item-content" ref="reward">
            <TempItem class="gift-item" v-for="item in currGiftList" v-bind="item" @click.native="selectGift(item)"
                      :key="item.id" :class="{'gift-active':currGiftId === item.id}"/>
        </div>
        <h1 class="pointCover">
            <span v-for="n in pageSum" class="point" :class="{'active' : n === currTabIndex}"
                  @click="selectTab(n)">●</span>
        </h1>
        <SelectLine v-bind="{allMoney}" v-on:E_SELECT_VALUE="setSelectNumber"></SelectLine>
        <TempInput v-model="note" :placeholder="'打赏礼物留言~'" :bgColor="'#251a24'"></TempInput>
        <TempButton :text="'微信支付'" @click="weChatPayHandler"></TempButton>
    </div>

</template>

<script>
    import CatchControl from "../../../comm/catch_control"
    import ConstValue from "../../../comm/const_value"
    import MsgType from "../../../comm/msg_type"
    import REQ from "../../../comm/request"
    import WeChatPay from "../../../comm/wechat_pay"
    import TempItem from "./reward_gift_item.vue"
    import Hammer from "hammerjs"
    import SelectLine from "./select_line.vue"
    import TempInput from "../../component/box_input_text.vue"
    import TempButton from "../../component/box_btn.vue"
    import filterXss from "../../../comm/filterXss"

    const roomInfo = window.RINFO
    const DESCR = roomInfo.storeName + "-打赏"
    const E_SELECT_ITEM = 'E_SELECT_ITEM'

    export default {
        props: ["trole", "tUser"],

        components: {TempItem, SelectLine, TempInput, TempButton},

        data() {
            return {
                allGiftList: [],
                currGiftList: [],
                currTabIndex: 1,
                pageSum: 1,
                currGiftId: 0,
                selectNumber: 1,
                allMoney: 0,
                currGift: {},
                note: '',
            }
        },

        computed: {},

        mounted() {
            this.initData()
            this.addSwipeListener()
        },

        methods: {
            initData() {
                this.allGiftList = CatchControl.getAllRewordGiftData()[1]
                if (this.allGiftList.length) {
                    this.pageSum = Math.ceil(this.allGiftList.length / 8)
                    if (this.pageSum > 1) {
                        this.currGiftList = this.allGiftList.slice(0, 8)
                    } else {
                        this.currGiftList = this.allGiftList
                    }
                }
            },

            selectGift(item) {
                this.currGift = item
                this.currGiftId = item.id
                this.calcAllMoney()
            },

            selectTab(n) {
                this.currTabIndex = n
                this.changeData(n)
            },

            changeData(n) {
                if (this.allGiftList.length) {
                    if (n < this.pageSum) {
                        this.currGiftList = this.allGiftList.slice((n - 1) * 8, n * 8)
                    } else {
                        this.currGiftList = this.allGiftList.slice((n - 1) * 8)
                    }
                }
            },

            setSelectNumber(value) {
                this.selectNumber = value
                this.calcAllMoney()
            },

            calcAllMoney() {
                this.allMoney = Number(this.selectNumber) * Number(this.currGift.price || 0)
            },

            addSwipeListener() {
                const reward = this.$refs.reward
                let hammer = new Hammer(reward)
                hammer.on("swipe", (e) => {
                    if (e.direction === Hammer.DIRECTION_LEFT) {
                        if (this.currTabIndex === this.pageSum) {
                            return
                        }
                        this.selectTab(this.currTabIndex + 1)
                    } else if (e.direction === Hammer.DIRECTION_RIGHT) {
                        if (this.currTabIndex === 1) {
                            return
                        }
                        this.selectTab(this.currTabIndex - 1)
                    }
                    return
                })
            },

            weChatPayHandler() {
                if (!this.currGiftId) {
                    this.$toast.center('请选择礼物')
                    return
                }

                if (!this.tUser.nickname) {
                    this.$toast.center('请选择打赏人')
                    return
                }

                // this.addPubChatMessage({oid: 'fe187f61c42d44d99831427546e88a40'})

                const detail = {
                    type: ConstValue.INTERACTION_GIVE_GIFT,
                    cid: roomInfo.clientId,
                    giftId: this.currGiftId,
                    giftName: this.currGift.name,
                    count: this.selectNumber,
                    trole: this.trole,
                    tid: this.tUser.clientId,
                }
                const data = {
                    ...detail,
                    descr: DESCR,
                    detail: JSON.stringify(detail),
                    storeId: roomInfo.storeId,
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
                    count: this.selectNumber,
                }
                const data = {
                    ...params,
                    ...detail,
                    detail: JSON.stringify(detail),
                    type: ConstValue.INTERACTION_GIVE_GIFT,
                    cid: roomInfo.clientId,
                    storeId: roomInfo.storeId,
                    cname: roomInfo.nickName,
                    content: filterXss(this.note),
                    sex: roomInfo.sex,
                    pic: this.currGift.icon,
                    headimg: roomInfo.headimg,
                    mediaId: this.currGiftId,
                    mediaTitle: this.currGift.name,
                    sId: roomInfo.sId,
                    trole: this.trole,
                    tid: this.tUser.clientId,
                    tname: this.trole == ConstValue.CLIENT_ROLE_ACTOR ? this.tUser.actorName : this.tUser.nickname,
                    theadimg: this.tUser.headimg,
                    descr: DESCR,
                }

                if (this.trole == ConstValue.CLIENT_ROLE_ACTOR) data.actorId = this.tUser.actorId

                REQ.reqAddPubChat(data,
                    (response) => {
                        const resData = response.data
                        data.mid = resData.id
                        data.createdAt = resData.createdAt
                        data.favorCount = resData.favorCount
                        this.$root.notify.$emit(MsgType.DISPATCH_UP_REWARD, data);
                        this.$root.notify.$emit(MsgType.CLIENT_WIN_CLOSE);
                        this.addLog()
                        window.history.back()
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    })
            },

            addLog() {
                let image = new Image()
                image.src = `http://log.ibigtop.com/log/1/4?id=${this.currGiftId}`
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .reward-gift {
        @include layout-flex-c;

        .item-content {
            @include layout-flex-r-wrap;
            background: #322831;
            height: auto;
            padding: 10px 10px 0 10px;

            .gift-item {
                width: 24%;
                height: auto;
            }
        }

        .pointCover {
            @include layout-flex-r-center;
            background: #322831;
            align-items: center;
            padding: 3px 0 5px 0;

            .point {
                color: #1a1019;
                @include font-dpr(10px);
                text-align: center;
                margin: 0 5px;
            }

            .active {
                color: #8d888f;
            }
        }
    }
</style>