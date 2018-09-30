<template>
    <div class="table3Wrap">
        <el-row class="row-bg">
            <el-col :span="6" class="bor_right">
                <TempOrder></TempOrder>
                <TempRetreat></TempRetreat>
                <TempLodging></TempLodging>
            </el-col>
            <el-col :span="6" class="bor_right">
                <TempMember></TempMember>
                <TempConsume></TempConsume>
                <TempOrderDetail></TempOrderDetail>
            </el-col>
            <el-col :span="6" class="bor_right">
                <TempInteract></TempInteract>
                <TempDemand></TempDemand>
                <TempStoreReward></TempStoreReward>
            </el-col>
            <el-col :span="6">
                <TempEmployeeDetail></TempEmployeeDetail>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TempOrder from './order.vue'
    import TempMember from './member_value.vue'
    import TempInteract from './interact.vue'
    import TempEmployeeDetail from './employee_detail.vue'
    import TempRetreat from './retreat.vue'
    import TempConsume from './member_consume.vue'
    import TempDemand from './demand.vue'
    import TempLodging from './lodging.vue'
    import TempOrderDetail from './orderDetail.vue'
    import TempStoreReward from './store_reward.vue'
    export default {
        components:{
            TempOrder,
            TempMember,
            TempInteract,
            TempEmployeeDetail,
            TempRetreat,
            TempConsume,
            TempDemand,
            TempLodging,
            TempOrderDetail,
            TempStoreReward
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
    .table3Wrap{
        .row-bg{
            .bor_right{
                border-right: $deep_green solid 1px;
            }
        }
    }
</style>