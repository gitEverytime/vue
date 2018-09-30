<template>
    <div class="box">
        <el-tabs v-model="activeName">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getTradeInfo"
                    :label="col.resName"
                    :name="col.resName"
            ></el-tab-pane>
        </el-tabs>

        <div class="">
            <h1 class="new_title" v-if="curInfo && JSON.parse(curInfo).type === '300'">选择商家<span></span></h1>
            <el-row v-if="curInfo && JSON.parse(curInfo).type === '300'">
                <el-col :span="6">
                    <el-cascader
                            :options="options"
                            v-model="region"
                            placeholder="选择省市区"
                            @change="selectBlockCode"
                    >
                    </el-cascader>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="oForm.relatId" placeholder="请选择" @change="chooseStore">
                        <el-option
                                v-for="item in storeList"
                                :key="item.id"
                                :label="item.sname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="12"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <h1 class="new_title">选择时间<span></span></h1>
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            value-format="timestamp"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="selectTimestamp"
                    >
                    </el-date-picker>
                </el-col>
                <el-col :span="6">
                    <h1 class="new_title">选择类型<span></span></h1>
                    <el-select v-model="oForm.orderType" placeholder="请选择" disabled>
                        <el-option
                                v-for="item in typeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="12"></el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <h1 class="new_title">确认操作<span></span></h1>
                    <el-button type="danger" size="medium" @click="sureSearch">查询</el-button>
                </el-col>
            </el-row>
            <!--<h1 class="new_title" v-if="oForm.orderType === '1'">选择互动类型<span></span></h1>-->
            <!--<h1 class="new_title" v-if="oForm.orderType === '2'">查询<span></span></h1>-->
            <!--<el-row>-->
                <!--<el-col :span="6" v-if="oForm.orderType === '1'">-->
                    <!--<el-select v-model="oForm.type" placeholder="请选择" @change="selectType">-->
                        <!--<el-option-->
                                <!--v-for="item in interactList"-->
                                <!--:key="item.label"-->
                                <!--:label="item.label"-->
                                <!--:value="item.type">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                    <!--&lt;!&ndash;<el-button type="danger" size="medium" @click="sureSearch">确认</el-button>&ndash;&gt;-->
                <!--</el-col>-->
                <!--<el-col :span="12"></el-col>-->
            <!--</el-row>-->
            <TempSettlementTable
                    :unSettlementList = 'unSettlementList'
                    :relatId = 'oForm.relatId'
                    :relatType = 'oForm.relatType'
                    :startTime = 'oForm.startTime'
                    :endTime = 'oForm.endTime'
                    :totalAmount="totalAmount"
                    :oForm = "oForm"
            >

            </TempSettlementTable>
            <div class="pagination-wrap">
                <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        layout="prev, pager, next"
                        :pager-count="5"
                        :page-size="Number(oForm.pageSize)"
                        :total="total3">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import { regionData, CodeToText } from 'element-china-area-data';
    import TempSettlementTable   from './settlement_table.vue'
    import REQ from "../../vue/global/request.js";
    import Type   from  '../global/name_space.js'
    import cookie from '../global/cookie.js'
    export default {
        components:{
            TempSettlementTable
        },
        data(){
            return{
                menuIndex:1,
                activeName:'商户结算',
                perms:[],
                options:regionData,
                storeList: [],
                interactList:Type.interactList ,
                typeList:[{
                    value: '1',
                    label: '互动'
                }, {
                    value: '2',
                    label: '点餐'
                }],
                region:[],
                time:'',
                oCode:{
                    ac1:'',
                    ac2:'',
                    ac3:'',
                },
                oForm:{
                    relatId:'',
                    relatType:'2',
                    orderType:'1',
                    pageNo:'1',
                    pageSize:'10',
                    status:['2'],
                    type: '',
                    startTime:null,
                    endTime:null
                },
                totalAmount:0,
                unSettlementList:[],
                total3:0
            }
        },
        watch:{

        },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo;
            },
        },
        created(){
            this.getCurInfo();
        },
        mounted(){
        },
        methods:{
            //获取登录者信息
            getCurInfo(){
                let vm = this;
                REQ.reqGetCurInfo({},
                    (result) => {
                        let type = result.data.type;
                        type === '400' ? vm.selectInfo(result.data) : vm.getRecord(result.data);
                    },
                    (complete) => {
                    },
                    (err) => {
                        console.error(err)
                    })
            },
            /**
             * 不是商家记录
             */
            getRecord(){
                // 生成结算单跳转结算单未结记录
                let vm = this;
                let data = cookie.get('record');
                if(data){
                    vm.oCode.ac1 = JSON.parse(data).ac1;
                    vm.oCode.ac2 = JSON.parse(data).ac2;
                    vm.oCode.ac3 = JSON.parse(data).ac3;
                    vm.region = [JSON.parse(data).ac1,JSON.parse(data).ac2,JSON.parse(data).ac3];
                    vm.oForm.relatId = JSON.parse(data).relatId;
                    vm.getStoreFindByAC(JSON.parse(data).relatId);
                }
            },
            //是商家
            selectInfo(result){
                let vm = this;
                vm.oCode.ac1 = result.ac1;
                vm.oCode.ac2 = result.ac2;
                vm.oCode.ac3 = result.ac3;
                vm.region = [result.ac1,result.ac2,result.ac3];
                vm.oForm.relatId = result.storeId;
                vm.reqFinanceSettleList(result.storeId);
            },
            /**
             * 根据省市区code查询商家
             */
            getStoreFindByAC(relatId){
                let vm = this;
                let postData = vm.oCode;
                REQ.reqStoreFindByAC(postData,
                    (result) => {
                        vm.storeList = result.data;
                        if(relatId){    //如果是历史拉取
                            this.reqFinanceSettleList();
                        }else{
                            if(vm.storeList.length>0){            //如果是正常拉取
                                vm.oForm.relatId = vm.storeList[0].id;
                            }else {                               //正常拉取没有数据
                                vm.oForm.relatId = '';
                                vm.storeList = [];
                            }
                        }
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             * 确认查询
             */
            sureSearch(){
                if(!this.oForm.relatId) {
                    this.$message.warning("请选择要查询的商家！");
                    return
                }
                this.reqFinanceSettleList();
            },
            /**
             * 获取结算单（未结）列表
             */
            reqFinanceSettleList(){
                let vm = this;
                let postData = vm.oForm;
                REQ.reqFinanceSettleList(postData,
                    (result) => {
                        vm.totalAmount = result.data.totalAmount;
                        vm.unSettlementList = result.data.rows;
                        vm.total3 = result.data.count;
                        //存贮记录
                        let oData = {
                            ac1: vm.oCode.ac1,
                            ac2: vm.oCode.ac2,
                            ac3: vm.oCode.ac3,
                            relatId: vm.oForm.relatId
                        };
                        cookie.set('record',JSON.stringify(oData),60*60*24*3*1000);    //存贮三天
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             *
             * 按省市区查询商家list
             */
            selectBlockCode(val){
                this.oCode.ac1 = val[0];
                this.oCode.ac2 = val[1];
                this.oCode.ac3 = val[2];
                this.oForm.pageNo = 1;
                this.getStoreFindByAC();
            },
            /**
             * 按商家查询
             * @param val
             */
            chooseStore(val){
                let vm = this;
                vm.oForm.startTime = '';
                vm.oForm.endTime = '';
                vm.time = '';
                vm.oForm.type ='';
                vm.oForm.pageNo = 1;
            },
            /**
             * 按选择互动类型查询
             * @param val
             */
            selectType(val){
                this.oForm.pageNo = 1;
            },
            /**
             * 按时间段查询
             * @param val
             */
            selectTimestamp(val){
                this.oForm.startTime = val[0];
                this.oForm.endTime = val[1];
                this.oForm.pageNo = 1;
            },
            /**
             * 按分页查询
             * @param val
             */
            handleCurrentChange(val){
                this.oForm.pageNo = val;
                this.reqFinanceSettleList();
            },
            handleSizeChange(){

            },
        }
    }
</script>


<style  lang='scss'   scoped>
    @import "../../sass/common.scss";
    .box{
        padding: 0 30px;
    }
    .totleCount{
        padding: 10px;
        color: #FFFFFF;
        @include layout-flex-r-sb;
    }
</style>




