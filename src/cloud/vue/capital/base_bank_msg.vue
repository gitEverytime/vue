<template>
    <div class="bank_msg">
        <p>持卡人:{{}}</p>
        <p>证件类型:{{}}</p>
        <p>证件号码:{{}}</p>
        <p>开户银行:{{}}</p>
        <p>支行信息:{{}}</p>
        <p>商户名称:{{}}</p>
        <p>手机号码:{{}}</p>
    </div>
</template>

<script>
    export default {
        components:{

        },
        data(){
           return{

           }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    @import '../../sass/common.scss';
    .bank_msg{
        p{
            color: #FFFFFF;
            padding-bottom: 10px;
        }
    }

</style>