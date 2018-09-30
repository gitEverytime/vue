<template>
    <div class="">
        <h1 class="new_title">交易订单<span></span></h1>
        <div class="totleCount">
                <span>
                    总金额：{{totalAmount}}元
                </span>

                <span>
                    <el-button type="primary" size="mini" @click="createSheet">生成日期内结算单</el-button>
                    <el-button type="danger" size="mini" @click="getFinanceExportIncomes" :disabled="unFinishedList.length<1">导出</el-button>
                </span>
        </div>
        <el-table
                :data="unFinishedList"
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="50"
                    size="medium"
            >
            </el-table-column>
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

        <div class="btnsWrap">
            <el-button
                    type="danger"
                    :disabled="multipleSelection.length<1"
                    @click="createOrder"
            >生成结算单</el-button>
        </div>
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
            unFinishedList:{
                type:Array
            },
            relatId:{
                type:String
            },
            relatType:{
                type:String
            },
            startTime:{
                type:Number
            },
            endTime:{
                type:Number
            },
            oForm:{
                type:Object
            },
            oCode:{
                type:Object
            },
            totalAmount:{
                type:Number
            },
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
                relatId1:this.relatId,
                relatType1:this.relatType,
                tradeStartTime:this.startTime,
                tradeEndTime:this.endTime
            }
        },
        watch:{
            relatId(val){
                this.relatId1 = val
            },
            relatType1(val){
                this.relatType1 = val
            },
            startTime(val){
                this.tradeStartTime = val
            },
            endTime(val){
                this.tradeEndTime = val
            }
        },
        mounted() {
        },
        methods:{
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            //批量操作
            handleSelectionChange(val){
                this.multipleSelection = new Set();
                val.forEach((value) => {
                    this.multipleSelection.add(value.id);
                });
                this.multipleSelection = [...this.multipleSelection]
            },
            createSheet(){
                let isSheet = true;
                this.createOrder(isSheet);
            },
            //确认生成
            createOrder(isSheet){
                this.$confirm('确认生成勾选/时间内的结算单吗？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.reqFinanceAddSettleBill(isSheet);
                }).catch(() => {
                });
            },
            /**
             * 添加结算单
             */
            reqFinanceAddSettleBill(isSheet){
                let vm = this;
                let postData = {
                    relatId:vm.relatId1,
                    relatType:vm.relatType1,
                    tradeStartTime:this.tradeStartTime,
                    tradeEndTime:this.tradeEndTime
                };
                if(!isSheet){
                    postData['oids'] = vm.multipleSelection;
                }
                REQ.reqFinanceAddSettleBill(postData,
                    (result) => {
                        vm.$message.success("生成结算单成功！");
                        window.location.href = '#/unsettlement/sheet';
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             * 订单详情
             * @param id
             */
            orderDetail(id){
                let oData = {                               //存贮当前选择的商铺
                    ac1: this.oCode.ac1,
                    ac2: this.oCode.ac2,
                    ac3: this.oCode.ac3,
                    relatId: this.oForm.relatId
                };
                this.$store.commit('setHisOrderInfo',JSON.stringify(oData));
                this.$router.push(`/unfinished/detail/${id}`)
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
    .btnsWrap{
        text-align: center;
        padding: 20px 0;
    }
    .totleCount{
        padding: 10px;
        color: #FFFFFF;
        @include layout-flex-r-sb;
    }
</style>