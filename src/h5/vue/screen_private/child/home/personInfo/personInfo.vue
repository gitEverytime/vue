<template>
    <div class="person-info">
        <div class="panel">
            <Title title="个人信息" @E_LEFT_CLICK="backHandler" style="position: absolute; z-index: 1"/>
            <div class="content">
                <div class="top" :style="getBackground"></div>
                <div class="mask"></div>
                <div class="avatar-line">
                    <Upload class="avatar"
                            :show-file-list="false"
                            :action="getUploadUrl"
                            :before-upload="beforeUpLoad"
                            :on-progress="UpLoadOnProgress"
                            :on-error="UploadError"
                            accept="image/*"
                            :on-success="handleUploadSuccess">
                        <Imag :src="headimg"/>
                        <span class="camera icon icon-camera-select"></span>
                    </Upload>
                </div>
                <InputItem left="修改昵称" v-model="nickname" style="margin-bottom: 10px"/>
                <InputItem left="喜欢菜品" v-model="favorFood"/>
                <InputItem left="喜欢酒水" v-model="favorDrink"/>
                <InputItem left="喜欢品牌" v-model="favorBrand"/>
                <InputItem left="我的爱好" v-model="hobby" style="margin-bottom: 10px"/>
                <CarItem v-if="hasCar == 1" left="座驾信息" v-model="carInfo" style="margin-bottom: 10px"/>
                <InputItem left="置顶铭言" v-model="motto" style="margin-bottom: 15px"/>
                <Button text="保存" @click.native="saveHandler"/>
            </div>
            <div class="cropper" v-show="option.show">
                <VueCropper
                        ref="cropper"
                        :img="option.img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :fixed="option.fixed"
                        :fixedNumber="option.fixedNumber"
                        :fixedBox="option.fixedBox"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :canMoveBox="option.canMoveBox"
                        :centerBox="option.centerBox"
                ></VueCropper>
                <span class="cancel" @click="cancelCropper">
                    取消
                </span>
                <span class="confirm" @click="confirmCropper">
                    确认
                </span>
            </div>
        </div>

    </div>

</template>

