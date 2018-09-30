<template>
    <div class="program">
        <div class="panel">
            <Title title="节目列表" @E_LEFT_CLICK="backHandler" right="+ 添加节目" @E_RIGHT_CLICK="showAdd"/>
            <div class="content">
                <div v-if="!cloudProgramList.length" class="no-data">
                    <span class="no-program bgd bg-no-program"></span>
                    <span class="no-text">亲爱的，你还没有添加节目哦~</span>
                </div>
                <div v-if="cloudProgramList.length" class="has-data">
                    <div class="line" v-for="item in cloudProgramList">
                        <div class="left"><span>{{getProgramType(item.type)}}</span>-{{' ' + item.title}}</div>
                        <div class="right">
                            <span class="icon icon-edit" @click="updateHandler(item)"></span>
                            <span class="divide"></span>
                            <span class="icon icon-delete" @click="deleteHandler(item)"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Confirm type="music" :content="['确定删除这个节目吗？']" confirmText="确定" cancelText="取消" :show="confirmShow"
                 @close="closeConfirm" @confirm="confirmEnsure"/>
        <ProgramEdit type="add" :show="addShow" @close="closeAdd" :currProgramData="currProgramData"
                     @refresh="refreshHandler"/>
        <ProgramEdit type="update" :show="updateShow" @close="closeUpdate" :currProgramData="currProgramData"
                     @refresh="refreshHandler"/>
    </div>
</template>

<script>
    import REQ from '../../comm/request.js'
    import Title from "../component/title.vue"
    import Confirm from "../component/confirm.vue"
    import ProgramEdit from "./program_edit.vue"
    import ConstValue from "../../comm/const_value"

    var roomInfo = window.RINFO


    export default {

        components: {Title, Confirm, ProgramEdit},

        data() {
            return {
                cloudProgramList: [],
                currProgramData: {id: "", type: "1", title: ""},
                confirmShow: false,
                addShow: false,
                updateShow: false,
            }
        },
        computed: {},

        mounted() {
            this.getCloudProgramList();
        },


        methods: {
            backHandler() {
                this.$router.replace({
                    name: 'home',
                    params: {index: 5}
                })
            },

            getCloudProgramList() {
                var posData = {actorId: roomInfo.actorId};
                REQ.reqActorProgramInCloud(posData,
                    (data) => {
                        this.cloudProgramList = data.data.rows
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                );

            },

            deleteHandler(item) {
                this.currProgramData = item
                this.confirmShow = true
            },

            updateHandler(item) {
                this.currProgramData = item
                this.showUpdate()
            },

            confirmEnsure() {
                REQ.reqActorDeleteProgram({id: this.currProgramData.id},
                    () => {
                        this.refreshHandler()
                        this.closeConfirm()
                    },
                    (complete) => {
                    },
                    (err) => {
                        console.error(err)
                    })
            },

            closeConfirm() {
                this.confirmShow = false
            },

            showAdd() {
                this.currProgramData = {id: "", type: "1", title: ""}
                this.addShow = true
            },

            showUpdate() {
                this.updateShow = true
            },

            closeAdd() {
                this.addShow = false
            },

            closeUpdate() {
                this.updateShow = false
            },

            refreshHandler() {
                this.closeAdd()
                this.closeUpdate()
                this.getCloudProgramList();
            },

            getProgramType(type) {
                return ConstValue.getGrogramTypeNameByType(type) + " "
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import '../../../../../style/sass/mixin.scss';

    .program {
        @include window;

        .panel {
            @include panel;

            .content {
                width: 100%;
                flex: 1;
                overflow-y: auto;

                .has-data {
                    @include layout-flex-c;
                    width: 100%;
                    flex: 1;

                    .line {
                        @include layout-flex-r-sb;
                        background: #322831;
                        margin-top: 10px;
                        @include set-height(48px);
                        align-items: center;

                        .left {
                            @include font-dpr(15px);
                            color: #cccccc;
                            margin-left: 10px;

                            span {
                                color: #01b695;
                            }
                        }

                        .right {
                            @include layout-flex-r;
                            align-items: center;
                            margin-right: 10px;

                            .divide {
                                width: 1px;
                                height: 15px;
                                background: #8d888f;
                                margin: 0 15px;
                            }
                        }
                    }
                }

                .no-data {
                    @include layout-flex-c-center;
                    align-items: center;
                    flex: 1;

                    .no-program {
                        @include set-width-height(220px, 150px);
                        margin-top: 35%;
                    }

                    .no-text {
                        @include font-dpr(15px);
                        color: #8d888f;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>




