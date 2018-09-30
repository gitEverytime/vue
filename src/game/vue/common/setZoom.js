import $ from 'jquery'
const setZoom = (obj) =>{
    obj = obj||$('.B-main');
    var w = $(window).width();
    var h = $(window).height();
    var maxWidth = 1920;
    var maxHeight = 1080;
    window.zoom = 1;

    if(h>w+150){
        // zoom = w/maxWidth;
        // obj.css({zoom:zoom});
        // $(".aside").css({zoom:zoom});
    }else{
        zoom = h/maxHeight;
        if(w/h>3&&w/maxWidth>2){
            zoom += 0.1;
        }
        obj.css({zoom:zoom});
        // $(".aside").css({zoom:zoom});
    }
};

export default setZoom