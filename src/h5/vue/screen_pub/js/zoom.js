import $ from 'jquery';
const ZoommouseWheel = (bigimg) =>{
    function mousewheel(obj, upfun, downfun) {
        if (document.attachEvent) {
            obj.attachEvent("onmousewheel", scrollFn)
        } else {
            if (document.addEventListener) {
                obj.addEventListener("mousewheel", scrollFn, false);
                obj.addEventListener("DOMMouseScroll", scrollFn, false)
            }
        }
        function scrollFn(e) {
            var ev = e || window.event;
            var dir = ev.wheelDelta || ev.detail;
            if (ev.preventDefault) {
                ev.preventDefault()
            } else {
                ev.returnValue = false
            }
            if (dir == -3 || dir == 120) {
                upfun()
            } else {
                downfun()
            }
        }
    }
    mousewheel($("." + bigimg)[0],
        function() {
            if ($("." + bigimg).innerWidth() > $("body").width()-160) {
                // alert("不能再放大了");
                return
            }
            if ($("." + bigimg).innerHeight() > $("body").height()-160) {
                // alert("不能再放大");
                return
            }
            var zoomHeight = $("." + bigimg).innerHeight() * 1.03;
            var zoomWidth = $("." + bigimg).innerWidth() * 1.03;
            $("." + bigimg).css({
                height: zoomHeight + "px",
                width: zoomWidth + "px"
            })
        },
        function() {
            if ($("." + bigimg).innerWidth() < 300) {
                // alert("不能再缩小了哦！");
                return
            }
            if ($("." + bigimg).innerHeight() < 300) {
                // alert("不能再缩小了哦！");
                return
            }
            var zoomHeight = $("." + bigimg).innerHeight() / 1.03;
            var zoomWidth = $("." + bigimg).innerWidth() / 1.03;
            $("." + bigimg).css({
                height: zoomHeight + "px",
                width: zoomWidth + "px"
            })
        })
};
export default ZoommouseWheel;