<template>
    <div class="box-pic">
        <div class="image-content" v-for="(item, index) in pics" v-if="index < length">
            <Imag :src="item" classes="image"></Imag>
            <span class="close icon icon-close-on" @click="deleteImg(index)"></span>
        </div>
        <Upload v-if="pics.length < length"
                :show-file-list="false"
                :action="getUploadUrl"
                :before-upload="beforeUpLoad"
                :on-progress="UpLoadOnProgress"
                :on-error="UploadError"
                accept="image/*"
                :on-success="handleUploadSuccess">
            <div class="icon icon-camera" style="margin: 0 10px"></div>
        </Upload>
    </div>
</template>

<script>
    import {Upload} from 'element-ui'
    import REQ from '../../comm/request'
    import fileUtil from "../../comm/fileUtil"
    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'
    import Imag from '../component/Image.vue'

    export default {
        props: ["value", "duration", "Imag"],

        components: {Upload, Imag},

        data() {
            return {
                pics: [],
                length: 1
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

        watch: {
            duration() {
                this.changeData()
            }
        },

        mounted() {
        },

        methods: {
            handleUploadSuccess(res) {
                this.pics.push(res.response.data)
                this.changeData()
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

            deleteImg(index) {
                this.pics.splice(index, 1)
                this.changeData()
            },

            changeData() {
                const numbers = {
                    10: 1,
                    15: 2,
                    30: 3,
                    60: 4,
                    120: 6,
                }
                this.length = numbers[this.duration]
                const data = []
                this.pics.forEach((item, key) => {
                    if (key < this.length) {
                        data.push(item)
                    }
                })
                this.$emit(E_INPUT_CHANGE, data.join(","))
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .box-pic {
        @include layout-flex-r;
        align-items: center;
        background: #251a24;
        margin: 10px;
        border-radius: 4px;
        border: 1px solid #322831;
        @include placeholder(#8d888f, 14px);
        height: 52px;
        overflow-x: scroll;

        .image-content {
            @include layout-flex-c;
            align-items: center;
            position: relative;

            .image {
                @include set-width-height(40px, 40px);
                margin-left: 10px;
            }

            .close {
                position: absolute;
                top: -5px;
                right: -5px;
            }
        }
    }

</style>