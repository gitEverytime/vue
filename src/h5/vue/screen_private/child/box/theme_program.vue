<template>
    <div class="theme_program">
        <div class="title">
            {{"【"+getProgramType+"】" + this.mediaTitle}}
        </div>
        <div class="name-line">
            <div class="icon icon-playing"></div>
            <div class="name">
                {{getActorType}} {{this.actorName}}
            </div>
        </div>
        <div class="msg">
            {{this.msg}}
        </div>
        <OperationMenu :mid="mid" :cid="cid" :liked="liked" :likedNumber="likedNumber"></OperationMenu>
    </div>

</template>

<script>
    import OperationMenu from './chat_msg_operation.vue'
    import ConstValue from '../../comm/const_value'

    export default {
        props: ["mediaTitle", "msg", "actorType", "actorName", "cid", "mid", "type", "liked", "likedNumber"],

        data() {
            return {}
        },

        computed: {
            getActorType() {
                return ConstValue.getActorType(this.actorType) + '-'
            },

            getProgramType() {
                return ConstValue.getGrogramTypeNameByType(this.type)
            }
        },

        components: {OperationMenu},

        mounted() {
        },

        methods: {
            setSelectValue(data) {
                this.$emit("E_CLICK", data)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .theme_program {
        @include layout-flex-c
    }

    .theme_program .msg {
        color: #999;
        @include font-dpr(13px);
        padding: 3px 5px 3px 0;
        display: block;
        word-break: break-all;
        word-wrap: break-word;
    }

    .theme_program .title {
        @include font-dpr(13px);
        color: #ff33dd;
    }

    .theme_program .name-line {
        @include layout-flex-r-sb;
        align-items: center;
    }

    .theme_program .name-line .name {
        @include font-dpr(13px);
        color: #ff33dd;
        padding: 5px 0;
    }

    .theme_program .img {
        width: 100%;
        height: auto;
        border-radius: 6px;
        margin: 5px 0;
    }

</style>