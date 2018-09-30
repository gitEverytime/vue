<template>
    <div class="food">
        <div class="title-bar">
             <h1 class="title"> 菜单管理 </h1>
        </div>
        <div class="menu-bar">
            <span class="btn" v-on:click="switchBoxHandler(0)">菜单列表</span>
            <span class="btn" v-on:click="switchBoxHandler(1)">添加菜品</span>
        </div>

        <div class="box">
            <TemFoodItemList v-if="getCurrBoxIndex==0"></TemFoodItemList>
            <TemFoodAdd      v-if="getCurrBoxIndex==1"></TemFoodAdd>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

import TemFoodItemList from './food_list.vue';
import TemFoodAdd      from "./food_add.vue";

var api_domain = window.CFG.API_DOMAIN;



export default {
    
    components:{  TemFoodItemList, TemFoodAdd },

    data(){
        return{
            currBoxIndex:0
        }
    },
    computed:{
        getCurrBoxIndex(){
            return this.currBoxIndex;
        }

    },

    mounted(){
    },
    
    methods:{

        switchBoxHandler(boxIndex){
            this.currBoxIndex = boxIndex;
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

.food{ width: 100%; height: 100%; }

.food .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.food .title-bar h1{ font-size: 18px; }

.food .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.food .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}




</style>


