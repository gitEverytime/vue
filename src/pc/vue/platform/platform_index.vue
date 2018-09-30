<template>
    <div class="page">
        <div class="header">

        </div>

        <div class="body">
            <div class="page-l">
                <TemMenuLeft></TemMenuLeft>
            </div>
            <div class="page-r">
                <router-view class="view"></router-view>
            </div>
        </div>
        
    </div>
</template>

<script>

import TemMenuLeft from "./comm/menu_left.vue";
import REQ         from "./comm/comm_req.js";


export default {
    
    components:{  TemMenuLeft },

    data(){
        return{
        }
    },
    computed:{

    },

    mounted(){
        this.requestStoreInfo();
    },
    
    methods:{
        requestStoreInfo(){
            var posData = { uid:window.UINFO.uId }
            REQ.reqStoreInfo(posData,
                function(data){
                    console.log("[ store info]=",data);
                    window.UINFO.storeId = data.data.id;
                    window.STORE_INFO    = data.data;
                },
                function(data){},
                function(data){
                    //todo  error
                }
            );


        }

    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../style/sass/mixin.scss';

.page{height: 100%; }
.page .header{ width: 100%; height: 80px; background: #000; }
.page .body{
    @include layout-flex-r;
    margin: auto;  width: 100%; height: 100%;
}

.page .body .page-l{ width: 200px; height: 100%; background: #393D49; }
.page .body .page-r{width: 100%; height: 100%; background: #f5f5f5;}





</style>




