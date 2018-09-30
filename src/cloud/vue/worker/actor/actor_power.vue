<template>
    <div class="verify">
        <TempTable
                :tableData1="powerList"
                @applyAgain="getApplyAgain"
                @multipleSelection="getMultipleSelection"
        ></TempTable>
        <!--<TempPagination></TempPagination>-->
        <!--<div class="btnsWrap">-->
            <!--<el-button type="danger"-->
                       <!--@click="deleteApproval"-->
                       <!--:disabled="multipleSelection.length<1"-->
            <!--&gt;辞退</el-button>-->
        <!--</div>-->
    </div>
</template>

<script>
    import TempTable from './power_table.vue'
    import TempPagination  from '../../components/el_pagination.vue'
    import REQ     from "../../global/request.js";
    const roomInfo = window.UINFO;

    export default {

        components:{
            TempTable,
            TempPagination
        },


        data(){
            return{
                tableData:[],
                powerList:[],
                total3:10,
                pageNo:1,
                multipleSelection:[]
            }
        },
        computed:{

        },

        mounted(){
            this.getActorAuthList();
        },

        methods:{
            //获取数据
            getActorAuthList(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId
                };
                REQ.reqActorAuthList(posData,
                    function(result){
                        _this.powerList = result.data.rows;

                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },

            getMultipleSelection(val){
                this.multipleSelection = val;
            },
            getApplyAgain(val){
                if(val){
                   this.getActorAuthList()
                }
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




