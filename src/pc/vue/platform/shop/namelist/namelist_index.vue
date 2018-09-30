<template>
    <div class="namelist">
        <div class="title-bar">
             <h1 class="title"> 名单管理 </h1>
        </div>
        <div class="menu-bar">
            <span class="btn"  v-bind:class="{'actived':currPanelIndex==1}" v-on:click="showPanelHandler(1)" >所有用户</span>
            <span class="btn"  v-bind:class="{'actived':currPanelIndex==2}" v-on:click="showPanelHandler(2)" >黑名单</span>
            <span class="btn"  v-bind:class="{'actived':currPanelIndex==3}" v-on:click="showPanelHandler(3)" >白名单</span>
        </div>

        <div class="box">
            <TemBoxAll   v-if="currPanelIndex==1" >  </TemBoxAll>
            <TemBoxSpe   v-if="currPanelIndex==2" > </TemBoxSpe>
            <TemBoxBlack v-if="currPanelIndex==3" > </TemBoxBlack>
        </div>

    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_CLOUD_DOMAIN;

import TemBoxSpe   from "./box_user_special.vue";
import TemBoxBlack from "./box_user_black.vue";
import TemBoxAll   from "./box_user_all.vue";



export default {
    
    components:{  TemBoxSpe, TemBoxBlack, TemBoxAll },

    data(){
        return{
            panelIndex:1
        }
    },
    computed:{
        currPanelIndex(){
            return this.panelIndex;
        }

    },

    mounted(){
    },
    
    methods:{

        showPanelHandler(flag){
            this.panelIndex = flag;
        },

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

.namelist{ width: 100%; height: 100%; }

.namelist .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.namelist .title-bar h1{ font-size: 18px; }

.namelist .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.namelist .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}

.namelist .menu-bar  .actived{border-bottom: 3px solid #ef4836;}



</style>


