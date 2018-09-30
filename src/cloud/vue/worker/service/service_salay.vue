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
                    width="130"
                    label="薪资标准">
                <template slot-scope="scope">
                </template>
            </el-table-column>
            <el-table-column
                    prop="actorId"
                    width="130"
                    label="累计薪资">
                <template slot-scope="scope">
                </template>
            </el-table-column>
            <el-table-column
                    width="130"
                    label="累计点歌">
                <template slot-scope="scope">
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="累计收益"
                    width="130"
            >
                <template slot-scope="scope">
                </template>
            </el-table-column>
            <el-table-column
                    width="130"
                    label="历史账单">
                <template slot-scope="scope">
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
                <template slot-scope="scope">
                    <router-link class="pass" :to="{name:'manage-insert',params: {id: scope.row.id}}">
                        付薪
                    </router-link>
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
            <el-button type="danger">辞退</el-button>
        </div>
    </div>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import REQ     from "../../global/request.js";

    export default {

        components:{
            TempSwitch
        },


        data(){
            return{
                tableData:[],
                actorList:[],
                total3:10,
                pageNo:1,
            }
        },
        computed:{

            getActorList(){
                return this.actorList;
            }

        },

        mounted(){
            console.log(this.REQ);
            let _this = this;
            let posData = {
                storeId:1
            };
            REQ.reqApprovalStoreDList(posData,
                function(data){
                },
                function(data){ },
                function(data){
                    //todo error
                }
            );
        },

        methods:{

            checkHandler(applyId, status){ //通过
                let posData = {applyId:applyId, status:status  };
                this.REQ.reqDoActorApply(posData,
                    function(data){
                        alert(data.msg);
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );

            },

            getActorApplyList(){
                var _this = this;
                let posData = {
                    storeId:1, sys:1
                }
                this.REQ.reqStoreActorApplyList(posData,
                    function(data){
                        _this.actorList = data.data;
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
                // this.fetchFormData();
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




