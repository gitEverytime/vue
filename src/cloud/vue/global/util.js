/*
 * @Author: jgg 
 * @Date: 2018-04-08 15:49:19 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-04-14 14:14:52
 * @Describe  工具类
 */
    


import $ from 'jquery';
var B64 = require('js-base64').Base64;
import Vue from 'vue'
// import ElementUI from 'element-ui'
// Vue.use(ElementUI);
import { Message} from 'element-ui';
Vue.prototype.$message = Message;
let vm = new Vue({
});
class Util{
    constructor(){

    }
    request(type,url, data, success, complete, error, dataType){
        success = success || function(){};
        return $.ajax({
            url : url,
            data : data,
            dataType : dataType || 'json',
            // contentType: "application/json",
            cache : false,
            timeout : 120000,
            xhrFields: {
                withCredentials: true
            },
            complete : function(){
                complete && complete.call(this);
            },
            type : type.toUpperCase(),
            error : function(){
                console.log("-error-");
                error && error.call(this, {
                    code : 99
                });
            },
            success : function(data){
                if(data.response){
                    data = data.response;
                    if(data.code !== undefined && data.code === 0){
                        success.call(this, data);
                    }else if(data.code !== undefined && data.code === 603){
                        vm.$message.success("您还没有登录，请登录！");
                        window.location.href = "/admin/api/page/login"
                    }else{
                        vm.$message.warning(data.msg);
                    }
                }else{
                    vm.$message.error("网络出了一点小问题，请稍后...");
                }
            }
        });
    }

    //弹出框实现--msg提示信息
    //callback1 确定按钮
    //callbackClose 关闭按钮
 
    Base64(){
        return B64;
    }


}




export default new Util();


    
    
    
    
    