<template>
    <div class="actor">
        <div class="menu-bar">
            <span class="btn" :class="{'on':getOnMenuIndex === 1}" v-on:click="switchBox(1)">互动</span>
            <span class="btn" :class="{'on':getOnMenuIndex === 2}" v-on:click="switchBox(2)">点餐</span>
            <span class="btn" :class="{'on':getOnMenuIndex === 3}" v-on:click="switchBox(3)">营销</span>
        </div>

        <div class="box">
            <TempInteractive v-if="getOnMenuIndex === 1" >  </TempInteractive>
            <TempOrder  v-if="getOnMenuIndex === 2" >  </TempOrder>
            <TempMarketing  v-if="getOnMenuIndex === 3" > </TempMarketing>
        </div>

    </div>
</template>

<script>

    import $             from 'jquery';
    import TempInteractive    from "./module_interactive.vue";
    import TempOrder     from "./module_order.vue";
    import TempMarketing      from "./module_marketing.vue";


    export default {
        components:{
            TempInteractive,  TempOrder,  TempMarketing
        },


        data(){
            return{
                menuIndex:1
            }
        },
        computed:{
            getOnMenuIndex(){
                return this.menuIndex;
            }

        },

        mounted(){
            var _this = this;

        },

        methods:{
            switchBox(menuIndex){
                this.menuIndex = menuIndex;
            }
        }


    }


</script>


<style  lang='scss'   scoped>

    @import "../../../style/sass/mixin.scss";

    .actor{
        margin: 0 0 0 20px;
        width: 100%; height: 100%;
    }

    .actor .menu-bar{
        @include layout-flex-r;
        padding: 20px 0;
        border-bottom:#00B594 solid 1px;
    }

    .actor .menu-bar .btn{
        width: 100px; height: 40px; line-height: 40px; color: #dedede;
        text-align: center; font-size: 18px; cursor: pointer;
    }

    .actor .menu-bar .on{
        color: #009688;
    }




</style>




