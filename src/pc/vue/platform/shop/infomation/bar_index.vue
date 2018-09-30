<template>
    <div class="bar">
        <div class="title-bar">
             <h1 class="title"> 商家信息 </h1>
        </div>
        <div class="menu-bar">
            <span class="btn" v-bind:class="{'actived':currPanelIndex==1}" v-on:click="showPanelHandler(1)"> 基本信息</span>
            <span class="btn" v-bind:class="{'actived':currPanelIndex==2}" v-on:click="showPanelHandler(2)">吧主信息</span>
        </div>

        <div class="box">
            <TemBarInfo v-if="currPanelIndex==1"></TemBarInfo>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;

import TemBarInfo from  "./bar_info.vue";



export default {
    
    components:{  TemBarInfo },

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
        }



    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';

.bar{ width: 100%; height: 100%; }

.bar .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.bar .title-bar h1{ font-size: 18px; }

.bar .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.bar .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}

.bar .menu-bar  .actived{border-bottom: 3px solid #ef4836;}




</style>


