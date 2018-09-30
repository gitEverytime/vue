<template>
    <div class="chat-list">
        <div class="panel">
            <Title title="私信" @E_LEFT_CLICK="backHandler" :right="'   '" @E_RIGHT_CLICK="rightClick"/>
            <div class="content">
                <ListItem v-for="(item, key) in getChatDic" v-bind:itemData="getItemData(key,item)"
                          v-on:E_CLICK_ITEM="clickItemHandler"
                          v-if="Object.keys(getChatDic).length"
                          v-bind:key="Date.now() * Math.random()"></ListItem>
                <div class="no-data" v-if="!(Object.keys(getChatDic).length)">
                    <img :src="getNoDataSrc">
                    <span>当前私信列表为空</span>
                </div>
            </div>
        </div>
        <img src="http://log.ibigtop.com/log/1/1" style="width: 1px; height: 1px; position: absolute">
    </div>
</template>

<script>
    import ListItem from "./child/list_item.vue"
    import CatchControl from "../../comm/catch_control"
    import Title from "../component/title.vue"
    import REQ from '../../comm/request'

    const roomInfo = window.RINFO;

    export default {
        props: [],

        data() {
            return {
                userChatDic: {},
                rightCount: 0,
            }
        },

        components: {ListItem, Title},

        computed: {
            getChatDic() {
                return this.userChatDic
            },
            getNoDataSrc() {
                return REQ.apiStaticDomain + '/static/img/new/sixin-no.png'
            }
        },

        mounted() {
            this.userChatDic = this.$store.getters.getChatDic;
        },

        methods: {
            backHandler() {
                this.$router.back()
            },

            getItemData(key, chatList) {
                if (!chatList) return;
                let chatCount = chatList.length;
                let lastChat = chatCount >= 1 ? chatList[chatCount - 1] : {message: "", date: Date.now()};

                let simpleData = {
                    headimg: CatchControl.getUserById(key).headimg,
                    userId: key,
                    content: lastChat.content,
                    pic: lastChat.pic,
                    date: lastChat.date,
                }

                return simpleData;
            },

            clickItemHandler(data) {
                var userInfo = CatchControl.getUserById(data.userId);
                this.$store.commit("setChatUserInfo", userInfo)
                this.$router.push({name: 'chatRoom'})
            },

            rightClick() {
                clearTimeout(this.timer)
                this.rightCount++
                setTimeout(() => {
                    this.rightCount = 0
                }, 1000)
                if (this.rightCount === 5) {
                    console.log("连续点击5次")
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .chat-list {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;

                .no-data {
                    @include layout-flex-c;
                    align-items: center;

                    img {
                        @include set-width-height(200px, 136px);
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