<template>
    <div class="apply-notes">
        <div class="panel">
            <TempTitle title="申请成为艺人" @E_LEFT_CLICK="backHandler"/>
            <div class="content">
                <h1 class="top">成为艺人须知</h1>
                <p>1、注册入驻后可成为毕果平台歌手，享有平台提供一切关于歌手的权限，并可积累属于自己的粉丝。</p>
                <p>2、可致电各地服务商签约成为毕果平台签约歌手，平台提供演出需求，具体事宜请咨询当地服务商或毕果总部。 </p>
                <p>3、凡成功入驻的艺人，不得在本平台发布包括但不仅限于淫秽、色情、暴力、反动、不文明等文字、图片、视频、语音等内容，一经发现即刻封号且永不通过，行为恶劣者将提供信息给当地执法部门。</p>
                <p>4、所获得收益需遵循本平台分配机制，具体分配机制以各地服务商及实体店决定，且依法扣除相关税费。 </p>
                <p>5、以上解释权归本平台所有。 </p>
                <div class="check-line" @click="checkedOrNot">
                    <span class="icon" :class="this.checked ? 'icon-checked-square' : 'icon-unchecked'"/>
                    <span>我已认真阅读，并遵守此须知</span>
                </div>
            </div>
            <Button text="下一步" @click.native="nextPage"></Button>
        </div>
    </div>
</template>
<script>
    import TempTitle from "../../component/title.vue"
    import Button from "../../component/button.vue"

    export default {
        props: [],

        data() {
            return {
                checked: false
            }
        },

        components: {TempTitle, Button},

        computed: {},

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            nextPage() {
                if (!this.checked) {
                    this.$toast.center('请勾选阅读须知')
                    return
                }
                this.$router.replace({name: 'ApplyForm'})
            },

            checkedOrNot() {
                this.checked = !this.checked
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .apply-notes {
        @include window;

        .panel {
            @include panel;

            .content {
                width: 100%;
                flex: 1;
                overflow-y: auto;

                .top {
                    color: #01b695;
                    @include font-dpr(15px);
                    margin: 20px 0;
                    text-align: center;
                }

                p {
                    padding: 0 20px 10px 20px;
                    color: #ccc;
                    @include font-dpr(14px);
                    line-height: 20px;
                }

                .check-line {
                    @include layout-flex-r;
                    align-items: center;
                    padding-left: 20px;
                    margin: 15px 0;

                    span {
                        color: #8d888f;
                        @include font-dpr(14px);
                        line-height: 20px;
                        margin-right: 5px;
                    }
                }
            }
        }
    }

</style>