<template>
    <div class="menu">
        <ul class="menu_type">
            <li>分类管理</li>
            <li>品类管理</li>
        </ul>
        <ul class="menu_wrap">
            <TempPayClassify></TempPayClassify>
            <TempPayCategory></TempPayCategory>
        </ul>
    </div>
</template>

<script>
    import TempPayClassify   from './pay_classify.vue'
    import TempPayCategory   from './pay_category.vue'
    import REQ     from "../../global/request.js";
    export default {

        components:{
            TempPayClassify,
            TempPayCategory,
        },


        data(){
            return{
                tableData:[],
                actorList:[],
                input8:'',
                total3:100,
                pageNo:1,
            }
        },
        computed:{

            getActorList(){
                return this.actorList;
            }

        },

        mounted(){

        },

        methods:{
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




