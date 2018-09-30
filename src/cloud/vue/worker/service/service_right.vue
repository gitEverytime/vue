<template>
    <div class="verify">
        <el-table
                :data="tableData"
                ref="multipleTable"
                :highlight-current-row=false
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
                    prop="clientRole"
                    width="100"
                    label="身份">
            </el-table-column>
            <el-table-column
                    prop="staffNo"
                    width="100"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="city"
                    width="100"
                    label="点播节目">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isDb"
                            active-value="1"
                            inactive-value="0"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="postApprovalAuthSet(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="actorId"
                    width="100"
                    label="店内打赏">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isGive"
                            active-value="1"
                            inactive-value="0"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="postApprovalAuthSet(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    width="100"
                    label="控制游戏">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isGame"
                            active-value="1"
                            inactive-value="0"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="postApprovalAuthSet(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="自助签到"
                    width="100"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isSign"
                            active-value="1"
                            inactive-value="0"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="postApprovalAuthSet(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="接触现金"
                    width="100"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isCash"
                            active-value="1"
                            inactive-value="0"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="postApprovalAuthSet(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="进销需求"
                    width="100"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isSale"
                            active-value="1"
                            inactive-value="0"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="postApprovalAuthSet(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
                <template slot-scope="scope">
                    <!--<a class="pass"-->
                       <!--href="javascript:;"-->
                       <!--v-if="scope.row.status === '1'"-->
                       <!--@click="setFreeze(scope.row.staffId)"-->
                    <!--&gt;-->
                        <!--冻结-->
                    <!--</a>-->
                    <!--<a class="reject"-->
                       <!--href="javascript:;"-->
                       <!--v-if="scope.row.status === '3'"-->
                       <!--@click="setUnfreeze(scope.row.staffId)"-->
                    <!--&gt;-->
                        <!--恢复-->
                    <!--</a>-->
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrap">
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    layout="prev, pager, next"
                    :total="total3">
            </el-pagination>
        </div>
        <!--<div class="btnsWrap">-->
            <!--<el-button type="danger">辞退</el-button>-->
        <!--</div>-->
    </div>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import REQ     from "../../global/request.js";
    const roomInfo = window.UINFO;

    export default {

        components:{
            TempSwitch,

        },
        data(){
            return{
                tableData:[],
                actorList:[],
                total3:0,
                pageNo:1,
                value2:'',
                activeColor:'#00B594',
                inactiveColor:'#877f7f'
            }
        },
        computed:{

        },

        mounted(){
            this.getStaffAuthList();
        },

        methods:{
            /**
             * 获取权限列表
             */
            getStaffAuthList(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    pageNo:_this.pageNo
                };
                REQ.reqStaffAuthList(posData,
                    function(result){
                        _this.tableData = result.data.rows;
                        _this.total3 = result.data.count;
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /**
             * 修改权限设置
             * @param row
             */
            postApprovalAuthSet(row){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    staffId: row.staffId,
                    isDb: row.isDb,
                    isGame: row.isGame,
                    isSign: row.isSign,
                    isCash: row.isCash,
                    isSale: row.isSale,
                    isGive: row.isGive
                };
                REQ.reqApprovalAuthSet(posData,
                    function(result){
                        _this.$message.success("权限修改成功！");
                        _this.getStaffAuthList();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /**
             * 冻结
             * @param staffId
             */
            setFreeze(staffId){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    staffId: staffId,
                };
                REQ.reqStaffFreeze(posData,
                    function(result){
                        _this.$message.success("冻结成功！");
                        _this.getStaffAuthList();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /**
             * 解冻
             * @param val
             */
            setUnfreeze(staffId){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    staffId: staffId,
                };
                REQ.reqStaffUnfreeze(posData,
                    function(result){
                        _this.$message.success("解冻成功！");
                        _this.getStaffAuthList();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getStaffAuthList();
            },

        }
    }


</script>


<style  lang='scss'   scoped>

    @import "../../../../style/sass/mixin.scss";

    .verify{
        width: 100%; height: 100%;
    }


    .verify .tab .row{
        @include set-wh(100%, 60px);
        border-bottom: 1px solid #009688;
    }

    .verify .tab tr td{ text-align: center; }

    .verify .tab .avatar,
    .verify .tab .avatar img{margin: auto; width: 60px; height: 60px;}

    .verify .tab .col-btn{
        @include layout-flex-r-center;
    }

    .verify .tab .col-btn .btn{
        margin: 0 10px 0 0; height: 60px; line-height: 60px; cursor: pointer;
    }
    .headimg{
        width: 50px;
        height: 50px;
        border:#ec005e solid 1px;
    }
    .icon-man{
        color: #086D99;
        font-size: 25px;
    }
    .icon-woman{
        color: #8E1250;
        font-size: 25px;
    }
    .btnsWrap{
        text-align: center;
        padding-top: 50px;
    }

</style>




