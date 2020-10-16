<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
                <el-form-item>
					<el-button type="primary" v-on:click="getallwordList">查询</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="clubList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column  show-overflow-tooltip	 prop="data" label="体重数据/kg" sortable>
			</el-table-column>
			<el-table-column prop="ctime" label="添加时间" sortable>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button v-if="scope.row.isMy" type='primary' size="small">已添加</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
        <el-col :span="24" class="toolbar">
			<div style="width:100%;height:500px;" id="echarts">
				
		    </div>
		</el-col>
        <!--图表界面-->
        

		<!--新增界面-->
        <el-dialog title="新增记录" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width='auto' :rules="addFormRules" ref="addForm">
				<el-form-item label-width='auto' label="体重:" prop="data">
					<el-input v-model="addForm.data" auto-complete="off"></el-input>
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
    import { getfitnessList,fitnessadd } from '../../api/api';
    import echarts from 'echarts';

	export default {
		data() {
			return {
				filters: {
                },
                activeList:[],
				total: 0,
                page: 1,
				listLoading: false,
				addFormVisible: false,//新增界面是否显示
				chartVisible: false,//新增界面是否显示
                addLoading: false,
                addForm:{
                    id: '',
                    data: '',
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
				this.getallwordList();
            },
            selsChange: function (sels) {
				this.sels = sels;
            },
			//获取club列表
			getallwordList() {
				let para = {
                    page: this.page,
                    user: JSON.parse(sessionStorage.getItem('user')).id,
                    ...this.filters
				};
				this.listLoading = true;
				getfitnessList(para).then((res) => {
					this.total = res.data.total;
                    this.clubList = res.data.list;
                    this.listLoading = false;
                    this.renderChart();
				});
            },
            //显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					data: '',
				};
            },
            renderChart(){
                this.chart = document.getElementById('echarts');
                let myChart = echarts.init(this.chart);
                let option = {
                    xAxis: {
                        type: 'category',
                        data: this.clubList.map(v=>v.ctime)
                    },
                    yAxis: {
                        type: 'value',
                        min: 'dataMin',
                        minInterval:0.01
                    },
                    series: [{
                        data: this.clubList.map(v=>v.data),
                        type: 'line'
                    }]
                };
                console.log(option)
                myChart.setOption(option);
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
                        console.log(para)
                        fitnessadd(para).then((res) => {
                            this.addLoading = false;
                            if(res.data.code==200){
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }
							this.addForm = { data: ''};
							this.getallwordList();
                        });              
					}
				});
			},
			opt(row){
				let para = {
                    id: row.id,
                    user: JSON.parse(sessionStorage.getItem('user')).id
				}
				optMyWord(para).then((res) => {
					this.$message({
						message: '操作成功',
						type: 'success'
					});
					this.getallwordList();					
				});
			}

		},
		mounted() {
            this.getallwordList();
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