<template>
    <div class="choose-table">
        <div class="panel">
            <Title title="填写客人信息" :noLeft="true"></Title>
            <div class="line" style="margin-top: 30px">
                <span>选择楼层</span>
                <select v-model="floor" @change="floorChange">
                    <option v-for="(item, key) in floorList" :value="key">{{item.room.roomName}}</option>
                </select>
            </div>

            <div class="line">
                <span>选择桌号</span>
                <select v-model="table">
                    <option v-for="(item, key) in tableList" :value="key">{{item.tableName}}</option>
                </select>
            </div>

            <div class="line">
                <span>选择人数</span>
                <select v-model="number">
                    <option v-for="i in 20" :value="i">{{i}}人</option>
                </select>
            </div>

            <Button text="确定" @click.native="confirm" style="margin-top: 30%;"></Button>

        </div>
    </div>
</template>
<script>
    import Title from '../component/title.vue'
    import REQ from '../../comm/request'
    import Button from '../component/button.vue'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title, Button},

        data() {
            return {
                floor: 0,
                table: 0,
                floorList: [],
                tableList: [],
                number: 0,
            }
        },

        computed: {},

        mounted() {
            this.getTableList()
            this.$store.commit('storeUpdateRemark', "")
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
                this.table = 0
            },

            confirm() {
                const tableId = this.tableList[this.table].id
                const tableName = this.tableList[this.table].tableName
                if (!tableId) {
                    this.$toast.center('请选择桌号')
                    return
                }
                if (!this.number) {
                    this.$toast.center('请选择人数')
                    return
                }
                const params = {
                    tableIds: [tableId],
                    dinerCount: this.number,
                    storeId: roomInfo.storeId,
                    // waiterId: roomInfo.staffId,
                    waiterId: "waiter001",
                }

                REQ.reqDiningWaiterOpen(params,
                    (res) => {
                        this.$store.commit("storeUpdateDiningId", res.data.order.id)
                        this.$store.commit("storeUpdateDiningName", tableName)
                        this.$router.push({name: 'WaiterOrderMeal'})
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .choose-table {
        @include window;

        .panel {
            @include panel;

            .line {
                @include layout-flex-r;
                align-items: center;
                width: 100%;
                margin-top: 20px;

                span {
                    color: #8D888F;
                    @include font-dpr(14px);
                    margin-left: 30px;
                    margin-right: 10px;
                }

                select {
                    color: #CCCCCC;
                    @include font-dpr(14px);
                    flex: 1;
                    width: 100%;
                    margin-right: 30px;
                    background: transparent;
                    border: 1px solid #635A66;
                    border-radius: 4px;
                    padding-left: 5px;
                    height: 34px;
                }
            }
        }
    }
</style>