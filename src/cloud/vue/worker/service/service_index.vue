<template>
    <div class="actor">
        <el-tabs v-model="activeName">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getServiceInfo"
                    :label="col.resName"
                    :name="col.resName"
            ></el-tab-pane>
        </el-tabs>

        <div class="box">
            <TempVerify v-if="activeName === '审批'" >  </TempVerify>
            <TempRight  v-if="activeName === '权限'" >  </TempRight>
            <TempServiceList v-if="activeName === '管理'"></TempServiceList>
            <TempServiceInsert v-if="activeName === '添加'"></TempServiceInsert>
            <TempHoldApplyList v-if="activeName === '待添加列表'"></TempHoldApplyList>
            <TempUnpassList v-if="activeName === '未通过'"></TempUnpassList>
            <!--<TempSalay  v-if="activeName === '3'" > </TempSalay>-->
        </div>

    </div>
</template>

<script>

import $             from 'jquery';
import TempVerify    from "./service_verify.vue";
import TempRight     from "./service_right.vue";
import TempSet       from "./service_set.vue";
import TempSalay     from "./service_salay.vue";
import TempServiceInsert  from './service_insert.vue'
import TempServiceList      from './service_list.vue'
import TempHoldApplyList  from  './hold_applyList.vue'
import TempUnpassList    from './unpass_list.vue'

export default {

    components:{  
        TempVerify,  TempRight,  TempSet,  TempSalay,TempServiceList,TempServiceInsert ,TempHoldApplyList,TempUnpassList
    },


    data(){
        return{
            activeName:'审批',
            activeIndex:''
        }
    },
    watch:{
        activeName(val){
            if(val === '3') this.activeIndex = '1';
            if(val === '4') this.activeIndex = '2';
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

@import "../../../../style/sass/mixin.scss";

.actor{ 
    margin: 0 0 0 20px;
    width: 100%; height: 100%;
}

.actor .menu-bar{
    @include layout-flex-r;
    padding:20px 0;
}

.actor .menu-bar .btn{
    width: 100px; height: 40px; line-height: 40px; color: #dedede;
    text-align: center; font-size: 18px; cursor: pointer;
}

.actor .menu-bar .on{
    color: #009688;
}




</style>




