<template>
    <div class="interactWrap">
        <h3>互动</h3>
        <el-table
                class="report_table"
                :data="orderData"
                ref="multipleTable"
                :highlight-current-row=false
                width="100%">
            <el-table-column
                    prop="carteName"
                    min-width="25%"
                    label="项目"
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
                    min-width="25%"
                    label="金额">
                <template slot-scope="scope">
                    <span
                            class="dish_num"
                    >
                        {{scope.row.value}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    min-width="25%"
                    label="分成">
                <template slot-scope="scope">
                    <span
                            class="dish_num"
                    >
                        {{scope.row.grade}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    min-width="25%"
                    label="收益">
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
                <span>合计:{{}}位</span>
                <span>总计储值:{{}}元</span>
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
                        name:'霸屏1',
                        value:'1000',
                        grade:'7/4',
                        tel:'567'

                    },
                    {
                        name:'霸屏2',
                        value:'1000',
                        grade:'7/4',
                        tel:'567'

                    },
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
    .interactWrap{
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