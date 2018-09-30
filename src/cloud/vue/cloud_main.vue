<template>
    <div class="cloud">
        <TempMiddlePage></TempMiddlePage>
        <div class="header">
            <TempHeader> </TempHeader>
        </div>
        <div class="body">
            <div class="left">
                <TempMenuLeft></TempMenuLeft>
            </div>

            <div class="right">
                <div class="overflow-scroll">
                    <router-view class="render"></router-view>
                </div>
            </div>
        </div>
        <div class="footer">
            版权所有:宁夏毕果科技发展有限公司&nbsp;&nbsp;&nbsp;备案号:宁ICP备18000619号-1
        </div>
    </div>
</template>

<script>
    import TempMiddlePage  from './global/middle_page.vue';
    import TempHeader   from "./global/header.vue";
    import TempMenuLeft from "./global/menu_left.vue"
    import REQ from "../vue/global/request.js";
    import { regionData, CodeToText } from 'element-china-area-data';
    const roomInfo = window.UINFO;

export default {

    components:{  
        TempHeader, TempMenuLeft,TempMiddlePage
    },


    data(){
        return{
            dialogVisible:false,
            options:regionData,
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

@import "../../style/sass/mixin.scss";

.cloud{ 
    @include layout-flex-c;
    width: 100%; height:100%; background:#dedede; 
}

.cloud .header{width: 100%; height: 80px; background:#009688; }
.footer{text-align: center; height: 40px; line-height: 40px; color: #FFFFFF; background:#009688;}
.cloud .body{
    @include layout-flex-r;
    margin: auto;
    width: 1440px; height: 100%;
}

.cloud .body .left{
    width: 200px; height: 100%; background-color: #393D49;;
}

.cloud .body .right{
    width: 100%; background: #333;
    overflow: hidden;
    position:relative;
    .overflow-scroll{
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-right: -17px;
    }
}


</style>




