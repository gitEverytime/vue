<template>
    <div class="item">
        <div class="img-con">
            <img src="http://s2.cdn.xiachufang.com/0745f4bc8ac111e6b87c0242ac110003_1239w_1239h.jpg?imageView2/1/w/215/h/136/interlace/1/q/90" alt="">
        </div>
        <div class="info">
            <h1 class="title">{{name}}</h1>
            <p class="point">{{point}}人点过</p>
            <p class="price">价格:{{price}}</p>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;



export default {

    props:['name', "price", "point", "img"],
    components:{   },
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

.item{ margin: 10px; width: 220px; height: auto; background: #FFF; border: 1px solid #dedede; }

.item .img-con{ width: 220px; height: 135px;}
.item .img-con img{ width: 220px; height: 135px;}

.item .info .title{ height: 25px; line-height: 25px; font-size: 14px; font-weight: bold; }
.item .info .point{ height: 25px; line-height: 25px; color: #dedede; }






</style>


