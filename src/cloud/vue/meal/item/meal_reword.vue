<template>
    <div class="menu">
        <ul class="menu_type">
            <li></li>
            <li></li>
        </ul>
        <ul class="menu_wrap">
            <li>
                <el-table
                        :data="tableData"
                        ref="multipleTable"
                        :highlight-current-row=false
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="30"
                            size="medium"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="headimg"
                            width="30"
                            label="头像">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            width=""
                            label="昵称">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            width=""
                            label="性别">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            width=""
                            label="城市">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            width=""
                            label="身份">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            width=""
                            label="挂单数">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            width=""
                            label="金额">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            width=""
                            label="私信">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            width=""
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini">结账</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-wrap">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                            layout="prev, pager, next"
                            :pager-count="5"
                            :total="total3">
                    </el-pagination>
                </div>
                <div class="btnsWrap">
                    <el-button type="danger">删除内容</el-button>
                </div>
            </li>
            <li>
                <div class="rightNav">
                    检索
                </div>
                <div class="searchWrap">
                    <h1 class="title">信息检索</h1>
                    <el-input
                            class="searchText m_b20"
                            size="small"
                            placeholder="按昵称/姓名"
                            suffix-icon="el-icon-search"
                            v-model="input8">
                    </el-input>
                    <el-input
                            class="searchText"
                            size="small"
                            placeholder="按电话"
                            suffix-icon="el-icon-search"
                            v-model="input8">
                    </el-input>
                    <h1 class="title">时间检索</h1>
                    <el-date-picker
                            v-model="value6"
                            size="small"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import TempSaveText from '../../components/save_Text.vue'
    import REQ     from "../../global/request.js";

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
                total3:100,
                pageNo:1,
                value6:''
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
            this.tableData = [
                {
                    "applyId": "4484a8405a7811e8a97d4f1b88804ae6",
                    "applicate": "591a5dd05a6f11e891a787de0fa3371e",
                    "type": "1",
                    "createdAt": 1526633322671,
                    "headimg": "A",
                    "nickname": "阿杜2",
                    "sex": "1",
                    "city": "城市",
                    "actorId": "591a5dd05a6f11e891a787de0fa3371e",
                    "isAdjust": "",
                    "workOnTime": "21:00",
                    "workOffTime": "2:00",
                    "salary": "0.00",
                    "status": "1"
                },
                {
                    "applyId": "4484a8405a7811e8a97d4f1b88804ae6",
                    "applicate": "591a5dd05a6f11e891a787de0fa3371e",
                    "type": "1",
                    "createdAt": 1526633322671,
                    "headimg": "B",
                    "nickname": "寻水的鱼",
                    "sex": "0",
                    "city": "城市1",
                    "actorId": "591a5dd05a6f11e891a787de0fa3371e",
                    "isAdjust": "",
                    "workOnTime": "21:00",
                    "workOffTime": "2:00",
                    "salary": "0.00",
                    "status": "1"
                },
                {
                    "applyId": "4484a8405a7811e8a97d4f1b88804ae6",
                    "applicate": "591a5dd05a6f11e891a787de0fa3371e",
                    "type": "1",
                    "createdAt": 1526633322671,
                    "headimg": "C",
                    "nickname": "花花",
                    "sex": "1",
                    "city": "城市2",
                    "actorId": "591a5dd05a6f11e891a787de0fa3371e",
                    "isAdjust": "",
                    "workOnTime": "21:00",
                    "workOffTime": "2:00",
                    "salary": "0.00",
                    "status": "1"
                },
                {
                    "applyId": "4484a8405a7811e8a97d4f1b88804ae6",
                    "applicate": "591a5dd05a6f11e891a787de0fa3371e",
                    "type": "0",
                    "createdAt": 1526633322671,
                    "headimg": "D",
                    "nickname": "撒大声地",
                    "sex": "0",
                    "city": "城市3",
                    "actorId": "591a5dd05a6f11e891a787de0fa3371e",
                    "isAdjust": "",
                    "workOnTime": "21:00",
                    "workOffTime": "2:00",
                    "salary": "0.00",
                    "status": "1"
                }
            ]
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

    @import "../../../../style/sass/mixin";
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
    .btnsWrap{
        text-align: center;
        padding-top: 50px;
    }
    .menu_type{
        /*height: 50px;*/
        /*background-color: #164648;*/
        li{
            /*color: #FFFFFF;*/
            /*line-height: 50px;*/
            float: left;
            /*text-align: center;*/
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

</style>




