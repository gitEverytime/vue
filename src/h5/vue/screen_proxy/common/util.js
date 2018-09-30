import $ from 'jquery';
var B64 = require('js-base64').Base64;

class Util{
    constructor(){

    }

    
    request(type,url, data, success, complete, error, dataType){
            success = success || function(){};
            return $.ajax({
                url : url,
                data : data,
                dataType : dataType || 'json',
                cache : false,
                timeout : 120000,
                headers: {
                    'auth-type': 'h52s',
                },
                crossDomain:true,
                global:true,
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
                        if (data.code === 701) {
                            if (window.location) {
                                alert('登录已超时，请刷新页面')
                                window.location.reload(true)
                            }
                        }
                        if(data.code !== undefined && data.code === 0){
                            success.call(this, data);
                        }else{
                            error && error.call(this, data);
                        }
                    }else{
                        error && error.call(this, {
                            code : 99
                        });
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


    
    
    
    
    