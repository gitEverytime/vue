<template>
    <transition name="modal-fade">
        <div class="program-edit" @click="close" v-show="show">
            <div class="panel" @click.stop>
                <span class="ico icon icon-modal-music"></span>
                <span class="close icon icon-close-on" @click="close"></span>

                <div class="line">
                    <span class="name">曲目类别</span>
                    <select class="select" v-model="programType">
                        <option v-for="(val, key) in getProgramTypes" v-bind:value="key">{{val}}</option>
                    </select>
                </div>

                <div class="line">
                    <span class="name">输入名称</span>
                    <input type="text" class="input" v-model="programTitle">
                </div>

                <div class="btn-cover">
                    <h2 class="cancel" @click="close">取消</h2>
                    <h2 class="btn" @click="confirm">确定</h2>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
    import ConstValue from "../../comm/const_value"
    import REQ from "../../comm/request"

    const roomInfo = window.RINFO

    export default {
        props: ["type", "show", "currProgramData"],

        data() {
            return {
                programType: this.currProgramData.type,
                programTitle: this.currProgramData.title
            }
        },

        watch: {
            currProgramData() {
                this.programType = this.currProgramData.type
                this.programTitle = this.currProgramData.title
            }
        },

        computed: {
            getProgramTypes() {
                return ConstValue.getAllProgramType();
            }
        },

        mounted() {
        },

        methods: {
            close() {
                this.$emit("close")
            },

            confirm() {
                if (!this.programTitle) {
                    this.$toast.center('请输入名称')
                    return
                }
                if (this.type == 'add') {
                    const params = {
                        actorId: roomInfo.actorId,
                        title: this.programTitle,
                        type: this.programType,
                    }
                    REQ.reqActorAddProgram(params,
                        () => {
                            this.$emit("refresh")
                        },
                        (complete) => {
                        },
                        (err) => {
                            this.$logger.error(err)
                        }
                    )
                } else {
                    const params = {
                        id: this.currProgramData.id,
                        title: this.programTitle,
                        type: this.programType,
                    }
                    REQ.reqActorUpdateProgram(params,
                        () => {
                            this.$emit("refresh")
                        },
                        (complete) => {
                        },
                        (err) => {
                            this.$logger.error(err)
                        }
                    )
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../style/sass/mixin';

    .program-edit {
        @include layout-flex-c-center;
        align-items: center;
        position: fixed;
        z-index: 9000;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;

        .panel {
            @include layout-flex-c;
            align-items: center;
            width: 75%;
            border-radius: 5px;
            background: #3b313a;
            padding: 15px 0;
            position: relative;
            margin-bottom: 20%;
            @include box-shadow(0 0 15px #000);

            .ico {
                margin-bottom: 15px;
            }

            .close {
                position: absolute;
                top: 10px;
                right: 10px;
            }

            .line {
                @include layout-flex-r-sb;
                align-items: center;
                margin: 6px 0;
                width: 84%;

                .name {
                    flex: 1;
                    @include font-dpr(14px);
                    color: #8d888f;
                }

                .input {
                    flex: 2;
                    @include font-dpr(14px);
                    color: #dddddd;
                    @include set-height(32px);
                    background: transparent;
                    border: 1px solid #8d888f;
                    border-radius: 4px;
                    text-indent: 6px;
                    width: 100%;
                }

                .select {
                    flex: 2;
                    @include font-dpr(14px);
                    color: #01b695;
                    @include set-height(34px);
                    background: transparent;
                    border: 1px solid #8d888f;
                    border-radius: 4px;
                    text-indent: 6px;
                    width: 100%;
                }
            }

            .btn-cover {
                @include layout-flex-r-sb;
                margin: 15px 0 10px 0;
                width: 84%;

                .cancel {
                    @include set-h(31px);
                    text-align: center;
                    border-radius: 4px;
                    border: 1px solid #cd533e;
                    color: #cd533e;
                    @include font-dpr(14px);
                    width: 45%;
                }

                .btn {
                    @include set-h(33px);
                    text-align: center;
                    border-radius: 4px;
                    background: #cd533e;
                    color: #f5f5f5;
                    @include font-dpr(14px);
                    width: 45%;
                }
            }
        }
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease
    }

</style>