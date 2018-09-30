<template>
    <div class="gift-box" :style="getStyle">
        <div class="panel">
            <TempTitle :title="'霸屏'"></TempTitle>
            <div class="menu-bar">
                <span class="btn" :class="{'is-on':getCurrMenuIndex==1}" v-on:click="switchGift(1)">重金霸屏</span>
                <i class="cut-off-line"></i>
                <span class="btn" :class="{'is-on':getCurrMenuIndex==2}" v-on:click="switchGift(2)">炫酷霸屏</span>
                <i class="cut-off-line"></i>
                <span class="btn" :class="{'is-on':getCurrMenuIndex==3}" v-on:click="switchGift(3)">主题霸屏</span>
            </div>
            <div class="content" ref="content">

                <TempSubTitle :title="'选择主题'"></TempSubTitle>
                <div class="gift-bar">
                    <div v-for="item in getShowGiftList">
                        <TempGiftItem v-bind="item" v-on:E_CLICK_GIFT="selectGiftHandler"
                                      v-bind:class="{ 'gift-active':  item.id == currGiftId }"></TempGiftItem>
                    </div>
                </div>

                <TempSubTitle :title="'霸屏时间'"></TempSubTitle>

                <div class="time-bar">
                    <div v-for="item in getShowPriceList">
                        <TempPriceItem v-bind="item" v-on:E_CLICK_PRICE="selectPriceHandler"
                                       v-bind:class="{'price-active': item.priceKey == currPriceKey}"></TempPriceItem>
                    </div>
                </div>

                <TempInput v-model="inputValue.note" style="margin-top: 10px" placeholder="想说点什么霸屏语？"/>
                <div v-if="duration" class="pic-text">{{getPicText}}</div>
                <TempPic v-if="duration" v-model="inputValue.pic" :duration="duration"></TempPic>
                <TempPrice :price="getCurrPrice"></TempPrice>
                <TempButton @click="onScreenHandler" :text="'微信支付'"/>
            </div>

        </div>
    </div>

</template>

