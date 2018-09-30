<template>
    <div class="box-black">

        <div class="user-item" v-for="item in getUserList">
            <TemItemBlack v-bind="item"></TemItemBlack>
        </div>
        
    </div>
</template>

<script>
import $  from 'jquery';


import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;

import TemItemBlack from "./item_user_black.vue";


export default {
    
    components:{ TemItemBlack   },

    data(){
        return{
            userList:[
                {id:"1", nickname:"动信息1", url:"https://img.bosszhipin.com/beijin/mcs/useravatar/20180302/91c9e26cf71e203f33886fc72e6e3af2ac4cf28234ca751840c1225334546447_s.jpg", msg:"动信息动信息"},
                {id:"2", nickname:"动信息2", url:"https://img.bosszhipin.com/beijin/mcs/useravatar/20180302/91c9e26cf71e203f33886fc72e6e3af2ac4cf28234ca751840c1225334546447_s.jpg", msg:"动信息动信息"}
           
            ]
        }
    },
    computed:{ 
        getUserList(){
            return this.userList;
        }

    },

    mounted(){
    },
    
    methods:{


    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';


.box-black{ width: 100%; height: 100%; }

.box-black .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.box-black .title-bar h1{ font-size: 18px; }

.box-black .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.box-black .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}






</style>


