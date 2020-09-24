<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getApplyListPage">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="applyList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column  show-overflow-tooltip prop="user.name" label="申请人" width="120" sortable>
			</el-table-column>
			<el-table-column  show-overflow-tooltip	 prop="club.name" label="申请社团" width="120" sortable>
			</el-table-column>
			<el-table-column prop="ctime" label="发起申请的时间" sortable>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button v-if="scope.row.is_pass==0" size="small" @click="handleApply(scope.$index, scope.row)">通过</el-button>
					<span v-if="scope.row.is_pass>0">已通过审核</span>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getApplyListPage,passApply } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
                },
                applyList:[],
				clubList: [],
				total: 0,
				page: 1,
				listLoading: false,
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getApplyListPage();
			},
			//获取club列表
			getApplyListPage() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getApplyListPage(para).then((res) => {
					this.total = res.data.total;
                    this.applyList = res.data.list;
					this.listLoading = false;
					//NProgress.done();
				});
            },
			//删除
			handleApply: function (index, row, type) {
				this.$confirm('确认通过吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					passApply(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: res.data.msg,
							type: 'success'
						});
						this.getApplyListPage();
					});
				}).catch(() => {

				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
		},
		mounted() {
			this.getApplyListPage();
		}
	}

</script>

<style scoped>
	.clubName .cell{
		overflow: hidden;
		text-overflow:ellipsis;
		min-height: 50px;
	}
</style>