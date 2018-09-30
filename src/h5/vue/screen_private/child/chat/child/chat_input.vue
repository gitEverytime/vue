<template>
    <div class="menu">
        <div class="box-chat">
            <div class="con-input">
                <Imag v-if="imgSrc" :src="imgSrc"/>
                <span v-if="imgSrc" class="close icon icon-close-on" @click="deleteImg"></span>
                <div ref="input" class="input" contenteditable="true" @input="inputChange"></div>
            </div>

            <div class="ico icon" :class="menuOn ? 'icon-add-close' : 'icon-add'" @click="handleMenuClick"></div>
            <span class="btn" :class="canSend ? '' : 'no-use'" @click="sendChatHandler('text')">发送</span>
        </div>
        <div v-if="blankShow" style="background: transparent; height: 20px; width: 100%"></div>
        <div class="more" v-if="menuOn">
            <Upload class="more-btn"
                    :show-file-list="false"
                    :action="getUploadUrl"
                    :before-upload="beforeUpLoad"
                    :on-progress="UpLoadOnProgress"
                    :on-error="UploadError"
                    accept="image/*"
                    :on-success="handleUploadSuccess">
                <div class="btn-cover">
                    <span class="icon icon-img"></span>
                </div>
                <span class="text">图片</span>
            </Upload>
        </div>
    </div>

</template>

