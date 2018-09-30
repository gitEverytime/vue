<template>
    <div class="box-special">

        <div class="user-item" v-for="item in getUserList">
            <TemItemSpe v-bind="item"></TemItemSpe>
        </div>
        
    </div>
</template>

<script>
import $  from 'jquery';


import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;

import TemItemSpe from "./item_user_special.vue";


export default {
    
    components:{ TemItemSpe   },

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


.box-special{ width: 100%; height: 100%; }

.box-special .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.box-special .title-bar h1{ font-size: 18px; }

.box-special .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.box-special .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}






</style>


