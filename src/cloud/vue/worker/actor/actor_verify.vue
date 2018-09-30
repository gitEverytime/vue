<template>
    <div class="verify">
        <TempTable
            :tableData1="actorList"
            @setUpdate="getUpdate"
            @multipleSelection="getMultipleSelection"
        ></TempTable>
        <!--<TempPagination></TempPagination>-->
        <div class="btnsWrap">
            <el-button type="danger" @click="deleteApproval" :disabled="multipleSelection.length<1">删除申请</el-button>
        </div>
    </div>
</template>

<script>
    import REQ     from "../../global/request.js";
    import TempTable  from './verify_table.vue';
    import TempPagination  from '../../components/el_pagination.vue'
    const roomInfo = window.UINFO;
    export default {

        components:{
            TempTable,
            TempPagination
        },
        data(){
            return{
                actorList:[],
                total3:10,
                pageNo:1,
                multipleSelection:[],
            }
        },
        computed:{
            isUpdate(){
                return this.$store.getters.getUpdate;
            }
        },
        watch:{
            isUpdate(val){
                if(val){
                    this.getActorStoreDList();
                }
            }
        },

        mounted(){
            this.getActorStoreDList();
        },

        methods:{
            //获取待审批列表
            getActorStoreDList(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId
                };
                REQ.reqActorStoreDList(posData,
                    function(result){
                        _this.actorList = result.data;
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            //确认删除弹窗
            deleteApproval(){
                this.$confirm('确认删除所选人员吗？请谨慎操作', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.actorApprovalDel();
                }).catch(() => {
                });
            },
            /**
             * 删除list数据
             */
            actorApprovalDel(){
                let _this = this;
                let posData = {
                    applyIds:this.multipleSelection
                };
                REQ.reqActorApprovalDel(posData,
                    function(result){
                        _this.$message.success("删除所选项成功！");
                        _this.getActorStoreDList();
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
            getUpdate(val){
                this.getActorStoreDList();
            }
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




