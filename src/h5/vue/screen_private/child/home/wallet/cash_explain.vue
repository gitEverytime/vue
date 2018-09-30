<template>
    <div class="cash-explain">
        <div class="panel">
            <Title title="提现" @E_LEFT_CLICK="backHandler"/>
            <span class="ico icon icon-wallet-green"></span>
            <p>钱包是用于存储你红包和打赏的收益功能</p>
            <p>钱包里的余额可用于打赏点餐支出</p>
            <p>也可以进行提现操作</p>
            <p>全程通过微信支付完成</p>
            <span class="ico icon icon-calendar"></span>
            <p>提现时间为每周一</p>
            <span class="ico icon icon-turn-out"></span>
            <p>必须为10元的倍数</p>
            <p>且平台收取10%提现手续费</p>
            <div class="content">
                <Button class="btn" text="去提现" @click.native="getCash"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from "../../component/title.vue"
    import Button from "../../component/button.vue"

    export default {
        props: [],

        components: {Title, Button},

        data() {
            return {}
        },

        computed: {},

        mounted() {

        },

        methods: {
            backHandler() {
                this.$router.replace({
                    name: 'home',
                    params: {index: 2}
                })
            },

            getCash() {
                this.$toast.center('现金余额大于100元才可以提现！')
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .cash-explain {
        @include window;

        .panel {
            @include panel;
            align-items: center;
            position: relative;

            .ico {
                margin-top: 30px;
            }

            p {
                color: #8D888F;
                @include font-dpr(14px);
                margin-top: 6px;
            }

            .content {
                width: 100%;
                position: absolute;
                bottom: 10px;
            }
        }
    }
</style>