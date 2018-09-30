const setVideoDimensions = function (video,container) {
    // 获取视频本身的宽度和高度
    var w = video.videoWidth
        , h = video.videoHeight;

    // 获取视频的比例
    var videoRatio = (w / h).toFixed(2);

    // 获取容器的宽和高
    var containerStyles = window.getComputedStyle(container)
        , minW = parseInt( containerStyles.getPropertyValue('width') )
        , minH = parseInt( containerStyles.getPropertyValue('height') );

//计算和调整容器比例
    var widthRatio = minW / w
        , heightRatio = minH / h;

    //根据比例做调整
    if (widthRatio > heightRatio) {
        var newWidth = minW;
        var newHeight = Math.ceil( newWidth / videoRatio );
    }
    else {
        var newHeight = minH;
        var newWidth = Math.ceil( newHeight * videoRatio );
    }

    video.style.width = newWidth + 'px';
    video.style.height = newHeight + 'px';
};
export default setVideoDimensions;