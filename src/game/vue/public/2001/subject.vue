<template>
    <div>
        <p class="subject">{{question}}</p>
        <p class="subject_num">
            已答对&nbsp;{{right}}&nbsp;题
        </p>
    </div>
</template>

<script>
    export default {
        components:{

        },
        props:{
            question:{
                type:String
            },
            right:{
                type:Number
            }
        },
        data(){
            return{
                subject:'水杯哈哈哈',
                num:0
            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    @import './../../../../style/sass/mixin.scss';
    .subject{
        font-size:130px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        text-shadow:0px 2px 3px rgba(3,32,26,0.36);
        margin-top: 75px;
    }
    .subject_num{
        font-size:62px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        text-shadow:0px 2px 3px rgba(3,32,26,0.36);
        margin-top: 75px;
    }
</style>