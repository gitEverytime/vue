<template>
    <div class="query_wrap">
        <TempBill></TempBill>
        <TempForwrad></TempForwrad>
    </div>
</template>

<script>
    import TempBill from './bill_query.vue'
    import TempForwrad from './forwrad.vue'
    export default {

        components:{
            TempBill,
            TempForwrad
        },


        data(){
            return{
                activeName:'1'
            }
        },
        computed:{

        },

        mounted(){

        },

        methods:{
            handleClick(){

            }
        }
    }
</script>

<style scoped>

</style>