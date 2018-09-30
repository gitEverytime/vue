<template>
    <div class="verify">
        <el-table
                :data="tableData"
                ref="multipleTable"
                :highlight-current-row=false
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    type="selection"
                   >
            </el-table-column>
            <el-table-column
                    width="100"
                    label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.headimg" class="headimg">
                </template>
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="昵称"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="address"
                    width="50"
                    label="性别">
                <template slot-scope="scope">
                    <i class="iconfont icon-man" v-if="scope.row.sex === '1'"></i>
                    <i class="iconfont icon-woman" v-else></i>
                </template>
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="城市">
            </el-table-column>
            <el-table-column
                    prop="clientRole"
                    width="120"
                    label="身份">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    width="150"
                    label="电话">
                <
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="时间"
                    width="100"
            >
                <template slot-scope="scope">
                    <span>{{scope.row.workOnTime}}-{{scope.row.workOffTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="salary"
                    label="薪资">
            </el-table-column>
            <el-table-column
                    prop="idcard"
                    width="200"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    width="200"
                    label="操作">
                <template slot-scope="scope">
                    <a class="pass" href="javascript:;" @click="passApply(scope.row.applyId)">
                        通过
                    </a>
                    <a class="reject" href="javascript:;" @click="rejectApply(scope.row.applyId)">
                        驳回
                    </a>
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
        <div class="btnsWrap">
            <el-button type="danger"
                       @click="deleteApproval"
                       :disabled="multipleSelection.length < 1"
            >删除申请</el-button>
        </div>
        <!--同意/驳回弹出-->
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                :show-close="true"
                center
                width="400px"
        >
            <el-form ref="doApply" :model="doApply" :rules="rules" label-width="80px">
                <el-form-item label="理由">
                    <el-input v-model="doApply.remarks" placeholder="请输入理由"></el-input>
                </el-form-item>
                <el-form-item style="padding-top:20px">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="danger" @click="submitForm()">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import REQ     from "../../global/request.js";
    const roomInfo = window.UINFO;
    export default {

        components:{
        },

        data(){
            return{
                tableData:[],
                actorList:[],
                total3:10,
                pageNo:1,
                dialogVisible:false,
                doApply:{
                    applyId:'',
                    status:'',
                    remarks:'',
                },
                rules:{
                    remarks: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                },
                title:'同意',
                multipleSelection: []
            }
        },
        computed:{

        },

        mounted(){
            this.getStaffStoreDList();
        },

        methods:{
            /**
             * 获取商家待审核服务人员列表
             */
            getStaffStoreDList(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId
                };
                REQ.reqStaffStoreDList(posData,
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
            //同意
            passApply(applyId){
                let vm = this;
                vm.dialogVisible = true;
                vm.doApply.status = '1';
                vm.doApply.applyId = applyId;
                vm.title = '同意';
            },
            //驳回
            rejectApply(applyId){
                let vm = this;
                vm.dialogVisible = true;
                vm.doApply.status = '0';
                vm.doApply.applyId = applyId;
                vm.title = '驳回';
            },
            /**
             * 处理审批
             */
            submitForm(){
                let _this = this;
                let posData = _this.doApply;
                REQ.reqApprovalDoApply(posData,
                    function(result){
                        _this.doApply.status === '1' ? _this.$message.success("已同意！") : _this.$message.success("已驳回！");
                        _this.dialogVisible = false;
                        _this.getStaffStoreDList();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /**
             * 删除审批
             * @param val
             */

            //批量操作
            handleSelectionChange(val) {
                this.multipleSelection = new Set();
                val.forEach((value) => {
                    this.multipleSelection.add(value.applyId);
                });
                this.multipleSelection = [...this.multipleSelection]
            },
            //确认删除弹窗
            deleteApproval(){
                this.$confirm('确认删除待审批的人员吗？请谨慎操作', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postApprovalDel();
                }).catch(() => {
                });
            },
            /**
             * 请求删除
             * @param val
             */
            postApprovalDel(){
                let _this = this;
                let posData = {
                    applyIds:_this.multipleSelection
                };
                REQ.reqApprovalDel(posData,
                    function(result){
                        _this.$message.success("删除审批成功");
                        _this.getStaffStoreDList();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getStaffStoreDList();
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
        border: #ef0065 solid 1px;
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




