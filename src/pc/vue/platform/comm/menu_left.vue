/*
 * @Author: jgg 
 * @Date: 2018-04-17 21:23:46 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-04-19 16:12:59
 * @Describe 左侧菜单
 */

<template>
    <div class="menu">
        <ul class="list">
            <li> <router-link :to="{ name: 'dataSet' }">       数据    </router-link> </li>
            <li> <router-link :to="{ name: 'interactiveSet' }">互动信息 </router-link> </li>
            <li> <router-link :to="{ name: 'foodSet' }">       餐饮管理 </router-link> </li>
            <li> <router-link :to="{ name: 'moduleSet' }">     模块管理 </router-link> </li>
            <li> <router-link :to="{ name: 'namelistSet' }">   名单管理 </router-link> </li>
            <li> <router-link :to="{ name: 'actorSet' }">      艺人管理 </router-link> </li>
            <li> <router-link :to="{ name: 'accountSet' }">    账号设置 </router-link> </li>
            <li> <router-link :to="{ name: 'barSet' }">        商吧设置 </router-link> </li>
            <li> <router-link :to="{ name: 'verifyActor' }">   艺人审核 </router-link> </li>
        </ul>

    </div>
</template>

<script>

import $  from 'jquery';


export default {
    
    components:{   },

    data(){
        return{
            step:1  //未完善资料  step=1， 强制弹出完善资料界面
        }
    },
    computed:{

    },

    mounted(){
    },
    
    methods:{

    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../style/sass/mixin.scss';

.menu{width: 100%; height: 100%;}

.menu .list{ margin: 10px 0 0 10px; }

.menu .list li{height: 40px; line-height: 40px; }

.menu .list li a{color: #FFF; font-size: 16px; font-weight: bold; }






</style>




