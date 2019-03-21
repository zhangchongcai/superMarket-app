<template>
    <div class="cinemaList">
		<div class="searchAdition">
			<el-form :inline="true"  class="demo-form-inline search-form" size="small">
				<el-form-item label="内部管理编号:">
					<el-input v-model="searchAdition.mgCode"></el-input>
				</el-form-item>
				<el-form-item label="影院编码:">
					<el-input v-model="searchAdition.code"></el-input>
				</el-form-item>
				<el-form-item label="影院名称:">
					<el-input v-model="searchAdition.name"></el-input>
				</el-form-item>
				<el-form-item label="影院联系人:">
					<el-input v-model="searchAdition.contactMan"></el-input>
				</el-form-item>
				<el-form-item label="手机号码:">
					<el-input v-model="searchAdition.mphone"></el-input>
				</el-form-item>
				<el-form-item label="状态" >
				<el-select v-model="searchAdition.status">
					<el-option label="全部" value="">全部</el-option>
					<el-option label="有效" value="1">营业</el-option>
					<el-option label="无效" value="2">测试</el-option>
					</el-select>
				</el-form-item>
				<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
			</el-form>
		</div>
		<div class="content">			
			<el-row>
				<el-table
				:data="tableData"
				stripe
				>
					<el-table-column
					prop="mgCode"
					label="内部管理编号"
					show-overflow-tooltip
					>
					</el-table-column>
					<el-table-column
					prop="code"
					label="影院编码"
					show-overflow-tooltip
					>
					</el-table-column>
					<el-table-column
					prop="name"
					label="影院名称"
					show-overflow-tooltip
					>
					</el-table-column>
					<el-table-column
					prop="areaName"
					label="所在城市"
					show-overflow-tooltip
					>
					</el-table-column>
					<el-table-column
					prop="contactMan"
					label="联系人"
					show-overflow-tooltip
					>
					</el-table-column>
                    <el-table-column
					prop="mphone"
					label="手机号码"
					show-overflow-tooltip
					>
					</el-table-column>
                    <el-table-column
					prop="status"
					label="状态"
					:formatter = "stateFormat"
					show-overflow-tooltip
					>
					</el-table-column>
					<el-table-column
					label="操作"
					show-overflow-tooltip
					>
						<template slot-scope="scope">
							<span class="icon-color"  @click="cinema_edit(scope.row.uid)">修改</span>
							<span class="icon-color"  @click="wall_edit(scope.row.uid)">影厅管理</span>
							<!-- <el-button-group>
								<el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
								<el-button size="mini" color="red" type="primary" icon="el-icon-delete"></el-button>
							</el-button-group> -->
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
					//查询条件
					searchAdition:{
						mgCode:"",
						name:"",
						code:"",
						contactMan:"",
						mphone:"",
						status:"",
					}
			}
        } ,
		methods : {
			//修改
			cinema_edit(uid){
				this.$router.push({
					path:'edit',
					query:{
						uid:uid
					}
				})
			},
			//影厅管理
			wall_edit(uid){
				this.$router.push({
					path:'/CTM/cinemawall/list',
					query:{
						cinemaUid:uid
					}
				})
			},
			//状态
			stateFormat(row, column) {
				if (row.status == 1) {
				return '营业'
				} else if (row.status == 2) {
				return '测试'
				}
			},
			//查询
			search(){
				this.getList();
				this.list.forEach(item => {
				this.axios.get('/apis/goods/queryDetailGoods/'+item.goodsId)
				.then(data => {
					data = data.data.data;
					let imageList = [];
					data.imageList.forEach(item => {
						imageList.push(item.url)
					})
					item.imageList = imageList;
					item.score = data.product.score;
					item.bn = data.product.bn;
					item.goodspoint = data.product.goodspoint;
					item.brand = data.product.brand;
					console.log(item)
				})
			})
			},
			//获取列表数据
				getList(){
					// let limit = {
					// 	'page': this.current,
					// 	'pageSize':this.pageSize 
					// }
					// let addition = this.searchAdition;
					// this.$api.cinemaList(limit,addition).then( data => {
					// 	if (data && data.code === 200) {
					// 		this.tableData = data.data.records;
					// 		this.total = data.data.total;
					// 		this.currPage = data.current;
					// 	} else {
					// 	}
					// }).catch( err => {
					// 	console.log(err)
					// })
				
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
			// this.getList();
			this.axios.get('/apis/goods/list/newProduct')
			.then(data => {
				this.list = data.data.data.splice(0,23)
				
			})
		},
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