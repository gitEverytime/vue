<template>
    <div class="">
        <el-table
                :data="tableData1"
                ref="multipleTable"
                :highlight-current-row=false
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    type="selection"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    width="100"
                    label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.headimg" class="headimg">
                </template>
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    width="100"
                    label="昵称">
            </el-table-column>
            <el-table-column
                    width="50"
                    label="性别">
                <template slot-scope="scope">
                    <i class="iconfont icon-man" v-if="scope.row.sex === '1'"></i>
                    <i class="iconfont icon-woman" v-else></i>
                </template>
            </el-table-column>
            <el-table-column
                    width="50"
                    label="身份">
                <template slot-scope="scope">
                   <span>{{actorType[Number(scope.row.actorType)]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="city"
                    width="150"
                    label="点播节目">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isProgram"
                            :active-value="activeValue"
                            :inactive-value="inactiveValue"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="updateActorSetAuth(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="actorId"
                    width="150"
                    label="店内打赏">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isGive"
                            :active-value="activeValue"
                            :inactive-value="inactiveValue"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="updateActorSetAuth(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    width="150"
                    label="控制游戏">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isGame"
                            :active-value="activeValue"
                            :inactive-value="inactiveValue"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="updateActorSetAuth(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="自助签到"
                    width="150"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isSign"
                            :active-value="activeValue"
                            :inactive-value="inactiveValue"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="updateActorSetAuth(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
                <template slot-scope="scope">
                    <!--<a class="pass" href="javascript:;"-->
                       <!--v-if="scope.row.status === '1'"-->
                       <!--@click="actorSetFreeze(scope.row.id,'1')"-->
                    <!--&gt;-->
                        <!--冻结-->
                    <!--</a>-->
                    <!--<a class="reject" href="javascript:;"-->
                       <!--v-if="scope.row.status === '3'"-->
                       <!--@click="actorSetFreeze(scope.row.id,'0')">-->
                        <!--恢复-->
                    <!--</a>-->
                </template>
            </el-table-column>
        </el-table>
        <TempPowerReject
                :dialogVisible1="dialogVisible"
                @setSatus="getStatus"
        ></TempPowerReject>
    </div>
</template>

<script>
    import REQ     from "../../global/request.js";
    import TempSwitch from '../../components/switch.vue'
    import TempPowerReject  from './power_reject.vue'
    import type from '../../global/name_space.js'
    export default {
        components:{
            TempSwitch,
            TempPowerReject
        },
        props:{
            tableData1:{
                type:Array
            }
        },
        data(){
            return{
                dialogVisible:false,
                actorType:type,
                activeColor:type.activeColor,
                inactiveColor:type.inactiveColor,
                activeValue:type.activeValue,
                inactiveValue:type.inactiveValue,
                multipleSelection:[],
            }
        },
        mounted(){

        },
        methods:{

            getStatus(val){
                this.dialogVisible = val
            },
            /**
             * 设置状态
             * @param row
             */
            updateActorSetAuth(row){
                let _this = this;
                let posData = {
                    id :row.id,
                    isProgram : row.isProgram,
                    isGive : row.isGive,
                    isGame: row.isGame,
                    isSign: row.isSign
                };
                REQ.reqActorSetAuth(posData,
                    function(result){
                        _this.$message.success("设置成功！");
                        _this.$emit('applyAgain',true)
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },

            /**
             * 冻结/解冻
             * @param id
             * @param isFreeze
             */
            actorSetFreeze(id,isFreeze){
                let _this = this;
                let posData = {
                    id:id,
                    isFreeze:isFreeze
                };
                REQ.reqActorSetFreeze(posData,
                    function(result){
                        isFreeze === '1' ? _this.$message.success("冻结成功！") :  _this.$message.success("解冻成功！");
                        _this.$emit('applyAgain',true)
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },

            //批量操作
            handleSelectionChange(val){
                this.multipleSelection = new Set();
                val.forEach((value) => {
                    this.multipleSelection.add(value.id);
                });
                this.multipleSelection = [...this.multipleSelection];
                this.$emit('multipleSelection', this.multipleSelection)
            },
        }
    }
</script>

<style scoped>

</style>