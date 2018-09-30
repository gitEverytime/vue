<template>
    <div class="reportWrap">
       <div class="report_header">
           <el-row type="flex" class="row-bg cont_header" justify="space-between">
               <el-col :span="6">
                   <ul>
                       <li>昨天</li>
                       <li>今天</li>
                       <li>本周</li>
                       <li>本月</li>
                   </ul>
               </el-col>
               <el-col :span="6">
                   <el-date-picker
                           v-model="value6"
                           size="small"
                           type="daterange"
                           range-separator="-"
                           start-placeholder="开始时间"
                           end-placeholder="结束时间">
                   </el-date-picker>
               </el-col>
               <el-col :span="6" style="text-align: right">
                   总店
               </el-col>
           </el-row>
       </div>
       <div class="report-content">
           <el-row type="flex" class="row-bg cont_header" justify="space-between">
               <el-col :span="6">
                   <div class="grid-content bg-purple">
                       {{dateFormat}}
                   </div>
               </el-col>
               <el-col :span="6">
                   <div class="grid-content bg-purple-light">
                       毕果智能报表系统-苏木音乐酒馆
                   </div>
               </el-col>
               <el-col :span="6">
                   <div class="grid-content bg-orange">
                       导出报表
                   </div>
               </el-col>
           </el-row>
           <!-- 基本报表信息 -->
           <TempTable1></TempTable1>
           <!-- 图表信息 -->
           <TempTable2></TempTable2>
           <!-- 类型报表 -->
           <TempTable3></TempTable3>
       </div>
    </div>
</template>

<script>
    import $   from 'jquery';
    import dateFormat from '../global/date_format.js';
    import TempTable1 from './table1.vue';
    import TempTable2 from './table2.vue';
    import TempTable3 from './table3.vue';
    export default {
        components:{
            TempTable1,
            TempTable2,
            TempTable3,
        },
        data(){
            return{
                value6:'',
                dateFormat:dateFormat.YMDHM(Date.parse(new Date()))
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
    .reportWrap{
        height: 100%;
        margin-right: -17px;
        overflow-x: hidden;
        overflow-y: auto;
        .report_header{
            background-color: $deep_green;
            padding: 20px 30px;
            ul{
                li{
                    float: left;
                    margin-right: 30px;
                    color: #FFFFFF;
                }
            }
            h3{
                //@include layout-flex-r-center;
            }
            .header_report_btn{
                color: $orange;
            }
        }
        .report-content{
            padding: 0 30px 100px 30px;
            background-color: #FFFFFF;
            .cont_header{
                padding: 15px 0;
                border-bottom: $deep_green solid 1px;
                .bg-purple{
                    color: $deep_green;
                    font-size: 16px;
                }
                .bg-purple-light{
                    color: $deep_green;
                    font-size: 18px;
                    font-weight:bold;
                }
                .bg-orange{
                    color: $orange;
                    font-size: 16px;
                    text-align:right;
                }
            }
        }
    }
</style>