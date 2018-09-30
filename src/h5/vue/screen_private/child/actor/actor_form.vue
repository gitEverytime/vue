<template>
    <div class="actor">
        <div class="panel">
            <div class="title">
                填写真实信息
            </div>
            <div class="bar-head">
               <div class="row-box dbbox">
                   <div class="inputbox">
                       <label for=""><span>*</span>姓名</label>
                       <input type="text" v-model="formData.realName">
                   </div>
                   <div class="inputbox">
                       <label for=""><span>*</span> 艺名</label>
                       <input type="text" v-model="formData.actorName">
                   </div>
               </div>
               <div class="row-box dbbox">
                   <div class="inputbox">
                       <label for=""><span>*</span> 性别</label>
                       <select name="" id="" v-model="formData.sex">
                           <option value="1">男</option>
                           <option value="2">女</option>
                       </select>
                   </div>
                   <div class="inputbox">
                       <label for=""><span>*</span> 你是</label>
                       <select name="" id="" v-model="formData.actorType">
                           <option value="0">歌手</option>
                           <option value="1">舞蹈</option>
                           <option value="2">乐器</option>
                           <option value="3">主持人</option>
                       </select>
                   </div>
               </div>
               <div class="row-box">
                   <div class="inputbox">
                       <label for=""><span>*</span> 手机号码</label>
                       <input type="tel" v-model="formData.phone">
                   </div>
               </div>
               <div class="row-box">
                   <div class="inputbox">
                       <label for=""><span>*</span> 身份证号码</label>
                       <input type="text" v-model="formData.idcard">
                   </div>
               </div>
                <div class="row-box">
                   <div class="inputbox ldbox">
                       <label for=""><span>*</span> 联系地址</label>
                       <area-select :level='2'  class="area-pick" v-model='selectedAdress'> </area-select>
                   </div>
               </div>
               <div class="row-box">
                   <div class="inputbox">
                       <label for=""><span>*</span> 详细地址</label>
                       <input type='text'  placeholder="如北京路288号xxx楼1205" v-model='formData.ac4'/> 
                   </div>
               </div>
                <div class="row-box">
                   <div class="inputbox">
                       <label for=""><span>*</span> 出生日期</label>
                       <!-- 时间选择器组件 -->
                       <input type="date" v-model='birthday'>
                   </div>
               </div>
                <div id="textarea-box" class="row-box">
                   <div class="inputbox">
                       <label for=""><span> </span> 个人简介</label>
                       <textarea rows="3" placeholder="字数限制在200字以内" v-model="formData.resume"></textarea>
                   </div>
               </div>
               <!-- <div class="row-box">
                   <div class="inputbox">
                       <label for=""><span>*</span> 形象照片</label>
                       <textarea ></textarea>
                   </div>
               </div>
               <div class="row-box">
                   <div class="inputbox">
                       <label for=""><span>*</span> 才艺视频</label>
                       <textarea ></textarea>
                   </div>
               </div> -->

                <div class="row-box lastbox">
                   <div class="inputbox yzminputbox ">
                       <label for=""><span>*</span> 输入验证码</label>
                       <input  v-model='valid'>
                   </div>
                   <div class="yanzmbox">
                        发送验证码
                   </div>
               </div>


               <div class="row-box lastbox">
                   <span class="error">{{ error }}</span>
               </div>

            </div>

            <div class="menu">
                <div class="btn-report" v-on:click="subHandler">提交</div>
            </div>
            
        </div>
    </div>
</template>

<script>

import $    from "jquery";
import REQ  from "../../comm/request.js";

var roomInfo = window.RINFO;

export default {
    
    components:{ },

    data(){
        return{

            formData:{
                realName:"",  idcard:"", actorName:"", phone:"",
                actorType:"", resume:"", sex:"",   ac4:""
            },
            selectedAdress:["640000","640100", "640104"],
            valid:'',
            birthday:"",
            error:""
        }
    },
    computed:{

    },

    mounted(){
        
        this.setAreaSeclectCss();
        $(".actor").height($("body").height());
    },
    
    methods:{

        setAreaSeclectCss(){
                  var eleSelect = $('.area-select');
            eleSelect.css({
                width:"5em", height:"30px", "line-height":"30px",
                "font-size":"14px",
                border:"1px solid #dedede",
                "flex-direction": "row"
                
            }).css("flex-dr");

            var eleAreaName = $('.area-selected-trigger');
            eleAreaName.css({
                display:"flex",
                width:"4em",
                margin:'auto',
                "white-space":"nowrap",
                "text-overflow":"ellipsis", 
                "-o-text-overflow":"ellipsis", 
                overflow: "hidden",
                
            });

            var eleAreaList = $('.area-selectable-list');
            eleAreaList.css({
                background:"#FFFFFF",
                "max-height":"300px", "overflow-y":"auto",
                border:"1px solid #a1a4ad", "z-index":9999,
                position:"relative"
            });
         var eleAreaList = $('.area-select-option');
         eleAreaName.css({
                display:"flex",
                width:"4em",
                margin:'auto',
                "white-space":"nowrap",
                "text-overflow":"ellipsis", 
                "-o-text-overflow":"ellipsis", 
                overflow: "hidden",
                
            });

        },

        subHandler(){
            var _this =this
            this.formData.cid = roomInfo.clientId,
            this.formData.ac1 = this.selectedAdress[0],
            this.formData.ac2 = this.selectedAdress[1],
            this.formData.ac3 = this.selectedAdress[2],
            //this.formData.brithday = new Date(this.brithday).getTime(),
            this.formData.brithday = Date.now(),
            this.formData.pics   = "http://images.liqucn.com/img/h1/h994/img201802021541020-info300X300.jpg",
            this.formData.videos = "http://images.liqucn.com/img/h1/h994/img201802021541020-info300X300.jpg"

            REQ.reqApplyCloudActor(this.formData, 
                function(data){
                    window.location.href = "#/actorWait";
                },
                function(data){},
                function(data){
                    _this.error = data.msg;
                }
            );

  
        }
    }
}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';

