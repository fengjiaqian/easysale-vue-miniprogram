<template>
  <section class="add-exhibit-task pt90">
    <m-header :isFixed="true"></m-header>
    <ul class="et-content">
      <li>
        <h5>
          <span class="title">陈列商品</span>
          <span class="change" v-if="alreadyAdd" @click="chooseProduct">更换商品</span>
        </h5>
        <div class="add-product" v-if="!alreadyAdd" @click="chooseProduct">+ 添加陈列商品</div>
        <div class="product" v-if="alreadyAdd">
          <img v-lazy="selectedProduct.productImageUrl" >
          <p>{{selectedProduct.productName}}</p>
        </div>
      </li>
      <li class="cycle">
        <div class="cycle-column">
          <span class="title">陈列周期</span>
          <input type="number" @change="handleChange($event)" v-model="param.display_days" placeholder="请选择天数">
          <span>天</span>
        </div>
        <div class="cycle-column">
          <span class="title">上传周期</span>
          <input type="number" @change="handleChange($event)" v-model="param.photo_space_day" placeholder="请选择天数">
          <span>天</span>
        </div>
      </li>
      <li class="apply-date">
        <span class="title">申请截止日期</span>
        <el-date-picker
                class="date-pick-wrap"
                v-model="param.end_time"
                type="date"
                placeholder="请选择雇佣日期">
        </el-date-picker>
        <i class="extension"></i>
      </li>
      <li>
        <h5>要求</h5>
        <textarea cols="30" rows="6" v-model="param.display_rule" placeholder="请输入要求"></textarea>
      </li>
      <li>
        <h5>奖励</h5>
        <textarea cols="30" rows="6" v-model="param.display_reward" placeholder="请填写奖励信息"></textarea>
      </li>
    </ul>
    <div class="et-footer" :class="{'achieve':achieve}" @click="addExhibit">
      <span>{{initData.id?`保存`:`发布`}}</span>
    </div>
  </section>
</template>

<script>
  import { addExhibitActivity } from "api/fetch/exhibit";
  import storage from 'common/storage'
  export default {
    data() {
      return {
        alreadyAdd: false,//已经添加了陈列产品
        hireDate: '',
        selectedProduct: null,
        achieve: false,
        param: {
            product_id: '',//产品id
            display_days: '',//陈列天数
            photo_space_day: '',//拍照间隔天数 每隔多少天拍一次
            display_rule: '',//陈列规则
            display_reward: '',//陈列的奖励
            end_time: '',//活动结束日期
        },
        initData: {},//修改陈列带过来的陈列详情数据
      };
    },
    components: {

    },
    beforeRouteEnter (to, from, next) {
      next(vm=>{
        if(from.name == 'chooseProductList'){
          vm.selectedProduct = storage.get("selectedProduct", "");
          vm.alreadyAdd = vm.selectedProduct ? true : false
          vm.param.product_id = vm.selectedProduct ? vm.selectedProduct.id : ''
          vm.initData = storage.get("initExhibitInfo", "");
          vm.initEditData()
        }else if(from.name == 'exhibitTaskInfo'){
          vm.initData = storage.get("initExhibitInfo", "");
          vm.initEditData()
        }else{
          storage.remove("selectedProduct");
          storage.remove("initExhibitInfo");
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      next()
    },
    created() {

    },
    mounted() {},
    methods: {
        //选择陈列的商品
        chooseProduct(){
            this.$router.push({ path: "/chooseProductList" });
        },
        //添加陈列活动(修改陈列活动)
        addExhibit(){
          if(!this.achieve) return
          let timeType = typeof this.param.end_time
          if(timeType == 'object'){
            this.param.end_time = this.param.end_time.getTime()
          }
          let type = ''
          //如果是修改
          if(this.initData && this.initData.id){
            type = 'edit'
            this.param.id = this.initData.id
          }
          addExhibitActivity(this.param,type).then(res => {
            if (res.result === "success") {
              if(type == 'edit'){
                this.$toast(`修改成功！`)
                this.$router.push({
                  path: "/exhibitTaskInfo",
                  query: {id: this.initData.id}
                });
              }else{
                this.$toast(`添加成功！`)
                this.$router.push({ path: "/exhibitList" })
              }
            }
          }).catch(err => {
            this.$toast(err.message)
          })
        },
        handleChange(e){
          const { display_days,photo_space_day } = this.param
          let reasonable
          if(display_days&&photo_space_day){
            reasonable = display_days % photo_space_day == 0
          }else{
            reasonable = true
          }
          if(!reasonable) {
            this.$toast(`陈列周期必须是上传周期的整数倍！`)
            this.param.photo_space_day = ''
          }
        },
        initEditData(){
          //console.log(this.initData)
          let {
            dealerProductDTO,
            product_id,
            display_days,
            photo_space_day,
            display_rule,
            display_reward,
            end_time
          } = this.initData
          this.selectedProduct = this.selectedProduct || dealerProductDTO
          this.alreadyAdd = this.selectedProduct ? true : false
          product_id = this.selectedProduct.id
          this.param = {
            product_id,
            display_days,
            photo_space_day,
            display_rule,
            display_reward,
            end_time
          }
        },
    },
    watch: {
      param: {
        handler(newVal, oldVal) {
          const { product_id,display_days,photo_space_day,display_rule,display_reward,end_time } = newVal
          if(product_id && display_days && photo_space_day && display_rule && display_reward && end_time){
            this.achieve = true
          }else{
            this.achieve = false
          }
        },
        deep: true
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>