<script>

    import MsgType from "../../../comm/msg_type.js"
    import REQ from "../../../comm/request"
    import fileUtil from "../../../comm/fileUtil"
    import {Upload} from 'element-ui'
    import filterXss from "../../../comm/filterXss"
    import Imag from "../../component/Image.vue"


    var roomInfo = window.RINFO;

    export default {
        props: ["chatUserInfo"],

        data() {
            return {
                inputVal: "",
                menuOn: false,
                imgSrc: "",
                blankShow: false,
            }
        },

        components: {Upload, Imag},

        computed: {
            canSend() {
                return this.inputVal
            },

            getUploadUrl() {
                return REQ.apiStaticDomain + "/res/upload"
            }
        },

        mounted() {
            this.$refs.input.onclick = () => {
                this.menuOn = false
                if (this.isIphone()) {
                    this.blankShow = true
                }
            }

            if (this.isIphone()) {
                this.$refs.input.onblur = () => {
                    setTimeout(()=> {
                        this.blankShow = false
                    })
                }
            }
        },

        methods: {
            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },

            inputChange(e) {
                const val = e.target.innerText.trim()
                if (val.length > 50) {
                    this.inputVal = val.substr(0, 50)
                    e.target.innerText = this.inputVal
                    this.keepLastIndex(e.target)
                    this.$toast.center('内容长度不能超过50个字符！')
                    return
                }
                this.inputVal = e.target.innerText.trim()
            },

            keepLastIndex(obj) {
                if (window.getSelection) {                //ie11 10 9 ff safari
                    obj.focus();                      //解决ff不获取焦点无法定位问题
                    var range = window.getSelection();//创建range
                    range.selectAllChildren(obj);    //range 选择obj下所有子内容
                    range.collapseToEnd();           //光标移至最后
                }
                else if (document.selection) {           //ie10 9 8 7 6 5
                    var range = document.selection.createRange();//创建选择对象
                    range.moveToElementText(obj);//range定位到obj
                    range.collapse(false);//光标移至最后
                    range.select();
                }
            },

            handleMenuClick() {
                this.menuOn = !this.menuOn
            },

            deleteImg() {
                this.imgSrc = ""
            },

            handleUploadSuccess(res) {
                this.imgSrc = res.response.data
                this.menuOn = false
                this.$store.commit("storeFileIsUploading", false)
                this.sendChatHandler('img')
            },

            UpLoadOnProgress() {
                this.$store.commit("storeFileIsUploading", true)
            },

            UploadError() {
                this.$store.commit("storeFileIsUploading", false)
                this.$toast.center('上传失败，请重试')
            },

            beforeUpLoad(file) {
                const isImg = file.type.startsWith('image')  && !file.type.startsWith('image/webp');
                const limit = file.size / 1024 / 1024 < 10;
                if (!isImg) {
                    this.$toast.center('不支持的文件类型！')
                    return false
                }
                if (!limit) {
                    this.$toast.center('上传图片大小不能超过10MB!')
                    return false
                }
                return new Promise((resolve) => {
                    fileUtil.getOrientation(file).then((orient) => {
                        if (orient && orient === 6) {
                            let reader = new FileReader()
                            let img = new Image()
                            reader.onload = (e) => {
                                img.src = e.target.result
                                img.onload = function () {
                                    const data = fileUtil.rotateImage(img, img.width, img.height)
                                    const newFile = fileUtil.dataURLtoFile(data, file.name)
                                    resolve(newFile)
                                }
                            }
                            reader.readAsDataURL(file)
                        } else {
                            resolve(file)
                        }
                    })
                })
            },

            clearInput() {
                this.inputVal = ''
                this.$refs.input.innerHTML = ""
            },

            sendChatHandler(type) {
                if (type === 'text' && !this.canSend) {
                    return
                }

                if (this.inputVal.length > 50) {
                    this.$toast.center('内容长度不能超过50个字符！')
                    return
                }
                const data = {
                    storeId: roomInfo.storeId,
                    headimg: roomInfo.headimg,
                    cid: roomInfo.clientId,
                    cname: roomInfo.nickName,
                    sex: roomInfo.sex,
                    tid: this.chatUserInfo.clientId,
                    content: type === 'text' ? filterXss(this.inputVal) : '',
                    pic: type === 'img' ? this.imgSrc : '',
                    date: Date.now(),
                }

                REQ.reqAddPriChat(data,
                    (res) => {
                        data.mid = res.data
                        this.$root.notify.$emit(MsgType.DISPATCH_UP_PRI_CHAT, data);
                        if (type === 'text') {
                            this.clearInput();
                        } else if (type === 'img') {
                            this.imgSrc = ""
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },
        }
    }
</script>


<style lang='scss' scoped>

    @import '../../../../../../style/sass/mixin.scss';

    .menu {
        @include layout-flex-c;
        bottom: 50px;
        width: 100%;
        background: rgba(0, 124, 100, 0.7);

        .box-chat {
            @include layout-flex-r;
            max-height: 80px;
            align-items: flex-end;

            .con-input {
                @include layout-flex-r;
                border-radius: 5px;
                background: rgba(22, 70, 72, 0.8);
                margin: 5px 5px 5px 10px;
                flex: 1;

                .close {
                    position: absolute;
                    left: 70px;
                }

                img {
                    @include set-width-height(60px, 60px);
                    margin: 5px 0 5px 5px;
                    border-radius: 3px;

                }

                .input {
                    flex: 1;
                    color: #ccc;
                    max-height: 50px;
                    min-height: 15px;
                    overflow-y: auto;
                    white-space: normal;
                    word-break: break-all;
                    font-size: 14px;
                    padding: 5px;
                    margin: 5px;
                }
            }

            .ico {
                margin: 8px 5px;
            }

            .btn {
                width: 50px;
                height: 30px;
                background: #cd533e;
                border-radius: 3px;
                margin: 5px 10px 8px 5px;
                color: #ddd;
                text-align: center;
                line-height: 30px;
            }

            .no-use {
                background: #537e75;
            }
        }

        .more {
            height: 85px;
            width: 100%;
            @include layout-flex-r;
            border-top: 1px solid #099579;
            align-items: center;

            .more-btn {
                width: 25%;
                height: 100%;
                @include layout-flex-c-center;
                align-items: center;

                .btn-cover {
                    @include layout-flex-c-center;
                    background: rgba(22, 70, 72, 0.8);
                    border: 10px solid rgba(22, 70, 72, 0.8);
                    border-radius: 3px;
                }

                .text {
                    @include font-dpr(10px);
                    color: #ccc;
                    margin-top: 2px;
                }
            }
        }
    }
</style>




