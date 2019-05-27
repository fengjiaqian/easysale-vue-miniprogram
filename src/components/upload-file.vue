<template>
    <ul class="img-list">
        <li v-for="(item,index) in fileList">
            <img :src="item.url || item">
            <i @click="deleteUploadImg(index)"></i>
        </li>
        <el-upload class="upload-wrap" ref="upload"
                   action=""
                   :auto-upload="false"
                   list-type="picture-card"
                   :file-list="fileList"
                   :before-upload="beforeupload"
                   :on-change="fileChange"
                   accept="image/*"
        >
        </el-upload>
    </ul>
</template>

<script>
    import bus from "common/Bus";
    import * as upLoadService from "api/fetch/uploadFile";
    import $Loading from '../plugins/dialog/loading'
    import { compress } from "common/util";

    export default {
        props: {
            imgList: {
                type: Array,
                default: []
            },
            limitNum: Number
        },
        data() {
            return {
                fileList: [],//暂存的图片列表
                imgUrls: [],//上传到Ucload的图片地址数组
                uploading: false,
                currentNum: 1,
            }
        },
        components: {

        },
        created() {
            this.fileList = this.imgList.map(img => {
                return {url:img}
            })
        },
        mounted() {},
        methods: {

            //提交上传
            submitFile(fileLength=1){
                this.uploading = true
                this.currentNum = fileLength
                this.fileList.forEach((item)=>{
                    if(!item.size){
                        this.imgUrls.push(item.url)
                    }
                })
                let hasNew = false
                hasNew = this.fileList.some((item)=>{
                    if(item.size){
                        return true
                    }
                })
                //有新添加的图片则调用上传
                if(hasNew){
                    this.$refs.upload.submit()
                }else{
                    bus.$emit("uploadImgUrls", this.imgUrls)
                }
            },
            fileChange(file,fileList){
                if(this.uploading) return
                this.fileList.push(file);
                if(this.fileList.length == this.limitNum){
                    document.querySelector('.el-upload--picture-card').setAttribute('style', 'display:none;')
                }else{
                    document.querySelector('.el-upload--picture-card').removeAttribute('style')
                }
            },
            //图片上传前
            beforeupload(file) {
                //console.log('beforeupload')
                // 如果file不是File对象的实例，则不需要处理Md5
                if(file.size == undefined) {
                    return;
                }
                var that = this;
                that.slice = File.prototype.slice

                compress(file, function(newFile) {
                    newFile.name = file.name;
                    newFile.lastModified = file.lastModified
                    var fileReader = new FileReader();
                    var spark = new SparkMD5.ArrayBuffer();
                    that.sliceSize = newFile.size
                    var currentChunk = 0;

                    // 每块文件读取完毕之后的处理
                    fileReader.onload = function(e) {
                        // 每块交由sparkMD5进行计算
                        spark.append(e.target.result);
                        that.contentMd5 = spark.end();
                        that._upLoadImg(that.contentMd5, newFile)

                    };

                    // 处理单片文件的上传
                    function loadNext() {
                        var start = currentChunk * that.sliceSize;
                        var end = start + that.sliceSize >= newFile.size ? newFile.size : start + that.sliceSize;

                        fileReader.readAsArrayBuffer(that.slice.call(newFile, start, end));
                    }
                    loadNext();
                })



            },
            //上传文件
            _upLoadImg(md5File, file) {
                let name = md5File + "." + file.name.split('.')[1]
                let params = {
                    contentMd5: md5File,
                    contentType: file.type,
                    key: name,
                    date: '',
                    putPolicy: '',
                    method: 'PUT',
                    fileType: 0
                }
                $Loading.getInstance(30000);//初始化loading图标，loading最长30秒，到时自动关闭
                upLoadService.getAuthorization(params).then(res => {
                    if(res.result == 'success') {
                        res.data = JSON.parse(JSON.stringify(res.data))
                        res.data.contentMd5 = md5File
                        res.data.file = file
                        upLoadService.upLoadImg(res.data, this._uploadSuccess)
                    }
                }, err => {
                    console.log(err)
                    $Loading && $Loading.close()
                }).catch(err => {
                    console.log(err)
                    $Loading && $Loading.close()
                })
            },
            _uploadSuccess(url) {
                this.imgUrls.push(url);
                //图片信息
                console.log(this.imgUrls,this.currentNum)
                if(this.imgUrls.length == this.currentNum){
                    $Loading && $Loading.close()
                    //发送图片地址
                    bus.$emit("uploadImgUrls", this.imgUrls)
                }
            },
            //删除已选图片
            deleteUploadImg(idx){
                this.fileList = this.fileList.filter((item,index)=>{
                    return idx!=index
                })

                if(this.fileList.length == 0){
                    alert(JSON.stringify(this.fileList));
                    this.fileList = [];
                }

                if(this.fileList.length < this.limitNum){
                    document.querySelector('.el-upload--picture-card').removeAttribute('style')
                }
            },
        },
    };
</script>

<style lang="stylus" scoped>
    .img-list{
        flex-1()
        flex()
        flex-wrap wrap
        justify-content flex-start
        >li{
            position relative
            img{
                w(160)
                h(160)
                mr(20)
                border-radius 6px
                border 1PX solid #ededed
                box-sizing border-box
            }
            i{
                position absolute
                right 8px
                top -20px
                w(40)
                h(40)
                background-image url(../assets/images/close_icon1.png)
                background-size contain
                background-repeat no-repeat
                background-position center
            }
        }
    }
</style>

