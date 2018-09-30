<template>
    <div class="theme-reward">
        <img v-bind:src="pic" class="reward-img" @click="rewardClick">
        <div class="reward-title">
            打赏给
            <span class="name">{{tableName ? tableName + '桌 ': ''}}{{tname}}</span>
            {{mediaTitle + ' x '}} {{count}}
        </div>
        <div class="reward-msg">
            {{msg}}
        </div>
        <OperationMenu :mid="mid" :cid="cid" :liked="liked" :likedNumber="likedNumber"></OperationMenu>
    </div>
</template>

<script>

    import OperationMenu from './chat_msg_operation.vue'
    import ConstValue from '../../comm/const_value'
    import MsgType from '../../comm/msg_type'

    export default {

        props: ["sId", "msg", "mediaTitle", "pic", "mid", "cid", "tid", "tname", "count", "liked", "likedNumber", "tableName",
            "type", "rid", "cname", "headimg"],

        data() {
            return {
                title: '',
            }
        },

        components: {OperationMenu},

        computed: {},

        methods: {
            rewardClick() {
                if (this.type == ConstValue.INTERACTION_REDPACKET_ONE || this.type == ConstValue.INTERACTION_REDPACKET_ALL) {
                    const data = {
                        headimg: this.headimg,
                        rid: this.rid,
                        cname: this.cname,
                        content: this.msg
                    }
                    const type = this.type == ConstValue.INTERACTION_REDPACKET_ONE ? MsgType.DISPATCH_DOWN_RED_PACKAGE_PRI : MsgType.DISPATCH_DOWN_RED_PACKAGE_PUB
                    this.$root.notify.$emit(type, data)
                }
            }
        }
    }
</script>


<style lang='scss' scoped>

    @import '../../../../../style/sass/mixin.scss';

    .theme-reward {
        @include layout-flex-c;
        position: relative;

        .reward-title {
            @include font-dpr(14px);
            color: #cccccc;
            @include set-height(45px);
            line-height: 20px;
            word-break: break-all;
            word-wrap: break-word;
            padding-right: 45px;
            border-bottom: 1px solid rgba(1, 182, 149, 0.2);

            .name {
                color: #01b695;
            }
        }

        .reward-msg {
            color: #999;
            @include font-dpr(13px);
            padding: 3px 5px 3px 0;
            display: block;
            word-break: break-all;
            word-wrap: break-word;
        }

        .reward-img {
            @include set-width-height(50px, 50px);
            position: absolute;
            top: -15px;
            right: -15px;
        }
    }
</style>




