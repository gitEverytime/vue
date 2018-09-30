<template>
    <div class="food-list">
        <div class="panel">
            <div v-for="item in foodList">
                <TemFoodItem v-bind="item"></TemFoodItem>
            </div>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

import TemFoodItem from './food_item.vue';

var api_domain = window.CFG.API_DOMAIN;


export default {
    
    components:{  TemFoodItem },

    data(){
        return{
            foodList:[
                {name:"干锅土豆", price:500, point:120, img:"http://ku.90sjimg.com/element_origin_min_pic/18/01/07/9007b226b6d674bd98d0730cdbdbb2c2.jpg!/fw/240/quality/90/unsharp/true/compress/true/canvas/240x240/cvscolor/F6F6F600/format/webp" },
                {name:"干锅土1",  price:400, point:130, img:"http://ku.90sjimg.com/element_origin_min_pic/18/01/07/9007b226b6d674bd98d0730cdbdbb2c2.jpg!/fw/240/quality/90/unsharp/true/compress/true/canvas/240x240/cvscolor/F6F6F600/format/webp" },
                {name:"干锅豆",   price:300, point:110, img:"http://ku.90sjimg.com/element_origin_min_pic/18/01/07/9007b226b6d674bd98d0730cdbdbb2c2.jpg!/fw/240/quality/90/unsharp/true/compress/true/canvas/240x240/cvscolor/F6F6F600/format/webp" }
            ]
        }
    },
    computed:{

    },

    mounted(){
        console.log("-food-list-");
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

.food-list{ width: 100%; height: 100%; }
.food-list .panel{
    @include layout-flex-r;
}




</style>


