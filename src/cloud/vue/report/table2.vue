<template>
    <div class="table2Wrap">
        <el-row class="row-bg">
            <el-col :span="7" class="bor_right">
                <ve-ring :data="chartData" height="230px" :settings="chartSettings"></ve-ring>
            </el-col>
            <el-col :span="7" class="bor_right">
                <ve-ring :data="chartData1" height="230px" :settings="chartSettings1"></ve-ring>
            </el-col>
            <el-col :span="10">
                <ve-ring :data="chartData2" height="230px" :settings="chartSettings2"></ve-ring>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        components:{
        },
        data(){
            this.chartSettings = {
                radius: [60, 40],
                offsetY: 150,
                hoverAnimation:false
            };
            this.chartSettings1 = {
                radius: [60, 40],
                offsetY: 150,
                hoverAnimation:false
            };
            this.chartSettings2 = {
                radius: [60, 40],
                offsetY: 150,
                hoverAnimation:false
            };
            return{
                chartData: {
                    columns: ['type', 'num'],
                    rows: [
                        { 'type': '点餐8990元', 'num': 8890 },
                        { 'type': '互动2380.3元', 'num': 2380.3 },
                        { 'type': '储值1000元', 'num': 1000 },
                    ]
                },
                chartData1: {
                    columns: ['type', 'num'],
                    rows: [
                        { 'type': '挂单965元', 'num': 965 },
                        { 'type': '打折221元', 'num': 221 },
                        { 'type': '赠送213元', 'num': 213 },
                    ]
                },
                chartData2: {
                    columns: ['type', 'num'],
                    rows: [
                        { 'type': '刷卡1320元', 'num': 1320 },
                        { 'type': '会员415元', 'num': 415 },
                        { 'type': '卡券80元', 'num': 80 },
                        { 'type': '支付宝2905元', 'num': 2905 },
                        { 'type': '微信3140元', 'num': 3140 },
                        { 'type': '现金3120元', 'num': 3120 },
                    ]
                }
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
    .table2Wrap{
        .row-bg{
            height: 230px;
            border-bottom: $deep_green solid 5px;
            .bor_right{
                border-right: $deep_green solid 1px;
            }
        }
    }
</style>