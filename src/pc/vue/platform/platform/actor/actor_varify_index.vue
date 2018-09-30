<template>
    <div class="actor-varify">
        <div class="title-bar">
             <h1 class="title"> 平台艺人管理 </h1>
        </div>
        <div class="menu-bar">
            <span class="btn" v-bind:class="{'actived':currPanelIndex==1}" v-on:click="switchHandler(1)"> 艺人列表   </span>
            <span class="btn" v-bind:class="{'actived':currPanelIndex==2}" v-on:click="switchHandler(2)"> 待审核列表 </span>
            <span class="btn" v-bind:class="{'actived':currPanelIndex==3}" v-on:click="switchHandler(3)"> 已拒绝列表 </span>
        </div>

        <div class="box">
            <TemNormalPanel v-if="currPanelIndex==1"></TemNormalPanel>
            <TemWaitPanel   v-if="currPanelIndex==2"></TemWaitPanel>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';
import U  from '../../../../../libs/util.js';
import TemNormalPanel  from "./actor_list_panel.vue";
import TemWaitPanel    from "./actor_wait_list_panel.vue";

var api_domain = window.CFG.API_DOMAIN;


export default {
    
    components:{ TemNormalPanel, TemWaitPanel  },

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

        switchHandler(flag){
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

.actor-varify{ width: 100%; height: 100%; }

.actor-varify .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.actor-varify .title-bar h1{ font-size: 18px; }

.actor-varify .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.actor-varify .menu-bar .btn{
    margin: 0 10px 0 10px; display: inline-block;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}

.actor-varify .menu-bar  .actived{border-bottom: 3px solid #ef4836;}




</style>


