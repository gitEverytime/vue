<template>
    <div class="input-item">
        <div class="must-cover">
            <span v-if="must" class="must">*</span>
        </div>
        <span class="left">{{left}}</span>
        <div class="right">
            <div class="btn" v-for="(item, key) in value">
                <Imag :src="item"/>
                <span class="close icon icon-close-on" @click="deleteImage(key)"></span>
            </div>
            <Upload v-if="value.length < 3"
                    :show-file-list="false"
                    :action="getUploadUrl"
                    :before-upload="beforeUpLoad"
                    :on-progress="UpLoadOnProgress"
                    :on-error="UploadError"
                    accept="image/*"
                    :on-success="handleUploadSuccess">
                <div class="btn">
                    <span class="icon icon-add-only"></span>
                </div>
            </Upload>
        </div>
    </div>

</template>

<script>
    import {Upload} from 'element-ui'
    import REQ from "../../../comm/request"
    import fileUtil from "../../../comm/fileUtil"
    import Imag from "../../component/Image.vue"

    const E_INPUT_CHANGE = 'E_INPUT_CHANGE'

    export default {
        props: ['value', 'must', "left", "placeholder"],

        model: {
            prop: 'value',
            event: E_INPUT_CHANGE
        },

        mounted() {
        },

        components: {Upload, Imag},

        computed: {
            getUploadUrl() {
                return REQ.apiStaticDomain + "/res/upload"
            }
        },

        methods: {
            handleUploadSuccess(res) {
                this.value.push(res.response.data)
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

            deleteImage (key){
                this.value.splice(key, 1)
                this.$emit(E_INPUT_CHANGE, this.value)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../../style/sass/mixin';

    .input-item {
        margin: 0 20px;
        @include set-height(78px);
        @include placeholder(#635c66, 14px);
        @include layout-flex-r;
        align-items: center;

        .must-cover {
            width: 10px;

            .must {
                color: #d8d854;
                @include font-dpr(16px);
            }
        }

        .left {
            flex: 2;
            color: #8d888f;
            @include font-dpr(14px);
        }

        .right {
            flex: 7;
            @include layout-flex-r;
            align-items: center;
            border: 1px solid #635a66;
            border-radius: 3px;
            @include set-height(65px);

            .btn {
                @include layout-flex-c-center;
                align-items: center;
                @include set-width-height(45px, 45px);
                border-radius: 3px;
                background: #3b313a;
                margin-left: 10px;
                position: relative;

                img {
                    @include set-width-height(45px, 45px);
                    border-radius: 3px;
                }

                .close {
                    position: absolute;
                    top: -6px;
                    right: -6px;
                    @include layout-flex-c;
                }
            }
        }
    }
</style>