<template>
    <div class="actor">
        <el-tabs v-model="activeName">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getActorInfo"
                    :label="col.resName"
                    :name="col.resName"
            ></el-tab-pane>
        </el-tabs>

        <div class="box">
            <TempVerify v-if="activeName === '审批'" ></TempVerify>
            <TempRight  v-if="activeName === '管理'" ></TempRight>
            <TempSalay  v-if="activeName === '添加'" ></TempSalay>
            <TempSet    v-if="activeName === '设置'" ></TempSet>
            <TempActorManage    v-if="activeName === '未通过'" ></TempActorManage>
        </div>
    </div>
</template>

<script>

import $             from 'jquery';
import TempVerify    from "./actor_verify.vue";
import TempRight     from "./actor_power.vue";
import TempSet       from "./actor_set.vue";
import TempSalay     from "./actor_salay.vue";
import TempActorManage   from './actor_manage.vue'

export default {

    components:{  
        TempVerify,  TempRight,  TempSet,  TempSalay,TempActorManage
    },


    data(){
        return{
            activeName:'审批'
        }
    },
    computed:{
    },

    mounted(){
        console.log("sdds");
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
}

.actor .menu-bar .btn{
    width: 100px; height: 40px; line-height: 40px; color: #dedede;
    text-align: center; font-size: 18px; cursor: pointer;
}

.actor .menu-bar .on{
    color: #009688;
}




</style>




