<template>
    <div class="box">
        <el-button type="danger"
                   class="insertAccount"
                   v-if="curInfo && Number(JSON.parse(curInfo).isBoss)"
                   @click="insertAccount">添加账号</el-button>
        <el-table
                :data="tableData"
                ref="multipleTable"
                :highlight-current-row=false
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="70"
                    size="medium"
            >
            </el-table-column>

            <el-table-column
                    width="100"
                    label="头像">
                <template slot-scope="scope">
                    <img src="http://static.ibigtop.com/static/img/public/touxiang/headimg2.jpg" class="headimg">
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    width="150"
                    label="昵称">
            </el-table-column>

            <el-table-column
                    prop="realName"
                    width="100"
                    label="真实姓名">
            </el-table-column>

            <el-table-column
                    prop="phone"
                    width="100"
                    label="电话">
            </el-table-column>

            <el-table-column
                    prop="phone"
                    width="100"
                    label="是否是boss">
                <template slot-scope="scope">
                    {{Number(scope.row.isBoss) ? '是' : '否'}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="phone"
                    width="100"
                    label="角色">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === '200'">一代</span>
                    <span v-if="scope.row.type === '201'">二代</span>
                    <span v-if="scope.row.type === '300'">总平台</span>
                    <span v-if="scope.row.type === '400'">商家</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="createdAt"
                    width=""
                    :formatter="dateFormat"
                    label="创建时间">
            </el-table-column>

            <el-table-column
                    prop="address"
                    width=""
                    label="操作">
                <template slot-scope="scope" >
                    <div v-if="!Number(scope.row.isBoss) && curInfo && JSON.parse(curInfo).userId !== scope.row.id">
                        <el-button type="danger" v-if="scope.row.status === '1'" size="mini" @click="userSetFreeze(scope.row.id,'3')">冻结</el-button>
                        <el-button type="primary" v-if="scope.row.status === '3'"  size="mini" @click="userSetFreeze(scope.row.id,'1')">解冻</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-wrap">
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    layout="prev, pager, next"
                    :pager-count="5"
                    :page-size="pageSize"
                    :total="total3">
            </el-pagination>
        </div>
        <!--分页-->
        <div class="btnsWrap">
            <el-button
                    type="danger"
                    :disabled="multipleSelection.length<1"
                    @click="deleteMessage"
            >删除所选</el-button>
        </div>

        <!--弹窗-->

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="400px"
        >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realName">
                    <el-input v-model="ruleForm.realName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="ruleForm.pwd" disabled></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>
    import regular  from '../global/regular.js'
    import REQ     from "../global/request.js";
    import moment  from 'moment'
    import base64   from '../global/base64.js'
    export default {
        components:{

        },
        data(){
            return{
                tableData:[],
                actorList:[],
                input8:'',
                total3:0,
                pageNo:1,
                pageSize:10,
                value6:[],
                nickname:'',
                keywords:'',
                multipleSelection:[],
                ruleForm: {
                    nickname: '',
                    realName:'',
                    phone:'',
                    pwd:'bg123456'
                },
                rules: {
                    nickname: [
                        {required: true, message: '请输入您的昵称', trigger: 'change'},
                    ],
                    realName: [
                        {required: true, message: '请输入您的真实姓名', trigger: 'change'},
                    ],
                    phone: [
                        {required: true,validator: regular.validateNumber, trigger: 'change'},
                    ],
                },
                dialogVisible:false
            }
        },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo;
            }
        },
        mounted(){
            this.getUserListMgr();
        },
        methods:{
            submitForm(formName) {
                console.log(formName)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getUserAddMgr(formName);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**
             * 获取账号列表
             */
            getUserListMgr(){
                let vm = this;
                let posData = {
                    pageSize : 10,
                    pageNo:vm.pageNo
                };
                REQ.reqUserListMgr(posData,
                    function(result){
                        vm.tableData = result.data.rows;
                        vm.total3 = result.data.count;
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /**
             * 添加账号
             * @param cid
             */
            getUserAddMgr(formName){
                let vm = this;
                let posData = {
                    nickname: vm.ruleForm.nickname,
                    realName:vm.ruleForm.realName,
                    phone:vm.ruleForm.phone,
                    pwd:base64.encode(vm.ruleForm.pwd)
                };
                REQ.reqUserAddMgr(posData,
                    function(result){
                        vm.$message.success("添加账号成功！");
                        vm.dialogVisible = false;
                        vm.getUserListMgr();
                        vm.$refs[formName].resetFields();
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
                this.multipleSelection = [...this.multipleSelection]
            },
            //确认删除
            deleteMessage(){
                this.$confirm('删除所选信息，是否这样做？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.userDelBatch();
                }).catch(() => {
                });
            },
            /**
             * 删除
             */
            userDelBatch(){
                let vm = this;
                let posData = {
                    uids: vm.multipleSelection
                };
                REQ.reqUserDelBatch(posData,
                    function(result){
                        vm.$message.success("删除所选账号成功！");
                        vm.getUserListMgr();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            userSetFreeze(uid,status){
                let vm = this;
                let posData = {
                    uid: uid,
                    status:status
                };
                REQ.reqUserSetFreeze(posData,
                    function(result){
                        status === '1' ? vm.$message.success("解冻成功！") : vm.$message.success("冻结成功！");
                        vm.getUserListMgr();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            insertAccount(){
                this.dialogVisible = true;
            },
            handleCurrentChange(val){
                this.pageNo = val;
                this.getUserListMgr();
            },
            handleSizeChange(){

            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            }
        }
    }
</script>

<style scoped lang="scss">
    .box{
        padding: 0 30px;
        .insertAccount{
            margin: 20px 0;
        }
        .btnsWrap{
            padding: 20px 0;
            text-align: center;
        }
    }
</style>