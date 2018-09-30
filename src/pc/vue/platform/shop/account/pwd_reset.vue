<template>
    <div class="pwd-reset">
        <div class="panel">
            <div class="row">
                <label class="lab">原始密码</label>
                <input class="inp" type="password"  v-on:focus="focusHandler" v-model="pwdInfo.pwd" >
            </div>
            <div class="row">
                <label class="lab">新密码</label>
                <input class="inp" type="password"  v-on:focus="focusHandler" v-model="pwdInfo.newPwd" >
            </div>
            <div class="row">
                <label class="lab">确认密码</label>
                <input class="inp" type="password" v-on:focus="focusHandler" v-model="pwdInfo.confirmPwd" >
            </div>

            <div class="row">
                <p class="err">{{getErrMsg}}</p>
            </div>
             
            <div class="row">
                <span class="btn" v-on:click="confirmHandler">确认</span>
            </div>

        </div>
    </div>
</template>

<script>
import $  from 'jquery';


export default {
    
    components:{   },

    data(){
        return{
            pwdInfo:{pwd:"", newPwd:"", confirmPwd:"" },
            err:""
        }
    },
    computed:{
        getErrMsg(){
            return this.err;
        }
    },

    mounted(){
    },
    
    methods:{

        confirmHandler(){

            if(this.pwdInfo.newPwd != this.pwdInfo.confirmPwd){
                this.err = "两次密码不一致，请重新输入!";
            }

        },

        focusHandler(){
            this.err = "";
        }


    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';

.pwd-reset{ width: 100%; height: 100%; }

.pwd-reset .panel{ margin: 20px 0 0 20px;  width: 600px; height: 500px; }

.pwd-reset .panel .row{
    @include layout-flex-r;
    margin: 20px 0 0 0;
}

.pwd-reset .panel .row .err{ width: 100%;  color: #FF5722;  text-align: center; }

.pwd-reset .panel .row .lab{ margin: 0 10px 0 0; width: 100px; height: 40px; line-height: 40px;  color: #333; text-align: right;}
.pwd-reset .panel .row .inp{ width: 100%; height: 40px; line-height: 40px; text-indent: 5px; border: 1px solid #D2D2D2;}

.pwd-reset .panel .row .btn{ 
    margin: auto;
    width: 100px; height: 40px; line-height: 40px; text-align: center; 
    color: #FFF; background: #009688;
}





</style>


