<template>

    <div>
         <div class="login_box  ">
		  	
	  		<div class="logo_box">
	  			<img class="img-responsive" :src="static_img_list.img_m"/>
	  		</div>
	  		<form action="" method="post">
	  			<div class="input_box clearfix">
	  				<div class="place_hold">
	  					<img class="img-responsive" :src="static_img_list.img_s"/>
	  					<input type="tel" id="tel" placeholder="请输入手机号码" v-model="valPhone" />
	  				</div>
	  			</div>
	  			<div class="input_box clearfix">
	  				<div class="place_hold">
	  					<img class="img-responsive" :src="static_img_list.img_p"/>
	  					<input type="password" id="password" placeholder="请输入登录密码" v-model="valPwd" />
	  				</div>
	  			</div>
	  			<div id="submit_box" class="input_box" v-on:click="subHandler">
	  				登录
	  			</div>
	  			<p><a href="/signin">注册</a> | <a href="">忘记密码？</a></p>
	  		</form>
		  </div>
    </div>
</template>

<script>
import $  from 'jquery';

import REQ from "../comm/comm_req.js";



export default {
    
    components:{   },

    data(){
        return{
            valPhone:"",
            valPwd:'',
            static_domain:window.CFG.STATIC_DOMAIN,
            static_img_list:{
                img_m:window.CFG.STATIC_DOMAIN+"/img/logo2.png",
                img_s:window.CFG.STATIC_DOMAIN+"/img/login/icon_phone.png",
                img_p:window.CFG.STATIC_DOMAIN+"/img/login/icon_lock.png"
            }
        }
    },
    computed:{

    },

    mounted(){
        var _this = this;
        //登录框样式focus和blur
        $(".login_box").css("left",($("body").width()-$(".login_box").width())/2);
        $(".login-layer").css("left",($("body").width()-$(".login_box").width())/2);
        $(".input_box").find("input").focus(function(){
            $(this).parent().css("background","url("+_this.static_domain+"/img/login/login_btn_bg.png)").css("background-size","100% 100%")
            if($(this).attr("id")=="tel"){
                $(this).prev().attr("src",_this.static_domain+"/img/login/icon_phone_on.png");
            }else{
                $(this).prev().attr("src",_this.static_domain+"/img/login/icon_lock_on.png");
                
            }
        });          
        $(".input_box").find("input").blur(function(){
            $(this).parent().css("background",_this.static_domain+"/img/login/kuang.png)").css("background-size","100% 100%");
            if($(this).attr("id")=="tel"){
                $(this).prev().attr("src",_this.static_domain+"/img/login/icon_phone.png");
            }else{
                $(this).prev().attr("src",_this.static_domain+"/img/login/icon_lock.png");
                
            }
        });

    },
    
    methods:{
        subHandler(){
            var posData = {
                phone:this.valPhone, 
                pwd:  this.valPwd
            }

            REQ.reqStoreLogin(posData,
                function(data){
                    window.location.href = "/admin/api/page/index?uId="+data.data.id;
                },
                function(data){},
                function(data){  
                    //todo  error
                }
            );

        }
    }


}
</script>






