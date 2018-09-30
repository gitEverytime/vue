<template>
    <div class="menu">
        <ul class="menu_type">
            <li></li>
            <li></li>
        </ul>
        <el-row class="menu_wrap">
            <el-col :span="18" class="bor_right">
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
                                <el-form-item label="图片">
                                    <div v-if="props.row.pic">
                                        <img class="pic"
                                             v-if="props.row.pic.split(',').length>0"
                                             v-for="item in props.row.pic.split(',')"
                                             :src="item"
                                        >
                                    </div>
                                </el-form-item>
                                <el-form-item label="记录编号">
                                    <span>{{ props.row.id}}</span>
                                </el-form-item>
                                <el-form-item label="状态">
                                    <span v-if="props.row.status === '0'">未完成</span>
                                    <span v-if="props.row.status === '1'">发送成功</span>
                                    <span v-if="props.row.status === '2'">发送失败</span>
                                    <span v-if="props.row.status === '3'">撤回</span>
                                    <span v-if="props.row.status === '4'">删除</span>
                                    <span v-if="props.row.status === '5'">退款中</span>
                                    <span v-if="props.row.status === '6'">已退款</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            type="selection"
                            width="50"
                            size="medium"
                    >
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
                            width="80"
                            v-if="$store.getters.getTypeInfo === '3'"
                            label="霸屏类型">
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.mediaTitle}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="80"
                            v-if="$store.getters.getTypeInfo === '3'"
                            label="霸屏秒数">
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.detail ? JSON.parse(scope.row.detail).duration : 0}}s
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width=""
                            v-if="$store.getters.getTypeInfo === '1'"
                            label="点播歌曲">
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.mediaTitle}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="mediaTitle"
                            width=""
                            v-if="$store.getters.getTypeInfo === '6' || $store.getters.getTypeInfo === '7'"
                            label="打赏礼物">
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.mediaTitle}}<label>x{{JSON.parse(scope.row.detail).count}}</label>
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="createdAt"
                            width=""
                            :formatter="dateFormat"
                            label="时间">
                    </el-table-column>

                    <el-table-column
                            width="60"
                            label="金额">
                        <template slot-scope="scope">
                            <span class="amount">￥{{scope.row.amount}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="address"
                            width=""
                            label="操作">
                        <template slot-scope="scope">
                            <i class="iconfont icon-caozuo" @click='setNameList(scope.row)'></i>
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
            <el-col :span="6">
                <div class="rightNav">
                    检索
                </div>
                <div class="searchWrap">
                    <h1 class="title">信息检索</h1>
                    <el-input
                            placeholder="按昵称查找"
                            v-model="nickname"
                            class="searchText m_b20">
                        <el-button slot="append" icon="el-icon-search" @click="getInteractionPubList(getType)"></el-button>
                    </el-input>
                    <el-input
                            placeholder="按关键词查找"
                            v-model="keywords"
                            class="searchText m_b20">
                        <el-button slot="append" icon="el-icon-search" @click="getInteractionPubList(getType)"></el-button>
                    </el-input>
                    <el-date-picker
                            v-model="value6"
                            size="small"
                            type="daterange"
                            range-separator="至"
                            value-format="timestamp"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="chooseDateBlock"
                    >
                    </el-date-picker>
                    <p class="interactMoney">互动金额<span>￥{{totalAmount}}</span></p>

                    <h1 class="title">信息操作</h1>
                    <div class="btnsWrap">
                        <el-button
                                type="danger"
                                :disabled="multipleSelection.length<1"
                                @click="deleteMessage"
                        >删除所选内容</el-button>
                    </div>
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
                <el-form-item label="设置名单" prop="cstatus" >
                    <el-radio-group v-model="setData.cstatus">
                        <el-radio label="1">白名单</el-radio>
                        <el-radio label="2">黑名单</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="remarks" v-if="setData.cstatus === '2'">
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
    import REQ     from "../global/request.js";
    const roomInfo = window.UINFO;
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
                pageSize:10,
                value6:[],
                nickname:'',
                keywords:'',
                multipleSelection:[],
                dialogVisible:false,
                setData:{
                    storeId:roomInfo.storeId,
                    cstatus:'',
                    remarks:'',
                    cid:''
                },
                rules:{
                    cstatus: [
                        { required: true, message: '请选择要设置的类型', trigger: 'change' }
                    ],
                    remarks: [
                        { required: true, message: '请输入您的备注', trigger: 'change' }
                    ],
                },
                totalAmount:'0.00'
            }
        },
        watch:{
            //获取vuex里面存贮的type值
            getType(type){
                this.pageNo = 1;
                this.getInteractionPubList(type);
            },
            //搜索框内容为空回到页面初始查询
            nickname(val){
               if(val === '') this.getInteractionPubList(this.getType);
            },
            keywords(val){
                if(val === '') this.getInteractionPubList(this.getType);
            },
        },
        computed:{
            //计算type值
            getType(){
                return this.$store.getters.getTypeInfo
            },
        },

        mounted(){
            //初次查询公屏所有数据
            this.getInteractionPubList(this.getType);
            console.log('1')
        },

        methods:{
            /**
             * 获取公屏信息调用
             * @param type
             */
            getInteractionPubList(type){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    type: type.split(","),
                    nickname:_this.nickname,
                    keywords:_this.keywords,
                    pageNo:_this.pageNo,
                    startDate:_this.value6[0],
                    endDate:_this.value6[1],
                    pageSize:_this.pageSize
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
            /**
             * 日期查找
             */
            chooseDateBlock(val){
                if(!val) this.value6 = [];
                this.getInteractionPubList(this.getType);
            },
            /*******************************  设置黑名单还是白名单  ******************************/
            //设置名单角色
            setNameList(row){
                let vm = this;
                vm.dialogVisible = true;
                vm.getAuthGetByCid(row.cid);
                vm.setData.cid = row.cid;
            },
            /**
             * 获取公屏用户权限信息
             */
            getAuthGetByCid(cid){
                let vm = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    cid : cid,
                };
                REQ.reqAuthGetByCid(posData,
                    function(result){
                        let relData = result.data;
                        vm.setData.cstatus = relData.type;
                        vm.setData.remarks = relData.remarks;
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            //校验
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.setData.cstatus === '1' ? this.addWhiteList() : this.addBlackList();
                    } else {
                        return false;
                    }
                });
            },
            /**
             * 超级名单添加
             * @param val
             */
            addWhiteList(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    cid : _this.setData.cid,
                };
                REQ.reqAuthAddWhiteList(posData,
                    function(result){
                       _this.$message.success("添加超级名单成功！");
                       _this.dialogVisible = false;
                       _this.getInteractionPubList(_this.getType);
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /**
             * 黑名单添加
             * @param val
             */
            addBlackList(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    cid : _this.setData.cid,
                    remarks: _this.setData.remarks
                };
                REQ.reqAuthAddBlackList(posData,
                    function(result){
                        _this.$message.success("添加黑名单成功！");
                        _this.dialogVisible = false;
                        _this.getInteractionPubList(_this.getType);
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
            //确认删除
            deleteMessage(){
                this.$confirm('删除所选信息，是否这样做？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteGBDDlist();
                }).catch(() => {
                });
            },
            /**
             * 删除所选信息
             */
            deleteGBDDlist(){
                let vm = this;
                let posData = {
                    // storeId: roomInfo.storeId,
                    ids: vm.multipleSelection
                };
                REQ.reqAuthDetailDel(posData,
                    function(result){
                        vm.$message.success("删除所选信息成功！");
                        vm.getInteractionPubList(vm.getType);
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                );
            },
            searchPubMsg(){

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
        border-bottom: solid 2px #164648;
        overflow: hidden;
        li{
            float:left;
        }
        li:nth-of-type(1){
            width: 888px;
            border-right: solid 2px #164648;
        }
        .bor_right{
            border-right: solid 2px #164648;
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
    .pic{
        width: 150px;
        height: 150px;
        padding: 10px;
    }

</style>




