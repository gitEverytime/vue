<template>
    <div class="screen-show" ref="screen">
        <div class="list-msg" ref="list">
                <div v-for="item in getMsgList" v-bind="{key:Date.now()* Math.random() }">
                    <TempBoxMsg v-bind="item"></TempBoxMsg>
                </div>
        </div>

    </div>
</template>

<script>

    import Vue from 'vue';
    import $ from "jquery";

    import MsgType from "../../comm/msg_type.js";
    import CatchControl from "../../comm/catch_control.js";
    import TempBoxMsg from "./box_msg.vue";


    var roomInfo = window.RINFO;


    export default {
        components: {TempBoxMsg},

        data() {
            return {}
        },

        computed: {
            getMsgList() {
                return this.$store.getters.getScreenDataList;
            }

        },

        watch: {},

        mounted() {
            const panelEle = this.$refs.screen
            panelEle.style.height = window.innerHeight - 35 - 50 + 'px'

            const list = this.$refs.list
            const lastChild = list.lastElementChild
            lastChild && lastChild.scrollIntoView(false)

            this.$root.notify.$on(MsgType.CHAT_PUB_SCROLL_TO_BOTTOM, () => {
                this.timer && clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    const list = this.$refs.list
                    const lastChild = list.lastElementChild
                    lastChild && lastChild.scrollIntoView(false)
                }, 500)
            })

            this.$store.commit("storeRightTabIndex", 0)
            this.addScrollListener()
        },

        methods: {
            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },

            addScrollListener() {
                const list = this.$refs.screen
                list.addEventListener('scroll', (e) => {
                    const target = e.target
                    if(target.scrollTop === 0 && this.$store.getters.getPubChatHasData) {
                        this.$loading("加载中...")
                        this.$store.commit("storeHistoryPubChat", () => {
                            setTimeout(() => {
                                const firstPageLast = this.$refs.list.children[19]
                                firstPageLast && firstPageLast.scrollIntoView({behavior: "smooth"});
                                this.$loading.close()
                            }, 200)
                        })
                    }
                })
            }
        }
    }
</script>


<style lang='scss' scoped>

    @import '../../../../../style/sass/mixin.scss';

    .screen-show {
        position: absolute;
        width: 100%;
        padding-top: 35px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .list-msg {
        flex: 1;

        .more {
            @include set-height(20px)
        }
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter {
        opacity: 0;
        transform: translateY(30px);
    }

</style>




