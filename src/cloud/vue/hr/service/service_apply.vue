<template>
    <div class="box_wrap">
        <div class="box">
            <el-table
                    :data="staffInfo"
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
                        <img src="http://static.ibigtop.com/static/img/public/touxiang/headimg2.jpg" class="headimg">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="nickname"
                        width="100"
                        label="昵称">
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
                        width="200"
                        label="城市">
                    <template slot-scope="scope">
                        {{scope.row.province}}{{scope.row.city}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="actorId"
                        width="200"
                        label="身份证号">
                    <template slot-scope="scope">
                        {{scope.row.idcard}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="200"
                        label="电话">
                    <template slot-scope="scope">
                        {{scope.row.phone}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
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
        </div>
        <div class="pagination-wrap">
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    layout="prev, pager, next"
                    :pager-count="5"
                    :page-size="20"
                    :total="value">
            </el-pagination>
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
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    import REQ from "../../../vue/global/request.js";
    import Type from '../../global/name_space.js'
    const roomInfo = window.UINFO;
    export default {
        components:{

        },
        data(){
            return{
                pageNo:1,
                value:0,
                staffInfo:[],
                CodeToText:CodeToText,
                activeIndex:'1',
                storeType:Type.storeType,
                title:'同意',
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
            }
        },
        mounted(){
            this.staffList();
        },
        watch:{

        },
        methods:{
            staffList(){
                let vm = this;
                let postData = {
                    sys : "1"
                };
                REQ.reqStaffSysDList(postData,
                    (result) => {
                        vm.value = result.data.count;
                        vm.staffInfo = result.data.rows;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            handleCurrentChange(val){
                this.pageNo = val;
                this.staffList();
            },
            handleSizeChange(){

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
                vm.doApply.status = '2';
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
                        _this.staffList();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
        }
    }
</script>

<style scoped lang="scss">
    .box_wrap{
        .material_info{
            text-align: center;
            padding: 10px 0;
            display: inline-block;
            margin-right: 30px;
            border-radius: 4px;
            img{
                width: 100px;
                height: 100px;
            }
            h2{
                padding-top: 10px;
                color: #FFFFFF;
            }
        }
    }
</style>