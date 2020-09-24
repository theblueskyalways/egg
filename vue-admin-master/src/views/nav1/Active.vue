<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.title" placeholder="活动名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getActiveListPage">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="activeList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column  show-overflow-tooltip prop="title" label="活动名称" width="120" sortable>
			</el-table-column>
			<el-table-column  show-overflow-tooltip	 prop="activeContent" label="活动内容" width="120" sortable>
			</el-table-column>
			<el-table-column prop="club.name" label="所属社团" sortable>
			</el-table-column>
			<el-table-column prop="ctime" label="创建时间" sortable>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button v-if="scope.row.is_delete==0" type="danger" size="small" @click="handleDel(scope.$index, scope.row,'delete')">删除</el-button>
					<el-button v-if="scope.row.is_delete>0"  type="danger" size="small" @click="handleDel(scope.$index, scope.row,'revoke')">撤销删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width='auto' :rules="addFormRules" ref="addForm">
				<el-form-item label-width='auto' label="活动名称:" prop="title">
					<el-input v-model="addForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label-width='auto' label="活动内容:">
					<el-input type="textarea" v-model="addForm.activeContent"></el-input>					
				</el-form-item>
				<el-form-item label="所属社团">
					<el-select v-model="addForm.club" placeholder="请选择">
                        <el-option
                            v-for="item in clubList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getActiveListPage, addActive, imageBaseUrl, optClub, addClub } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					title: ''
                },
                activeList:[],
				clubList: [],
				total: 0,
				page: 1,
				listLoading: false,
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					title: '',
					activeContent: '',
					club:null
				}

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getActiveListPage();
			},
			//获取club列表
			getActiveListPage() {
				let para = {
					page: this.page,
					title: this.filters.title
				};
				this.listLoading = true;
				//NProgress.start();
				getActiveListPage(para).then((res) => {
					this.total = res.data.total;
                    this.activeList = res.data.list;
                    this.clubList = res.data.clubList
					this.listLoading = false;
					//NProgress.done();
				});
            },
            //显示编辑界面
			handleEdit: function (index, row) {
				this.addFormVisible = true;
                this.addForm = {
                    ...row,
                    club:row.club.id
                }
			},
			//删除
			handleDel: function (index, row, type) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id, type:type,url:'/active' };
					optClub(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: res.data.msg,
							type: 'success'
						});
						this.getActiveListPage();
					});
				}).catch(() => {

				});
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					title: '',
					activeContent: '',
					club:null
				};
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
							addActive(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getActiveListPage();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			uploadRemove:function(res){
				this.addForm.uploadImageList.splice(this.addForm.uploadImageList.findIndex(v=>v.url==res.url),1)
			},
			uploadSuccess:function (res){
				this.addForm.uploadImageList.push({...res,url: imageBaseUrl + res.url})
			},
			uploadPayqrcodeSuccess:function(res){
				this.addForm.uploadQrcode = [{...res,url: imageBaseUrl + res.url}]
			},
			uploadPayqrcodeRemove:function(res){
				this.addForm.uploadQrcode = [];
			},
			handleQrcodeBefore:function(){
				if(this.addForm.uploadQrcode.length>=1){
					this.$message({
						message: '只能上传一张',
						type: 'warning'
					});
					return false;
				}
			},
			uploadIndexSuccess:function(res){
				this.addForm.indexImage = [{...res,url: imageBaseUrl + res.url}]
			},
			uploadIndexRemove:function(res){
				this.addForm.indexImage = [];
			},
			handleIndexBefore:function(){
				if(this.addForm.indexImage.length>=1){
					this.$message({
						message: '只能上传一张',
						type: 'warning'
					});
					return false;
				}
			},
			checImage:function(index,type){
				if(type) return this.clubs[index].qrVisible = true;
				this.clubs[index].visible = true;
			}
		},
		mounted() {
			this.getActiveListPage();
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