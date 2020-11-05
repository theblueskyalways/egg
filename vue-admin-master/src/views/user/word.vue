<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input @keydown.enter.native="getUserwordList" v-model="filters.word" placeholder="单词/翻译 支持模糊查询"></el-input>
				</el-form-item>
                <el-form-item>
					<el-radio-group v-model="filters.type">
                        <el-radio  :label="0">所有单词({{allwordnumber}})</el-radio>
                        <el-radio  :label="1">生词({{newwordnumber}})</el-radio>
                        <el-radio :label="2">熟词({{oldwordnumber}})</el-radio>
                    </el-radio-group>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="translateVisible = !translateVisible">{{translateVisible?'隐藏':'显示'}}翻译</el-button>
					<el-button type="primary" @click="wordVisible = !wordVisible">{{wordVisible?'隐藏':'显示'}}单词</el-button>
				</el-form-item>
				<el-form-item label='每页单词数:'>
					<el-input label='每页单词数' @keydown.enter.native="getUserwordList" v-model="filters.count" type='number' placeholder="每页显示单词数量"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUserwordList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="exportWord">导出生词</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="exportAllWord">导出所有</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="clubList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" row-key="id" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<!-- <el-table-column label="order" prop="order_"  width="60">
			</el-table-column> -->
			<el-table-column label="编号" type="index"  width="60">
			</el-table-column>
			<el-table-column  width="auto"  show-overflow-tooltip prop="wordName" label="单词" >
				<template scope="scope">
					{{ wordVisible? scope.row.wordName:''}}
				</template>
			</el-table-column>
			<el-table-column  show-overflow-tooltip	 prop="translate" label="翻译" >
				<template scope="scope">
					{{ translateVisible? scope.row.translate:''}}
				</template>
			</el-table-column>
			<el-table-column prop="ctime" label="添加时间">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button :type='scope.row.type == 1 ?"primary" : ""' size="small" @click="opt( scope.row, 1)">生词</el-button>
					<el-button :type='scope.row.type == 2 ?"primary" : ""' size="small" @click="opt( scope.row, 2)">熟词</el-button>
					<el-button type="primary" @click="handleAdd(scope.row, 'edit')">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="parseInt(filters.count)" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--新增界面-->
        <el-dialog :title="addForm.title" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form @submit.native.prevent :model="addForm"  :rules="addFormRules" ref="addForm">
				<el-form-item label="单词:" prop="word">
					<el-input @keydown.enter.native="addSubmit" v-model="addForm.word" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="翻译和词性:">
					<el-input @keydown.enter.native="addSubmit" type="textarea" v-model="addForm.translate"></el-input>					
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary"  @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	import util from '../../common/js/util'
	import { getUserwordList, addword, optWord,changeOrder,exportWord } from '../../api/api';
	import Sortable from 'sortablejs'; 
	export default {
		data() {
			return {
				filters: {
					count:10,
                    word: '',
                    type:0,
                },
                activeList:[],
                clubList: [],
                messageList:[],
				total: 0,
				page: 1,
				newwordnumber:0,
				oldwordnumber:0,
				allwordnumber:0,
                sels:[],
                refreshMessageListClock:null,
				listLoading: false,
				addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addForm:{
					title:'add',
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
				translateVisible: true,
				wordVisible:true,
			}
		},
		methods: {
			// rowDrop() {
			// 	const tbody = document.querySelector('.el-table__body-wrapper tbody');
			// 	var _this = this;
            // 	new Sortable(tbody,{
			// 		onEnd:({oldIndex, newIndex})=>{
			// 			let para = {
			// 				offset:oldIndex-newIndex,
			// 				word:this.clubList[oldIndex].id,
			// 				startorder:this.clubList[oldIndex].order_,
			// 				endorder:this.clubList[newIndex].order_,
		    //                 user: JSON.parse(sessionStorage.getItem('user')).id

			// 			}
			// 			changeOrder(para).then((res) => {
			// 				this.getUserwordList();							
			// 			});
			// 		}
			// 	})
    		// },
			handleCurrentChange(val) {
				this.page = val;
				this.getUserwordList();
            },
            selsChange: function (sels) {
				this.sels = sels;
            },
			//获取club列表
			getUserwordList() {
				let para = {
                    page: this.page,
                    user: JSON.parse(sessionStorage.getItem('user')).id,
                    ...this.filters
				};
				this.listLoading = true;
				getUserwordList(para).then((res) => {
					this.total = res.data.total;
					this.newwordnumber = res.data.newword;
					this.oldwordnumber = res.data.oldword;
					this.allwordnumber = res.data.allword;
                    this.clubList = res.data.list;
					this.listLoading = false;
					// this.rowDrop();
				});
            },
            //显示新增界面
			handleAdd: function (row, type) {
				this.addForm = {
					word: '',
					translate: '',
				};
				if(row){
					this.addForm.title = 'edit'
					this.addForm = {
						id:row.word,
						word: row.wordName,
						translate: row.translate,
					};
				}
				this.addFormVisible = true;
			},
            addSubmit(){
                this.$refs.addForm.validate((valid) => {
					if (valid) {
                        this.addLoading = true;
                        let para = Object.assign({}, this.addForm);
                        para = {
                            ...para,
                            user: JSON.parse(sessionStorage.getItem('user')).id,
                        }
                        addword(para).then((res) => {
							this.addLoading = false;
                            if(res.data.code==200){
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
								});
								this.addForm = { word: '',translate:'',};
								this.getUserwordList();
							}else{
								this.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                });
							}
                        });              
					}
				});
			},
			exportWord(){
				exportWord({user:JSON.parse(sessionStorage.getItem('user')).id}).then((res) => {
							this.addLoading = false;
                            var blob = new Blob([res.data])
              				this.downloadFile(blob,'word','docx')
						});

			},
			downloadFile(blob,tagFileName,fileType) {

			    var downloadElement = document.createElement('a');

			    var href = window.URL.createObjectURL(blob); //创建下载的链接

			    downloadElement.href = href;

			    downloadElement.download = tagFileName+'.'+fileType; //下载后文件名

			    document.body.appendChild(downloadElement);

			    downloadElement.click(); //点击下载

			    document.body.removeChild(downloadElement); //下载完成移除元素

			    window.URL.revokeObjectURL(href); //释放掉blob对象

			  },

			opt(row, type){
				let para = {
					id: row.id,
					type,
				}
				optWord(para).then((res) => {
					this.$message({
						message: '操作成功',
						type: 'success'
					});
					this.getUserwordList();					
				});
			},
			hideenTranslate(){
				this.translateVisible = !this.translateVisible;
			}

		},
		mounted() {
			this.getUserwordList();
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