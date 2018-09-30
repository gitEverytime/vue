<template>
    <transition name="modal-fade">
        <div class="modal" @click="close" v-show="show">
            <div class="panel" @click.stop>
                <span class="close icon icon-close-on" @click="close"></span>
                <h1 class="content">请选择桌号</h1>
                <div class="line">
                    <span>您所在的楼层</span>
                    <select v-model="floor" @change="floorChange">
                        <option v-for="(item, key) in floorList" :value="key">{{item.room.roomName}}</option>
                    </select>
                </div>

                <div class="line">
                    <span>您所在的桌号</span>
                    <select v-model="table">
                        <option v-for="(item, key) in tableList" :value="key">{{item.tableName}}</option>
                    </select>
                </div>

                <h2 class="btn" @click="confirm">确认</h2>
            </div>
        </div>
    </transition>

</template>

<script>
    import REQ from '../../../comm/request'

    const roomInfo = window.RINFO

    export default {
        props: ["show"],

        data() {
            return {
                floor: 0,
                table: 0,
                floorList: [],
                tableList: [],
            }
        },

        computed: {},

        mounted() {
            this.getTableList()
        },

        methods: {
            close() {
                this.$emit("close")
            },

            confirm() {
                if (!this.tableList || !this.tableList.length) {
                    this.$toast.center('请选择桌号')
                    return
                }
                const tableId = this.tableList[this.table].tableName
                this.$emit("confirm", tableId)
            },

            getTableList() {
                REQ.reqGetDiningTableList({storeId: roomInfo.storeId, table: {tableType: 0}},
                    (res) => {
                        this.floorList = res.data.rooms;
                        if (this.floorList.length) {
                            this.tableList = this.floorList[0].tables
                            this.filterData()
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            floorChange(e) {
                this.tableList = this.floorList[e.target.value].tables
                this.filterData()
                this.table = 0
            },

            filterData() {
                this.tableList = this.tableList.filter(item => !item.orderId)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .modal {
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

            .close {
                position: absolute;
                top: 10px;
                right: 10px;
            }

            .content {
                @include font-dpr(15px);
                color: #01b695;
                line-height: 25px;
                text-align: center;
            }

            .btn {
                @include set-h(33px);
                text-align: center;
                border-radius: 4px;
                background: #cd533e;
                color: #f5f5f5;
                @include font-dpr(14px);
                margin: 25px 0 10px 0;
                width: 46%;
            }

            .line {
                @include layout-flex-r;
                align-items: center;
                width: 100%;
                margin-top: 15px;

                span {
                    color: #8D888F;
                    @include font-dpr(14px);
                    margin-left: 10px;
                    margin-right: 10px;
                }

                select {
                    color: #CCCCCC;
                    @include font-dpr(14px);
                    flex: 1;
                    width: 100%;
                    margin-right: 10px;
                    background: transparent;
                    border: 1px solid #635A66;
                    border-radius: 4px;
                    padding-left: 5px;
                    height: 34px;
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