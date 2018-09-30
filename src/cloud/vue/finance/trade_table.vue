<template>
    <div class="">
        <h1 class="new_title">交易订单<span></span></h1>
        <div class="totleCount">
                <span>
                    总金额：{{totalAmount}}元
                </span>
            <span>
                    <el-button type="danger" size="mini" @click="exportList" :disabled="tradeList.length<1">导出</el-button>
                </span>
        </div>
        <el-table
                :data="tradeList"
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    label="交易时间"
                    :formatter="dateFormat"
                    prop="createdAt">
            </el-table-column>
            <el-table-column
                    label="订单号"
                    width="300"
                    prop="id">
            </el-table-column>
            <el-table-column
                label="互动类型"
                prop="id">
                <template slot-scope="scope">
                    <span v-for="item in interactList">
                        {{item.type === scope.row.type ? item.label : ''}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="支付方式"
                prop="bossName">
                <template slot-scope="scope">
                    <span v-for="item in payList">
                        {{item.type === scope.row.payType ? item.name : ''}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    label="所得金额"
                    prop="amount">
                <template slot-scope="scope">
                    ￥{{scope.row.amount}}
                </template>
            </el-table-column>
            <el-table-column
                label="订单状态"
                prop="phone">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === '0'">未支付</span>
                    <span v-if="scope.row.status === '1'">支付中</span>
                    <span v-if="scope.row.status === '2'">已支付</span>
                    <span v-if="scope.row.status === '3'">已取消</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    prop="phone">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="orderDetail(scope.row.id)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    import REQ from "../../vue/global/request.js";
    import Type from '../global/name_space.js'
    import moment  from 'moment'
    const roomInfo = window.UINFO;
    export default {
        components:{

        },
        props:{
            totalAmount:{
                type:Number
            },
            tradeList:{
                type:Array
            },
            oForm:{
                type:Object
            },
            oCode:{
                type:Object
            }
        },
        data(){
            return{
                pageNo:1,
                value:0,
                storeInfo:[],
                CodeToText:CodeToText,
                activeIndex:'1',
                storeType:Type.storeType,
                interactList:Type.interactList,
                payList:Type.payList,
                multipleSelection:[],
            }
        },
        mounted() {
        },
        watch:{

        },
        methods:{
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            /**
             * 订单详情
             * @param id
             */
            orderDetail(id){
                this.$router.push(`/trade/detail/${id}`)
            },
            //批量操作
            handleSelectionChange(val){
                this.multipleSelection = new Set();
                val.forEach((value) => {
                    this.multipleSelection.add(value.id);
                });
                this.multipleSelection = [...this.multipleSelection]
            },
            exportList(){
                this.getFinanceExportIncomes();
            },
            /**
             * 导出订单
             */
            getFinanceExportIncomes(){
                let vm = this;
                window.location.href = `/admin/api/v1/finance/exportIncomes?relatId=${vm.oForm.relatId}`+
                `&relatType=${vm.oForm.relatType}&startTime=${vm.oForm.startTime}&status=${vm.oForm.status}`+
                `&endTime=${vm.oForm.endTime}&type=${vm.oForm.type}&orderType=${vm.oForm.orderType}`;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .totleCount{
        padding: 10px;
        color: #FFFFFF;
        @include layout-flex-r-sb;
    }
</style>