<template>
    <div class="order">
        <div class="panel">
            <Title title="节目订单" @E_LEFT_CLICK="backHandler" right="刷新" @E_RIGHT_CLICK="refreshHandler"/>
            <div class="content">
                <OrderItem v-for="(item, index) in orderList" :itemData="item" @confirm="takeOrder"
                           v-if="orderList.length"
                           v-bind:key="Date.now() * Math.random()"></OrderItem>
                <div class="no-data" v-if="!orderList.length">
                    <img :src="getNoDataSrc">
                    <span>当前还没有顾客点歌</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import REQ from "../../comm/request.js";
    import OrderItem from "./program_order_item.vue";
    import Title from "../component/title.vue"

    var roomInfo = window.RINFO;

    export default {
        components: {OrderItem, Title},

        data() {
            return {
                orderList: []
            }
        },
        computed: {
            getNoDataSrc() {
                return REQ.apiStaticDomain + '/static/img/new/diange-no.png'
            }
        },

        mounted() {
            this.getOrderList()
        },

        methods: {
            getOrderList() {
                const params = {actorId: roomInfo.actorId, storeId: roomInfo.storeId}
                REQ.reqProgramOrderInStore(params,
                    (res) => {
                        let data = res.data
                        data.forEach((item, index) => {
                            item.index = index + 1
                        })
                        data = data.reverse()
                        this.orderList = data
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )

            },

            takeOrder(id) {
                const params = {id, storeId: roomInfo.storeId}
                REQ.reqConfirmTakeOrder(params,
                    () => {
                        this.getOrderList()
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            backHandler() {
                this.$router.replace({
                    name: 'home',
                    params: {index: 5}
                })
            },

            refreshHandler() {
                this.getOrderList()
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import "../../../../../style/sass/mixin.scss";

    .order {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;

                .no-data {
                    @include layout-flex-c;
                    align-items: center;

                    img {
                        @include set-width-height(220px, 150px);
                        margin-top: 40%;
                    }

                    span {
                        margin-top: 15px;
                        color: #8d888f;
                        @include font-dpr(15px);
                    }
                }
            }
        }
    }

</style>




