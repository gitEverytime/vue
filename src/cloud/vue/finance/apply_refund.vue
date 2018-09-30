<template>
    <div class="menu">
        <el-row class="search">
            <el-col :span="6">
                <el-input v-model="id" placeholder="请输入互动记录编号" size="small"></el-input>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="16">
                <el-button type="danger" size="small" @click="searchRefund">查询</el-button>
            </el-col>
        </el-row>
        <el-row class="menu_wrap">
            <el-col :span="24" class="bor_right">
                <el-table
                        :data="tableData"
                        ref="multipleTable"
                        :highlight-current-row=false
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" class="demo-table-expand">
                                <el-form-item label="发言内容">
                                    <span>{{ props.row.content }}</span>
                                </el-form-item>
                                <el-form-item label="记录编号">
                                    <span>{{ props.row.id}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="70"
                            label="头像">
                        <template slot-scope="scope">
                            <img :src="scope.row.headimg" class="headimg">
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="nickname"
                            width="70"
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
                            width=""
                            label="城市">
                        <template slot-scope="scope">
                            <span>{{scope.row.province}}{{scope.row.city}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="createdAt"
                            width=""
                            :formatter="dateFormat"
                            label="时间">
                    </el-table-column>

                    <el-table-column
                            width=""
                            label="互动类型">
                        <template slot-scope="scope">
                            <div
                                    class="amount"
                                    v-for="item in interactList"
                            >
                                <span v-if="item.type === scope.row.type">{{item.label}}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                            width=""
                            label="金额">
                        <template slot-scope="scope">
                            <span class="amount">￥{{scope.row.amount}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            width="60"
                            label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status === '0'">未完成</span>
                            <span v-if="scope.row.status === '1'">发送成功</span>
                            <span v-if="scope.row.status === '2'">发送失败</span>
                            <span v-if="scope.row.status === '3'">撤回</span>
                            <span v-if="scope.row.status === '4'">删除</span>
                            <span v-if="scope.row.status === '5'">退款中</span>
                            <span v-if="scope.row.status === '6'">已退款</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="address"
                            width=""
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="refund(scope.row)" :disabled="scope.row.status !== '1'">退款</el-button>
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
            </el-col>
        </el-row>
        <!--    操作弹窗    -->
        <el-dialog
                title="操作"
                :visible.sync="dialogVisible"
                :show-close="true"
                center
                width="400px"
        >
            <el-form ref="setData" :model="setData" :rules="rules" label-width="80px">
                <el-form-item label="退款金额">
                   <span>￥{{amount}}</span>
                </el-form-item>
                <el-form-item label="备注原因" prop="remarks" >
                    <el-input v-model="setData.remarks" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item style="padding-top:20px">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="danger" @click="submitForm('setData')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import TempSwitch from '../components/switch.vue'
    import TempSaveText from '../components/save_Text.vue'
    import moment  from 'moment'
    import Type   from '../global/name_space.js'
    import REQ     from "../global/request.js";
    export default {

        components:{
            TempSwitch,
            TempSaveText
        },


        data(){
            return{
                tableData:[],
                actorList:[],
                input8:'',
                total3:0,
                pageNo:1,
                id:'',
                pageSize:10,
                value6:[],
                nickname:'',
                keywords:'',
                multipleSelection:[],
                dialogVisible:false,
                setData:{
                    remarks:'',
                    intId:''
                },
                rules:{
                    cstatus: [
                        { required: true, message: '请选择要设置的类型', trigger: 'change' }
                    ],
                    remarks: [
                        { required: true, message: '请输入您的备注', trigger: 'change' }
                    ],
                },
                totalAmount:'0.00',
                amount:'',
                interactList:Type.interactList
            }
        },
        watch:{
        },
        computed:{
        },

        mounted(){
        },

        methods:{
            searchRefund(){
                let vm = this;
                if(vm.id){
                    vm.getInteractionPubList();
                }else{
                    vm.$message.warning("互动记录编号不能为空");
                }
            },
            /**
             * 获取公屏信息调用
             * @param type
             */
            getInteractionPubList(){
                let _this = this;
                let posData = {
                    pageNo:_this.pageNo,
                    pageSize:_this.pageSize,
                    id:_this.id
                };

                REQ.reqInteractionPubList(posData,
                    function(result){
                        _this.tableData = result.data.rows;   //list渲染
                        _this.total3 = result.data.count;     //分页总数
                        _this.totalAmount = result.data.totalAmount;      //总金额数
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },

            //退款
            refund(row){
                let vm = this;
                vm.dialogVisible = true;
                vm.setData.intId = row.id;
                vm.amount = row.amount;
            },

            //校验
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.againConfirm();
                    } else {
                        return false;
                    }
                });
            },

            againConfirm(){
                this.$confirm('此操作不可逆，是否继续？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postFinanceRefund();
                }).catch(() => {
                });
            },

            /**
             * @param val
             */
            postFinanceRefund(){
                let _this = this;
                let posData = _this.setData;
                REQ.reqFinanceRefund(posData,
                    function(result){
                        _this.$message.success("退款申请成功！");
                        _this.dialogVisible = false;
                        _this.getInteractionPubList();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /**************************************  删除操作  ***********************************/
            //批量操作
            handleSelectionChange(val){
                this.multipleSelection = new Set();
                val.forEach((value) => {
                    this.multipleSelection.add(value.id);
                });
                this.multipleSelection = [...this.multipleSelection]
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getInteractionPubList(this.getType);
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            }
        }
    }
</script>
<style  lang='scss'   scoped>

    @import '../../sass/common.scss';
    .menu{
        padding: 0 30px;
    }
    .search{
        padding: 30px 0;
    }
    .el-table th{
        background-color: #D5D7D6 !important;
    }

    .verify{
        width: 100%; height: 100%;
    }
    .rightNav{
        height: 47px;
        text-align: center;
        font-size: 16px;
        line-height: 47px;
        background-color: #164648;
        color: #FFFFFF;
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
    }
    .icon-man{
        color: #086D99;
        font-size: 25px;
    }
    .icon-woman{
        color: #8E1250;
        font-size: 25px;
    }
    .icon-caozuo{
        cursor: pointer;
    }
    .btnsWrap{
        padding-bottom: 10px;
    }
    .amount{
        color: #CD533E;
    }
    .menu_type{
        li{
            float: left;
        }
        li:nth-of-type(1){
            width: 888px;
        }
        li:nth-of-type(2){
            width: 350px;
        }
    }
    .menu_wrap{
        /*border-bottom: solid 2px #164648;*/
        overflow: hidden;
        li{
            float:left;
        }
        li:nth-of-type(1){
            width: 888px;
            /*border-right: solid 2px #164648;*/
        }
        .bor_right{
            /*border-right: solid 2px #164648;*/
        }
        li:nth-of-type(2){
            width: 330px;
        }
        .title{
            margin: 20px 0 20px 0;
            height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
            color: #FF5722; border-left: 2px solid #FF5722;
        }
        .m_l20{
            margin-left: 20px;
        }
        .insertBtn{
            margin-left: 40px;
        }
        .searchText{
            width: 234px;
        }
        .pagination-wrap{
            padding-bottom: 20px;
        }
    }
    .typeName{
        color: #FFFFFF;
        &:hover{
            color: #00B594;
            text-decoration: underline;
        }
    }
    .searchWrap{
        padding-left: 20px;
    }
    .m_b20{
        margin-bottom: 20px;
    }
    .interactMoney{
        color: #FFFFFF;
        font-size: 16px;
        padding-top:30px;
        span{
            color: $orange;
        }
    }

</style>




