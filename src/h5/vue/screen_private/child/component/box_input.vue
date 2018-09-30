<template>
    <div class="box-input">
        <textarea class="area" :value="value.note" maxlength="56" :placeholder="placeholder" ref="input"
                  @input="textChange" rows="4"></textarea>
        <div class="pic-content">
            <Upload class="more-btn"
                    :show-file-list="false"
                    :action="getUploadUrl"
                    :before-upload="beforeUpLoad"
                    :on-progress="UpLoadOnProgress"
                    :on-error="UploadError"
                    accept="image/*"
                    :on-success="handleUploadSuccess">
                <div class="btn icon icon-camera"></div>
            </Upload>
            <Imag v-if="value.pic" classes="img" :src="value.pic"/>
            <span v-if="value.pic" class="close icon icon-close-on" @click="deleteImg"></span>
        </div>

    </div>

</template>

<script>
    import fileUtil from "../../comm/fileUtil"
    import REQ from "../../comm/request"
    import {Upload} from 'element-ui'
    import Imag from "../component/Image.vue"

    const E_INPUT_CHANGE = "E_INPUT_CHANGE"

    export default {
        props: ["value"],

        components: {Upload, Imag},

        data() {
            return {
                placeholder: '想说点什么霸屏语?'
            }
        },

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE
        },

        computed: {
            getUploadUrl() {
                return REQ.apiStaticDomain + "/res/upload"
            }
        },

        mounted() {
            this.addInputListener()
        },

        methods: {
            deleteImg() {
                this.value.pic = ""
                this.$emit(E_INPUT_CHANGE, this.value)
            },

            handleUploadSuccess(res) {
                this.value.pic = res.response.data
                this.$emit(E_INPUT_CHANGE, this.value)
                this.$store.commit("storeFileIsUploading", false)
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

            textChange(e) {
                this.value.note = e.target.value
                this.$emit(E_INPUT_CHANGE, this.value)
            },

            addInputListener() {
                let input = this.$refs.input
                input.onclick = () => {
                    this.$store.commit("storeFootMenuShow", false)
                    if (!this.isIphone()) {
                        setTimeout(() => {
                            input.scrollIntoView(false)
                        }, 600)
                    }
                }
                input.onblur = () => {
                    this.$store.commit("storeFootMenuShow", true)
                }
            },

            isIphone() {
                return window.navigator.appVersion.match(/iphone/gi)
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .box-input {
        @include layout-flex-r;
        @include set-height(90px);
        background: #251a24;
        margin: 10px;
        border-radius: 4px;
        border: 1px solid #322831;
        @include placeholder(#5f525e, 14px);

        .area {
            flex: 1;
            resize: none;
            background: transparent;
            @include font-dpr(14px);
            color: #8d888f;
            border-color: transparent;
            padding: 10px 0 10px 10px;
            position: relative;
        }

        .pic-content {
            @include layout-flex-c;
            align-items: center;
            justify-content: flex-start;
            @include set-width(70px);
            position: relative;
            margin-left: -10px;

            .btn {
                margin-top: 13px;
            }

            .img {
                @include set-width-height(40px, 40px);
                margin: 10px 0;
                border-radius: 4px;
            }

            .close {
                position: absolute;
                bottom: 44px;
                right: 8px;
            }
        }
    }

</style>