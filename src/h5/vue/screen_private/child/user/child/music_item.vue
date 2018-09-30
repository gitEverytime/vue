<template>
    <div class="music-item" v-on:click="selectMusic" :style="{borderBottomColor: end ? 'transparent' : '#453844'}">
        <div class="info-content">
            <div class="title">
                {{this.idx + '.' + this.itemData.title}}
            </div>
            <div class="icon" :class="musicOn ? 'icon-checked' : ''">
            </div>
        </div>
        <!--<TempInput v-if="musicOn"/>-->
    </div>

</template>

<script>
    import TempInput from "../../component/box_input_text.vue"
    export default {
        props: ["itemData", "idx", "musicOn", "end"],

        data() {
            return {}
        },

        components: {TempInput},

        mounted() {
        },

        methods: {
            selectMusic() {
                this.$emit("E_CLICK_MUSIC", this.itemData)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .music-item {
        @include layout-flex-c;
        margin: 0 10px;
        border-bottom: 1px solid #453844;

        .info-content {
            @include layout-flex-r-sb;
            height: 35px;
            align-items: center;

            .title {
                @include font-dpr(13px);
                color: #bbbbbb;
            }
        }

        .message {
            @include layout-flex-r-center;
            margin: 5px 0 0 0;
            @include placeholder(#8d888f, 13px);

            .note {
                @include font-dpr(13px);
                width: 90%;
                height: 30px;
                padding: 8px;
                border: 1px solid #453844;
                border-radius: 4px;
                font-weight: 500;
                color: #8d888f;
                margin-bottom: 10px;
                background: #382e37;
            }
        }
    }

</style>
