<template>
  <div>
	   <el-row class="mt-50">
    <!-- <el-carousel class="pb-5 pt-1" :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in clubBanner" :key="item.id">
        <el-image
        @click="navigateTodetial(item.id)"
          :src="item.imageUrl"
          :fit="'cover'">
          <div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
					</div>
        </el-image>
      </el-carousel-item>
    </el-carousel> -->
	   </el-row>
    <el-row class="pb-5">
      <!-- <el-card shadow="hover">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="(item,index) in activeList" :key="index" :title="`${item.title}`" :name="index+1">
				      <p>{{item.activeContent}}</p>
               <span>{{item.club.name}}   {{item.ctime}}</span> 
          </el-collapse-item>
        </el-collapse>
      </el-card> -->
    </el-row>
  </div>
</template>

<script>
import { getClubBanner, getActiveList } from '../../api/api';

export default {
  data() {
    return {
      activeNames: ["1"],
      page:1,
      activeList: [
        {
          title: "一致性 Consistency",
          club:{name:''}
        },
      ],
      listLoading: false,
      clubBanner:[],
    };
  },
  methods: {
    handleChange(val) {
    },
    getClubBanner() {
      let para = {
					page: this.page,
				};
				this.listLoading = true;
				//NProgress.start();
				getClubBanner(para).then((res) => {
          this.clubBanner = res.data.list;
					this.listLoading = false;
					//NProgress.done();
				});
    },
    getActiveList() {
      let para = {
					page: this.page,
				};
				//NProgress.start();
				getActiveList(para).then((res) => {
          this.activeList = res.data.list;
					//NProgress.done();
				});
    },
    navigateTodetial(id){
      this.$router.push({ path:'/detail',query:{
        id,
      }})
    }
  },
  mounted() {
      this.getClubBanner();
      this.getActiveList();

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
