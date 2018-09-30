<template>
    <div class="searchMsg_wrap">
        <h1 class="title">信息检索</h1>
        <el-input
                placeholder="按备注名"
                v-model="nickname"
                class="searchText m_b20">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-input
                placeholder="按打印内容"
                v-model="nickname"
                class="searchText m_b20">
            <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
    </div>
</template>

<script>
    export default {
        components:{
        },
        data(){
            return{
                nickname:''
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

<style scoped  lang='scss'>
    @import '../../../sass/common.scss';
    .searchMsg_wrap{
        padding-left:30px;
        text-align:left;
        .title {
            margin: 20px 0 20px 0;
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            text-indent: 10px;
            color: #FF5722;
            border-left: 2px solid #FF5722;
            span {
                color: #787B80;
                display: inline;
                padding-left: 20px;
            }
        }
        .m_b20{
            margin-bottom: 20px;
        }
    }

</style>