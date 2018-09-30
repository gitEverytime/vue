<template>
    <div class="device_pos">
        <el-row>
            <el-col :span="18" class="pos_left">
                <TempPosTable></TempPosTable>
                <TempElPagination></TempElPagination>
                <p>
                    <el-button type="danger">删除设备</el-button>
                    <el-button type="primary">添加设备</el-button>
                </p>
            </el-col>
            <el-col :span="6">
                <p class="searchTitle">检索</p>
                <TempSearchMsg></TempSearchMsg>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TempPosTable from './pos_table.vue'
    import TempElPagination from '../../components/el_pagination.vue'
    import TempSearchMsg from './search_Msg.vue'
    export default {
        components:{
            TempPosTable,
            TempElPagination,
            TempSearchMsg
        },
        data(){
            return{
                tableData:[],
            }
        },
        computed:{

        },
        mounted(){

        },
        methods:{
            handleSelectionChange(){

            }

        }
    }
</script>

<style scoped lang="scss">
    @import '../../../sass/common.scss';
    .device_pos{
        text-align: center;
        .pos_left{
            border-right: $deep_green solid 1px;
        }
        .searchTitle{
            background-color: $deep_green;
            height: 47px;
            text-align: center;
            color: #FFFFFF;
            line-height:47px;
        }
    }
</style>