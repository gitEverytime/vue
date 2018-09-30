/*
 * @Author: jgg 
 * @Date: 2018-04-08 15:49:19 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-04-25 09:35:39
 * @Describe  工具类
 */
    


import $ from 'jquery';



class Dialog{
    constructor(){
    }
    //弹出框实现--options=参数
    //callback1 确定按钮
    //callbackClose 关闭按钮
    dialog(options){

        var defaults={
            ele:'box',
            parentEle:'body',
            showClosebtn:false,//是否显示关闭按钮
            showMengban:true,//是否显示蒙版
            title:'提示信息',
            contant:'没填提示信息',//文本内容；
            okbtntext:'确认',//确定按钮文本
            closebtntext:'关闭',//关闭按钮文本
            okbtn:function(){},//确认后的回调
            closebtn:function(){},//关闭后的回调
        }
        for(var key in options){
            defaults[key]=options[key]
        }
        //每次调用提示框 关掉以前的弹框
        $(".model-box").remove();
        
       var okbtn = '<div class="btn btn-success" >'+ defaults.okbtntext+'</div>'
       var closebtn='';
       var mengban='';
       if(defaults.showClosebtn){
         closebtn = '<div class="btn btn-close" >'+ defaults.closebtntext+'</div>' 
       }
       if(defaults.showMengban){
         var mengban =   ' <div class="mengban"></div>' 
       }
        //生成dom  到body
        var doms= '<div class="model-box">' +
                    '<div class="popup-box">' +
                    '   <div class="popup-head">' +
                    defaults.title+
                    '   </div>' +
                    '   <div class="popup-body">' +
                    defaults.contant+
                    '   </div>' +
                    '   <div class="popup-foot">' +
                    okbtn+
                    closebtn+
                    '     </div>  ' +
                    ' </div>' +
                    mengban+
                '</div>';
        $('body').append(doms);

        //按钮事件绑定并执行回调
        $(".btn-success").on("click",function(){
            $(".model-box").remove();
            defaults.okbtn();
            });
        $(".btn-close").on("click",function(){
            $(".model-box").remove();
            defaults.closebtn();
            });
    }
  

}




export default  Dialog;


    
    
    
    
    