<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.word" placeholder="词组/翻译 支持模糊查询"></el-input>
				</el-form-item>
                <el-form-item>
					<el-radio-group v-model="filters.type">
                        <el-radio :label="0">所有词组</el-radio>
                        <el-radio :label="1">我添加的</el-radio>
                        <el-radio :label="2">未添加的</el-radio>
                    </el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getallwordGroupList">查询</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="clubList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column  show-overflow-tooltip prop="word" label="单词" sortable>
			</el-table-column>
			<el-table-column  show-overflow-tooltip	 prop="translate" label="翻译" sortable>
			</el-table-column>
			<el-table-column prop="ctime" label="添加时间" sortable>
			</el-table-column>
			<el-table-column prop="user" label="贡献用户">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button v-if="!scope.row.isMy" type='primary' size="small" @click="opt( scope.row )">加入我的词组</el-button>
					<el-button v-if="scope.row.isMy" type='primary' size="small">已添加</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--新增界面-->
        <el-dialog title="新增词组" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" :rules="addFormRules" ref="addForm">
				<el-form-item  label="词组:" prop="word">
					<el-input v-model="addForm.word" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="翻译:">
					<el-input type="textarea" v-model="addForm.translate"></el-input>					
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
	import { getallwordGroupList, optMyWordGroup, addwordGroup } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
                    word: '',
                    type:0,
                },
                activeList:[],
                clubList: [],
                messageList:[],
				total: 0,
                page: 1,
                sels:[],
                refreshMessageListClock:null,
				listLoading: false,
				addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addForm:{
                    id: '',
                    word: '',
                    translate:'',
                    user: JSON.parse(sessionStorage.getItem('user')).id
                },
                addFormRules: {
					word: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					]
				},

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getallwordGroupList();
            },
            selsChange: function (sels) {
				this.sels = sels;
            },
            getMessageList(club) {
                let para = {
                    club,
                    user: JSON.parse(sessionStorage.getItem('user')).id,
                };
                getMessageList(para).then((res) => {
                    this.messageList = res.data.list;
                    this.chatRoomVisible = true;
                    this.refreshMessageList(club)
				});
            },
			//获取club列表
			getallwordGroupList() {
				let para = {
                    page: this.page,
                    user: JSON.parse(sessionStorage.getItem('user')).id,
                    ...this.filters
				};
				this.listLoading = true;
				getallwordGroupList(para).then((res) => {
					this.total = res.data.total;
                    this.clubList = res.data.list;
					this.listLoading = false;
				});
            },
            //显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					word: '',
					translate: '',
				};
			},
            addSubmit(){
                this.$refs.addForm.validate((valid) => {
					if (valid) {
                        this.addLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.addForm);
                        para = {
                            ...para,
                            user: JSON.parse(sessionStorage.getItem('user')).id,
                        }
                        addwordGroup(para).then((res) => {
                            this.addLoading = false;
                            if(res.data.code==200){
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }
							this.addForm = { word: '',translate:'',};
							this.getallwordGroupList();
                        });              
					}
				});
			},
			opt(row){
				let para = {
                    id: row.id,
                    user: JSON.parse(sessionStorage.getItem('user')).id
				}
				optMyWordGroup(para).then((res) => {
					this.$message({
						message: '操作成功',
						type: 'success'
					});
					this.getallwordGroupList();					
				});
			}

		},
		mounted() {
			this.getallwordGroupList();
        },
        beforeRouteLeave (to, from, next) {
            next();
        }
	}

</script>

<style scoped>
	.clubName .cell{
		overflow: hidden;
		text-overflow:ellipsis;
		min-height: 200px;
	}
    .box-card {
        overflow:scroll;
        max-height: 200px;
    }

    .text-item {
        min-height:20px;
        margin: 10px;
        clear:both;
    }

    .fl{
        float: left;
    }

    .fr{
        float: right;
    }

    .tr{
        text-align: right;
    }

    .tl{
        text-align: left;
    }
    .messgaecontent{
        width: fit-content;
    }
    .messgaetext{
        display: inline-block;
        width: 100%;
    }
</style>