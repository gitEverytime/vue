<template>
    <div class="knapsack">
        <div class="panel">
            <Title title="背包说明" @E_LEFT_CLICK="backHandler"/>
            <span class="ico icon icon-my-knapsack"></span>
            <p>背包里存放的</p>
            <p>是平台赠送的打赏道具和礼物</p>
            <p>平台会员升级即可获得</p>
            <span class="ico icon icon-membership-card2"></span>
            <p>会员卡是您在单独店内办理的会员卡</p>
            <p>享受该店内的会员特权</p>
            <div class="content">
                <Button class="btn" text="返回" @click.native="backHandler"/>
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
                    params: {index: 3}
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .knapsack {
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