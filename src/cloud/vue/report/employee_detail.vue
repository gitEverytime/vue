<template>
    <div class="emplpyeeWrap">
        <h3>员工详情</h3>
        <el-table
                class="report_table"
                :data="orderData"
                ref="multipleTable"
                :highlight-current-row=false
                width="100%">
            <el-table-column
                    prop="carteName"
                    min-width="40%"
                    label="姓名排名"
            >
                <template slot-scope="scope">
                    <h2 class="dish_type">{{scope.row.name}}</h2>
                    <span
                            class="dish_name"
                            v-for="val in scope.row.items"
                    >
                        {{scope.row.$index}}{{val.item}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="carteName"
                    min-width="20%"
                    label="工号">
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
                    label="迟">
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
                    label="退">
                <template slot-scope="scope">
                    <h2 class="dish_type"></h2>
                    <span
                            class="dish_price"
                            v-for="val in scope.row.items"
                    >
                        {{val.tui}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    min-width="20%"
                    label="假">
                <template slot-scope="scope">
                    <h2 class="dish_type"></h2>
                    <span
                            class="dish_price"
                            v-for="val in scope.row.items"
                    >
                       {{val.val1}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    min-width="20%"
                    label="罚">
                <template slot-scope="scope">
                    <h2 class="dish_type"></h2>
                    <span
                            class="dish_price"
                            v-for="val in scope.row.items"
                    >
                        {{val.val2}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    min-width="20%"
                    label="奖">
                <template slot-scope="scope">
                    <h2 class="dish_type"></h2>
                    <span
                            class="dish_price"
                            v-for="val in scope.row.items"
                    >
                       {{val.val3}}
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    min-width="20%"
                    label="开台">
                <template slot-scope="scope">
                    <h2 class="dish_type"></h2>
                    <span
                            class="dish_price"
                            v-for="val in scope.row.items"
                    >
                        {{val.val4}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    min-width="20%"
                    label="贡献">
                <template slot-scope="scope">
                    <h2 class="dish_type"></h2>
                    <span
                            class="dish_price"
                            v-for="val in scope.row.items"
                    >
                        {{val.val5}}
                    </span>
                </template>
            </el-table-column>

        </el-table>
        <p class="total">
            <span>合计:{{}}例</span>
            <span>总计金额:{{}}元</span>
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
                        name:'服务员',
                        items:[
                            {
                                item:'001',
                                num:'0',
                                price:'0',
                                tui:'0',
                                val1:'0',
                                val2:'0',
                                val3:'10',
                                val4:'7',
                                val5:'5506'
                            },
                        ]
                    },
                    {
                        name:'厨师',
                        items:[
                            {
                                item:'001',
                                num:'0',
                                price:'0',
                                val1:'0',
                                val2:'0',
                                val3:'10',
                                val4:'7',
                                val5:'5506'
                            },
                        ]
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
    .emplpyeeWrap{
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