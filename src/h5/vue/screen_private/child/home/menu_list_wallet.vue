<template>
    <div class="list-wallet">
        <div class="card">
            <span class="cash bgd bg-icon-cash"></span>
            <div class="money">现金余额
                <span class="number">
                    {{amountTotal}}
                </span>元
            </div>
        </div>
        <span class="btn-cash" @click="cashClick">提现</span>
        <span class="btn-bill" @click="billClick">账单</span>
        <span class="btn-explain" @click="explainClick">提现说明</span>
    </div>

</template>

<script>
    import REQ from "../../comm/request"

    const roomInfo = window.RINFO

    export default {
        props: [],

        data() {
            return {
                accountStatus: '1', //账户状态。1：正常，0：冻结
                amountTotal: 0,
            }
        },

        computed: {},

        mounted() {
            this.getUserAccountInfo()
        },

        methods: {
            cashClick() {
                this.$toast.center('现金余额大于100元才可以提现！')
            },

            billClick() {
                window.location.href = '#/Bill'
            },

            explainClick() {
                window.location.href = '#/CashExplain'
            },

            getUserAccountInfo() {
                REQ.reqGetUserAccountInfo({cid: roomInfo.clientId},
                    (res) => {
                        const info = res.data
                        this.accountStatus = info.status
                        this.amountTotal = info.amountTotal
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    })
            }

        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .list-wallet {
        @include layout-flex-c;
        align-items: center;
        flex: 1;
        border: 35px solid transparent;

        .card {
            width: 100%;
            @include layout-flex-c;
            justify-content: flex-end;
            align-items: center;
            @include set-height(160px);
            background: #160a15;
            border-radius: 9px;
            @include box-shadow(0px 0px 25px #241010);

            .cash {
                @include set-width-height(60px, 49px);
                margin-bottom: 15px;
            }

            .money {
                @include font-dpr(14px);
                color: #8d888f;
                margin: 8px 0 25px 0;

                .number {
                    @include font-dpr(25px);
                    color: #f5f5f5;
                    margin: 0 1px 0 5px;
                }
            }
        }

        .btn-cash {
            margin-top: 20px;
            width: 65%;
            text-align: center;
            background-color: #cd533e;
            @include set-h(44px);
            border-radius: 4px;
            color: #f5f5f5;
            @include font-dpr(16px);
        }

        .btn-bill {
            text-align: center;
            @include set-h(42px);
            border-radius: 4px;
            margin-top: 20px;
            color: #cd533e;
            border: 1px solid #cd533e;
            width: 65%;
            @include font-dpr(16px);
        }

        .btn-explain {
            margin-top: 20px;
            color: #cd533e;
            border-bottom: 1px solid #cd533e;
            @include font-dpr(14px);
            line-height: 14px;
        }
    }

</style>