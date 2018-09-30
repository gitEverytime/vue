<template>
    <div class="lineUp_Wrap">
        <p class="line_title">排队管理</p>
        <div class="switchWrap">
            <TempLineSet></TempLineSet>
            <TempPriorityLevel></TempPriorityLevel>
            <TempVoucher></TempVoucher>
            <TempCallNumber></TempCallNumber>
        </div>
    </div>
</template>

<script>
    import TempLineSet from './line_set.vue'
    import TempPriorityLevel from './priority_level.vue'
    import TempVoucher from './voucher.vue'
    import TempCallNumber from './call_number.vue'
    export default {

        components:{
            TempLineSet,
            TempPriorityLevel,
            TempVoucher,
            TempCallNumber
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
    @import '../../../sass/common.scss';
    .lineUp_Wrap{
        padding: 0 30px;
        .line_title{
            padding: 20px 0;
            color: #FFFFFF;
            font-size:16px;
            border-bottom: $green solid 1px;
        }
        .switchWrap{
            .title{
                margin: 20px 0 20px 0;
                height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
                color: #FF5722; border-left: 2px solid #FF5722;
                span{
                    color:#787B80;
                    display: inline;
                    padding-left: 20px;
                }
            }
            p{
                color: $green;
                span{
                    display:inline-block;
                    width:100px
                }
            }
        }

    }
</style>