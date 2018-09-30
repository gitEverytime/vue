<template>
    <div >
        <span class="lab">{{message}}</span>
        <div class="btn-switch layui-unselect layui-form-switch"  :class="{'layui-form-onswitch':isSwitch === '1'}"  @click="isSwitchEvent">
            <em>{{isSwitch === '1' ? 'ON' : 'OFF'}}</em>
            <i></i>
        </div>
    </div>
</template>

<script>
    export default {

        components:{
        },
        props: {
            message:{
               type:String
            },
            propsSwitch: {
                type:String
            },
        },
        data(){
            return{
                isSwitch:this.propsSwitch
            }
        },
        watch: {
            propsSwitch(val) {
                val === '1'? this.isSwitch = '1' : this.isSwitch = '0'
            }
        },
        computed:{

        },

        mounted(){},

        methods:{
            isSwitchEvent(){
                let vm = this;
                vm.isSwitch === '1' ? vm.isSwitch = '0' : vm.isSwitch = '1';
                vm.$emit("isSwitchEmit",vm.isSwitch);
            }
        }


    }
</script>

<style  lang='scss' scoped>
    .lab{
        margin: 0 20px 0 0;
        height: 25px; line-height: 25px; color: #dedede; font-size: 16px;
    }
    .layui-form-switch{
        margin-top: 0;
    }

</style>