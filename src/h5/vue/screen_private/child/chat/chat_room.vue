<template>
    <div class="chat-room">
        <div class="panel">
            <Title :title="chatUserInfo.nickname || ''" @E_LEFT_CLICK="backHandler"/>
            <div class="content" ref="content">
                <MessageItem v-for="item in getChatList" v-bind:key="Date.now() * Math.random()"
                             v-bind:itemData="item"></MessageItem>
            </div>
            <ChatInput v-bind:chatUserInfo="chatUserInfo"/>
        </div>
    </div>

</template>

<script>
    import MessageItem from "./child/message_item.vue"
    import MsgType from "../../comm/msg_type.js";
    import Title from "../component/title.vue"
    import ChatInput from "./child/chat_input.vue"

    const roomInfo = window.RINFO;

    export default {
        props: [],

        data() {
            return {
                chatUserInfo: {},
                chatList: []
            }
        },

        components: {MessageItem, Title, ChatInput},

        computed: {

            getChatList() {
                return this.chatList;
            }

        },

        mounted() {
            this.refreshChatList();

            this.$root.notify.$on(MsgType.DISPATCH_DOWN_PRI_CHAT, () => {
                this.refreshChatList();
            });
        },

        watch: {
            chatList() {
                setTimeout(() => {
                    this.scrollToBottom()
                }, 100)
            }
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            scrollToBottom() {
                const content = this.$refs.content
                const lastChild = content.lastElementChild
                lastChild && lastChild.scrollIntoView(false)
            },

            setSelectValue(data) {
                this.$emit("E_CLICK", data)
            },

            refreshChatList() {
                let getInstance = this.$store.getters;
                this.chatUserInfo = getInstance.getCurrChatUserInfo;
                this.chatList = getInstance.getChatListByToUserId(this.chatUserInfo.clientId)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .chat-room {
        @include window;

        .panel {
            @include panel;

            .content {
                width: 100%;
                flex: 1;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }

            .bottom {
                @include layout-flex-c;
                height: auto;
            }
        }
    }
</style>
