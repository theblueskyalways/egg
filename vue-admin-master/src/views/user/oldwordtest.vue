<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input @keydown.enter.native="gettestwordList" v-model="filters.word" placeholder="单词/翻译 支持模糊查询"></el-input>
				</el-form-item> -->
                <el-form-item>
					<el-radio-group v-model="filters.type">
                        <el-radio  :label="1">看单词选择翻译</el-radio>
                        <el-radio  :label="2">看翻译拼写单词</el-radio>
                    </el-radio-group>
				</el-form-item>
				<!-- <el-form-item label='每页单词数:'>
					<el-input label='每页单词数' @keydown.enter.native="gettestwordList" v-model="filters.count" type='number' placeholder="每页显示单词数量"></el-input>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" v-on:click="gettestwordList">生成试题</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" v-on:click="checkAnswer">批阅</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="clubList" highlight-current-row v-loading="listLoading" row-key="id" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column> -->
			<!-- <el-table-column label="order" prop="order_"  width="60">
			</el-table-column> -->
			<el-table-column label="编号" type="index"  width="60">
			</el-table-column>
			<el-table-column  width="auto"  show-overflow-tooltip prop="word" label="单词" sortable>
				<template scope="scope">
                    <el-input v-if="filters.type == 2" v-model="scope.row.userinputanswer" placeholder="输入单词"></el-input>
					{{ filters.type == 1 ? scope.row.word:''}}
				</template>
			</el-table-column>
			<el-table-column  show-overflow-tooltip	 prop="translate" label="翻译" sortable>
				<template scope="scope">
					<el-select v-if="filters.type == 1" v-model="scope.row.useranswer" placeholder="请选择">
                        <el-option
                            v-for="(item,index) in scope.row.options"
                            :key="index"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
					{{ filters.type == 2 ? scope.row.translate:''}}
				</template>
			</el-table-column>
            <el-table-column  show-overflow-tooltip	 prop="isRight" label="结果" sortable>
				<template v-if="checkAnswerVisible" scope="scope">
                    <i v-if="scope.row.isRight" style="color:green;"  class="el-icon-check"></i>
                    <i v-if="!scope.row.isRight"  style="color:red;" class="el-icon-close"></i>
					{{ filters.type  == 2 && !scope.row.isRight ? scope.row.word:''}}
					{{ filters.type  == 1 && !scope.row.isRight ? scope.row.translate:''}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button v-if="!scope.row.isRight" :type='scope.row.type == 1 ?"primary" : ""' size="small" @click="opt( scope.row, 2)">加入生词本</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="parseInt(filters.count)" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->
	</section>
</template>
<script>
	import util from '../../common/js/util'
	import { gettestwordList,optWord } from '../../api/api';
	import Sortable from 'sortablejs'; 
	export default {
		data() {
			return {
				filters: {
					count:10,
                    word: '',
                    type:1,
                },
                activeList:[],
                clubList: [],
                messageList:[],
				total: 0,
				page: 1,
                sels:[],
				listLoading: false,
				checkAnswerVisible:false
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.gettestwordList();
            },
			//获取club列表
			gettestwordList() {
                this.checkAnswerVisible = false;
				let para = {
                    page: this.page,
                    user: JSON.parse(sessionStorage.getItem('user')).id,
                    ...this.filters,
                    type:2,
				};
				this.listLoading = true;
				gettestwordList(para).then((res) => {
					this.total = res.data.total;
                    this.clubList = res.data.list.map(v=>({...v,useranswer:'',userinputanswer:''}));
					this.listLoading = false;
				});
            },
            checkAnswer(){
                if(this.filters.type==1){
                    this.clubList = this.clubList.map(v=>{
                        return {...v,isRight:v.useranswer==v.translate}});
                }else{
                    this.clubList = this.clubList.map(v=>{
                        return {...v,isRight:v.userinputanswer==v.word}});
                }
                this.checkAnswerVisible = true;
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
				});
			},

		},
		mounted() {
			this.gettestwordList();
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