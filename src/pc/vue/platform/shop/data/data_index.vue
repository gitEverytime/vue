<template>
    <div class="interactive">
        <div class="title-bar">
             <h1 class="title"> 交互信息 </h1>
        </div>
        <div class="menu-bar">
            <span class="btn">今日数据</span>
            <span class="btn" >周数据</span>
            <span class="btn" >月数据</span>
            <span class="btn" >季度数据</span>
            <span class="btn" >数据分析</span>
        </div>

        <div class="box">
            <TemChat></TemChat>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';

import TemChat from "./chat.vue";

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;



export default {
    
    components:{ TemChat  },

    data(){
        return{
        }
    },
    computed:{

    },

    mounted(){
    },
    
    methods:{

        getShopInfo(){
            var _this = this;
            var url = api_domain+'/admin/api/store/one';
            U.request("get",url,{uid:uId}, 
                function(data){
                    //todo sucess
                },
                function(data){
                    //complete
                },
                function(data){
                    //error
                }
            )

        }


    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';

.interactive{ width: 100%; height: 100%; }

.interactive .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.interactive .title-bar h1{ font-size: 18px; }

.interactive .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.interactive .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede;
}



</style>


