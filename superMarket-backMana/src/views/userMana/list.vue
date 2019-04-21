<template>
    <div class="cinemaList">
		<div class="searchAdition">
			<el-form :inline="true"  class="demo-form-inline search-form" size="small">
				<el-form-item label="名称:">
					<el-input v-model="searchAdition.Name"></el-input>
				</el-form-item>
				<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
				<el-button type="primary" @click="New">新建</el-button>
			</el-form>
		</div>
		<div class="content">			
			<el-row>
				<el-table
				:data="tableData"
				stripe
				ref="multipleTable"
				@selection-change="handleSelectionChange"
				v-loading="loadding"
				>
					<el-table-column
					type="selection"
					width="55"
					:data="tableOption"
					>
					</el-table-column>
					<el-table-column
					prop="number"
					label="序号"
					show-overflow-tooltip
					>
					</el-table-column>
					<el-table-column
					prop="userName"
					label="用户名"
					show-overflow-tooltip
					>
					</el-table-column>
					<el-table-column
					prop="userPass"
					label="用户密码"
					show-overflow-tooltip
					>
					</el-table-column>
                    <el-table-column
					prop="createTime"
					label="创建时间"
					show-overflow-tooltip
					>
					</el-table-column>
					<el-table-column
					
					label="操作"
					show-overflow-tooltip
					width="200px"
					>
						<template slot-scope="scope">
							<el-button-group>
								<el-button size="mini" @click="modify(scope.row._id)" type="primary" icon="el-icon-edit"></el-button>
								<el-button size="mini" @click="delet(scope.row._id)" color="red" type="primary" icon="el-icon-delete"></el-button>
							</el-button-group>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			
			<div class="page-wrap">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="current"
					:page-sizes="[10, 20, 30]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
			
		</div>
		
	</div>
</template>
<script type="text/javascript">
	export default{
		components:{},
		data(){
			return {
					//总数
					total:1,
					//当前页
					current:1,
					//当前页数大小
					pageSize:10,
					//列表
					tableData: [],
					tableOption:[],
					//查询条件
					searchAdition:{
						"Name":"",
					},
				list:null,
				loadding:true,
			}
        } ,
		methods : {
            statusFormatter(row) {
                if(row.status==1){
                    return '有效'
                }else {
                    return '无效    '
                }
            },
			//修改
			modify(id){
				console.log(id)
				this.$router.push({
					path:'updataAndnew',
					query:{
						id:id
					}
				})
			},
			//新建
			New() {
				this.$router.push('updataAndnew')
			},
			//删除
			delet(id){
				this.$api.swiperRemoveOnde({_id:id})
				.then(res=> {
					if(res.code && res.code) {
						this.$message({
							type:'success',
							message:'删除成功！',
							duration:1000
						})
						this.getList()
					}else {
						this.$message({
							type:'error',
							message:"删除失败！"
						})
					}
				})
			},
			handleSelectionChange(){},
			//查询
			search(){
				let addition = this.searchAdition;
				this.$api.swiperMohu({addition:addition.Name})
				.then(res => {
					if(res.code==200){
                        
						this.tableData = res.data
					}
				})
				
			},
			handleSelectionChange(val) {
				this.tableOption = val
			},
			//获取列表数据
				getList(){
					let limit = {
						'page': this.current,
						'limit':this.pageSize 
					}
					this.$api.userList(limit).then( res => {
						if (res && res.code === 200) {
                            let data = res.data;
                            let num = 1 
                            data.forEach(item => {
                                item.number = num
                                num++
                            })
							console.log(data)
							this.tableData = data;
							this.total = data.totall;
							this.current = data.nowpage;
							this.loadding = false
						} else {
						}
					}).catch( err => {
						console.log(err)
					})
				
			},
			//当前页数数目改变
			handleSizeChange(valua) {
				this.pageSize = valua;
				console.log(this.current);
				this.getList();
			},
			//当前页改变
			handleCurrentChange(valua) {
				this.current = valua;
				console.log(this.current);
				this.getList();
			},
		},
		
		created() {
			this.getList();
			// this.axios.get('/apis/goods/list/newProduct')
			// .then(data => {
			// 	this.list = data.data.data.splice(0,28)
				
			// })
		},
		computed:{
		}
	}
	
	
</script>
<style  lang="scss">
	.cinemaList {
		box-sizing: border-box;
		width: 100%;
        .el-breadcrumb  {
            margin: 30px 0 20px 30px;
        }
		.search-form{
			background: #F5F5F5;
			padding: 24px 24px 6px 24px;
			margin-bottom: 10px;
		}

	}
	//表格样式
	.cinemaList .has-gutter tr th{
		background: #F2F4FD;
		color: #333333;
		font-family: MicrosoftYaHei; 
	}
	//行高
	.cinemaList .el-table th{
		padding: 7px 0 ;
	}
	.cinemaList .el-table td{
		padding: 7px 0 ;
	}
	//分页器高度
	// .cinemaList .el-pagination{
	// 	height: 24px;
	// 	padding: 0px 5px;
	// 	ul{height: 24px;li{height: 24px;};}
	// 	button{height: 24px;;}
	// }
	.cinemaList .erRow{
		margin-top: 24px;
	}

	.cinemaList .icon-color{
		color: #3B74FF;
		cursor: pointer;
		margin-right: 6px;
	}
	.cinemaList .xinjian{
		float: right;
	}
	.cinemaList .el-pagination{
		text-align: center;
	}
	
</style>