<script>
    import MsgType from "../../comm/msg_type.js";
    import ConstValue from "../../comm/const_value"
    import TempGiftItem from "./gift_item.vue"

    import TempPriceItem from "./price_item.vue";
    import TempTitle from "../component/box_title.vue"
    import TempSubTitle from "../component/box_sub_title.vue"
    import TempInput from "../component/box_input_text.vue"
    import TempPic from "../component/box_pic.vue"
    import TempButton from "../component/box_btn.vue";
    import TempPrice from "../component/box_price.vue";

    import CatchControl from "../../comm/catch_control.js";
    import REQ from "../../comm/request"
    import WeChatPay from "../../comm/wechat_pay"
    import filterXss from "../../comm/filterXss"
    import getQuotations from "../../comm/quotations"

    const roomInfo = window.RINFO;
    const DESCR = roomInfo.storeName + "-霸屏"


    export default {

        data() {
            return {
                currMenuIndex: 1,
                giftData: null,
                showGiftList: [], //current display gift
                note: "", //留言
                currGift: null,
                currPrice: '',
                currGiftId: '',
                currGiftPrice: 0,
                currPriceKey: 0,
                duration: 0,
                placeholder: '霸屏想说点儿什么呢？说点儿什么吧~',
                inputValue: {
                    note: '',
                    pic: ''
                }
            }
        },

        components: {TempGiftItem, TempPriceItem, TempTitle, TempSubTitle, TempInput, TempButton, TempPrice, TempPic},

        computed: {
            getCurrMenuIndex() {
                return this.currMenuIndex;
            },

            getShowGiftList() {
                return this.showGiftList;
            },

            getShowPriceList() {
                const price = roomInfo.cfg.bpPrice
                return [
                    {priceKey: 1, price: price * 10, time: 10},
                    {priceKey: 2, price: price * 15, time: 15},
                    {priceKey: 3, price: price * 30, time: 30},
                    {priceKey: 4, price: price * 60, time: 60},
                    {priceKey: 5, price: price * 120, time: 120},
                ]
            },

            getCurrPrice() {
                return this.currPrice || 0;
            },

            getStyle() {
                const height = this.$store.getters.getFootMenuShow ? '50px' : '0px'
                return {
                    borderBottom: height + ' solid transparent'
                }
            },

            getPicText() {
                const numbers = {
                    10: 1,
                    15: 2,
                    30: 3,
                    60: 4,
                    120: 6,
                }
                return `您可以上传${numbers[this.duration]}张图片`
            }
        },

        mounted() {
            this.giftData = CatchControl.getAllOnScreenGiftData();
            this.showGiftList = this.giftData[this.currMenuIndex];
            this.getConfig()
        },

        methods: {
            getConfig() {
                if (roomInfo.cfg) {
                    const bps = {2: 'bp1', 1: 'bp2', 3: 'bp3'}
                    const isOn = roomInfo.cfg[bps[this.currMenuIndex]]
                    const messages = {2: '炫酷霸屏', 1: '重金霸屏', 3: '主题霸屏'}
                    if (isOn == 0) {
                        return '商家未开启-' + messages[this.currMenuIndex]
                    }
                }
                return ''
            },

            switchGift(menuIndex) {

                this.currMenuIndex = menuIndex;
                this.showGiftList = this.giftData[menuIndex];
                this.getConfig()
            },

            selectGiftHandler(giftId) {
                this.currGiftId = giftId;
                const currGift = this.showGiftList.filter((item) => item.id === giftId)[0]
                this.currGift = currGift
                this.currGiftPrice = currGift.price
                this.currPrice = this.duration * roomInfo.cfg.bpPrice
            },

            selectPriceHandler(priceInfo) {
                this.currPriceKey = priceInfo.priceKey
                this.duration = priceInfo.time
                this.currPrice = this.duration * roomInfo.cfg.bpPrice
            },

            //广播霸屏
            onScreenHandler() {
                if (this.getConfig()) {
                    this.$toast.center(this.getConfig())
                    return
                }

                if (!this.currGiftId) {
                    this.$toast.center('请选择主题')
                    return
                }

                if (!this.duration) {
                    this.$toast.center('请选择霸屏时长')
                    return
                }

                if (this.$store.getters.getFileIsUploading) {
                    this.$toast.center('请等待图片上传完成！')
                    return
                }

                // this.addPubChatMessage({oid: 'fe187f61c42d44d99831427546e88a40'})

                const detail = {
                    type: ConstValue.INTERACTION_ONSCREEN,
                    cid: roomInfo.clientId,
                    themeId: this.currGiftId,
                    themeName: this.currGift.name,
                    duration: this.duration,
                }
                const data = {
                    ...detail,
                    descr: DESCR,
                    detail: JSON.stringify(detail),
                    storeId: roomInfo.storeId,
                }

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
                    onScreenType: this.currGift.cate,
                    duration: this.duration,
                }
                const data = {
                    ...params,
                    ...detail,
                    detail: JSON.stringify(detail),
                    type: ConstValue.INTERACTION_ONSCREEN,
                    cid: roomInfo.clientId,
                    storeId: roomInfo.storeId,
                    cname: roomInfo.nickName,
                    content: filterXss(this.inputValue.note) || getQuotations(this.currGiftId),
                    pic: this.inputValue.pic,
                    sex: roomInfo.sex,
                    headimg: roomInfo.headimg,
                    mediaId: this.currGiftId,
                    mediaTitle: this.currGift.name,
                    sId: roomInfo.sId,
                    descr: DESCR,
                }

                REQ.reqAddPubChat(data,
                    (response) => {
                        const resData = response.data
                        data.mid = resData.id
                        data.createdAt = resData.createdAt
                        data.favorCount = resData.favorCount
                        this.addImMsg(data)
                        this.addLog()
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                    })
            },

            addImMsg(data) {
                this.$root.notify.$emit(MsgType.DISPATCH_UP_SCREEN_ON, data);
                window.history.back();
            },

            addLog() {
                let image = new Image()
                image.src = `http://log.ibigtop.com/log/1/3?id=${this.currGiftId}&t=${this.duration}`
            }
        }
    }
</script>


<style lang='scss' scoped>

    @import '../../../../../style/sass/mixin.scss';

    .gift-box {
        @include window-box;
    }

    .gift-box .panel {
        @include box-panel;

        .menu-bar {
            @include layout-flex-r;
            width: 100%;
            @include set-h(36px);
            text-align: center;
            justify-content: center;
            align-items: center;
            background: #322831;

            .btn {
                color: #9f99a1;
                @include font-dpr(14px);
                flex: 1;
            }

            .is-on {
                color: #01b695;
            }

            .cut-off-line {
                width: 1px;
                @include set-height(16px);
                background: #221821;
            }
        }

        .content {
            width: 100%;
            flex: 1;
            overflow-y: auto;
            position: relative;

            .gift-bar {
                @include layout-flex-r;
                width: 100%;
                overflow-x: auto;
                box-sizing: border-box;
                padding: 0 5px;
            }

            .time-bar {
                @include layout-flex-r;
                margin: 15px 2% 0 2%;
                width: 96%;
                overflow-x: scroll;
            }

            .pic-text {
                @include font-dpr(14px);
                margin: 10px;
                color: #8d888f;
            }
        }
    }
</style>




