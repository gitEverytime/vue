<template>
    <div class="orderWrap">
        <h3>店内打赏</h3>
        <el-table
                class="report_table"
                :data="orderData"
                ref="multipleTable"
                :highlight-current-row=false
                width="100%">
            <el-table-column
                    prop="carteName"
                    min-width="17%"
                    label="昵称"
            >
                <template slot-scope="scope">
                    <span
                            class="dish_name"
                    >
                        {{scope.row.name}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="carteName"
                    min-width="17%"
                    label="打赏给">
                <template slot-scope="scope">
                    <span
                            class="dish_num"
                    >
                        {{scope.row.value}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    min-width="17%"
                    label="品类">
                <template slot-scope="scope">
                    <span
                            class="dish_num"
                    >
                        {{scope.row.grade}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    min-width="16%"
                    label="单价">
                <template slot-scope="scope">
                    <span
                            class="dish_price"
                    >
                        {{scope.row.tel}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    min-width="16%"
                    label="数量">
                <template slot-scope="scope">
                    <span
                            class="dish_price"
                    >
                        {{scope.row.tel}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    min-width="17%"
                    label="总价">
                <template slot-scope="scope">
                    <span
                            class="dish_price"
                    >
                        {{scope.row.tel}}
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <div class="total">
            <p>
                <span>总金额:{{}}元</span>
            </p>
            <p>
                注:店内打赏默认不导出，仅为查看
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        components:{
        },
        data(){
            return{
                orderData:[
                    {
                        name:'纪晓岚',
                        value:'1000',
                        grade:'金',
                        tel:'232'

                    },
                    {
                        name:'纪晓岚',
                        value:'1000',
                        grade:'银',
                        tel:'233'

                    }
                ]
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

<style scoped lang='scss'>
    @import '../../sass/common.scss';
    .orderWrap{
        text-align: center;
        padding: 0 15px;
        h3{
            color: $deep_green;
            font-size: 16px;
            padding:10px 0;
        }
        .dish_type{
            font-size: 12px;
            font-weight: bold;
            color: $deep_green;
            text-align:left;
        }
        .dish_name,
        .dish_num,
        .dish_price
        {
            display: block;
            font-size: 12px;
            color: $deep_green;
        }
        .dish_name{
            text-align:left;
        }
        .total{
            padding: 6px 0 10px;
            border-bottom: $deep_green solid 5px;
            p{
                @include layout-flex-r-sb;
                color: $deep_green;
                font-size: 12px;
            }
        }
    }
</style>