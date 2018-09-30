<template>
    <li>
        <div>
            <h1 class="title">分类信息
                <!--<el-button type="primary" class="insertBtn" size="small">+选择分类</el-button>-->
            </h1>
        </div>
        <div class="typeWrap">
            <el-table
                    :data="tableData"
                    ref="multipleTable"
                    :highlight-current-row= true
                    @selection-change="handleSelectionChange"
                    @row-click="chooseCategoryList"
            >
                <el-table-column
                        prop="type"
                        width="100"
                        label="序号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        width=""
                        label="分类名称">
                    <template slot-scope="scope">
                        <a class="typeName"
                           href="javascript:;"
                           @click="selectCarteType(scope.row.type)"
                        >
                            {{scope.row.name}}
                        </a>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--width="70"-->
                        <!--label="操作">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="primary" size="mini" @click="updateType(scope.row.id,scope.row.typeName)">修改</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
        </div>
        <!--<div class="pagination-wrap">-->
        <!--<el-pagination-->
            <!--@current-change="handleCurrentChange"-->
            <!--@size-change="handleSizeChange"-->
            <!--layout="prev, pager, next"-->
            <!--:pager-count="5"-->
            <!--:total="total3">-->
        <!--</el-pagination>-->
        <!--</div>-->
    </li>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import TempSaveText from '../../components/save_Text.vue'
    import nameSpace    from  '../../global/name_space.js'
    export default {
        components:{
            TempSwitch,
            TempSaveText
        },
        data(){
            return{
                tableData:nameSpace.classifyList,
                actorList:[],
                input8:'',
                total3:100,
                pageNo:1,
                multipleSelection:[],
                id:''
            }
        },
        mounted(){

        },
        methods:{
            selectCarteType(type){
                this.$store.commit('setCarteType',type)
            },
            //批量操作
            handleSelectionChange(val) {
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
                this.pageIndex = val;
                this.getMenuClassify();
            },
            chooseCategoryList(row){
                this.$store.commit('setCarteType',row.type)
            }
        }
    }
</script>

<style scoped lang="scss">

    @import "../../../../style/sass/mixin";
    .el-table th{
        background-color: #D5D7D6 !important;
    }

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
    .menu_type{
        height: 50px;
        background-color: #164648;
        li{
            color: #FFFFFF;
            line-height: 50px;
            float: left;
            text-align: center;
        }
        li:nth-of-type(1){
            width: 350px;
        }
        li:nth-of-type(2){
            width: 890px;
        }
    }
    .menu_wrap{
        border-bottom: solid 2px #164648;
        overflow: hidden;
        li{
            float:left;
        }
        li:nth-of-type(1){
            width: 350px;
        }
        li:nth-of-type(2){
            width: 888px;
            border-left: solid 2px #164648;
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

</style>