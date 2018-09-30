<template>
    <div class="actor">
        <div class="title-bar">
             <h1 class="title"> 艺人管理 </h1>
        </div>
        <div class="menu-bar">
            <span class="btn" v-bind:class="{'actived':currPanelIndex==1}" v-on:click="showPanelHandler(1)"> 申请驻演列表</span>
            <span class="btn" v-bind:class="{'actived':currPanelIndex==2}" v-on:click="showPanelHandler(2)">已入驻艺人列表</span>
            <span class="btn" v-bind:class="{'actived':currPanelIndex==3}" v-on:click="showPanelHandler(3)">艺人收益</span>
        </div>

        <div class="box">
            <TemApplyBox v-if="currPanelIndex==1"></TemApplyBox>
            <TemListBox  v-if="currPanelIndex==2"></TemListBox>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;

import TemApplyBox from "./actor_apply.vue";

import TemListBox  from "./actor_list.vue";



export default {
    
    components:{  TemApplyBox, TemListBox },

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

.actor{ width: 100%; height: 100%; }

.actor .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.actor .title-bar h1{ font-size: 18px; }

.bactorar .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.actor .menu-bar .btn{
    margin: 0 10px 0 10px; display: inline-block;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}

.actor .menu-bar  .actived{border-bottom: 3px solid #ef4836;}




</style>


