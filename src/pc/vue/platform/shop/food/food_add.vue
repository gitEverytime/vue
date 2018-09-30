<template>
    <div class="box-add">
        <div class="info">
            <div class="row">
                <div class="img-con">
                    <img v:bind:src="getImgUrl" alt="">
                </div>
            </div>

            <div class="row">
                <CommUpload v-on:Event_upload="uploadResultHandler"></CommUpload>
            </div>

            <div class="row">
                <select id="food-type" class="food-type" v-model="foodType">
                    <option value="1">热菜</option>
                    <option value="2">凉菜</option>
                    <option value="3">烧烤</option>
                    <option value="4">面食</option>
                    <option value="5">酒水</option>
                </select>
            </div>


            <div class="row">
                <label>名称</label>
                <input type="text" v-model="foodName">
            </div>

            <div class="row">
                <label>价格</label>
                <input type="text" v-model="foodPrice">
            </div>

            <div class="row">
                <button class="btn-sub" v-on:click="subHandler">提交</button>
            </div>

            
        </div>
    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

import CommUpload from "../../comm/comm_upload.vue";

var api_domain = window.CFG.API_DOMAIN;


export default {

    props:[],
    components:{  CommUpload },
    data(){
        return{
            foodName:"",
            foodPrice:"",
            imgUrl:"",
            foodType:""
        }
    },
    computed:{
        getImgUrl(){
            return this.imgUrl;
        }
    },

    mounted(){
    },
    
    methods:{

        uploadResultHandler(data){
            console.log(data);
        },

        subHandler(){
            console.log(this.foodName, this.foodPrice, this.foodType );

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

.box-add{ margin: 10px; width: 220px; height: auto; background: #FFF; border: 1px solid #dedede; }

.box-add .info .row{
    @include layout-flex-r;
    margin: 10px 0 0 0;
}

.box-add .info .food-type{
    width: 100%; height: 40px; line-height: 40px;
}


.box-add .info .row .img-con{ width: 220px; height: 135px;}
.box-add .info .row .img-con img{ width: 220px; height: 135px;}

.box-add .info .row label{width: 100px; height: 40px; line-height: 40px; text-align: left;}
.box-add .info .row input{
    width: 100px; height: 40px; line-height: 40px; text-align: left;
     text-indent: 5px; border: 1px solid #dedede;
}

.box-add .info .row .btn-sub{ width: 100%; height: 40px; line-height: 40px; text-align: center; font-size: 16px;}






</style>


