<template>
    <div class="menu">
        <!--<ul class="menu_type">-->
            <!--<li>分类管理</li>-->
            <!--<li>品类管理</li>-->
        <!--</ul>-->
        <el-row class="menu_type">
            <el-col :span="7">
                分类管理
            </el-col>
            <el-col :span="17">
                品类管理
            </el-col>
        </el-row>
        <el-row class="menu_wrap">
            <el-col :span="7">
                <TempMenuClassify></TempMenuClassify>
            </el-col>
            <el-col :span="17">
                <TempMenuCategory></TempMenuCategory>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TempMenuClassify from './menu_classify.vue'
    import TempMenuCategory from './menu_category.vue'
    export default {

        components:{
            TempMenuClassify,
            TempMenuCategory
        },


        data(){
            return{
            }
        },
        computed:{

        },
        mounted(){
        },

        methods:{

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
        .el-col{
            color: #FFFFFF;
            line-height: 50px;
            float: left;
            text-align: center;
        }
        li{
        }
        li:nth-of-type(1){
            width: 340px;
        }
        li:nth-of-type(2){
            width: 900px;
        }
    }
    .menu_wrap{
        border-bottom: solid 2px #164648;
        overflow: hidden;
        li{
            float:left;
        }
        li:nth-of-type(1){
            width: 340px;
            border-right: solid 2px #164648;
        }
        li:nth-of-type(2){
            width: 898px;
        }
        .typeWrap{
            overflow-y: auto;
            height: 500px;
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




