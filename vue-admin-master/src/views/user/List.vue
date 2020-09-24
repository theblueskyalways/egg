<template>
  <div id="show_key_word">
    <el-row>
      <el-col
        :span="7"
        v-for="(clubItem,index) in clubList"
        :key="clubItem.id"
       
        :offset="index%3==0? 0 :index>0? 1: 0 "
      >
        <el-card :body-style="{ padding: '15px' }">
          <el-carousel height="200px" direction="vertical" :autoplay="false">
          <el-carousel-item v-for="item in clubItem.imageList" :key="item.id">
            <el-image
              :src="item.imageUrl"
              fit="contain">
              <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-carousel-item>
        </el-carousel>
          <div style="padding: 14px;">
            <span>{{ clubItem.name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ clubItem.clubDesc }}</time>
              <el-button @click="navigate(clubItem.id)" type="text" class="button">详情查看</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { getClubList, uploadUrl, imageBaseUrl, optClub, addClub } from '../../api/api';


export default {
   data() {
    return {
      currentDate: new Date(),
      clubList:[],
    };
  },
  methods:{
    getClubList:function(){
        let para = {
              page: this.page,
            };
            this.listLoading = true;
            //NProgress.start();
            getClubList(para).then((res) => {
              this.clubList = res.data.list;
              this.listLoading = false;
              //NProgress.done();
            });
      },
      navigate(id){
        this.$router.push({ path:'/detail',query:{
          id,
      }})
      }
  },
  
  mounted(){
    this.getClubList();
  }
};
</script>

<style scoped>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
