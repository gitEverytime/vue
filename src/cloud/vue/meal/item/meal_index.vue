<template>
    <div class="actor">
        <el-tabs v-model="activeName">
            <el-tab-pane label="菜谱" name="菜谱"></el-tab-pane>
            <!--<el-tab-pane label="折扣设置" name="折扣设置"></el-tab-pane>-->
            <el-tab-pane label="店内打赏" name="店内打赏"></el-tab-pane>
            <!--<el-tab-pane label="买单方式" name="买单方式"></el-tab-pane>-->
            <!--<el-tab-pane label="挂单信息" name="挂单信息"></el-tab-pane>-->
        </el-tabs>

        <div class="box">
            <TempMenu v-if="activeName === '菜谱'" >  </TempMenu>
            <!--<TempDiscount v-if="activeName === '折扣设置'" >  </TempDiscount>-->
            <TempPay  v-if="activeName === '店内打赏'" >  </TempPay>
            <!--<TempRegister  v-if="activeName === '买单方式'" > </TempRegister>-->
            <!--<TempReword    v-if="activeName === '挂单信息'" >  </TempReword>-->
        </div>

    </div>
</template>

<script>
    import TempMenu   from "./meal_menu.vue";
    import TempPay     from "./meal_pay.vue";
    import TempRegister       from "./meal_register.vue";
    import TempReword    from "./meal_reword.vue";
    import TempDiscount from './meal_discount.vue'
    export default {

        components:{
            TempMenu,  TempPay,  TempRegister,  TempReword, TempDiscount
        },
        data(){
            return{
                menuIndex:1,
                activeName:'菜谱'
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


<style  lang='scss'   scoped>

    @import "../../../../style/sass/mixin";

    .actor{
        margin: 0 0 0 20px;
        width: 100%; height: 100%;
    }

    .actor .menu-bar{
        @include layout-flex-r;
        padding: 20px 0;
        border-bottom: #00B594 solid 1px;
    }

    .actor .menu-bar .btn{
        width: 100px; height: 40px; line-height: 40px; color: #dedede;
        text-align: center; font-size: 18px; cursor: pointer;
    }

    .actor .menu-bar .on{
        color: #009688;
    }




</style>




