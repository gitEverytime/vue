<template>
  <div  id="com-upload" v-bind:class="'box '+randomClass" v-bind:comid="comid">
    <div class="upload">
      <div class="file-info">
        <ul>
            <li v-for="(file, index) in files" :key="file.id">
                <span><i>文件名称:</i>{{file.name}}</span> -
                <span class="state" v-if="file.error">状态:{{file.error}}</span>
                <span class="state" v-else-if="file.success">状态:上传成功</span>
                <span class="state" v-else-if="file.active">状态:active</span>
                <span class="state" v-else></span>
            </li>
        </ul>

      </div>
      <div class="bar">
        <file-upload
            class="btn btn-upload"
            v-bind:post-action="uploadUrl"
            extensions="gif,jpg,jpeg,png,webp"
            accept="image/png,image/gif,image/jpeg,image/webp"
            :multiple="false"
            :size="1024 * 1024 * 10"
            v-model="files"
            @input-filter="inputFilter"
            @input-file="inputFile"
            ref="upload">
            
            <i class="fa icon fa-hand-lizard-o"></i> <i>选择文件</i>
        </file-upload>
        
        <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
            <i class="fa icon fa-upload"></i>上传
        </button>
        
        <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
            停止上传
        </button>
        
      </div>
    </div>
    
  </div>
</template>

<style  lang='scss'   scoped>
@import '../../../../style/sass/mixin.scss';

.box{ width: 100%; height: 80px; overflow: hidden; background: #FFF; }
.box .upload .file-info{width: 100%; height: 40px;}
.box .upload .file-info ul{
  @include layout-flex-c;
  width: 100%; height: 100%;
}
.box .upload .file-info ul li{ 
  @include layout-flex-r-sb;
  width: 100%; height: 35px; 
  line-height: 35px; text-align: left; 
}
.box .upload .file-info ul li span{color: #6fb3e0;}
.box .upload .file-info ul li .state{ color: #9abc32}

.box .upload .bar{
  @include layout-flex-r-sb;
}
.box .upload .bar .btn{ 
  width: 100px; height: 35px; line-height: 35px; text-align: center; border-radius: 5px;
  background:#f7f7f7; color: #666; font-size: 14px; border: 1px solid #ccc;
}
.box .upload .bar .btn .icon{  margin: 0 5px 0 5px; }
.box .upload .bar .btn-upload{
  display: block; font-size: 14px; border: 1px solid #d4d4d4;
  width: 100px; height: 35px; line-height:35px;  background: #fafafa; color: #333; text-align: center; 
}

.box .upload .bar .btn-upload #file{width: 1px; height: 1px; }

</style>

<script>
import $          from 'jquery';
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';

var self = null;

export default {
  props:["comid", "uploadUrl"],
  components: {
    FileUpload,
  },
  data() {
    return {
      files: [],
      randomClass:'upload_'+ new Date().getTime(),
      componentId:this.comid
    }
  },


  mounted(){
    $('#file').css({width:'1px', height:'1px'});
  },

  methods: {
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
    inputFile(newFile, oldFile) {

      if (newFile && !oldFile) {
        // add
        console.log('add', newFile)
      }
      if (newFile && oldFile) {
          // update
          if(newFile.success){
            var jsonObj = JSON.parse(newFile.response);
            var resUrl = jsonObj.response.data;
            jsonObj.response.data = {url:resUrl, comid:this.componentId};
            this.$emit("Event_upload", jsonObj.response );
             $('#file').css({width:'1px', height:'1px'});
          }
      }
      if (!newFile && oldFile) {
        // remove
        console.log('remove', oldFile)
      }


    }
  }
}
</script>