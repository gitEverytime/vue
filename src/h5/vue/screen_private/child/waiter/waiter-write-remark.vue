<template>
    <div class="write-remark">
        <div class="panel">
            <Title title="整单备注" right="完成" @E_LEFT_CLICK="backHandler" @E_RIGHT_CLICK="completeClick"/>
            <span class="sub-title">输入备注</span>
            <div class="input-cover">
                <textarea class="input" maxlength="50" placeholder="请输入口味、偏好等要求" :value="remark"
                          @input="remarkChange"></textarea>
                <span class="count">{{remark.length}}/50</span>
            </div>
            <span class="sub-title">快捷标签</span>
            <div class="content">
                <span class="label" v-for="item in labels" @click="clickLabel(item)">{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from "../component/title.vue"

    export default {
        props: [],

        components: {Title},

        data() {
            return {
                remark: '',
                labels: ["加点辣", "不吃辣", "少放辣", "多放辣", "不吃蒜","不吃香菜","不吃葱","清淡一点"]
            }
        },

        computed: {},

        mounted() {
            this.remark = this.$store.getters.getRemark
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            completeClick() {
                this.$store.commit('storeUpdateRemark', this.remark)
                this.backHandler()
            },

            remarkChange(e) {
                this.remark = e.target.value
            },

            clickLabel(label) {
                const text = this.remark.length ? ' ': ''
                const string = this.remark + text + label
                if (string.length > 50) {
                    this.$toast.center('最多50字哦~')
                    return
                } else {
                    this.remark = string
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .write-remark {
        @include window;

        .panel {
            @include panel;

            .sub-title {
                margin: 13px 10px 10px 10px;
                @include font-dpr(15px);
                border-left: 2px solid #01B695;
                color: #01B695;
                text-indent: 10px;
                line-height: 14px;
            }

            .input-cover {
                @include layout-flex-c;
                margin: 3px 10px;
                border-radius: 4px;
                background: #322831;
                border: 1px solid #4A3F49;
                @include placeholder(#8d888f, 14px);
                align-items: flex-end;

                .input {
                    width: 100%;
                    @include set-height(110px);
                    resize: none;
                    color: #8d888f;
                    @include font-dpr(15px);
                    line-height: 16px;
                    border: 0 solid transparent;
                    background: transparent;
                    box-sizing: border-box;
                    padding: 10px;
                }

                .count {
                    margin: 0 10px 10px 0;
                    color: #8d888f;
                    @include font-dpr(15px);
                }
            }

            .content {
                @include layout-flex-r-wrap;
                margin: 3px;

                .label {
                    @include font-dpr(15px);
                    color: #8d878f;
                    border: 1px solid #4A3F49;
                    background: transparent;
                    margin: 7px;
                    padding: 10px 15px;
                    border-radius: 4px;
                }
            }
        }
    }

</style>