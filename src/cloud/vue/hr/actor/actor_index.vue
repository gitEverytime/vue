<template>
    <div class="actor">
        <el-tabs v-model="activeName">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getHrInfo"
                    :label="col.resName"
                    :name="col.resName"
            ></el-tab-pane>
        </el-tabs>

        <div class="box">
            <TempVerify v-if="activeName === '申请'" >  </TempVerify>
            <TempActorList
                    v-if="activeName === '管理' || activeName === '未通过'"
                    :activeName="activeName"
            >
            </TempActorList>
            <!--<TempSalay  v-if="activeName === '3'" > </TempSalay>-->
            <!--<TempSet    v-if="activeName === '4'" >  </TempSet>-->
        </div>
    </div>
</template>

<script>

    import $             from 'jquery';
    import TempVerify    from "./actor_verify.vue";
    import TempActorList     from "./actor_list.vue";
    // import TempSet       from "./actor_set.vue";
    // import TempSalay     from "./actor_salay.vue";


    export default {

        components:{
            TempVerify,
            TempActorList
        },


        data(){
            return{
                activeName:'申请'
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
    }

    .actor .menu-bar .btn{
        width: 100px; height: 40px; line-height: 40px; color: #dedede;
        text-align: center; font-size: 18px; cursor: pointer;
    }

    .actor .menu-bar .on{
        color: #009688;
    }




</style>




