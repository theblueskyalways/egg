<template>
  <div>
    <el-row class="mt-50">
      <el-col :span="4">
        <h1>{{detail.name}}</h1>
      </el-col>
      <el-col :offset="16" :span="4">
        <el-button @click="showApplyModal()" type="primary">点击报名</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <p v-html="detail.clubDesc" ></p>
    <el-divider></el-divider>
    <h3>社团活动照片墙</h3>
    <el-row class="mt-50">
      <el-carousel class="pb-5 pt-1" :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in detail.adImageList" :key="item.id">
          <el-image
            :src="item.imageUrl"
            fit="contain">
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </el-row>
    <el-divider></el-divider>
    <h3>社团活动</h3>
    <el-row class="pb-5">
      <el-card shadow="hover">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="(item,index) in detail.activeList" :key="index" :title="`${item.title}`" :name="index+1">
              <p>{{item.activeContent}}</p>
              <span>{{item.club.name}}   {{item.ctime}}</span> 
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-row>

    <!--新增界面-->
		<el-dialog title="报名" :visible.sync="applyModalVisible" :close-on-click-modal="false">
      <div>
        <h2>{{detail.name}}</h2>
        扫描下方二维码缴费</div>
      <el-image
        style="width: 100px; height: 100px"
        :src="detail.payQRcode"
        fit="fill"></el-image>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="applyModalVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { getClubDetail, applyClub } from '../../api/api';

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
      addLoading:false,
      detail:[],
      applyModalVisible:false,
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    getClubDetail() {
      let para = {
					id: this.$router.currentRoute.query.id,
				};
				this.listLoading = true;
				//NProgress.start();
				getClubDetail(para).then((res) => {
          this.detail = res.data.data;
          this.detail.clubDesc = this.detail.clubDesc.replace(/\n/g,"<br>")
					this.listLoading = false;
					//NProgress.done();
				});
    },
    showApplyModal(){
      this.applyModalVisible = true;
    },
    addSubmit(){
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              let user = JSON.parse(sessionStorage.getItem('user'));
              let para = {
                user:user.id,
                club:this.detail.id
              }
							applyClub(para).then((res) => {
                this.addLoading = false;
								this.$message({
									message: res.data.msg || '提交成功',
									type: 'success'
								});
								this.applyModalVisible = false;
							});
						});
    }
  },
  mounted() {
      this.getClubDetail();
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
