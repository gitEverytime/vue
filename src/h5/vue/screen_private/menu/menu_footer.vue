<template>
    <div class="foot-menu">
        <div class="arrow" v-if="currTabIndex === 1 && rightTabIndex === 0" @click="toggleInputShow">
            <span class="icon" :class="showInput ? 'icon-arrow-down2':'icon-arrow-up2'"></span>
        </div>
        <TempChatInput v-if="showInput && currTabIndex === 1 && rightTabIndex === 0"></TempChatInput>
        <div class="footer" v-if="footMenuShow">
            <div class="btn" @click="tabClickHandler(1)">
                <span class="icon" :class="currTabIndex === 1 ? 'icon-chat-on' : 'icon-chat'"> </span>
                <span class="text" :class="currTabIndex === 1 ? 'active': ''">群聊</span>
            </div>
            <div class="btn" @click="tabClickHandler(2)">
                <span class="icon" :class="currTabIndex === 2 ? 'icon-find-on' : 'icon-find'"> </span>
                <span class="text" :class="currTabIndex === 2 ? 'active': ''">发现</span>
            </div>

            <div class="btn" @click="tabClickHandler(3)">
                <!--<div class="icon" :class="currTabIndex === 3 ? 'icon-fu-on' : 'icon-fu'"></div>-->
                <div class="lucky-bag bgd bg-lucky-bag"></div>
            </div>

            <div class="btn" @click="tabClickHandler(4)">
                <span class="icon" :class="currTabIndex === 4 ? 'icon-meal-on' : 'icon-meal'"> </span>
                <span class="text" :class="currTabIndex === 4 ? 'active': ''">点餐</span>
            </div>
            <div class="btn" @click="tabClickHandler(5)">
                <span class="icon" :class="currTabIndex === 5 ? 'icon-call-on' : 'icon-call'"> </span>
                <span class="text" :class="currTabIndex === 5 ? 'active': ''">呼叫</span>
            </div>
        </div>

    </div>
</template>

<script>


    import TempChatInput from "../child/box/box_chat_input.vue";
    import MsgType from '../comm/msg_type'
    import $ from 'jquery'
    const roomInfo = window.RINFO

    export default {

        components: {TempChatInput},

        data() {
            return {
                showInput: false,
            }
        },

        computed: {
            currTabIndex(){
                return this.$store.getters.getCurrTabIndex
            },

            rightTabIndex() {
                return this.$store.getters.getRightTabIndex
            },

            footMenuShow() {
                return this.$store.getters.getFootMenuShow
            }
        },

        mounted() {
            this.$root.notify.$on(MsgType.EVENT_FOOTER_NO_FOCUS, () => {
            })

            this.$root.notify.$on(MsgType.EVENT_INPUT_HIDE, () => {
                this.showInput = false
            });
        },

        methods: {
            tabClickHandler(index) {
                if (roomInfo.storeId === "b0f4388785cc49498d213a8fca5cd9e5" && index !== 4) {
                    this.$toast.center('暂未开放，敬请期待!')
                    return
                }
                const names = {'zero': 1,'空格': 1,'Secret': 1,'寂然臻化': 1,'马涛MAKER': 1,'majing': 1,'纪先森': 1,}
                switch (index) {
                    case 4:
                        if (names[roomInfo.nickName]) {
                            this.$root.notify.$emit(MsgType.CLIENT_WIN_CLOSE);
                            this.$store.commit("storeCurrTabIndex", 4)
                            window.location.replace("#/Dining")
                        } else {
                            this.$toast.center('暂未开放，敬请期待!')
                        }
                        break
                    case 1:
                        this.$root.notify.$emit(MsgType.CLIENT_WIN_CLOSE);
                        this.$store.commit("storeCurrTabIndex", 1)
                        window.location.replace("#/")
                        break
                    default:
                        this.$toast.center('暂未开放，敬请期待!')
                        return
                }
            },
            toggleInputShow() {
                this.showInput = !this.showInput
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import '../../../../style/sass/mixin.scss';

    .foot-menu {
        @include layout-flex-c;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 100;

        .arrow {
            width: 45px;
            height: 20px;
            background: rgba(0, 124, 100, 0.7);
            @include layout-flex-c-center;
            align-items: center;
            border-radius: 3px 3px 0 0;
        }

        .footer {
            width: 100%;
            @include layout-flex-r;
            height: 50px;
            background-color: #1a1019;
            border-top: 1px solid #291f28;

            .btn {
                @include layout-flex-c;
                justify-content: center;
                align-items: center;
                color: #fff;
                flex: 1;

                .text {
                    @include font-dpr(9px);
                    color: #999;
                    margin-top: 3px;
                }

                .active {
                    color: #01b695;
                }

                .lucky-bag {
                    @include set-width-height(35px , 40px)
                }
            }
        }
    }

</style>