<script>
    import Title from '../../component/title.vue'
    import REQ from '../../../comm/request'
    import fileUtil from "../../../comm/fileUtil"
    import {Upload} from 'element-ui'
    import InputItem from './input_item.vue'
    import CarItem from './car_item.vue'
    import Button from '../../component/button.vue'
    import filterXss from '../../../comm/filterXss'
    import Imag from "../../component/Image.vue"
    import VueCropper from 'vue-cropper'
    import $ from "jquery"

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title, Upload, InputItem, Button, CarItem, Imag, VueCropper},

        data() {
            return {
                nickname: '',
                favorFood: '',
                favorDrink: '',
                favorBrand: '',
                hobby: '',
                hasCar: '0',
                carInfo: {
                    carBrand: '',
                    carModel: '',
                },
                motto: '',
                headimg: '',
                option: {
                    show: false,
                    img: '',
                    size: 1,
                    outputType: 'png',
                    fixed: true,
                    fixedNumber: [1, 1],
                    fixedBox: false,
                    autoCrop: true,
                    canMoveBox: false,
                    centerBox: true,
                }
            }
        },

        computed: {
            getBackground() {
                return {
                    backgroundImage: `url(${this.getHeadImg})`,
                    backgroundSize: 'cover',
                    backgroundPositionY: '30%'
                }
            },

            getHeadImg() {
                if (this.headimg.slice(-4).toLowerCase() === "webp") {
                    return this.headimg.slice(0, -5)
                }
                return this.headimg
            },

            getUploadUrl() {
                return REQ.apiStaticDomain + "/res/upload"
            }
        },

        mounted() {
            this.getUserInfo()
        },

        methods: {
            getUserInfo() {
                REQ.reqGetClientUserInfo({cid: roomInfo.clientId},
                    (res) => {
                        const info = res.data
                        this.nickname = info.nickname
                        this.favorFood = info.favorFood
                        this.favorDrink = info.favorDrink
                        this.favorBrand = info.favorBrand
                        this.hobby = info.hobby
                        this.hasCar = info.hasCar
                        this.carInfo = {
                            carBrand: info.carBrand,
                            carModel: info.carModel
                        }
                        this.motto = info.motto
                        this.headimg = info.headimg
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            backHandler() {
                this.$router.replace({
                    name: 'home',
                    params: {index: 5}
                })
            },

            cancelCropper() {
                this.option.show = false
            },

            confirmCropper() {
                this.$refs.cropper.getCropBlob((data) => {
                    let fd = new FormData();
                    fd.append('name', 'aaa.png');
                    fd.append('file', data);
                    $.ajax({
                        type: 'POST',
                        url: "http://static.ibigtop.com/res/upload",
                        data: fd,
                        processData: false,
                        contentType: false,
                        enctype: 'multipart/form-data',
                        dataType : 'json',
                        xhrFields: {
                            withCredentials: true
                        },
                        success: (data) => {
                            console.log(data)
                        }
                    })
                })
            },

            handleUploadSuccess(res) {
                // this.option.img = res.response.data
                // this.option.show = true
                REQ.reqSetUserAvatar({cid: roomInfo.clientId, headimg: res.response.data},
                    (re) => {
                        this.headimg = res.response.data
                        window.RINFO.headimg = this.headimg

                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                    }
                )
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

            saveHandler() {
                if (!this.nickname) {
                    this.$toast.center('昵称不能为空')
                    return
                }

                if (this.nickname.length > 8) {
                    this.$toast.center('昵称长度不能超过8个字符')
                    return
                }

                if (this.$store.getters.getFileIsUploading) {
                    this.$toast.center('请等待图片上传完成！')
                    return
                }

                const params = {
                    cid: roomInfo.clientId,
                    nickname: filterXss(this.nickname),
                    favorFood: filterXss(this.favorFood),
                    favorDrink: filterXss(this.favorDrink),
                    favorBrand: filterXss(this.favorBrand),
                    carBrand: this.carInfo.carBrand,
                    carModel: this.carInfo.carModel,
                    hasCar: this.hasCar,
                    hobby: filterXss(this.hobby),
                    motto: filterXss(this.motto)
                }
                REQ.reqUpdateClientUserInfo(params,
                    () => {
                        this.$toast.center('保存成功')
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .person-info {
        @include window;

        .panel {
            @include panel;
            align-items: center;

            .content {
                @include content;
                position: relative;
                align-items: center;

                .top {
                    width: 100%;
                    @include set-height(167px);
                    margin-bottom: 50px;
                }

                .mask {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    @include set-height(167px);
                    background: linear-gradient(rgba(34, 24, 33, 0), rgba(34, 24, 33, 0.98))
                }

                .avatar-line {
                    @include layout-flex-r-center;
                    width: 100%;
                    position: absolute;
                    top: 132px;

                    .avatar {
                        position: relative;
                        img {
                            @include set-width-height(70px, 70px);
                            border-radius: 50%;
                        }

                        .camera {
                            position: absolute;
                            bottom: 3px;
                            right: 2px;
                        }
                    }
                }
            }
            .cropper {
                position: absolute;
                z-index: 999;
                width: 100%;
                height: 100%;
                top: 0;

                .cancel {
                    width: 35%;
                    height: 30px;
                    position: absolute;
                    bottom: 15px;
                    left: 10%;
                    @include layout-flex-r-center;
                    align-items: center;
                    background: #bbb;
                    border-radius: 4px;
                    border: 1px solid #cd533e;
                    color: #cd533e;
                    @include font-dpr(14px);
                }

                .confirm {
                    width: 35%;
                    height: 30px;
                    position: absolute;
                    bottom: 15px;
                    right: 10%;
                    @include layout-flex-r-center;
                    align-items: center;

                    border-radius: 4px;
                    background: #cd533e;
                    color: #fff;
                    @include font-dpr(14px);
                }
            }
        }
    }
</style>