.actor{ @include layout-flex-c-center; position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999999999;  }

.actor .panel{ @include layout-flex-c-sb; width: 100%; height: 100%; border: 1px solid #dedede; border-radius: 5px; background: #FFF; position: absolute; z-index: 999; }

.actor .panel .title{ width: 100%; height: 1.2rem; line-height: 1.2rem; color: #b73cf1; text-align: center; font-size: 18px; }

.actor .panel .menu{ @include layout-flex-c-center; width: 100%; height: 1.2rem; line-height: 1.2rem; padding: 15px 0;   }
/***********************歌手注册表单样式************************************/
.actor .panel .bar-head{ @include layout-flex-c-sb; flex-direction: column; height: 100%; }

.actor .panel .bar-head .row-box{ 
    @include layout-flex-r-sb; 
    padding: 0 10px 0 10px; box-sizing: border-box; width: 100%; 
}

.actor .panel .bar-head .row-box .inputbox{ border: 1px solid rgb(221, 221, 221); border-radius: 8px; @include layout-flex-r; align-items: center; box-sizing: border-box; width: 100%; overflow: hidden; }

.actor .panel .bar-head .inputbox{ justify-content: flex-start }

.actor .panel .bar-head .dbbox .inputbox{ box-sizing: border-box; @include layout-flex-r; justify-content: flex-start; align-items: center; width: 47%; height: 30px; line-height: 30px; }

.actor .panel .bar-head .dbbox .inputbox input{ align-items: center; flex-basis: auto; } .actor .panel .bar-head  select{ flex-grow: 1; border: none; background: none; height: 30px; line-height: 30px; }

.actor .panel .bar-head .row-box .inputbox input{ flex-grow: 0.5 ; outline: none; border: none; height: 30px; line-height: 30px; }

.actor .panel .bar-head .row-box .inputbox textarea{ flex-grow: 1 ; outline: none; border: none; line-height: 20px; resize: none; }

.actor .panel .bar-head #textarea-box{ min-height: 60px; align-items: flex-start; } .actor .panel .bar-head .row-box .inputbox input[type=date]{ flex-grow: 1 ; outline: none; border: none; background:none; }

.actor .panel .bar-head .row-box .inputbox label{ color: rgb(153, 153, 153); padding: 0 5px; min-width: 3em; word-wrap: none; }

.actor .panel .bar-head .row-box .inputbox label span{ color: #b225f0; }

.actor .panel .ldbox{ overflow: visible !important; }

.actor .panel .bar-head  .lastbox{ justify-content: space-between; }

.actor .panel .bar-head .row-box .yzminputbox{ border: 1px solid rgb(221, 221, 221); border-radius: 8px; @include layout-flex-r; align-items: center; box-sizing: border-box; width: 60%; overflow: hidden; }

.actor .panel .bar-head .row-box .yzminputbox input{ font-size: 14px !important; height: 30px !important; width: 6em !important; }

.actor .panel .bar-head .row-box .yzminputbox label{ min-width: 6em !important; }

.actor .panel .bar-head .row-box .yanzmbox{ border: 1px solid #b73cf1; border-radius: 8px; color: #b73cf1; align-items: center; box-sizing: border-box; width: 35%; overflow: hidden; height: 30px; text-align: center; line-height:30px; }

.actor .panel .bar-head .row-box .error{color: #b73cf1; }

.area-select-wrap{ display: flex; flex-direction: row; }

.area-selectable-list-wrap{ position: relative; top: 0 !important; }

.actor .panel .area-select .area-selected-trigger{ font-size: 14px; width: 5em; white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow: hidden; }

.actor .panel .bar-head .btn{width: 0.5rem; height: 3rem; background: #dedede;  }

.actor .panel .menu .btn-report{
    background-color: #b225f0;
    margin: auto;
    width: 3rem; height: 30px;  text-align: center;
    border-radius: 15rem;
    color: #fff;
    line-height: 30px;
}


</style>




