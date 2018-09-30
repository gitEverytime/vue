<template>
    <div class="table1Wrap">
        <el-row>
            <el-col :span="4" class="items bor_right">
                <h3 class="top_item">总营销额:{{}}元</h3>
                <p class="bottom_item">
                    <span>实收:{{}}元</span>
                    <span>未结:{{}}元</span>
                </p>
            </el-col>
            <el-col :span="5" class="items bor_right pad_left">
                <h3 class="top_item">总订单数:{{}}台</h3>
                <p class="bottom_item">
                    <span>食堂:{{}}</span>
                    <span>霸台:{{}}</span>
                    <span>翻台:{{}}</span>
                </p>
            </el-col>
            <el-col :span="4" class="items bor_right pad_left">
                <h3 class="top_item">新增会员:{{}}位</h3>
                <p class="bottom_item">
                    <span>会员总余额:{{}}元</span>
                </p>
            </el-col>
            <el-col :span="6" class="items bor_right pad_left">
                <p class="header_item">
                    <span>明星品类:{{}}</span>
                </p>
                <p class="header_item">
                    <span>明星厨师:{{}}</span>
                    <span>贡献:{{}}元</span>
                </p>
                <p class="header_item">
                    <span>明星服务员:{{}}</span>
                    <span>贡献:{{}}元</span>
                </p>
            </el-col>
            <el-col :span="5" class="items pad_left">
                <p class="header_item">
                    <span>员工应到:{{}}人</span>
                    <span>实到:{{}}人</span>
                </p>
                <p class="header_item">
                    <span>请假:{{}}人</span>
                    <span>旷工:{{}}人</span>
                </p>
                <p class="header_item">
                    <span>早退:{{}}人</span>
                    <span>迟到:{{}}人</span>
                </p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        components:{
        },
        data(){
            return{

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
    .table1Wrap{
        border-bottom: $deep_green solid 1px;
        .items{
            padding:10px 0 8px;
            height: 77px;
            .top_item{
                color:$deep_green;
                font-size: 18px;
                font-weight: bold;
            }
            .bottom_item{
                padding-top: 10px;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                color:$deep_green;
                font-size: 14px;
            }
            .header_item{
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                color:$deep_green;
                font-size: 14px;
            }
        }
        .bor_right{
            border-right: $deep_green solid 1px;
        }
        .pad_left{
            padding-left: 20px;
        }
    }
</style>