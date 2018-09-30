const drapMouseDown = (oBox) =>{
    var browserWidth = document.documentElement.clientWidth,
        browserHeight = document.documentElement.clientHeight,
        boxWidth = oBox.offsetHeight,
        boxHeight = oBox.offsetWidth;
    // 容器鼠标按下事件
    oBox.onmousedown=function(ev) {
        var e = e || window.event;
        // 鼠标相对于div左侧位置
        let disX = e.clientX - this.offsetLeft;
        let disY = e.clientY - this.offsetTop;
        document.onmousemove = function (e){
            var e = e || window.event;
            oBox.style.left = (e.clientX - disX) + 'px';
            if((e.clientX - disX)<=0){
                oBox.style.left = 0;
            }else if((boxWidth - disX + e.clientX) >= browserWidth){
                oBox.style.left = browserWidth - boxWidth + "px";
            }
            oBox.style.top = (e.clientY - disY) + 'px';
            if((e.clientY - disY) <= 0){
                oBox.style.top = 0;
            }else if((boxHeight - disY + e.clientY) >= browserHeight){
                oBox.style.top = browserHeight - boxHeight + "px";
            }
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
};
export default drapMouseDown;