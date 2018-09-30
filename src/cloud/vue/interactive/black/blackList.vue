<template>
    <div class="superListwrap">
        <el-table
                :data="whiteData"
                ref="multipleTable"
                :highlight-current-row=false
                @selection-change="handleSelectionChange"
                style="width: 100%">
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
                    min-width="11%"
                    label="霸屏">
                <template slot-scope="scope">
                    <span class="off">OFF</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop=""
                    min-width="11%"
                    label="公聊">
                <template slot-scope="scope">
                    <span class="off">OFF</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop=""
                    min-width="11%"
                    label="麦霸">
                <template slot-scope="scope">
                    <span class="off">OFF</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    min-width="11%"
                    label="点餐">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isFood"
                            active-value="1"
                            inactive-value="0"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="setBlackList(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    min-width="11%"
                    label="评价">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isComment"
                            active-value="1"
                            inactive-value="0"
                            :active-color="activeColor"
                            :inactive-color="inactiveColor"
                            @change="setBlackList(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column
                    prop=""
                    min-width="11%"
                    label="申诉">
                <template slot-scope="scope">
                </template>
            </el-table-column>

            <!--<el-table-column-->
                    <!--prop=""-->
                    <!--min-width="9%"-->
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
                multipleSelection:[]
            }
        },
        watch: {

        },
        computed:{

        },

        mounted(){
            this.getAuthBlackList();
        },

        methods:{
            /**
             * 获取商家黑名单列表
             * @type {{storeId: *}}
             */
            getAuthBlackList(){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    pageNo: vm.pageNo,
                    pageSize:vm.pageSize
                };
                REQ.reqAuthBlackList(posData,
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

            /**
             * 黑名单设置
             * @param val
             */
            setBlackList(row){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    id :row.id,
                    isFood:row.isFood,
                    isComment:row.isComment
                };
                REQ.reqAuthBlackListSet(posData,
                    function(result){
                        vm.$message.success("修改黑名单设置成功！");
                        vm.getAuthBlackList();
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
                        vm.getAuthBlackList();
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                );
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getAuthBlackList();
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
    .off{
        color: #CD533E;
    }

</style>