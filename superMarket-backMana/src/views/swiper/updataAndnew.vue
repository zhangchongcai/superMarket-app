<template>
    <div class="swiper-warp">
        <el-form ref="form" :model="tableData" label-width="80px" size="mini">
            <div class="input-warp">
                <div>
                    <el-form-item label="名称：">
                        <el-input v-model="tableData.Name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：">
                        <el-input v-model="tableData.description"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-radio-group v-model="tableData.status">
                        <el-radio :label="1">有效</el-radio>
                        <el-radio :label="0">无效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </div>
            <hr style="backgroudn:#ccc">
            <div class="main-img">
                主图：
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
            Name:'',
            description:'',
            status:1

        },
        dialogImageUrl: '',
        dialogVisible: false,
        mainImg:'',
        newBuild:'',
        imgPath:''
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
            this.uploadImg(file)
        },
        uploadImg(file) {
            var formData = new FormData();
            formData.append('test',file.file);
            this.$api.swiperUploadImg(formData).then(res => {
                console.log(res)
                if(res.code==200 && res.data){
                    let data = res.data
                    this.imgPath = res.data.path
                    this.mainImg='http://127.0.0.1:5000/public/'+data.path
                }else{
                    this.$message({type:"error",message:res.msg})
                }
            })
            
        },
        handerNewandEdit(New) {
            let data = Object.assign({},this.tableData)
            data.createTime = this.getTime(new Date().getTime())
            data.url = this.imgPath
            if(New){
                this.$api.swiperAdd(data)
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
                this.$api.swiperUpdata(data)
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
            this.$router.go(-1)
        },
        search(id) {
            this.$api.swiperFindOne({_id:id})
            .then(res=> {
                let data = res.data[0]
                this.tableData  = data
                this.mainImg = 'http://127.0.0.1:5000/public/'+data.url
                this.tableData.createTime = this.getTime(data["createTime"])
                console.log(this.tableData)
            })
        }
    },
    created() {
        var id = this.newBuild = this.$route.query.id
        if(id){
            this.search(id)
        }
    },
    
};
</script>
<style lang="scss">
    .swiper-warp{
        .main-img,.img-list{
            margin-left: 10px;
        }
        .avatar-uploader .el-upload {
            display: inline-block;
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



