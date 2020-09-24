<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="社团名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getClubList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="clubs" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column  show-overflow-tooltip prop="name" label="社团名" width="120" sortable>
			</el-table-column>
			<el-table-column  show-overflow-tooltip	 prop="clubDesc" label="社团简述" width="120" sortable>
			</el-table-column>
			<el-table-column prop="imageUrl" label="宣传图" sortable>
				<template slot-scope="scope">
  						<el-image width="100%" :src="scope.row.imageUrl" alt="">
							<div slot="error" class="image-slot">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
					<el-button icon="el-icon-full-screen" @click="checImage(scope.$index,scope.row)">查看大图</el-button>
					<el-dialog :visible.sync="scope.row.visible">
  						<el-image width="100%" :src="scope.row.imageUrl" alt="">
							<div slot="error" class="image-slot">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
						
					</el-dialog>
				</template>
			</el-table-column>
			<el-table-column prop="payQRcode" label="收款码" sortable>
				<template slot-scope="scope">
  					<el-button icon="el-icon-full-screen" @click="checImage(scope.$index,'qr')">查看大图</el-button>
					<el-dialog :visible.sync="scope.row.qrVisible">
  						<img width="100%" :src="scope.row.payQRcode" alt="">
					</el-dialog>
				</template>
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
				<el-form-item label-width='auto' label="社团名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label-width='auto' label="首页banner">
					<el-upload
					:file-list="this.addForm.indexImage"
					:action="imageUrlAction"
					list-type="picture-card"
					:limit="1"
					:show-file-list="true"
					:before-upload="handleIndexBefore"
					:auto-upload="true"
					:on-success="uploadIndexSuccess"
					:on-remove="uploadIndexRemove"
				>
					<i slot="default" class="el-icon-plus"></i>
					
					<div slot="file" slot-scope="{file}">
						<span class="el-upload-list__item-actions">
							<span
							class="el-upload-list__item-delete"
							@click="uploadIndexRemove(file)"
							>
							<i class="el-icon-delete"></i>
							</span>
						</span>
					<img
						class="el-upload-list__item-thumbnail"
						:src="file.url" alt=""
					>
					</div>
				</el-upload>
				</el-form-item>
				<el-form-item label="宣传照片">
					<el-upload
					:file-list="this.addForm.uploadImageList"
					:action="imageUrlAction"
					list-type="picture-card"
					:auto-upload="true"
					:on-success="uploadSuccess"
					:on-remove="uploadRemove"
				>
					<i slot="default" class="el-icon-plus"></i>
					<div slot="file" slot-scope="{file}">
						<span class="el-upload-list__item-actions">
							<span
							class="el-upload-list__item-delete"
							@click="uploadRemove(file)"
							>
							<i class="el-icon-delete"></i>
							</span>
						</span>
						<img
						class="el-upload-list__item-thumbnail"
						:src="file.url" alt=""
					>
					</div>
				</el-upload>
				</el-form-item>
				<el-form-item label="支付二维码">
					<el-upload
					:file-list="this.addForm.uploadQrcode"
					:action="imageUrlAction"
					list-type="picture-card"
					:limit="1"
					:show-file-list="true"
					:before-upload="handleQrcodeBefore"
					:auto-upload="true"
					:on-success="uploadPayqrcodeSuccess"
					:on-remove="uploadPayqrcodeRemove"
				>
					<i slot="default" class="el-icon-plus"></i>
					
					<div slot="file" slot-scope="{file}">
						<span class="el-upload-list__item-actions">
							<span
							class="el-upload-list__item-delete"
							@click="uploadPayqrcodeRemove(file)"
							>
							<i class="el-icon-delete"></i>
							</span>
						</span>
					<img
						class="el-upload-list__item-thumbnail"
						:src="file.url" alt=""
					>
					</div>
				</el-upload>
				</el-form-item>
				
				<el-form-item label="社团简介">
					<el-input type="textarea" v-model="addForm.clubDesc"></el-input>
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
	import util from '../../common/js/util';
	import { getClubListPage, uploadUrl, imageBaseUrl, optClub, addClub } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				clubs: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				imageUrlAction : uploadUrl,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					clubDesc: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					clubDesc: '',
					uploadImageList:[],
					uploadQrcode:[],
					indexImage: [],
				}

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getClubList();
			},
			//获取club列表
			getClubList() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				getClubListPage(para).then((res) => {
					this.total = res.data.total;
					this.clubs = res.data.list.map(v=>({
						...v,
						visible:false,
						qrVisible: false
					}));
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row, type) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id, type:type,url:'/club' };
					optClub(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: res.data.msg,
							type: 'success'
						});
						this.getClubList();
					});
				}).catch(() => {
				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.addFormVisible = true;
				this.addForm = Object.assign({}, row);
				this.addForm = {
					...row,
					indexImage:row.imageUrl?[{url:row.imageUrl}]:[],
					uploadImageList:row.adImageList.length>0?row.adImageList.map(v=>({
						url:v.imageUrl
					})):[],
					uploadQrcode:row.payQRcode?[{url:row.payQRcode}]:[]
				}
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					clubDesc: '',
					uploadImageList:[],
					uploadQrcode:[],
					indexImage: [],
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getClubList();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.imageList = JSON.stringify(this.addForm.uploadImageList.map(v=>v.url));
							para.payQrcode = this.addForm.uploadQrcode.length>0?this.addForm.uploadQrcode.map(v=>v.url):'';
							para.indexImage = this.addForm.indexImage.length>0?this.addForm.indexImage.map(v=>v.url):'';
							addClub(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getClubList();
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
			this.getClubList();
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