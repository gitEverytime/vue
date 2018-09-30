<template>
    <div class="retreatWrap">
        <h3>退品</h3>
        <el-table
                class="report_table"
                :data="orderData"
                ref="multipleTable"
                :highlight-current-row=false
                width="100%">
            <el-table-column
                    prop="carteName"
                    min-width="40%"
                    label="项目"
            >
                <template slot-scope="scope">
                    <h2 class="dish_type">{{scope.row.$index}}{{scope.row.name}}</h2>
                    <span
                            class="dish_name"
                            v-for="val in scope.row.items"
                    >
                        {{val.item}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="carteName"
                    min-width="20%"
                    label="数量">
                <template slot-scope="scope">
                    <h2 class="dish_type"></h2>
                    <span
                            class="dish_num"
                            v-for="val in scope.row.items"
                    >
                        {{val.num}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    min-width="20%"
                    label="价格">
                <template slot-scope="scope">
                    <h2 class="dish_type"></h2>
                    <span
                            v-for="val in scope.row.items"
                            class="dish_price"
                    >
                        {{val.price}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    min-width="20%"
                    label="总价">
                <template slot-scope="scope">
                    <h2 class="dish_type"></h2>
                    <span
                            class="dish_price"
                            v-for="val in scope.row.items"
                    >
                        {{val.price*val.num}}
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <p class="total">
            <span>合计:{{}}例</span>
        </p>
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
                        name:'热菜(荤)1',
                        items:[
                            {
                                item:'明炉烤鱼',
                                num:15,
                                price:22,
                            },
                            {
                                item:'明炉烤鱼',
                                num:15,
                                price:22,
                            }
                        ]
                    },
                    {
                        name:'热菜(荤)2',
                        items:[
                            {
                                item:'明炉烤鱼',
                                num:15,
                                price:22,
                            },
                            {
                                item:'明炉烤鱼',
                                num:15,
                                price:22,
                            }
                        ]
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
    .retreatWrap{
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
            @include layout-flex-r-sb;
            color: $deep_green;
            padding: 6px 0 10px;
            font-size: 12px;
            border-bottom: $deep_green solid 5px;
        }
    }
</style>