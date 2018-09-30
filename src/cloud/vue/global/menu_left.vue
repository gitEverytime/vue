<template>
    <div class="bar-header">
        <el-menu
                :default-active="$route.path"
                :router="true"
                :unique-opened="true"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#393D49"
                text-color="#fff"
                active-text-color="#00B594">

            <div v-if="perms.length>0"  v-for="(firstLevel,index) in perms">
                <el-menu-item
                        v-if="JSON.stringify(firstLevel.child) === '[]'"
                        :index="firstLevel.resUrl"
                >
                    <i class="iconfont" :class="firstLevel.icon"></i>
                    <span slot="title">{{firstLevel.resName}}</span>
                </el-menu-item>

                <el-submenu
                        v-if="JSON.stringify(firstLevel.child) !== '[]'"
                        :index="String(index)"
                >
                    <template slot="title">
                        <i class="iconfont" :class="firstLevel.icon"></i>
                        <span>{{firstLevel.resName}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                                v-if="firstLevel.child.length === 1 && firstLevel.child[0].resUrl === ''"
                                v-for="col in firstLevel.child"
                                :index="firstLevel.resUrl"
                        >
                            {{col.resName}}
                        </el-menu-item>
                        <el-menu-item
                                v-if="firstLevel.child.length >0 && firstLevel.child[0].resUrl !== ''"
                                v-for="secondLevel in firstLevel.child"
                                :index="secondLevel.resUrl"
                        >
                            {{secondLevel.resName}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </div>
        </el-menu>
    </div>
</template>

<script>

import $   from 'jquery';
import cookie from '../global/cookie.js'
export default {

    components:{  
    },


    data(){
        return{
            perms:[]
        }
    },
    watch:{
        paremInfo(val){
            if(val){
                this.perms = JSON.parse(val).perms;
            }
        }
    },
    computed:{
        paremInfo(){
            return this.$store.getters.getCurInfo
        }
    },

    mounted(){
    },
    
    methods:{
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        }
    }
         

}


</script>


<style  lang='scss'   scoped>
 @import '../../../style/sass/mixin.scss';

 .bar-header{ 
    width:200px; height:80px; background:#009688;
 }
 .layui-nav-item i{
     display: inline-block;
     padding-right: 10px;
 }
 .el-menu{
     border-right:none;
 }

.bar-header .logo{ width: 100%; height: 80px; background: rgba(0,0,0, 0.2); }


</style>







