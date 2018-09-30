<template>
    <div class="reward-real">
        <MenuLine v-bind:typeList="typeList" v-on:E_CHOOSE_ITEM_TYPE="setFoodType"/>
        <div class="item-content" ref="reward">
            <TempItem class="gift-item" v-for="item in currFoodList" v-bind="item" @click.native="selectFood(item)"
                      :key="item.id" :class="{'gift-active':currFoodId === item.id}"/>
        </div>
        <h1 class="pointCover">
            <span v-for="n in pageSum" class="point" :class="{'active' : n === currTabIndex}"
                  @click="selectTab(n)">●</span>
        </h1>
        <SelectLineReal v-bind="{allMoney}" v-on:E_SELECT_VALUE="setSelectNumber" :min="carteCountMin"></SelectLineReal>
        <SelectTable v-if="trole == 0" @tableChange="selectTable"></SelectTable>
        <TempInput v-model="note" :placeholder="'打赏留言~'" :bgColor="'#251a24'"></TempInput>
        <TempButton :text="'微信支付'" @click="weChatPayHandler"></TempButton>
    </div>

</template>

<script>
    import CatchControl from "../../../comm/catch_control"
    import MenuLine from "./menu_line.vue"
    import TempItem from "./reward_real_item.vue"
    import Hammer from "hammerjs"
    import SelectLineReal from "./select_line_real.vue"
    import SelectTable from "./select_table.vue"
    import TempInput from "../../component/box_input_text.vue"
    import TempButton from "../../component/box_btn.vue"
    import MsgType from "../../../comm/msg_type"
    import ConstValue from "../../../comm/const_value"
    import REQ from "../../../comm/request"
    import WeChatPay from "../../../comm/wechat_pay"
    import filterXss from  "../../../comm/filterXss"

    const roomInfo = window.RINFO
    const DESCR = roomInfo.storeName + "-打赏"

    export default {
        props: ["trole","tUser"],

        components: {MenuLine, TempItem, SelectLineReal, TempInput, TempButton, SelectTable},

        data() {
            return {
                typeList: [
                    {type: '1', name: '酒类'},
                    {type: '2', name: '烧烤'},
                    {type: '3', name: '凉菜'},
                    {type: '4', name: '热菜'},
                ],
                foodList: [],
                allFoodList: [],
                currType: '1',
                currFoodList: [],
                currFood: {},
                currFoodId: 0,
                pageSum: 1,
                currTabIndex: 1,
                note: '',
                selectNumber: 1,
                allMoney: 0,
                tableId: '',
                tableName: '',
                carteCountMin: 1,
            }
        },

        computed: {},

        mounted() {
            this.initData()
            this.addSwipeListener()
        },

        methods: {
            initData() {
                this.foodList = CatchControl.getAllRewardRealData()
                this.initTypeData()
            },

            initTypeData() {
                this.allFoodList = this.foodList[this.currType] || []
                if (this.allFoodList.length) {
                    this.pageSum = Math.ceil(this.allFoodList.length / 8)
                    if (this.pageSum > 1) {
                        this.currFoodList = this.allFoodList.slice(0, 8)
                    } else {
                        this.currFoodList = this.allFoodList
                    }
                } else {
                    this.pageSum = 1
                    this.currFoodList = []
                }
            },

            setFoodType(type) {
                this.currType = type
                this.initTypeData()
                this.currTabIndex = 1
            },

            selectFood(food) {
                this.currFood = food
                this.currFoodId = food.id
                this.carteCountMin = food.minCount || 1
                this.calcAllMoney()
            },

            setSelectNumber(value) {
                this.selectNumber = value
                this.calcAllMoney()
            },

            selectTable({tableId, tableName}) {
                this.tableId = tableId
                this.tableName = tableName
            },

            calcAllMoney() {
                this.allMoney = Number(this.selectNumber) * Number(this.currFood.price || 0)
            },

            selectTab(n) {
                this.currTabIndex = n
                this.changeData(n)
            },

            changeData(n) {
                if (this.allFoodList.length) {
                    if (n < this.pageSum) {
                        this.currFoodList = this.allFoodList.slice((n - 1) * 8, n * 8)
                    } else {
                        this.currFoodList = this.allFoodList.slice((n - 1) * 8)
                    }
                }
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
                if (!this.currFoodId) {
                    this.$toast.center("请选择打赏物品")
                    return
                }

                if (this.tUser.clientId == -1 && !this.tableId) {
                    this.$toast.center('整桌打赏必须选择桌号')
                    return
                }

                // this.addPubChatMessage({oid: 'fe187f61c42d44d99831427546e88a40'})

                const detail = {
                    type: ConstValue.INTERACTION_GIVE_REAL,
                    cid: roomInfo.clientId,
                    foodId: this.currFoodId,
                    foodName: this.currFood.foodName,
                    count: this.selectNumber,
                    trole: this.trole,
                    tid: this.tUser.clientId,
                    tableId: this.tableId,
                }
                this.$logger(detail)
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
                    foodType: this.currFood.type,
                    tableId: this.tableId,
                    tableName: this.tableName,
                    count: this.selectNumber,
                }
                const data = {
                    ...params,
                    ...detail,
                    detail: JSON.stringify(detail),
                    type: ConstValue.INTERACTION_GIVE_REAL,
                    cid: roomInfo.clientId,
                    storeId: roomInfo.storeId,
                    cname: roomInfo.nickName,
                    content: filterXss(this.note),
                    sex: roomInfo.sex,
                    pic: this.currFood.type == 1 ? ConstValue.REWARD_ICON_DRINK : ConstValue.REWARD_ICON_EAT,
                    headimg: roomInfo.headimg,
                    mediaId: this.currFoodId,
                    mediaTitle: this.currFood.foodName,
                    sId: roomInfo.sId,
                    trole: this.trole,
                    tid: this.tUser.clientId,
                    tname: this.tUser.nickname,
                    theadimg: this.tUser.headimg,
                    descr: DESCR,
                }
                if (this.trole == ConstValue.CLIENT_ROLE_ACTOR) data.actorId = this.tUser.actorId

                this.$logger(data)

                REQ.reqAddPubChat(data,
                    (response) => {
                        const resData = response.data
                        data.mid = resData.id
                        data.createdAt = resData.createdAt
                        data.favorCount = resData.favorCount
                        this.$root.notify.$emit(MsgType.DISPATCH_UP_REWARD, data);
                        this.$root.notify.$emit(MsgType.CLIENT_WIN_CLOSE);
                        window.history.back()
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(JSON.stringify(err))
                        this.$logger.error(err)
                    })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .reward-real {
        @include layout-flex-c;

        .item-content {
            @include layout-flex-r-wrap;
            background: #322831;
            height: auto;
            padding: 5px 10px 0 10px;

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