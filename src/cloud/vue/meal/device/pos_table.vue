<template>
    <el-table
            :data="tableData"
            ref="multipleTable"
            :highlight-current-row=false
            @selection-change="handleSelectionChange"
            style="width: 100%">
        <el-table-column
                type="selection"
                width="50"
                size="medium"
        >
        </el-table-column>

        <el-table-column
                width="70"
                label="备注名">
            <template slot-scope="scope">
                <img :src="scope.row.headimg" class="headimg">
            </template>
        </el-table-column>

        <el-table-column
                prop="nickname"
                width=""
                label="状态">
        </el-table-column>

        <el-table-column
                width=""
                label="地址">
            <template slot-scope="scope">
                <i class="iconfont icon-man" v-if="scope.row.sex === '1'"></i>
                <i class="iconfont icon-woman" v-else></i>
            </template>
        </el-table-column>

        <el-table-column
                width=""
                label="打印内容">
            <template slot-scope="scope">
                <span>{{scope.row.province}}{{scope.row.city}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="address"
                width=""
                label="操作">
            <template slot-scope="scope">
                <i class="iconfont icon-caozuo" @click='setNameList(scope.row)'></i>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        components:{

        },
        data(){
            return{
                tableData:[]
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

<style scoped>

</style>