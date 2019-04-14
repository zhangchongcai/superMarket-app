<template>
    <div class="new-warp">
        <el-form ref="form" :model="tableData" label-width="80px" size="mini">
            <div class="input-warp">
                <div>
                    <el-form-item label="商品ID：">
                        <el-input v-model="tableData.goodsId"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-input v-model="tableData.typeName"></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：">
                        <el-input v-model="tableData.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐指数">
                        <el-select v-model="tableData.goodsPoint" placeholder="请选择好评星数">
                            <el-option label="1星" value="1"></el-option>
                            <el-option label="2星" value="2"></el-option>
                            <el-option label="3星" value="3"></el-option>
                            <el-option label="4星" value="4"></el-option>
                            <el-option label="5星" value="5"></el-option>
                        </el-select>
                    </el-form-item>    
                    <el-form-item label="商品名称">
                        <el-input type="textarea" v-model="tableData.name"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="货码编号：">
                        <el-input v-model="tableData.bn"></el-input>
                    </el-form-item>
                    <el-form-item label="价格：">
                        <el-input v-model="tableData.price"></el-input>
                    </el-form-item>
                    <el-form-item label="库存：">
                        <el-input v-model="tableData.totalStore"></el-input>
                    </el-form-item>
                    <el-form-item label="积分：">
                        <el-input v-model="tableData.score"></el-input>
                    </el-form-item>
                    <el-form-item label="标签：">
                        <el-input v-model="tableData.specTag"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                        <el-col :span="12">
                        <el-date-picker type="date" placeholder="选择日期" v-model="tableData.createTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </div>

            </div>
            <hr style="backgroudn:#ccc">
            <div class="main-img">
                商品主图：
                <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000'"
                :show-file-list="false"
                :http-request = "handermainImg"
                list-type="picture"
                >
                <img v-if="mainImg" :src="mainImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="img-list">
                商品图片列表：
                <el-upload
                action="http://127.0.0.1:5000'"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :http-request = "handerImg"
                :file-list="fileList"
                :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="footer-btn">
                <el-button type="primary"  @click="handerNewandEdit(true)" v-if="!newBuild">立即创建</el-button>
                <el-button type="primary"  @click="handerNewandEdit(false)" v-else>确认修改</el-button>
                <el-button @click="quit">取消</el-button>
            </div>
        </el-form>

    </div>
</template>
<script>
export default {
    data() {
      return {
        tableData: {
            catId:null,
            goodsId:null,
            imageId:null,
            brandId:null,
            typeId:null,
            objType:null,
            createTime:null,
            name:null,
            productName:null,
            surl:null,
            url:null,
            price:null,
            totalStore:null,
            typeName:null,
            imageList:[],
            score:null,
            bn:null,
            goodsPoint:null,
            brand:null,
            grounpProducts:null,
            unit:null,
        },
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],
        mainImg:'',
        newBuild:'',

      }
    },
    methods: {
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            this.$api.deleteimg({path:file.name})
            .then(req=> {
                if(req.data){
                    this.fileList.forEach((item,ind)=>{
                        if(file.uid==item.uid){
                            this.fileList.splice(ind,1)
                        }
                    })
                }
            })
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handermainImg(file) {
            this.uploadImg(file,true)
        },
        handerImg(file,fileList,flg) {
            this.uploadImg(file)
            },
        uploadImg(file,mainImg) {
            var formData = new FormData();
            formData.append('test',file.file);
            this.$api.uploadImg(formData)
            .then(res => {
                console.log(res)
                if(res.code==200 && res.data){
                    let data = res.data
                    let item = {
                        uid:new Date().getTime(),
                        name:data.path,
                        url:'http://127.0.0.1:5000/public/'+data.path
                    }
                    if(!mainImg){
                        this.fileList.push(item);
                    }else{
                        this.mainImg=item.url
                    }
                }else{
                    this.$message({type:"error",message:res.msg})
                }
            })
            
        },
        handerNewandEdit(New) {
            let data = Object.assign({},this.tableData)
            data.url = this.mainImg
            data.imageList = this.imageList
            data.createTime = new Date().getTime(data.createTime)
            let imageList = []
            if(this.fileList.length){
                this.fileList.forEach(item=> {
                    imageList.push(item.url)
                })
            }
            data.imageList = imageList
            data.url = this.mainImg
            console.log(data)
            if(New){
                this.$api.newProductsAdd(data)
                .then(res=> {
                    if(res && res.code){
                        this.$message({
                            type:'success',
                            message:'添加成功！',
                            duration:1000,
                            onClose:_=> {
                                this.$router.go(-1)
                            }
                        })
                    }else{
                        this.$message({
                            type:"error",
                            message:'添加失败！'
                        })
                    }
                })
            }else{
                this.$api.newProductsEdit(data)
                .then(res=> {
                    if(res.data.nModified && res.code){
                        this.$message({
                            type:'success',
                            message:'修改成功！',
                            duration:1000,
                            onClose:_=>{
                                this.$router.go(-1)
                            }
                        })
                    }else{
                        this.$message({
                            type:"error",
                            message:'修改失败！'
                        })
                    }
                })
            }
        },
        getTime(time){
            var date = new Date();
            date.setTime(time)
            console.log(date)
            var y = date.getFullYear();    
            var m = date.getMonth() + 1;    
            m = m < 10 ? ('0' + m) : m;    
            var d = date.getDate();    
            d = d < 10 ? ('0' + d) : d;    
            var h = date.getHours();  
            h = h < 10 ? ('0' + h) : h;  
            var minute = date.getMinutes();  
            var second = date.getSeconds();  
            minute = minute < 10 ? ('0' + minute) : minute;    
            second = second < 10 ? ('0' + second) : second;   
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        },
        quit(){
            this.$router.push('/goodsmana/newproducts/list')
        },
        search(goodsId) {
            this.$api.newProductsfindOne({_id:goodsId})
            .then(res=> {
                let data = res.data
                this.tableData  = data
                data.imageList.forEach(item=>{
                    let datas = {url:item}
                    this.fileList.push(datas)
                })
                this.mainImg = data.url
                this.tableData.createTime = this.getTime(data["createTime"])
                console.log(this.tableData)
            })
        }
    },
    created() {
        var goodsId = this.newBuild = this.$route.query.goodsId
        if(goodsId){
            this.search(goodsId)
        }
    },
    
};
</script>
<style lang="scss">
    .new-warp{
        .main-img,.img-list{
            margin-left: 10px;
        }
        
        .avatar-uploader .el-upload {
            display: inline-block;
            width: 148px;
            height: 148px;
            margin: 0 auto;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 148px;
            height: 148px;
            line-height: 148px;
            text-align: center;
        }
        .avatar {
            width: 148px;
            height: 148px;
            display: block;
        }
        //element 样式
        .el-input{
            width: 250px;
        }
        .el-form-item .el-form-item__label{
            width:100px!important;
        }
        .input-warp{
            width: 100%;
            display:flex;
            &>div{
                flex: 1;
            }
        }
        .footer-btn{
            border-top: 1px solid #f3f3f3;
            text-align: center;
            padding-top: 5px;
            margin: 20px auto;
        }
    }
</style>



