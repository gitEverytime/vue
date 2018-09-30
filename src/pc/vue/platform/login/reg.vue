<template>
<div>
    <div class="login_box sign_box">
        <div class="logo_box">
            <img class="img-responsive" :src="imglist.img1"/>
            <img class="img-responsive" :src="imglist.img2"/>
        </div>
        <form action="" method="post">
            <div class="input_box clearfix">
                <div class="place_hold">
                    <img class="img-responsive" :src="imglist.img3"/>
                    <input type="tel" id="tel" placeholder="请输入手机号码" v-model="valPhone" />
                </div>
            </div>
            <div class="yzm input_box">
                <div class="input_box clearfix">
                    <div class="place_hold">
                        <img class="img-responsive" :src="imglist.img4"/>
                        <input type="text" id="imgyzms" placeholder="请输入图片验证码" value="" />
                    </div>
                </div>
                <div  class="input_box clearfix gverify">
                    <div id="gverify" class="imgyzm">
                    
                    </div>
                </div>
            </div>
            <div class="yzm input_box">
                <div class="input_box clearfix">
                    <div class="place_hold">
                        <img class="img-responsive" :src="imglist.img5"/>
                        <input type="text" id="textyzm" placeholder="请输入验证码" v-model="valPCode" />
                    </div>
                </div>
                <div  class="input_box clearfix gverify">
                    <div id="resyzm" class="resyzm">
                        获取验证码
                    </div>
                </div>
            </div>
            <div class="input_box clearfix">
                <div class="place_hold">
                    <img class="img-responsive" :src="imglist.img6"/>
                    <input type="password" id="password2" placeholder="请输入登录密码" v-model="valPwd" />
                </div>
            </div>
            <div class="input_box clearfix">
                <div class="place_hold">
                    <img class="img-responsive" :src="imglist.img7"/>
                    <input type="password" id="password3" placeholder="请确认登录密码"  v-model="valPwdConfirm"/>
                </div>
            </div>
            <div id="submit_box" class="input_box" v-on:click="subHandler">
                注册
            </div>
            
        </form>
    </div>
</div>		  
	



</template>

<script>
import $  from 'jquery';

import REQ from "../comm/comm_req.js";


var static_domain = window.CFG.STATIC_DOMAIN;

export default {
    
    components:{   },

    data(){
        return{
            valPhone:"",
            valPCode:"",
            valPwd:'',
            valPwdConfirm:"",
            static_domain:window.CFG.STATIC_DOMAIN,
            imglist:{
                img1:window.CFG.STATIC_DOMAIN+'/img/logo2.png',
                img2:window.CFG.STATIC_DOMAIN+'/img/word.png',
                img3:window.CFG.STATIC_DOMAIN+'/img/login/icon_phone.png',
                img4:window.CFG.STATIC_DOMAIN+'/img/login/icon_pic.png',
                img5:window.CFG.STATIC_DOMAIN+'/img/login/icon_lock.png',
                img6:window.CFG.STATIC_DOMAIN+'/img/login/icon_lock.png',
                img7:window.CFG.STATIC_DOMAIN+'/img/login/icon_lock.png'
            }
        }
    },
    computed:{
        list(){
        }

    },

    mounted(){
        var _this = this;
        $(".login_box").css("left",($("body").width()-$(".login_box").width())/2);
				$(".input_box").find("input").focus(function(){
					$(this).parent().css("background","url("+_this.static_domain+"/img/login/login_btn_bg.png)").css("background-size","100% 100%")
					if($(this).attr("id")=="tel"){
						$(this).prev().attr("src",_this.static_domain+"/img/login/icon_phone_on.png");
					}else if($(this).attr("id")=="imgyzms"){
						$(this).prev().attr("src",_this.static_domain+"/img/login/icon_pic_on.png");
					}else if($(this).attr("id")=="textyzm"){
						$(this).prev().attr("src",_this.static_domain+"/img/login/icon_yan_on.png");
					}else{
						$(this).prev().attr("src",_this.static_domain+"/img/login/icon_lock_on.png");
					}
					
				});
				$(".input_box").find("input").blur(function(){
					$(this).parent().css("background","url("+_this.static_domain+"/img/login/kuang.png)").css("background-size","100% 100%");
					if($(this).attr("id")=="tel"){
						$(this).prev().attr("src",_this.static_domain+"/img/login/icon_phone.png");
					}else if($(this).attr("id")=="imgyzms"){
						$(this).prev().attr("src",_this.static_domain+"/img/login/icon_pic.png");
					}else if($(this).attr("id")=="textyzm"){
						$(this).prev().attr("src",_this.static_domain+"/img/login/icon_yan.png");
					}else{
						$(this).prev().attr("src",_this.static_domain+"/img/login/icon_lock.png");
						
					}
				})
    },
    
    methods:{
        subHandler(){
            var posData = {
                phone:this.valPhone, 
                pwd:this.valPwd,
                repwd:this.valPwdConfirm,
                role:4
            }

            REQ.reqStoreReg(posData,
                function(data){
                    window.location.href = "/admin/page/login";
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






