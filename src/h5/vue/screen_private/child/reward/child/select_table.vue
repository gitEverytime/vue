<template>
    <div class="select-line">
        <div class="select-cover">
            <span class="number">选择楼层</span>
            <select v-model="floor" @change="floorChange" class="select">
                <option v-for="(item, key) in floorList" :value="key" class="option">{{item.room.roomName}}</option>
            </select>
        </div>

        <div class="select-cover" style="justify-content: flex-end; padding-right: 10px;">
            <span class="number">选择桌号</span>
            <select v-model="table" @change="tableChange" class="select">
                <option :value="-1" class="option">不选</option>
                <option v-for="(item, key) in tableList" :value="key" class="option">{{item.tableName}}</option>
            </select>
        </div>
    </div>

</template>

<script>
    import REQ from '../../../comm/request'

    const roomInfo = window.RINFO

    export default {
        props: [],

        data() {
            return {
                floor: 0,
                table: -1,
                floorList: [],
                tableList: [],
            }
        },

        computed: {},

        mounted() {
            this.getTableList()
        },

        methods: {
            getTableList() {
                REQ.reqGetDiningTableList({storeId: roomInfo.storeId, table: {tableType: 0}},
                    (res) => {
                        this.floorList = res.data.rooms;
                        if (this.floorList.length) {
                            this.tableList = this.floorList[0].tables
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
                this.table = -1
                this.$emit("tableChange", '')
            },

            tableChange(e) {
                if (e.target.value == -1) {
                    this.$emit("tableChange", '')
                } else {
                    this.$emit("tableChange", {
                        tableId: this.tableList[e.target.value].id,
                        tableName: this.tableList[e.target.value].tableName,
                    })
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .select-line {
        @include layout-flex-r-sb;
        align-items: center;
        height: 40px;
        margin-bottom: 5px;
    }

    .select-line .select-cover {
        @include layout-flex-r;
        align-items: center;
        width: 100%;
        padding-left: 10px;
    }

    .select-line .select-cover .number {
        margin-right: 10px;
        color: #8d888f;
        @include font-dpr(14px);
    }

    .select-line .select-cover .select {
        height: 25px;
        width: 40%;
        border-radius: 4px;
        border-color: #322831;
        color: #8d888f;
        @include font-dpr(14px);
        background: transparent;

        .option {
            background: transparent;
        }
    }
</style>