<template>
    <div class="superListwrap">
        <el-table
                :data="whiteData"
                ref="multipleTable"
                :highlight-current-row=false
                @selection-change="handleSelectionChange"
                width="100%">
            <el-table-column
                    type="selection"
                    min-width="6%"
                    size="medium"
            >
            </el-table-column>

            <el-table-column
                    prop="carteName"
                    min-width="10%"
                    label="头像">
                <template slot-scope="scope">
                    <img
                            v-if="scope.row.headimg!==''"
                            :src="scope.row.headimg"
                            class="headimg"
                    >
                    <span v-else>无头像</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    min-width="9%"
                    label="昵称">
            </el-table-column>
            <el-table-column
                    min-width="15%"
                    label="免费霸屏">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isBp"
                            active-value="2"
                            inactive-value="1"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="postAuthWhiteListSet(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column
                    prop=""
                    min-width="15%"
                    label="霸屏次数">
                <template slot-scope="scope">
                    <div @click="row = scope.row">
                        <TempSaveText text="" value="保存" :propsSaveText="scope.row.countBp" @inputVal="changeCountBp"></TempSaveText>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    prop=""
                    min-width="15%"
                    label="单次时间">
                <template slot-scope="scope">
                    <!--<div @click="row = scope.row">-->
                        <!--<TempSaveText text="" value="保存" :propsSaveText="30" @inputVal="changePrice"></TempSaveText>-->
                    <!--</div>-->
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    min-width="15%"
                    label="免费点播">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isDb"
                            active-value="2"
                            inactive-value="1"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="postAuthWhiteListSet(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column
                    prop=""
                    min-width="15%"
                    label="点播次数">
                <template slot-scope="scope">
                    <TempSaveText text="" value="保存" :propsSaveText="scope.row.countDb" @inputVal="changeCountDb"></TempSaveText>
                </template>
            </el-table-column>

            <!--<el-table-column-->
                    <!--prop=""-->
                    <!--width=""-->
                    <!--label="操作">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button type="primary" size="mini" @click="updateCarte(scope.row)">恢复</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
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
        <p class="prompt">
            建议日免费霸屏时间不宜过长而影响顾客使用，日免费点播默认关闭，如若开启，请与艺人沟通，且免费次数不宜过长。
        </p>
        <div class="btnsWrap">
            <el-button
                    type="danger"
                    :disabled="multipleSelection.length<1"
                    @click="deleteMessage"
            >删除内容</el-button>
        </div>
    </div>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import TempSaveText from '../../components/save_Text.vue'
    import REQ from "../../global/request.js";
    const roomInfo = window.UINFO;
    export default {
        components:{
            TempSwitch,
            TempSaveText,
        },
        props: {

        },
        data(){
            return{
                whiteData:[],
                dialogVisible:false,
                total3:0,
                pageNo:1,
                rowsPerPage:6,
                pageSize:10,
                activeColor:'#00B594',
                inactiveColor:'#877f7f',
                multipleSelection:[],
                row:{}
            }
        },
        watch: {

        },
        computed:{

        },

        mounted(){
            this.getAuthWhiteList();
        },

        methods:{
            /**
             * 获取商家白名单列表
             * @type {{storeId: *}}
             */
            getAuthWhiteList(){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    pageNo: vm.pageNo,
                    pageSize:vm.pageSize
                };
                REQ.reqAuthWhiteList(posData,
                    function(result){
                        vm.whiteData = result.data.rows;
                        vm.total3 = result.data.count;
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                );
            },
            deleteCategory(){

            },
            updateCarte(){

            },
            //修改霸屏次数
            changeCountBp(data){
                this.row.countBp = data;
                this.postAuthWhiteListSet(this.row);
            },
            //修改点播次数
            changeCountDb(data){
                this.row.countDb = data;
                this.postAuthWhiteListSet(this.row);
            },
            /**
             * 超级名单设置
             * @param row
             */
            postAuthWhiteListSet(row){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    id: row.id,
                    isBp:row.isBp,
                    countBp:row.countBp,
                    isDb:row.isDb,
                    countDb:row.countDb
                };
                REQ.reqAuthWhiteListSet(posData,
                    function(result){
                        vm.$message.success("修改设置成功！");
                        vm.getAuthWhiteList();
                    },
                    function(data){},
                    function(data){
                        //todo  error
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
            //删除确认弹窗
            deleteMessage(){
                this.$confirm('删除所选信息，是否这样做？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postAuthDelBatch();
                }).catch(() => {
                });
            },
            /**
             * 删除调用
             */
            postAuthDelBatch(){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    ids: vm.multipleSelection
                };
                REQ.reqAuthDelBatch(posData,
                    function(result){
                        vm.$message.success("删除所选信息成功！");
                        vm.getAuthWhiteList();
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                );
            },
            postApprovalAuthSet(){},
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getAuthWhiteList();
            },
        }
    }
</script>

<style scoped lang='scss'>
    @import "../../../../style/sass/mixin.scss";
    .superListwrap .layui-table{
        background-color: transparent;
        color: #FFFFFF;
        thead tr{
            background-color: #164648;
            th{
                text-align: center;
            }
        }
        tbody tr{
            &:hover{
                background: rgba(102,102,102,0.3);
            }
        }
        td,th{
            padding: 12px 0px;
        }
    }
   .superListwrap .prompt{
        color: #FFFFFF;
        font-size: 16px;
    }
   .btnsWrap{
       text-align: center;
       margin-top: 50px;
   }
    .freeze{
        color: #08B192;
        text-decoration: underline;
        font-size: 16px;
    }
    .cover{
        color: #963E4A;
        text-decoration: underline;
        font-size: 16px;
    }

</style>