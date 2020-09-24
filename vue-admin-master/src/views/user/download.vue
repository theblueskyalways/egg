<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-button type="primary" v-on:click="openView('english')">预览/下载原图（英语小作文）</el-button>
            </el-form-item>
                    <el-form-item>
              <el-button type="primary" v-on:click="download('english')">下载xmind源文件(可以二次编辑)</el-button>
            </el-form-item>
          </el-form>
    </el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-button type="primary" v-on:click="openView('politics')">预览/下载原图（政治史纲思维导图）</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="download('politics')">下载xmind源文件(可以二次编辑)</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="downloadPdf('politics')">下载预览史纲大纲PDF</el-button>
            </el-form-item>
          </el-form>
    </el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-button type="primary" v-on:click="openView('read')">预览/下载原图（英语阅读思维导图）</el-button>
            </el-form-item>
                    <el-form-item>
              <el-button type="primary" v-on:click="download('read')">下载xmind源文件(可以二次编辑)</el-button>
            </el-form-item>
          </el-form>
    </el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-button type="primary" v-on:click="openView('wan')">预览/下载原图（英语完形思维导图）</el-button>
            </el-form-item>
                    <el-form-item>
              <el-button type="primary" v-on:click="download('wan')">下载xmind源文件(可以二次编辑)</el-button>
            </el-form-item>
          </el-form>
    </el-col>
  </div>
</template>

<script>
import { getClubBanner, getActiveList } from '../../api/api';

export default {
  data() {
    return {
      activeNames: ["1"],
      page:1,
      listLoading: false,
      clubBanner:[],
      imageList:{
        english:
        'http://image.theblueskyalways.cn/xmind/%E5%B0%8F%E4%BD%9C%E6%96%87.png',
        politics:
        'http://image.theblueskyalways.cn/xmind/%E5%8F%B2%E7%BA%B2%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE.pdf',
        read:'http://image.theblueskyalways.cn/xmind/%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0.png',
        wan:'http://image.theblueskyalways.cn/xmind/%E5%AE%8C%E5%BD%A2%E5%A1%AB%E7%A9%BA.png'
      },
      xmindFileList:{
        english:
        'http://image.theblueskyalways.cn/xmind/%E5%B0%8F%E4%BD%9C%E6%96%87.xmind',
        politics:
        'http://image.theblueskyalways.cn/xmind/%E5%8F%B2%E7%BA%B2.xmind',
        read:'http://image.theblueskyalways.cn/xmind/%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0.xmind',
        wan:'http://image.theblueskyalways.cn/xmind/%E5%AE%8C%E5%BD%A2%E5%A1%AB%E7%A9%BA.xmind'

      },
      pdfList:{
         politics:
        'http://image.theblueskyalways.cn/xmind/%E5%8F%B2%E7%BA%B2%E5%A4%A7%E7%BA%B2.pdf',
      }
    };
  },
  methods: {
    handleChange(val) {
    },
    openView(type){
        window.location.href = this.imageList[type]
    },
    download(type){
        window.location.href = this.xmindFileList[type]
    },
    downloadPdf(type){
        window.location.href = this.pdfList[type]
    }
  },
  mounted() {

	}
	
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
}
.mt-50{
	margin-top: 75px;
}
.pb-5 {
  padding-bottom: 20px;
}
.pt-1 {
  padding-top: 4px;
}
.el-collapse {
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
}
.el-collapse-item__header {
    display: flex;
    align-items: center;
    height: 48px;
    line-height: 48px;
    background-color: #fff;
    color: #303133;
    cursor: pointer;
    border-bottom: 1px solid #ebeef5;
    font-size: 13px;
    font-weight: 500;
    transition: border-bottom-color .3s;
    outline: none;
}
</style>
