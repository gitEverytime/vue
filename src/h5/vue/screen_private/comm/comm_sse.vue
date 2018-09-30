<template>
    <div class="comm-sse">
    </div>
</template>

<script>


    import SSEType from "./sse_type.js";
    import REQ from './request'

    const roomInfo = window.RINFO
    const serverUrl = REQ.commSseDomain + "/api/v1/dining/broadcast/sse?";

    export default {

        components: {},

        data() {
            return {
                ES: null
            }
        },
        computed: {},

        mounted() {
            this.conn(roomInfo.storeId, roomInfo.clientId)
        },

        methods: {

            conn(storeId, cid) {
                let url = serverUrl + "storeId=" + storeId + "&cid=" + cid;
                this.ES = new EventSource(url, {withCredentials: false});

                this.ES.onerror = (event) => {
                    console.log("on error====", event.type, "readyState=", this.ES.readyState);
                }

                //商家确认订单
                this.ES.addEventListener(SSEType.E_SOCKET_STORE_COMFRIM_ORDER, (event) => {
                    const info = JSON.parse(event.data)
                    if (info.orderId === this.$store.getters.getDiningOrderId) {
                        console.log("商家确认订单====", JSON.stringify(info, null, 2))
                    }
                });

                //用户确认订单
                this.ES.addEventListener(SSEType.E_SOCKET_USER_COMFRIM_ORDER, (event) => {
                    const info = JSON.parse(event.data)
                    if (info.orderId === this.$store.getters.getDiningOrderId) {
                        console.log("用户确认订单====", JSON.stringify(info, null, 2))
                    }
                });

                //呼叫服务员
                this.ES.addEventListener(SSEType.E_SOCKET_CALL_WAITER, (event) => {
                    const info = JSON.parse(event.data)
                    if (info.orderId === this.$store.getters.getDiningOrderId) {
                        console.log("呼叫服务员====", JSON.stringify(info, null, 2))
                    }
                });

                //用户进场
                this.ES.addEventListener(SSEType.E_SOCKET_USER_ENTER, (event) => {
                    const info = JSON.parse(event.data)
                    if (info.orderId === this.$store.getters.getDiningOrderId) {
                        console.log("用户进场====", JSON.stringify(info, null, 2))
                    }
                });

                //更新订单状态 [0:点菜-0、确认-1、制作-2 ]
                this.ES.addEventListener(SSEType.E_SOCKET_UPDATE_ORDERLIST_STATE, (event) => {
                    const info = JSON.parse(event.data)
                    if (info.orderId === this.$store.getters.getDiningOrderId) {
                        console.log("更新订单状态====", JSON.stringify(info, null, 2))
                        if (info.orderState) {
                            this.$store.commit("storeUpdateOrderState", info.orderState)
                        }
                        if (info.orderState === 1) {
                            this.$root.notify.$emit("ConfirmDetail")
                        }
                        if (info.orderClose === true) {  //取消订单
                            this.$store.commit('storeUpdateResultState', 2)
                            this.$root.notify.$emit("OrderResult")
                        }

                        if (info.payStatus === 2) {     //支付成功
                            this.$store.commit('storeUpdateResultState', 1)
                            this.$store.commit('storeUpdatePayState', 0)
                            this.$root.notify.$emit("OrderResult")

                        } else if (info.payStatus === 1) { //支付中
                            this.$store.commit('storeUpdatePayState', info.payStatus)
                        } else if (info.payStatus === 0) { //支付失败或者取消支付
                            this.$store.commit('storeUpdatePayState', info.payStatus)
                        }
                    }
                });

                //支付完毕 [0:支付失败  1：成功]
                this.ES.addEventListener(SSEType.E_SOCKET_PAY_END, (event) => {
                    const info = JSON.parse(event.data)
                    if (info.orderId === this.$store.getters.getDiningOrderId) {
                        console.log("支付完毕====", JSON.stringify(info, null, 2))
                    }
                });

                //更新订单
                this.ES.addEventListener(SSEType.E_SOCKET_UPDATA_ORDERLIST, (event) => {
                    const info = JSON.parse(event.data)
                    if (info.orderId === this.$store.getters.getDiningOrderId) {
                        console.log("更新订单====", JSON.stringify(info, null, 2))
                    }
                });

                //更新购物车
                this.ES.addEventListener(SSEType.E_SOCKET_UPDATA_CART, (event) => {
                    const info = JSON.parse(event.data)
                    if (info.orderId === this.$store.getters.getDiningOrderId) {
                        console.log("更新购物车====", JSON.stringify(info, null, 2))
                        this.$store.commit("storeShopCarData", info)
                        this.$root.notify.$emit(SSEType.E_SHOW_TOAST_INFO, info)
                        this.$root.notify.$emit("operateFood")
                    }
                })
            }
        },
    }
</script>


<style scoped>
    .comm-sse {
        width: 1px;
        height: 1px;
        position: absolute;
    }
</style>